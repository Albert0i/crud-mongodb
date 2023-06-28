"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ updateTopic, id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    updateTopic(id, newTitle, newDescription)
      .then(res => {
        console.log(res)
        router.refresh()
        router.push('/')
      })
      .catch(err => console.log(err)) 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="px-8 py-2 border border-slate-500"
        type="text"
        placeholder="Topic Title" autoFocus
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="px-8 py-2 border border-slate-500"
        type="text"
        placeholder="Topic Description"
      />

      <button className="px-6 py-3 font-bold text-white bg-green-600 w-fit">
        Update Topic
      </button>
    </form>
  );
}
