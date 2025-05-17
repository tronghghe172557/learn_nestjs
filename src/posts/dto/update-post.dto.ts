import { z } from 'zod';

export const updatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export type IUpdatePostDto = z.infer<typeof updatePostSchema>;
