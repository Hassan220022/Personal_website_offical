export interface CustomProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  category: 'mobile' | 'academic' | 'graduation' | 'ai' | 'smart-home' | 'web' | 'professional';
  status: 'completed' | 'in-progress' | 'archived';
  features?: string[];
  links?: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
  year: number;
  highlights?: string[];
  duration?: string;
  impact?: string[];
}

export const customProjects: CustomProject[] = [
  // Mobile Apps
  {
    id: 'quran-gen-z',
    name: 'Quran App for Gen Z',
    description: 'A modern and easy-to-use interface for reading and exploring the Quran, designed specifically for the younger generation.',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    category: 'mobile',
    status: 'completed',
    year: 2023,
    features: [
      'Modern UI/UX design',
      'Easy navigation',
      'Search functionality',
      'Bookmarking system'
    ]
  },
  {
    id: 'arcade-game-app',
    name: 'Arcade Game App',
    description: 'A mobile game with simple controls and fun gameplay mechanics, bringing classic arcade experience to mobile devices.',
    technologies: ['Flutter', 'Dart', 'Game Engine'],
    category: 'mobile',
    status: 'completed',
    year: 2023,
    features: [
      'Simple controls',
      'Fun gameplay mechanics',
      'Score tracking',
      'Multiple levels'
    ]
  },
  {
    id: 'optavista',
    name: 'Optavista',
    description: 'An e-commerce app for glasses with AR try-on capabilities using LiDAR sensors for virtual fitting.',
    technologies: ['Flutter', 'Node.js', 'AR', 'LiDAR'],
    category: 'mobile',
    status: 'completed',
    year: 2023,
    features: [
      'Virtual try-on using LiDAR sensors',
      'Product catalog',
      'Shopping cart',
      'Secure checkout',
      'AR integration'
    ],
    highlights: [
      'Self-hosted Node.js backend',
      'Advanced AR technology integration',
      'Complete e-commerce solution'
    ]
  },

  // Academic Projects
  {
    id: 'hypermarket-management',
    name: 'Hypermarket Management System',
    description: 'A comprehensive management system implementing core Object-Oriented Programming concepts for hypermarket operations.',
    technologies: ['Java', 'OOP', 'Database'],
    category: 'academic',
    status: 'completed',
    year: 2022,
    features: [
      'Inventory management',
      'Customer management',
      'Sales tracking',
      'Report generation'
    ],
    highlights: [
      'Implemented core OOP concepts',
      'Clean architecture design',
      'Comprehensive business logic'
    ]
  },
  {
    id: 'library-app',
    name: 'Library Management App',
    description: 'A database-driven application for managing books, members, and library operations with SQL database integration.',
    technologies: ['SQL', 'Database Design', 'Backend'],
    category: 'academic',
    status: 'completed',
    year: 2022,
    features: [
      'Book catalog management',
      'Member registration',
      'Borrowing system',
      'Due date tracking'
    ]
  },
  {
    id: 'dice-app',
    name: 'Digital Dice App',
    description: 'A fun Flutter application for rolling dice digitally with various dice types and animations.',
    technologies: ['Flutter', 'Dart', 'Animations'],
    category: 'academic',
    status: 'completed',
    year: 2021,
    features: [
      'Multiple dice types',
      'Smooth animations',
      'Random number generation',
      'Simple and intuitive UI'
    ]
  },
  {
    id: 'self-driving-car',
    name: 'Self-Driving Car Project',
    description: 'An Arduino-based autonomous vehicle using sensors for automatic navigation and obstacle avoidance.',
    technologies: ['Arduino', 'C', 'Sensors', 'Embedded Systems'],
    category: 'academic',
    status: 'completed',
    year: 2021,
    features: [
      'Automatic navigation',
      'Obstacle detection',
      'Sensor integration',
      'Real-time decision making'
    ],
    highlights: [
      'Embedded systems programming',
      'Hardware-software integration',
      'Real-time processing'
    ]
  },
  {
    id: 'web-scraping-python',
    name: 'Web Scraping with Python',
    description: 'Automated data collection tools built with Python for research and project needs.',
    technologies: ['Python', 'BeautifulSoup', 'Requests', 'Data Processing'],
    category: 'academic',
    status: 'completed',
    year: 2022,
    features: [
      'Automated data extraction',
      'Multiple website support',
      'Data cleaning and processing',
      'Export to various formats'
    ]
  },

  // Graduation Project
  {
    id: 'flex-language',
    name: 'Flex Programming Language',
    description: 'A multi-syntax programming language supporting Pythonic, C-like, and Franco-Arabic syntaxes to help learners code in their preferred style.',
    technologies: ['Python', 'Compiler Design', 'VS Code Extension', 'CI/CD'],
    category: 'graduation',
    status: 'completed',
    year: 2024,
    features: [
      'Multi-syntax support (Pythonic, C-like, Franco-Arabic)',
      'AI-assisted error explanation via OpenRouter',
      'VS Code Extension with syntax highlighting',
      'Function definitions and error explanations',
      'Web-based compiler',
      'CI/CD pipelines for automatic deployment'
    ],
    highlights: [
      'Unicode-aware compiler pipeline',
      'Translates to optimized Python bytecode',
      'AI integration for learning assistance',
      'Complete development ecosystem'
    ],
    links: {
      documentation: '#'
    }
  },

  // AI & Computer Vision
  {
    id: 'weapon-detection-ai',
    name: 'AI Weapon Detection System',
    description: 'Real-time surveillance system using YOLO for weapon detection in security applications.',
    technologies: ['Python', 'YOLO', 'Computer Vision', 'AI/ML'],
    category: 'ai',
    status: 'completed',
    year: 2023,
    features: [
      'Real-time weapon detection',
      'YOLO model integration',
      'Surveillance system',
      'Alert mechanisms'
    ],
    highlights: [
      'Advanced computer vision',
      'Real-time processing',
      'Security applications'
    ]
  },
  {
    id: 'pose-estimation',
    name: 'Pose Estimation for Violence Detection',
    description: 'Advanced pose estimation system for future violence detection research using computer vision techniques.',
    technologies: ['Python', 'OpenCV', 'Pose Estimation', 'AI/ML'],
    category: 'ai',
    status: 'completed',
    year: 2023,
    features: [
      'Human pose detection',
      'Violence pattern recognition',
      'Research-oriented implementation',
      'Computer vision algorithms'
    ]
  },
  {
    id: 'g2scv',
    name: 'G2SCV - AI CV Generator',
    description: 'An AI-powered service that generates ATS-friendly CVs from LinkedIn and GitHub data with intelligent summarization.',
    technologies: ['FastAPI', 'AI/ML', 'LinkedIn API', 'GitHub API'],
    category: 'ai',
    status: 'completed',
    year: 2024,
    features: [
      'LinkedIn and GitHub data integration',
      'AI summarization of skills and experiences',
      'ATS-friendly CV generation',
      'Automated content optimization'
    ],
    highlights: [
      'FastAPI backend',
      'AI-powered content generation',
      'Professional CV optimization'
    ]
  },

  // Smart Home
  {
    id: 'smart-curtains',
    name: 'Motorized Smart Curtains',
    description: 'Custom-built motorized curtain system integrated with Home Assistant for automated home control.',
    technologies: ['Arduino', 'Home Assistant', 'IoT', 'Motors'],
    category: 'smart-home',
    status: 'completed',
    year: 2021,
    features: [
      'Motorized curtain control',
      'Home Assistant integration',
      'Automated scheduling',
      'Remote control capability'
    ]
  },
  {
    id: 'smart-switches',
    name: 'Wi-Fi Smart Switches',
    description: 'Custom Wi-Fi controlled smart switches for home automation, fully integrated with Home Assistant ecosystem.',
    technologies: ['ESP32', 'Wi-Fi', 'Home Assistant', 'IoT'],
    category: 'smart-home',
    status: 'completed',
    year: 2021,
    features: [
      'Wi-Fi connectivity',
      'Remote switch control',
      'Home Assistant integration',
      'Energy monitoring'
    ]
  },
  {
    id: 'home-server',
    name: 'Personal Home Server',
    description: 'Self-hosted home server for media storage, personal websites, and local AI applications.',
    technologies: ['Linux', 'Docker', 'Self-hosting', 'Media Server'],
    category: 'smart-home',
    status: 'completed',
    year: 2021,
    features: [
      'Media storage and streaming',
      'Personal website hosting',
      'Local AI applications',
      'Network attached storage'
    ],
    highlights: [
      'Complete self-hosted solution',
      'Multiple service integration',
      'Home automation hub'
    ]
  },

  // First Programming Project - The Foundation
  {
    id: 'terminal-arcade-game',
    name: 'Terminal Arcade Game (C)',
    description: 'My very first coding project - a terminal-based arcade game written in C featuring AI logic with Minimax algorithm and multiple difficulty levels.',
    technologies: ['C', 'Minimax Algorithm', 'Terminal', 'AI'],
    category: 'academic',
    status: 'completed',
    year: 2020,
    features: [
      'Simple AI logic implementation',
      'Minimax algorithm for decision-making',
      'Multiple difficulty levels (random to strategic)',
      'Terminal-based interface',
      'Score tracking system'
    ],
    highlights: [
      'First real dive into programming',
      'Foundation for computer engineering journey',
      'AI algorithm implementation',
      'Strategic gameplay mechanics'
    ]
  },

  // Professional Projects
  {
    id: 'al-ahram-django-projects',
    name: 'Al-Ahram Website Development',
    description: 'Built and refactored websites using Django during internship at Al-Ahram. Created Python automation scripts for database migrations.',
    technologies: ['Django', 'Python', 'Database Migration', '.NET', 'FastAPI'],
    category: 'professional',
    status: 'completed',
    year: 2023,
    features: [
      'Website development and refactoring',
      'Database migration automation',
      'Python script development',
      'Team collaboration'
    ],
    highlights: [
      'Transitioned from networking to development team',
      'Saved significant development time through automation',
      'Gained exposure to multiple frameworks'
    ],
    impact: [
      'Reduced database migration time by 70%',
      'Improved website performance and maintainability'
    ]
  },

  // Enhanced Smart Home Projects
  {
    id: 'imt-smart-home-project',
    name: 'IMT Smart Home Integration',
    description: 'Comprehensive smart home project developed during Embedded Systems course at IMT, featuring Home Assistant integration.',
    technologies: ['Home Assistant', 'Arduino', 'IoT', 'Embedded Systems'],
    category: 'smart-home',
    status: 'completed',
    year: 2021,
    features: [
      'Home Assistant integration',
      'Device control automation',
      'Smart curtains and switches',
      'Centralized home management'
    ],
    highlights: [
      'Complete smart home ecosystem',
      'Professional course project',
      'Real-world implementation'
    ]
  }
];

export const getProjectsByCategory = (category: CustomProject['category']) => {
  return customProjects.filter(project => project.category === category);
};

export const getProjectsByYear = (year: number) => {
  return customProjects.filter(project => project.year === year);
};

export const getFeaturedProjects = () => {
  return customProjects.filter(project =>
    project.highlights && project.highlights.length > 0
  );
};