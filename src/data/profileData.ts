export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'education' | 'leadership' | 'professional' | 'innovation' | 'project';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  duration?: string;
  year: string;
  highlights?: string[];
}

export interface Skill {
  category: string;
  items: string[];
  icon: string;
}

// Timeline Events
export const timelineEvents: TimelineEvent[] = [
  {
    year: '2024',
    title: 'AI Enthusiast & Innovator',
    description: 'Leading initiatives in ASI Club and developing a new programming language tailored for children. Graduated from AAST with Computer Engineering degree.',
    category: 'innovation'
  },
  {
    year: '2023',
    title: 'Advanced AI & Computer Vision Projects',
    description: 'Developed AI-based weapon detection system using YOLO and implemented pose estimation for violence detection research.',
    category: 'project'
  },
  {
    year: '2022',
    title: 'Inceptum Club Leader',
    description: 'Head of SNCS in the Inceptum Club, bridging the gap between students and the technical world.',
    category: 'leadership'
  },
  {
    year: '2021',
    title: 'Bioinformatics Engineering Student',
    description: 'Exploring bioinformatics and excelling in computer science studies at AASTMT. Enrolled in Embedded Systems course at IMT, developing smart home projects.',
    category: 'education'
  },
  {
    year: '2020',
    title: 'Computer Engineering Journey Begins',
    description: 'Started at AAST in Mechatronics, then switched to Computer Engineering after discovering passion for programming and software development. Built first coding project - a terminal-based arcade game in C.',
    category: 'education'
  }
];

// Professional Experience
export const experiences: Experience[] = [
  {
    id: 'al-ahram-internship',
    company: 'Al-Ahram',
    role: 'Developer Intern',
    description: 'Started in networking and server maintenance, then transitioned to the developer team after one month. Worked with Django to build and refactor websites, created Python scripts to automate database migrations, and gained exposure to .NET and FastAPI.',
    year: '2023',
    highlights: [
      'Transitioned from networking to development team within one month',
      'Built and refactored websites using Django',
      'Created Python automation scripts for database migrations',
      'Saved significant development time through automation',
      'Gained exposure to .NET and FastAPI frameworks'
    ]
  },
  {
    id: 'aoi-internship',
    company: 'Arab Organization for Industrialization (AOI)',
    role: 'Hardware Training Intern',
    description: 'Learned about chip and motherboard manufacturing processes. Gained hands-on knowledge of hardware production in a comprehensive two-week training program.',
    year: '2022',
    highlights: [
      'Hands-on chip manufacturing experience',
      'Motherboard production process knowledge',
      'Hardware production lifecycle understanding'
    ]
  }
];

// Skills
export const skills: Skill[] = [
  {
    category: 'Languages & Frameworks',
    items: ['Python', 'Java', 'C', 'Dart (Flutter)', 'JavaScript', 'Node.js', 'SQL'],
    icon: '💻'
  },
  {
    category: 'Tools & Technologies',
    items: ['Git', 'Docker', 'Home Assistant', 'VS Code', 'FastAPI', 'Django'],
    icon: '🛠️'
  },
  {
    category: 'AI & Machine Learning',
    items: ['TensorFlow', 'YOLO', 'Pose Estimation', 'OpenCV', 'Computer Vision'],
    icon: '🤖'
  },
  {
    category: 'Databases',
    items: ['MySQL', 'PostgreSQL', 'Database Design'],
    icon: '🗄️'
  },
  {
    category: 'Specialized Skills',
    items: ['Full Stack Engineering', 'CI/CD Pipelines', 'AR Development', 'IoT', 'Compiler Design'],
    icon: '⚡'
  }
];

// About Me Content
export const aboutMeContent = {
  introduction: `I am a recent graduate from the Arab Academy for Science, Technology, and Maritime Transport (AAST) with a degree in Computer Engineering. I originally began my studies in Mechatronics, but later switched to Computer Engineering after discovering my passion for programming, full stack engineering, and software development.`,

  firstProject: `My first coding project was a terminal-based arcade game written in C. It featured simple AI logic, including the Minimax algorithm for decision-making, as well as difficulty levels ranging from random to strategic. This project was my first real dive into programming, and it set the foundation for my journey in computer engineering.`,

  academicExploration: `During my academic years, I explored a range of technical domains including Networks, Full Stack Engineering, and Microprocessors. In 2021, I enrolled in a Full Stack Engineering course at IMT where I developed a smart home project. The system integrated with Home Assistant, allowing control over devices such as smart curtains and switches. I even set up my own home server for media storage, personal websites, and local AI applications.`,

  developmentApproach: `With the rise of Large Language Models (LLMs), I adopted a "voice-coding" workflow. Instead of typing everything by hand, I use prompts to instruct AI tools to generate and modify code, speeding up my development process while focusing on architecture and logic.`
};

// Goals and Aspirations
export const goals = [
  {
    title: 'Professional Goals',
    description: 'To advance AI technologies, develop innovative programming languages like Flex, and create impactful solutions in computer vision and smart home automation.',
    category: 'professional'
  },
  {
    title: 'Personal Mission',
    description: 'Empowering others through technology, knowledge sharing, and bridging the gap between students and the technical world through leadership and mentoring.',
    category: 'personal'
  }
];