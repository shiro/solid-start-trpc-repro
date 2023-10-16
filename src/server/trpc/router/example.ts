import { z } from "zod";
import { procedure, router } from "../utils";

export default router({
  hello: procedure.input(z.object({ name: z.string() })).query(({ input }) => {
    //console.log("API");
    //await new Promise(r => {setTimeout(() => {r(0)},5000)});

    return `Hello ${input.name}`;
  }),
  random: procedure
    .input(z.object({ num: z.number() }))
    .mutation(({ input }) => {
      return Math.floor(Math.random() * 100) / input.num;
    }),
});
