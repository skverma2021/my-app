import { z } from "zod";

export const SnippetSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  code: z.string().min(10, "Code must be at least 10 characters"),
  snippetTypeId: z.coerce.number().int().optional(),
});

export type SnippetFormState = {
  errors?: {
    title?: string[];
    code?: string[];
    snippetTypeId?: string[];
  };
  message?: string | null;
};