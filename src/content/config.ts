import { defineCollection, z } from 'astro:content';

const skillsCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    category: z.string(),
    icon: z.string().optional(),
  }),
});

export const collections = {
  'skills': skillsCollection,
};