"use client";

import { useActionState, useEffect } from "react";
import { createSnippet, updateSnippet } from "@/app/snippets/actions";
import { SnippetType, Snippet } from "@prisma/client";
import toast from "react-hot-toast";

interface SnippetFormProps {
  snippetTypes: SnippetType[];
  initialData?: Snippet; // If present, we are in "Edit" mode
}

export default function SnippetForm({ snippetTypes, initialData }: SnippetFormProps) {
  // If we have initialData, we bind the updateSnippet action with the ID
  const updateSnippetWithId = updateSnippet.bind(null, initialData?.id || 0);
  
  // Decide which action to use
  const actionToUse = initialData ? updateSnippetWithId : createSnippet;

  const [state, formAction, isPending] = useActionState(actionToUse, { 
    errors: {}, 
    message: null 
  });

  useEffect(() => {
    if (state.message) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block font-bold">Title</label>
        <input 
          name="title" 
          defaultValue={initialData?.title}
          className="border w-full p-2 rounded" 
        />
        {state.errors?.title && <p className="text-red-500 text-sm">{state.errors.title[0]}</p>}
      </div>

      <div>
        <label className="block font-bold">Type</label>
        <select 
          name="snippetTypeId" 
          defaultValue={initialData?.snippetTypeId || ""}
          className="border w-full p-2 rounded"
        >
          <option value="">Select a type</option>
          {snippetTypes.map(t => <option key={t.id} value={t.id}>{t.description}</option>)}
        </select>
      </div>

      <div>
        <label className="block font-bold">Code</label>
        <textarea 
          name="code" 
          defaultValue={initialData?.code}
          rows={10} 
          className="border w-full p-2 rounded font-mono" 
        />
        {state.errors?.code && <p className="text-red-500 text-sm">{state.errors.code[0]}</p>}
      </div>

      <button 
        disabled={isPending} 
        className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
      >
        {isPending ? "Saving..." : initialData ? "Update Snippet" : "Create Snippet"}
      </button>
    </form>
  );
}