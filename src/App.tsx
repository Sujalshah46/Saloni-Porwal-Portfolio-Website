import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ScrollToTop } from './components/ScrollToTop';
import { PasswordProtection } from './components/PasswordProtection';

export default function App() {
  return (
    <PasswordProtection>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="portfolio/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PasswordProtection>
  );
}

