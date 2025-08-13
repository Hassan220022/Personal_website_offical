import { useState, useEffect } from 'react';
import { initializeRagSystem, checkRagSystemHealth } from '../services/chatbot';

interface UseChatbotReturn {
  isInitialized: boolean;
  isInitializing: boolean;
  initializationError: string | null;
  initializeWithGitHub: (username: string) => Promise<void>;
  documentsProcessed: number;
}

export function useChatbot(): UseChatbotReturn {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);
  const [documentsProcessed, setDocumentsProcessed] = useState(0);

  // Auto-initialize RAG system with Hassan's GitHub data on mount
  useEffect(() => {
    const autoInitialize = async () => {
      try {
        // First check if already initialized
        const isHealthy = await checkRagSystemHealth();
        if (isHealthy) {
          setIsInitialized(true);
          return;
        }

        // If not initialized, auto-initialize with Hassan's GitHub username
        setIsInitializing(true);
        const result = await initializeRagSystem('Hassan220022');
        
        if (result.success) {
          setIsInitialized(true);
          setDocumentsProcessed(result.documentsProcessed);
          console.log(`RAG system auto-initialized with ${result.documentsProcessed} documents`);
        }
      } catch (error) {
        console.error('Error auto-initializing RAG system:', error);
        setInitializationError('Failed to auto-initialize system');
      } finally {
        setIsInitializing(false);
      }
    };

    autoInitialize();
  }, []);

  const initializeWithGitHub = async (username: string) => {
    if (isInitializing) return;

    setIsInitializing(true);
    setInitializationError(null);

    try {
      const result = await initializeRagSystem(username);
      
      if (result.success) {
        setIsInitialized(true);
        setDocumentsProcessed(result.documentsProcessed);
        console.log(`RAG system initialized with ${result.documentsProcessed} documents`);
      } else {
        throw new Error('Failed to initialize RAG system');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setInitializationError(errorMessage);
      console.error('RAG initialization error:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  return {
    isInitialized,
    isInitializing,
    initializationError,
    initializeWithGitHub,
    documentsProcessed,
  };
}