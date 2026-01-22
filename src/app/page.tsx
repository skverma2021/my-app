import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteSnippet } from "@/app/snippets/actions";

export default async function Home() {
  const snippets = await prisma.snippet.findMany({
    include: { snippetType: true }
  });

  return (
    <main className="p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">My Snippets</h1>
        <Link href="/snippets/new" className="bg-green-600 text-white px-4 py-2 rounded">New +</Link>
      </div>

      <div className="grid gap-4">
        {snippets.map((s) => (
          <div key={s.id} className="p-4 border rounded flex justify-between items-center bg-gray-50">
            <div>
              <h2 className="font-bold text-lg">{s.title}</h2>
              <span className="text-xs text-gray-500 uppercase">{s.snippetType?.description || "General"}</span>
            </div>
            <div className="flex gap-2">
              <Link href={`/snippets/${s.id}/edit`} className="text-blue-600 border border-blue-600 px-3 py-1 rounded">Edit</Link>
              <form action={deleteSnippet.bind(null, s.id)}>
                <button className="text-red-600 border border-red-600 px-3 py-1 rounded">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}