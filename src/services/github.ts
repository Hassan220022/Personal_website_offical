import axios from 'axios';
import { Repository, GitHubProfile } from '../types/github';
import RepositoryEnrichmentService from './repositoryEnrichment';

const API_BASE = '/api/github';

export const getGitHubProfile = async (): Promise<GitHubProfile> => {
  const { data } = await axios.get(`${API_BASE}/profile`);
  return data;
};

export const getRepositories = async (): Promise<Repository[]> => {
  const { data } = await axios.get(`${API_BASE}/repositories`);
  return RepositoryEnrichmentService.enrichRepositories(data);
};

export const getStarredRepositories = async (): Promise<Repository[]> => {
  const { data } = await axios.get(`${API_BASE}/starred`);
  return RepositoryEnrichmentService.enrichRepositories(data);
};

export const getAllRepositories = async (): Promise<Repository[]> => {
  const { data } = await axios.get(`${API_BASE}/all`);
  return RepositoryEnrichmentService.enrichRepositories(data);
};