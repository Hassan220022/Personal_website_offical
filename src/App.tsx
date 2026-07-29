import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';
import JourneyPage from './pages/JourneyPage';

const queryClient = new QueryClient();

function NotFound() {
  return <section className="mx-auto max-w-2xl px-4 py-20 text-center" aria-labelledby="not-found-title"><h1 id="not-found-title" className="text-4xl font-bold">Page not found</h1><p className="mt-4 text-muted-foreground">The page you requested does not exist.</p><a className="mt-8 inline-block rounded-md bg-primary px-4 py-2 text-primary-foreground" href="/">Return home</a></section>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="journey" element={<JourneyPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;