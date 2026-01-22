import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SnippetForm from "@/components/SnippetForm";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function SnippetEditPage({ params }: EditPageProps) {
  const { id } = await params;
  
  // Fetch data in parallel
  const [snippet, snippetTypes] = await Promise.all([
    prisma.snippet.findUnique({ where: { id: parseInt(id) } }),
    prisma.snippetType.findMany(),
  ]);

  if (!snippet) {
    notFound(); // Triggers the default 404 page
  }

  return (
    <div className="max-w-xl mx-auto m-10">
      <h1 className="text-2xl font-bold mb-6">Edit Snippet</h1>
      <SnippetForm initialData={snippet} snippetTypes={snippetTypes} />
    </div>
  );
}