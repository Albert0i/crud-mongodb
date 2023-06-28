import AddTopicForm from "@/components/AddTopicForm";
import { addTopic } from '@/actions/topicServerAction'

export default async function AddTopic() {
  return <AddTopicForm addTopic={addTopic} />;
}
