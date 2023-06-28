"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopicForm({ addTopic }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({ newTitle, newDescription }),
    //   });

    //   if (!res.ok) {
    //     throw new Error("Failed to update topic");
    //   }

    //   router.refresh();
    //   router.push("/");
    // } catch (error) {
    //   console.log(error);
    // }
    addTopic(title, description)
      .then(res => res.json())
      .then(data => {
        console.log(data)
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
        className="px-6 py-3 font-bold text-white bg-green-600 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
}
