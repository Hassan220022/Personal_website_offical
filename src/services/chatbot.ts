export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  response: string;
  conversationId: string;
}

export async function sendChatMessage(
  message: string,
  conversationHistory: ChatMessage[] = [],
  conversationId?: string,
): Promise<ChatResponse> {
  const response = await fetch('/api/chatbot/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, conversationHistory, conversationId }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Unable to reach the portfolio assistant.');
  return data;
}
