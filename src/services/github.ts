import axios from 'axios';
import { Repository, GitHubProfile } from '../types/github';
import RepositoryEnrichmentService from './repositoryEnrichment';

const API_BASE = '/api/github';

export const getGitHubProfile = async (): Promise<GitHubProfile> => {
  const { data } = await axios.get(`${API_BASE}/profile`);
  return data;
};

export const getRepositories = async (): Promise<Repository[]> => {
  const { data } = await axios.get(`${API_BASE}/repositories`, { timeout: 20000 });
  return RepositoryEnrichmentService.enrichRepositories(Array.isArray(data) ? data : []);
};

export const getStarredRepositories = async (): Promise<Repository[]> => {
  const { data } = await axios.get(`${API_BASE}/starred`, { timeout: 20000 });
  return RepositoryEnrichmentService.enrichRepositories(Array.isArray(data) ? data : []);
};

export const getAllRepositories = async (): Promise<Repository[]> => {
  const { data } = await axios.get(`${API_BASE}/all`, { timeout: 30000 });
  return RepositoryEnrichmentService.enrichRepositories(Array.isArray(data) ? data : []);
};