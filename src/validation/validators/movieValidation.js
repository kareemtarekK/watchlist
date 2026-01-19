import { z } from "zod";
const movieValidationSchema = z.object({
  title: z.string().trim(),
  overwrite: z.string().trim(),
  releaseYear: z.coerce.number().int("year must be integer").positive(),
  geners: z.array(),
  runtime: z.coerce.number().int("must be integer"),
  posterUrl: z.string().optional(),
  createdBy: z.string().uuid(),
});

export default movieValidationSchema;
