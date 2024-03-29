"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { deleteTopic } from '@/actions/topicServerAction'

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeTopic = () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      deleteTopic(id)
      .then(res => {
        console.log(res)
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
