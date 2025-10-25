
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HotelDetailPage } from './pages/HotelDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ReportPage } from './pages/ReportPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostDetailPage } from './pages/BlogPostDetailPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotel/:id" element={<HotelDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
