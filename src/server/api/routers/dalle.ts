import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Configuration, OpenAIApi } from "openai";
import { env } from "../../../env.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAI_SECRET,
});

const openai = new OpenAIApi(configuration);

export const dalleRouter = createTRPCRouter({
  generateImage: protectedProcedure
    .input(
      z.object({
        userPrompt: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return "";
    }),
});
