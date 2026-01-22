"use server";

import { prisma } from "@/lib/prisma";
import { SnippetSchema, SnippetFormState } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// -----------------
export async function updateSnippet(id: number, prevState: SnippetFormState, formData: FormData) {
  const validatedFields = SnippetSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation Failed.",
    };
  }

  try {
    await prisma.snippet.update({
      where: { id },
      data: validatedFields.data,
    });
  } catch (error) {
    return { message: "Database Error: Failed to Update Snippet." };
  }

  revalidatePath("/");
  redirect("/");
}
// -----------------
export async function createSnippet(prevState: SnippetFormState, formData: FormData) {
  const validatedFields = SnippetSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Snippet.",
    };
  }

  try {
    await prisma.snippet.create({
      data: validatedFields.data,
    });
  } catch (error) {
    return { message: "Database Error: Failed to Create Snippet." };
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteSnippet(id: number) {
  try {
    await prisma.snippet.delete({ where: { id } });
    revalidatePath("/");
    return { message: "Deleted Snippet" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Snippet." };
  }
}