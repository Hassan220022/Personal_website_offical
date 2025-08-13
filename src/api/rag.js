import axios from 'axios';
import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Pinecone client
let pinecone;
let index;

if (process.env.PINECONE_API_KEY) {
  pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  
  if (process.env.PINECONE_INDEX_NAME) {
    index = pinecone.index(process.env.PINECONE_INDEX_NAME);
  }
}

// In-memory storage as fallback if Pinecone is not configured
let memoryStore = [];

// GitHub API integration
export async function fetchGitHubData(username) {
  try {
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch user profile
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, { headers });
    const user = userResponse.data;

    // Fetch repositories
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers });
    const repos = reposResponse.data;

    // Fetch detailed information for each repository
    const detailedRepos = await Promise.all(
      repos.slice(0, 20).map(async (repo) => {
        try {
          // Get README content
          let readme = '';
          try {
            const readmeResponse = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/readme`, { headers });
            readme = Buffer.from(readmeResponse.data.content, 'base64').toString('utf-8');
          } catch (e) {
            // README not found, skip
          }

          // Get languages
          const languagesResponse = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/languages`, { headers });
          const languages = languagesResponse.data;

          return {
            ...repo,
            readme,
            languages: Object.keys(languages)
          };
        } catch (error) {
          console.error(`Error fetching details for repo ${repo.name}:`, error.message);
          return repo;
        }
      })
    );

    return {
      user,
      repositories: detailedRepos
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error.message);
    throw error;
  }
}

// Simple text embedding function (fallback)
function simpleEmbedding(text) {
  // This is a very basic embedding - in production, use a proper embedding model
  const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  const embedding = new Array(384).fill(0);
  
  words.forEach((word, i) => {
    const hash = word.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    embedding[Math.abs(hash) % 384] += 1;
  });
  
  // Normalize
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return magnitude > 0 ? embedding.map(val => val / magnitude) : embedding;
}

// Process and store data in vector database
export async function processAndStoreData(githubUsername) {
  try {
    console.log('Fetching GitHub data...');
    const githubData = await fetchGitHubData(githubUsername);
    
    const documents = [];
    
    // Process user profile
    const userDoc = {
      id: `user-${githubUsername}`,
      content: `Profile: ${githubData.user.name || githubUsername}. Bio: ${githubData.user.bio || 'No bio available'}. Company: ${githubData.user.company || 'Not specified'}. Location: ${githubData.user.location || 'Not specified'}. Public repositories: ${githubData.user.public_repos}. Followers: ${githubData.user.followers}. Following: ${githubData.user.following}.`,
      metadata: {
        type: 'profile',
        username: githubUsername,
        name: githubData.user.name,
        company: githubData.user.company,
        location: githubData.user.location
      }
    };
    documents.push(userDoc);
    
    // Process repositories
    githubData.repositories.forEach(repo => {
      const repoDoc = {
        id: `repo-${repo.name}`,
        content: `Project: ${repo.name}. Description: ${repo.description || 'No description'}. Languages: ${repo.languages ? repo.languages.join(', ') : 'Not specified'}. Stars: ${repo.stargazers_count}. Forks: ${repo.forks_count}. ${repo.readme ? `README: ${repo.readme.substring(0, 1000)}` : ''}`,
        metadata: {
          type: 'repository',
          name: repo.name,
          description: repo.description,
          languages: repo.languages || [],
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
          created_at: repo.created_at,
          updated_at: repo.updated_at
        }
      };
      documents.push(repoDoc);
    });
    
    // Store in vector database or memory
    if (index) {
      // Use Pinecone
      const vectors = documents.map(doc => ({
        id: doc.id,
        values: simpleEmbedding(doc.content),
        metadata: {
          content: doc.content,
          ...doc.metadata
        }
      }));
      
      await index.upsert(vectors);
      console.log(`Stored ${vectors.length} documents in Pinecone`);
    } else {
      // Use memory store
      memoryStore = documents.map(doc => ({
        ...doc,
        embedding: simpleEmbedding(doc.content)
      }));
      console.log(`Stored ${documents.length} documents in memory`);
    }
    
    return { success: true, documentsProcessed: documents.length };
  } catch (error) {
    console.error('Error processing and storing data:', error);
    throw error;
  }
}

// Cosine similarity function
function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
}

// Retrieve relevant context for a query
export async function getRagContext(query, topK = 5) {
  try {
    const queryEmbedding = simpleEmbedding(query);
    
    if (index) {
      // Use Pinecone
      const queryResponse = await index.query({
        vector: queryEmbedding,
        topK,
        includeMetadata: true
      });
      
      return queryResponse.matches
        .map(match => match.metadata.content)
        .join('\n\n');
    } else {
      // Use memory store
      const similarities = memoryStore.map(doc => ({
        ...doc,
        similarity: cosineSimilarity(queryEmbedding, doc.embedding)
      }));
      
      const topResults = similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topK);
      
      return topResults
        .map(result => result.content)
        .join('\n\n');
    }
  } catch (error) {
    console.error('Error retrieving RAG context:', error);
    return 'Unable to retrieve relevant context at this time.';
  }
}

// Express routes
import express from 'express';
const router = express.Router();

// Initialize RAG data
router.post('/initialize', async (req, res) => {
  try {
    const { githubUsername } = req.body;
    
    if (!githubUsername) {
      return res.status(400).json({ error: 'GitHub username is required' });
    }
    
    const result = await processAndStoreData(githubUsername);
    res.json(result);
  } catch (error) {
    console.error('RAG initialization error:', error);
    res.status(500).json({ 
      error: 'Failed to initialize RAG system',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Search endpoint
router.post('/search', async (req, res) => {
  try {
    const { query, topK = 5 } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    const context = await getRagContext(query, topK);
    res.json({ context });
  } catch (error) {
    console.error('RAG search error:', error);
    res.status(500).json({ 
      error: 'Failed to search RAG system',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;