import { z } from "zod";
import { zfd } from "zod-form-data";

import {
  createTRPCRouter,
  fdProcedure,
  publicProcedure,
} from "~/server/api/trpc";

let post = {
  id: 1,
  name: "Hello World",
};

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: fdProcedure
    .input(
      zfd.formData({
        name: zfd.text(z.string().min(1)),
        image: zfd.file(),
      }),
    )
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(input.image);

      post = { id: post.id + 1, name: input.name };
      return post;
    }),

  getLatest: publicProcedure.query(() => {
    return post;
  }),
});
