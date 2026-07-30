// Verified-only knowledge base for the chatbot / RAG system.
// Grounded solely in profile data, custom projects, and observed GitHub
// activity. No invented metrics. Each entry carries a source label/URL.

export const knowledgeDocuments = [
  {
    id: 'profile-about',
    content:
      'Mikawi Sherif is a Computer Engineering graduate from the Arab Academy for Science, Technology, and Maritime Transport (AAST). He began in Mechatronics, then switched to Computer Engineering after discovering a passion for programming, full-stack engineering, and software development.',
    source: 'Verified profile (aboutMeContent)',
    url: '',
  },
  {
    id: 'profile-first-project',
    content:
      'His first coding project was a terminal-based arcade game in C, featuring simple AI logic including the Minimax algorithm and difficulty levels from random to strategic.',
    source: 'Verified profile (aboutMeContent)',
    url: '',
  },
  {
    id: 'profile-smart-home',
    content:
      'In 2021 he took a Full Stack Engineering course at IMT and built a smart home project integrated with Home Assistant (smart curtains and Wi-Fi controlled switches), and set up a personal home server for media, websites, and local AI applications.',
    source: 'Verified profile (aboutMeContent)',
    url: '',
  },
  {
    id: 'profile-workflow',
    content:
      'He adopts a "voice-coding" workflow with Large Language Models, using prompts to generate and modify code while focusing on architecture and logic.',
    source: 'Verified profile (aboutMeContent)',
    url: '',
  },
  {
    id: 'skills',
    content:
      'Skills: Languages & Frameworks: Python, Java, C, Dart (Flutter), JavaScript, Node.js, SQL. Tools & Technologies: Git, Docker, Home Assistant, VS Code, FastAPI, Django. AI & Machine Learning: TensorFlow, YOLO, Pose Estimation, OpenCV, Computer Vision. Databases: MySQL, PostgreSQL, Database Design. Specialized: Full Stack Engineering, CI/CD Pipelines, AR Development, IoT, Compiler Design.',
    source: 'Verified profile (skills)',
    url: '',
  },
  {
    id: 'experience-al-ahram',
    content:
      'Internship at Al-Ahram (2023): started in networking and server maintenance, transitioned to the developer team within a month. Built and refactored websites with Django and created Python scripts to automate database migrations. Gained exposure to .NET and FastAPI.',
    source: 'Verified profile (experiences)',
    url: '',
  },
  {
    id: 'experience-aoi',
    content:
      'Internship at the Arab Organization for Industrialization (AOI, 2022): two-week hardware training covering chip and motherboard manufacturing processes.',
    source: 'Verified profile (experiences)',
    url: '',
  },
  {
    id: 'project-flex',
    content:
      'Flex Programming Language (graduation project, 2024): a multi-syntax programming language supporting Pythonic, C-like, and Franco-Arabic syntaxes. Features AI-assisted error explanation, a VS Code extension, CI/CD pipelines, and a web-based compiler. Written in Python with a Unicode-aware compiler pipeline.',
    source: 'Verified custom project',
    url: 'https://github.com/Hassan220022/Flex',
  },
  {
    id: 'project-g2scv',
    content:
      'G2SCV - AI CV Generator (2024): generates ATS-friendly CVs from LinkedIn and GitHub data with AI summarization. Built with FastAPI and LinkedIn/GitHub APIs.',
    source: 'Verified custom project',
    url: '',
  },
  {
    id: 'project-optavista',
    content:
      'Optavista (2023): a Flutter e-commerce app for glasses with AR try-on capabilities using LiDAR sensors and a self-hosted Node.js backend.',
    source: 'Verified custom project',
    url: '',
  },
  {
    id: 'project-weapon-detection',
    content:
      'AI Weapon Detection System (2023): real-time surveillance using YOLO for weapon detection in security applications.',
    source: 'Verified custom project',
    url: '',
  },
  {
    id: 'project-pose-estimation',
    content:
      'Pose Estimation for Violence Detection (2023): research-oriented pose estimation using OpenCV and computer vision.',
    source: 'Verified custom project',
    url: '',
  },
  {
    id: 'project-smart-home',
    content:
      'Smart home projects (2021): motorized smart curtains (Arduino, Home Assistant), Wi-Fi smart switches (ESP32), and a personal home server (Linux, Docker) for media, websites, and local AI.',
    source: 'Verified custom project',
    url: '',
  },
  {
    id: 'project-terminal-arcade',
    content:
      'Terminal Arcade Game in C (2020): his first coding project, with Minimax-based AI and multiple difficulty levels.',
    source: 'Verified custom project',
    url: '',
  },
  {
    id: 'project-al-ahram-django',
    content:
      'Al-Ahram Website Development (2023): built and refactored websites using Django and created Python automation scripts for database migrations.',
    source: 'Verified custom project',
    url: '',
  },
  {
    id: 'activity-router-raycast',
    content: 'router-raycast: self-hosted 9Router/OmniRoute Raycast extension. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/router-raycast',
  },
  {
    id: 'activity-akwarr',
    content: 'akwarr: Radarr/Sonarr API shim for Jellyseerr Arabic Akwam downloads. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/akwarr',
  },
  {
    id: 'activity-pos-mock',
    content: 'pos-mock: Playwright binary-search tool for the max Aman POS transaction. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/pos-mock',
  },
  {
    id: 'activity-beast-remote-menu-bar',
    content: 'beast-remote-menu-bar: beast remote menu bar. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/beast-remote-menu-bar',
  },
  {
    id: 'activity-supabase_projects',
    content: 'supabase_projects: Supabase projects. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/supabase_projects',
  },
  {
    id: 'activity-claude-code',
    content: 'claude-code: Rust rewrite project. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/claude-code',
  },
  {
    id: 'activity-call_center',
    content: 'call_center: call center project. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/call_center',
  },
  {
    id: 'activity-mcloud',
    content: 'mcloud: mcloud project. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/mcloud',
  },
  {
    id: 'activity-axon',
    content: 'axon: graph-powered code intelligence engine exposed via MCP/CLI. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/axon',
  },
  {
    id: 'activity-flutter_ecommerce_app',
    content: 'flutter_ecommerce_app: Flutter e-commerce app. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/flutter_ecommerce_app',
  },
  {
    id: 'activity-acpc-grading',
    content: 'ACPC_grading_System_Server_simulation: ACPC grading system server simulation. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/ACPC_grading_System_Server_simulation',
  },
  {
    id: 'activity-flex_web',
    content: 'flex_web: web companion for the Flex programming language. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/flex_web',
  },
  {
    id: 'activity-vscode-flex-grade',
    content: 'vscode-flex-grade: VS Code extension for Flex grading. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/vscode-flex-grade',
  },
  {
    id: 'activity-genai-hackathon-cairo',
    content: 'genai-agent-hackathon-cairo-2025: GenAI agent hackathon (Cairo 2025) entry. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/genai-agent-hackathon-cairo-2025',
  },
  {
    id: 'activity-context-engineering-intro',
    content: 'context-engineering-intro: context engineering introduction. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/context-engineering-intro',
  },
  {
    id: 'activity-salam',
    content: 'Salam: Salam project. (GitHub activity)',
    source: 'GitHub activity',
    url: 'https://github.com/Hassan220022/Salam',
  },
];

export const greetingMessage =
  "Hi! Ask me about Mikawi Sherif’s projects, skills, education, experience, or recent GitHub work.";

export const refusalMessage =
  "I only know Mikawi Sherif's verified portfolio information — his projects, skills, education, experience, and recent GitHub activity. I can't help with that topic. Feel free to ask about Mikawi's work.";
