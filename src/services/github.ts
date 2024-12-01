import axios from 'axios';
import { Repository, GitHubProfile } from '../types/github';

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'Hassan220022';
const PER_PAGE = 100;

export const getGitHubProfile = async (): Promise<GitHubProfile> => {
  const { data } = await axios.get(`${GITHUB_API}/users/${USERNAME}`);
  return data;
};

export const getRepositories = async (): Promise<Repository[]> => {
  const { data } = await axios.get(`${GITHUB_API}/users/${USERNAME}/repos?sort=updated`);
  return data;
};

export const getStarredRepositories = async (): Promise<Repository[]> => {
  const { data } = await axios.get(`${GITHUB_API}/users/${USERNAME}/starred`);
  return data;
};

export const getAllRepositories = async (): Promise<Repository[]> => {
  let page = 1;
  let hasMore = true;
  const allRepos: Repository[] = [];

  try {
    while (hasMore) {
      const { data, headers } = await axios.get(
        `${GITHUB_API}/users/${USERNAME}/repos`,
        {
          params: {
            per_page: PER_PAGE,
            page,
            sort: 'updated',
          },
        }
      );

      allRepos.push(...data);
      
      // Check if there are more pages
      const linkHeader = headers.link;
      hasMore = linkHeader?.includes('rel="next"') ?? false;
      page++;
    }

    return allRepos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};