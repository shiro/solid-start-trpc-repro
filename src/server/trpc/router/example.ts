import { z } from "zod";
import { procedure, router } from "../utils";

export default router({
  hello: procedure.input(z.object({ name: z.string() })).query(async ({ input }) => {
    console.log("API");
    await new Promise(r => {setTimeout(() => {r(0)},5000)});

    const time = +new Date();
    console.log("DONE", time);
    return `Hello ${input.name} (${time})`;
  }),
  random: procedure
    .input(z.object({ num: z.number() }))
    .mutation(({ input }) => {
      return Math.floor(Math.random() * 100) / input.num;
    }),
});
