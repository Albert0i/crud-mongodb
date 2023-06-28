"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopicForm( { addTopic } ) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState('')

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    setDisabled('disabled')
    addTopic(title, description)
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
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="px-8 py-2 border border-slate-500"
        type="text"
        placeholder="Topic Title" autoFocus
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="px-8 py-2 border border-slate-500"
        type="text"
        placeholder="Topic Description"
      />

      <button
        type="submit"
        className="px-6 py-3 font-bold text-white bg-green-600 w-fit disabled:bg-gray-500 disabled:cursor-not-allowed" 
        disabled={disabled}
      >
        Add Topic
      </button>
    </form>
  );
}
