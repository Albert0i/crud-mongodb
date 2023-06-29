"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTopic } from '@/actions/topicServerAction'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { topicSchema } from '@/viewModels/topic'

export default function AddTopicForm( ) {
  const [disabled, setDisabled] = useState('')

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm( { resolver: zodResolver(topicSchema) } )

  const onSubmit = ( data ) => {
    setDisabled('disabled')
    addTopic(data.title, data.description)
      .then(res => {
        console.log(res)
        router.refresh()
        router.push('/')
      })
      .catch(err => console.log(err)) 
  };
  
  return (
    <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col gap-3">
      <input        
        className="px-8 py-2 border border-slate-500"
        type="text"
        { ...register('title') }
        placeholder="Topic Title" autoFocus
      />
      { errors.title && <span className='text-red-500'> { errors.title.message } </span> }

      <input
        className="px-8 py-2 border border-slate-500"
        type="text"
        { ...register('description') }
        placeholder="Topic Description"
      />
      { errors.description && <span className='text-red-500'> { errors.description.message } </span> }

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
