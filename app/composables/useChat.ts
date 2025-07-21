import type { Chat, ChatMessage } from '@/type';
import { MOCK_CHAT } from '@/composables/mockData';
import { ref, computed } from 'vue';

// * 1. You can call othe composables if needed, but always put it at the top level of the composable function

export default function useChat() {
  // * 2. In here, this is so that they are always run in the setup phase of our component

  const chat = ref<Chat>(MOCK_CHAT);
  const messages = computed<ChatMessage[]>(() => chat.value.messages);

  function createMessage(
    message: string, 
    role: ChatMessage['role']
  ) {
    const id = messages.value.length.toString();

    return {
      id,
      role,
      content: message
    }
  }

  function sendMessage(message: string) {
    messages.value.push(createMessage(message, 'user'));

    setTimeout(() => {
      messages.value.push(
        createMessage(`You said: ${message}`, 'assistant')
      )
    }, 200);
  }

  return {
    chat,
    messages,
    sendMessage
  }
}
