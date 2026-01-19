import { z } from "zod";

const userValidationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim(),
  email: z.string().email("enter valid email"),
  password: z.string(),
});

export default userValidationSchema;
