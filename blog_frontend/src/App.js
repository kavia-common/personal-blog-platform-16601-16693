import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Post from './pages/Post';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

// PUBLIC_INTERFACE
function App() {
  /** Root application implementing minimalist Ocean Professional theme with:
   *  - Sticky header with navigation
   *  - Main layout: posts area + sidebar
   *  - Footer
   *  - Routes: Home (list), Post (read), Admin (CRUD)
   */
  return (
    <BrowserRouter>
      <header className="header">
        <div className="header-inner">
          <div className="brand" aria-label="Site brand">
            <div className="brand-mark" />
            <span>Ocean Blog</span>
          </div>
          <nav className="nav" aria-label="Primary Navigation">
            <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/admin" className={({isActive}) => isActive ? 'active' : ''}>Admin</NavLink>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container" style={{padding: 0}}>
          <div className="meta">© {new Date().getFullYear()} Ocean Blog · Minimalist & Focused</div>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
