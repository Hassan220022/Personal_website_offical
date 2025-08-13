// Chatbot service for handling API calls

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  response: string;
  conversationId: string;
}

export interface RagInitResponse {
  success: boolean;
  documentsProcessed: number;
}

// Initialize RAG system with GitHub data
export async function initializeRagSystem(githubUsername: string): Promise<RagInitResponse> {
  try {
    const response = await fetch('/api/rag/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ githubUsername }),
    });

    if (!response.ok) {
      throw new Error(`Failed to initialize RAG system: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error initializing RAG system:', error);
    throw error;
  }
}

// Send chat message
export async function sendChatMessage(
  message: string,
  conversationHistory: ChatMessage[] = [],
  conversationId?: string
): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/chatbot/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory,
        conversationId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}

// Search RAG system
export async function searchRagSystem(query: string, topK: number = 5): Promise<{ context: string }> {
  try {
    const response = await fetch('/api/rag/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, topK }),
    });

    if (!response.ok) {
      throw new Error(`Failed to search RAG system: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching RAG system:', error);
    throw error;
  }
}

// Check if RAG system is initialized
export async function checkRagSystemHealth(): Promise<boolean> {
  try {
    const response = await fetch('/api/chatbot/health');
    return response.ok;
  } catch (error) {
    console.error('Error checking RAG system health:', error);
    return false;
  }
}