"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { deleteTopic } from '@/actions/topicServerAction'

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      // try {
      //   const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
      //     method: "DELETE",
      //   });
  
      //   if (res.ok) {
      //     router.refresh();
      //   } else {
      //     throw new Error("Failed to create a topic");
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
      deleteTopic(id)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        router.refresh()
      })
      .catch(err => console.log(err)) 
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
