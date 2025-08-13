import { Repository } from '../types/github';

// Repository enrichment service to add CustomProject-like metadata to GitHub repositories
export class RepositoryEnrichmentService {

  // Categorize repository based on language, topics, and name
  static categorizeRepository(repo: Repository): Repository['category'] {
    const name = repo.name.toLowerCase();
    const description = (repo.description || '').toLowerCase();
    const language = (repo.language || '').toLowerCase();
    const topics = repo.topics || [];

    // Check for mobile development
    if (
      language === 'dart' ||
      language === 'swift' ||
      language === 'kotlin' ||
      topics.some(topic => ['flutter', 'android', 'ios', 'mobile', 'react-native'].includes(topic.toLowerCase())) ||
      name.includes('app') || name.includes('mobile')
    ) {
      return 'mobile';
    }

    // Check for AI/ML projects
    if (
      language === 'python' && (
        topics.some(topic => ['ai', 'ml', 'machine-learning', 'deep-learning', 'computer-vision', 'opencv', 'tensorflow', 'pytorch', 'yolo'].includes(topic.toLowerCase())) ||
        description.includes('ai') || description.includes('machine learning') || description.includes('computer vision') ||
        name.includes('ai') || name.includes('ml') || name.includes('detection') || name.includes('vision')
      )
    ) {
      return 'ai';
    }

    // Check for smart home/IoT projects
    if (
      language === 'c++' || language === 'c' ||
      topics.some(topic => ['iot', 'arduino', 'esp32', 'home-assistant', 'smart-home', 'embedded'].includes(topic.toLowerCase())) ||
      description.includes('arduino') || description.includes('iot') || description.includes('smart home') ||
      name.includes('smart') || name.includes('home') || name.includes('arduino')
    ) {
      return 'smart-home';
    }

    // Check for web projects
    if (
      ['javascript', 'typescript', 'html', 'css', 'php'].includes(language) ||
      topics.some(topic => ['web', 'react', 'vue', 'angular', 'nodejs', 'frontend', 'backend', 'fullstack'].includes(topic.toLowerCase())) ||
      description.includes('website') || description.includes('web app') ||
      name.includes('web') || name.includes('site')
    ) {
      return 'web';
    }

    // Check for graduation/thesis projects
    if (
      name.includes('graduation') || name.includes('thesis') || name.includes('final') ||
      description.includes('graduation') || description.includes('thesis') || description.includes('final project')
    ) {
      return 'graduation';
    }

    // Default to academic for other projects
    return 'academic';
  }

  // Determine repository status based on activity and metadata
  static determineStatus(repo: Repository): Repository['status'] {
    const lastUpdate = new Date(repo.updated_at);
    const now = new Date();
    const daysSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));

    // If updated recently (within 30 days), consider in-progress
    if (daysSinceUpdate <= 30) {
      return 'in-progress';
    }

    // If very old (over 2 years), consider archived
    if (daysSinceUpdate > 730) {
      return 'archived';
    }

    // Otherwise, consider completed
    return 'completed';
  }

  // Generate features based on repository metadata
  static generateFeatures(repo: Repository): string[] {
    const features: string[] = [];
    const description = (repo.description || '').toLowerCase();
    const topics = repo.topics || [];
    const language = repo.language || '';

    // Add language as a feature
    if (language) {
      features.push(`Built with ${language}`);
    }

    // Add topic-based features
    topics.forEach(topic => {
      const topicLower = topic.toLowerCase();
      if (topicLower === 'api') features.push('RESTful API integration');
      if (topicLower === 'database') features.push('Database integration');
      if (topicLower === 'ui' || topicLower === 'frontend') features.push('User interface design');
      if (topicLower === 'responsive') features.push('Responsive design');
      if (topicLower === 'authentication') features.push('User authentication');
      if (topicLower === 'real-time') features.push('Real-time functionality');
    });

    // Add description-based features
    if (description.includes('responsive')) features.push('Responsive design');
    if (description.includes('api')) features.push('API integration');
    if (description.includes('database')) features.push('Database management');
    if (description.includes('authentication')) features.push('User authentication');
    if (description.includes('real-time')) features.push('Real-time updates');
    if (description.includes('mobile')) features.push('Mobile-friendly interface');

    // Add GitHub-specific features
    if (repo.stargazers_count > 0) {
      features.push(`${repo.stargazers_count} GitHub stars`);
    }

    if (repo.homepage) {
      features.push('Live demo available');
    }

    // Ensure we have at least some features
    if (features.length === 0) {
      features.push('Open source project');
      if (repo.description) {
        features.push('Well documented');
      }
    }

    return features.slice(0, 4); // Limit to 4 features like CustomProject
  }

  // Generate highlights based on repository analysis
  static generateHighlights(repo: Repository): string[] {
    const highlights: string[] = [];
    const topics = repo.topics || [];
    const language = repo.language || '';
    const description = (repo.description || '').toLowerCase();

    // Add language-specific highlights
    if (language === 'TypeScript') highlights.push('Type-safe development');
    if (language === 'Python') highlights.push('Clean and readable code');
    if (language === 'Rust') highlights.push('Memory-safe systems programming');
    if (language === 'Go') highlights.push('High-performance backend');

    // Add topic-based highlights
    if (topics.includes('machine-learning')) highlights.push('Advanced ML algorithms');
    if (topics.includes('docker')) highlights.push('Containerized deployment');
    if (topics.includes('kubernetes')) highlights.push('Scalable architecture');
    if (topics.includes('microservices')) highlights.push('Microservices architecture');

    // Add star-based highlights
    if (repo.stargazers_count >= 10) {
      highlights.push('Community recognition');
    }

    if (repo.stargazers_count >= 50) {
      highlights.push('Popular open source project');
    }

    // Add description-based highlights
    if (description.includes('innovative')) highlights.push('Innovative solution');
    if (description.includes('scalable')) highlights.push('Scalable architecture');
    if (description.includes('performance')) highlights.push('Performance optimized');

    return highlights.slice(0, 3); // Limit to 3 highlights
  }

  // Extract year from creation date
  static extractYear(repo: Repository): number {
    return new Date(repo.created_at).getFullYear();
  }

  // Generate technologies array from language and topics
  static generateTechnologies(repo: Repository): string[] {
    const technologies: string[] = [];

    // Add primary language
    if (repo.language) {
      technologies.push(repo.language);
    }

    // Add topics as technologies
    if (repo.topics) {
      technologies.push(...repo.topics);
    }

    // Remove duplicates and return
    return [...new Set(technologies)];
  }

  // Main enrichment function
  static enrichRepository(repo: Repository): Repository {
    return {
      ...repo,
      category: this.categorizeRepository(repo),
      status: this.determineStatus(repo),
      features: this.generateFeatures(repo),
      highlights: this.generateHighlights(repo),
      year: this.extractYear(repo),
      technologies: this.generateTechnologies(repo)
    };
  }

  // Enrich multiple repositories
  static enrichRepositories(repos: Repository[]): Repository[] {
    return repos.map(repo => this.enrichRepository(repo));
  }
}

export default RepositoryEnrichmentService;