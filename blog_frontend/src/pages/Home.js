import React, { useEffect, useMemo, useState } from 'react';
import { listPosts, listCategories } from '../api/client';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';

function deriveCategories(posts) {
  const set = new Set();
  posts.forEach(p => { if (p.category) set.add(p.category); });
  return Array.from(set).sort();
}

/**
// PUBLIC_INTERFACE
 * Home lists all posts with a sidebar and filter capabilities.
 */
function Home() {
  const [posts, setPosts] = useState([]);
  const [catFilter, setCatFilter] = useState(null);
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState({loading: true, error: ''});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [p, c] = await Promise.all([
          listPosts().catch(() => []),
          listCategories().catch(() => [])
        ]);
        if (!mounted) return;
        setPosts(Array.isArray(p) ? p : []);
        setCategories(c && c.length ? c : deriveCategories(p || []));
        setState({loading: false, error: ''});
      } catch (e) {
        if (!mounted) return;
        setState({loading: false, error: e.message || 'Failed to load posts.'});
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    if (!catFilter) return posts;
    return posts.filter(p => p.category === catFilter);
  }, [posts, catFilter]);

  return (
    <div className="layout">
      <section className="list" aria-live="polite">
        {state.loading && <div className="card"><div className="card-body">Loading…</div></div>}
        {state.error && <div className="card" style={{borderColor:'var(--color-error)'}}><div className="card-body" style={{color:'var(--color-error)'}}>{state.error}</div></div>}
        {!state.loading && !filtered.length && <div className="card"><div className="card-body">No posts yet.</div></div>}
        {filtered.map(p => <PostCard key={p.id} post={p} />)}
      </section>
      <Sidebar categories={categories} onFilter={setCatFilter} />
    </div>
  );
}

export default Home;
