import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import OpenAI from "openai";
import { env } from "../../../env.mjs";
import { BUCKET_NAME, s3 } from "../../s3";
import type { Image } from "@prisma/client";

const openai = new OpenAI({ apiKey: env.OPENAI_SECRET });

const generateIcon = async (prompt: string) => {
  const res = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });
  return res.data[0]?.b64_json;
};

export const dalleRouter = createTRPCRouter({
  generateImage: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        style: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const finalPrompt = `Create a tattoo sketch of a ${input.prompt}, ${input.style}, tattoo should have simple shadows, I want the drawing to be black and white, done on a white background, in a graphic style. The details of the tattoo should be clear and precise, perfect for use as a tattoo pattern.`;
      console.log(finalPrompt);

      const b64Image = await generateIcon(finalPrompt);

      if (b64Image) {
        const image: Image = await ctx.prisma.image.create({
          data: {
            userId: ctx.session.user.id,
            isPublic: false,
          },
        });
        console.log(image);

        await s3
          .putObject({
            Bucket: BUCKET_NAME,
            Body: Buffer.from(b64Image, "base64"),
            Key: image.id,
            ContentEncoding: "base64",
            ContentType: "image/png",
          })
          .promise();
        console.log(`https://${BUCKET_NAME}.s3.amazonaws.com/${image.id}`);
        return `https://${BUCKET_NAME}.s3.amazonaws.com/${image.id}`;
      }
    }),
});
