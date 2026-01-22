"use client";

import { useActionState, useEffect } from "react";
import { createSnippet } from "@/app/snippets/actions";
import { SnippetType } from "@prisma/client";
import toast from "react-hot-toast";

export default function SnippetForm({ snippetTypes }: { snippetTypes: SnippetType[] }) {
  // state is the returned object from the action, isPending is the transition state
  const [state, formAction, isPending] = useActionState(createSnippet, { errors: {}, message: null });

  useEffect(() => {
    if (state.message) {
      state.errors && Object.keys(state.errors).length > 0 
        ? toast.error(state.message) 
        : toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block font-bold">Title</label>
        <input name="title" className="border w-full p-2 rounded" />
        {state.errors?.title && <p className="text-red-500 text-sm">{state.errors.title[0]}</p>}
      </div>

      <div>
        <label className="block font-bold">Type</label>
        <select name="snippetTypeId" className="border w-full p-2 rounded">
          <option value="">Select a type</option>
          {snippetTypes.map(t => <option key={t.id} value={t.id}>{t.description}</option>)}
        </select>
      </div>

      <div>
        <label className="block font-bold">Code</label>
        <textarea name="code" rows={5} className="border w-full p-2 rounded font-mono" />
        {state.errors?.code && <p className="text-red-500 text-sm">{state.errors.code[0]}</p>}
      </div>

      <button 
        disabled={isPending} 
        className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
      >
        {isPending ? "Saving..." : "Create Snippet"}
      </button>
    </form>
  );
}