# Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features dynamic GitHub repository integration, dark mode support, and a clean, minimalist design.

## 🌟 Features

### Core Features
- **Dynamic GitHub Integration**: Fetches and displays all repositories with pagination
- **Responsive Design**: Mobile-first approach with elegant transitions
- **Dark/Light Mode**: System-aware theme with manual toggle
- **Search & Filter**: Real-time filtering by name, description, or technology
- **Modern UI**: Clean design with smooth animations using Framer Motion

### Page Structure
- **Home**: Personal introduction and journey timeline
- **Projects**: GitHub repositories with advanced filtering
- **Resume**: Interactive PDF viewer with download option

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom theming
- **State Management**: React Query for API caching
- **Routing**: React Router v6
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## 📁 Project Structure

```
src/
├── components/
│   ├── home/
│   │   ├── Hero.tsx
│   │   └── JourneySection.tsx
│   ├── resume/
│   │   ├── PDFViewer.tsx
│   │   └── ProfileHeader.tsx
│   ├── Layout.tsx
│   ├── ProjectCard.tsx
│   └── ThemeToggle.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ProjectsPage.tsx
│   └── ResumePage.tsx
├── services/
│   └── github.ts
├── styles/
│   └── theme.css
├── types/
│   └── github.ts
└── App.tsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- GitHub personal access token (for API)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hassan220022/Personal_website_offical.git
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create `.env` file:
```env
VITE_GITHUB_TOKEN=your_github_token_here
```

4. Start development server:
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173`

## 💻 Development

### Key Components

#### Layout (`src/components/Layout.tsx`)
- Main layout wrapper with responsive navigation
- Handles mobile menu and theme toggle
- Implements smooth transitions

#### ProjectsPage (`src/pages/ProjectsPage.tsx`)
- Manages GitHub repository fetching and caching
- Implements search and filter functionality
- Handles loading states and pagination

#### GitHub Service (`src/services/github.ts`)
- Handles all GitHub API interactions
- Implements pagination for repository fetching
- Manages API rate limiting and error handling

### API Integration

The project uses GitHub's REST API v3 for fetching repositories:

```typescript
const getAllRepositories = async (): Promise<Repository[]> => {
  let page = 1;
  let hasMore = true;
  const allRepos: Repository[] = [];

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
    hasMore = headers.link?.includes('rel="next"') ?? false;
    page++;
  }
  return allRepos;
};
```

## 🎨 Theming

Uses CSS variables for dynamic theming:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  /* ... other theme variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark theme variables */
}
```

## 📱 Responsive Design

- Mobile-first approach using Tailwind breakpoints
- Collapsible navigation for mobile devices
- Fluid typography and spacing
- Optimized layout for all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

- [LICENSE.md](LICENSE.md)

## 🔗 Links



## ✨ Acknowledgments

- Built with [Vite](https://vitejs.dev)
- Icons by [Lucide](https://lucide.dev)
- Animations by [Framer Motion](https://www.framer.com/motion)
