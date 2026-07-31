import { Repository } from '../types/github';

// Light categorization only — no invented features/highlights.
export class RepositoryEnrichmentService {
  static categorizeRepository(repo: Repository): Repository['category'] {
    const name = (repo.name || '').toLowerCase();
    const description = (repo.description || '').toLowerCase();
    const language = (repo.language || '').toLowerCase();
    const topics = (repo.topics || []).map((t) => t.toLowerCase());

    if (
      language === 'dart' ||
      language === 'swift' ||
      language === 'kotlin' ||
      topics.some((t) => ['flutter', 'android', 'ios', 'mobile', 'react-native'].includes(t)) ||
      name.includes('mobile') ||
      name.includes('flutter')
    ) {
      return 'mobile';
    }

    if (
      topics.some((t) =>
        ['ai', 'ml', 'machine-learning', 'deep-learning', 'computer-vision', 'opencv', 'tensorflow', 'pytorch', 'yolo'].includes(t),
      ) ||
      name.includes('ai') ||
      name.includes('ml') ||
      description.includes('machine learning') ||
      description.includes('computer vision')
    ) {
      return 'ai';
    }

    if (
      topics.some((t) => ['iot', 'arduino', 'esp32', 'home-assistant', 'smart-home', 'embedded'].includes(t)) ||
      description.includes('smart home') ||
      name.includes('arduino') ||
      name.includes('smart-home')
    ) {
      return 'smart-home';
    }

    if (
      ['javascript', 'typescript', 'html', 'css', 'php'].includes(language) ||
      topics.some((t) => ['web', 'react', 'vue', 'angular', 'nodejs', 'frontend', 'backend', 'fullstack'].includes(t)) ||
      name.includes('web') ||
      name.includes('website') ||
      description.includes('website')
    ) {
      return 'web';
    }

    if (
      name.includes('graduation') ||
      name === 'flex' ||
      name.includes('thesis') ||
      description.includes('graduation')
    ) {
      return 'graduation';
    }

    return 'academic';
  }

  static determineStatus(repo: Repository): Repository['status'] {
    if (repo.archived) return 'archived';
    const lastUpdate = new Date(repo.updated_at);
    if (Number.isNaN(lastUpdate.getTime())) return 'completed';
    const days = Math.floor((Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 30) return 'in-progress';
    if (days > 730) return 'archived';
    return 'completed';
  }

  static extractYear(repo: Repository): number | undefined {
    const d = new Date(repo.created_at);
    return Number.isNaN(d.getTime()) ? undefined : d.getFullYear();
  }

  static generateTechnologies(repo: Repository): string[] {
    const values = [repo.language, ...(repo.topics || [])].filter(Boolean) as string[];
    return [...new Set(values)];
  }

  static enrichRepository(repo: Repository): Repository {
    return {
      ...repo,
      description: repo.description ?? null,
      language: repo.language ?? null,
      homepage: repo.homepage || null,
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      stargazers_count: Number(repo.stargazers_count || 0),
      forks_count: Number(repo.forks_count || 0),
      category: this.categorizeRepository(repo),
      status: this.determineStatus(repo),
      year: this.extractYear(repo),
      technologies: this.generateTechnologies(repo),
      // Keep empty — UI no longer invents marketing copy.
      features: [],
      highlights: [],
    };
  }

  static enrichRepositories(repos: Repository[]): Repository[] {
    if (!Array.isArray(repos)) return [];
    return repos
      .filter((repo) => repo && repo.id && repo.name && repo.html_url)
      .map((repo) => this.enrichRepository(repo));
  }
}

export default RepositoryEnrichmentService;
