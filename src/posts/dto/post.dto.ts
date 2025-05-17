import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

export type IPostDto = z.infer<typeof PostSchema>;
