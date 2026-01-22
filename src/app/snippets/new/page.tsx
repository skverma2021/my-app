import { prisma } from "@/lib/prisma";
import { createSnippet } from "@/app/snippets/actions";
import SnippetForm from "@/components/SnippetForm"; // We'll create this next

export default async function SnippetCreatePage() {
  // Fetch types on the server
  const snippetTypes = await prisma.snippetType.findMany();

  return (
    <div className="max-w-xl mx-auto m-10">
      <h1 className="text-2xl font-bold mb-6">Create Snippet</h1>
      {/* Pass types to a Client Component for better UX */}
      <SnippetForm snippetTypes={snippetTypes} />
    </div>
  );
}