import { z } from "zod";
const movieWatchlistItemSchema = z.object({
  userId: z.string().uuid(),
  movieId: z.string().uuid(),
  rating: z.coerce
    .number()
    .int("rating must be interger")
    .min(1, "rating must be between 1 and 10")
    .max(10, "rating must be between 1 and 10")
    .optional(),
  status: z
    .enum(["COMPLETED", "PLANNED", "WATCHING", "DROPPED"], {
      error: () => ({
        message: "status must be: COMPLETED PLANNED WATCHING DROPPED",
      }),
    })
    .optional(),
  notes: z.string().optional(),
});

export default movieWatchlistItemSchema;
