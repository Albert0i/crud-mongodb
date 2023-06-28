import EditTopicForm from "@/components/EditTopicForm";
import { getTopicById } from "@/actions/topicServerAction"
import { updateTopic} from '@/actions/topicServerAction'

export default async function EditTopic({ params }) {
  const { id } = params;
  const { topic } = await getTopicById(id);
  const { title, description } = topic;

  return <EditTopicForm updateTopic={updateTopic} id={id} title={title} description={description} />;
}
