import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Configuration, OpenAIApi } from "openai";
import { env } from "../../../env.mjs";
import { BUCKET_NAME, s3 } from "../../s3";
import type { Image } from "@prisma/client";

const configuration = new Configuration({
  apiKey: env.OPENAI_SECRET,
});

const openai = new OpenAIApi(configuration);

const generateIcon = async (prompt: string) => {
  const res = await openai.createImage({
    prompt,
    n: 1,
    size: "512x512",
    response_format: "b64_json",
  });
  return res.data.data.map((result) => result.b64_json || "");
};

export const dalleRouter = createTRPCRouter({
  generateImage: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        style: z.string(),
        type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const finalPrompt = `a ${input.prompt}, ${input.style}, ${input.type}, grayscale, white background, art, high quality`;

      const base64EncodedImages = await generateIcon(finalPrompt);
      console.log(base64EncodedImages);

      const createdImage = await Promise.all(
        base64EncodedImages.map(async (base64image) => {
          const image: Image = await ctx.prisma.image.create({
            data: {
              userId: ctx.session.user.id,
              isPublic: false,
            },
          });
          await s3
            .putObject({
              Bucket: BUCKET_NAME,
              Body: Buffer.from(base64image, "base64"),
              Key: image.id,
              ContentEncoding: "base64",
              ContentType: "image/png",
            })
            .promise();
          return image;
        })
      );

      if (createdImage[0]) {
        return `https://${BUCKET_NAME}.s3.amazonaws.com/${createdImage[0].id}`;
      }
    }),
});
