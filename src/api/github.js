import express from 'express';
import axios from 'axios';

const router = express.Router();

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'Hassan220022';
const PER_PAGE = 100;

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

    // Ensure created_at is included in the response
    const enrichedData = data.map(repo => ({
      ...repo,
      created_at: repo.created_at || repo.updated_at
    }));

    res.json(enrichedData);
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

    // Ensure created_at is included in the response
    const enrichedData = data.map(repo => ({
      ...repo,
      created_at: repo.created_at || repo.updated_at
    }));

    res.json(enrichedData);
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

    // Ensure created_at is included in the response
    const enrichedRepos = allRepos.map(repo => ({
      ...repo,
      created_at: repo.created_at || repo.updated_at
    }));

    res.json(enrichedRepos);
  } catch (error) {
    console.error('GitHub all repositories error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch all repositories',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;