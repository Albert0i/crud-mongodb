import EditTopicForm from "@/components/EditTopicForm";
import { getTopicById, getTopics } from "@/actions/topicServerAction"

export default async function EditTopic({ params }) {
  const { id } = params;
  const { topic } = await getTopicById(id);
  const { title, description } = topic;

  return <EditTopicForm id={id} title={title} description={description} />;
}

/*
   Next.js 13: complete guide to Server Components and the App Directory
   https://makerkit.dev/blog/tutorials/nextjs13

   generateStaticParams
   https://nextjs.org/docs/app/api-reference/functions/generate-static-params
*/
// export async function generateStaticParams() {  
//   const { topics } = await getTopics();

//   return topics.map(topic => ({
//     id: topic.id
//   }))
// }