import express from 'express';
import axios from 'axios';

const router = express.Router();

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'Hassan220022';
const PER_PAGE = 100;

function normalizeRepos(repos) {
  if (!Array.isArray(repos)) return [];
  return repos
    .filter((repo) => repo && typeof repo === 'object' && repo.id && repo.name && repo.html_url)
    .map((repo) => ({
      id: repo.id,
      name: String(repo.name),
      full_name: repo.full_name || `${USERNAME}/${repo.name}`,
      description: repo.description ?? null,
      html_url: repo.html_url,
      stargazers_count: Number(repo.stargazers_count || 0),
      forks_count: Number(repo.forks_count || 0),
      language: repo.language ?? null,
      updated_at: repo.updated_at || repo.pushed_at || repo.created_at || new Date().toISOString(),
      created_at: repo.created_at || repo.updated_at || new Date().toISOString(),
      topics: Array.isArray(repo.topics) ? repo.topics.filter(Boolean) : [],
      homepage: repo.homepage || null,
      fork: Boolean(repo.fork),
      archived: Boolean(repo.archived),
    }));
}

// Get GitHub profile
router.get('/profile', async (req, res) => {
  try {
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const { data } = await axios.get(`${GITHUB_API}/users/${USERNAME}`, { headers });
    res.json(data);
  } catch (error) {
    console.error('GitHub profile error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch GitHub profile',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get repositories
router.get('/repositories', async (req, res) => {
  try {
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const { data } = await axios.get(`${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=${PER_PAGE}`, { headers });

    res.json(normalizeRepos(data));
  } catch (error) {
    console.error('GitHub repositories error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch repositories',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get starred repositories
router.get('/starred', async (req, res) => {
  try {
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const { data } = await axios.get(`${GITHUB_API}/users/${USERNAME}/starred`, { headers });

    res.json(normalizeRepos(data));
  } catch (error) {
    console.error('GitHub starred repositories error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch starred repositories',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all repositories with pagination
router.get('/all', async (req, res) => {
  try {
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    let page = 1;
    let hasMore = true;
    const allRepos = [];

    while (hasMore) {
      const { data, headers: responseHeaders } = await axios.get(
        `${GITHUB_API}/users/${USERNAME}/repos`,
        {
          headers,
          params: {
            per_page: PER_PAGE,
            page,
            sort: 'updated',
          },
        }
      );

      allRepos.push(...data);

      // Check if there are more pages
      const linkHeader = responseHeaders.link;
      hasMore = linkHeader?.includes('rel="next"') ?? false;
      page++;
    }

    res.json(normalizeRepos(allRepos));
  } catch (error) {
    console.error('GitHub all repositories error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch all repositories',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;