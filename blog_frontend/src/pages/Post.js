import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../api/client';

function formatDate(iso) {
  try { return new Date(iso).toLocaleString(); } catch { return ''; }
}

/**
// PUBLIC_INTERFACE
 * Post displays a single blog post.
 */
function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [state, setState] = useState({loading: true, error: ''});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const p = await getPost(id);
        if (!mounted) return;
        setPost(p);
        setState({loading: false, error: ''});
      } catch (e) {
        if (!mounted) return;
        setState({loading: false, error: e.message || 'Failed to load post.'});
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (state.loading) return <div className="card"><div className="card-body">Loading…</div></div>;
  if (state.error) return <div className="card" style={{borderColor:'var(--color-error)'}}><div className="card-body" style={{color:'var(--color-error)'}}>{state.error}</div></div>;
  if (!post) return <div className="card"><div className="card-body">Not found.</div></div>;

  return (
    <article className="layout">
      <section className="card elevated">
        <div className="card-body">
          <h1 style={{marginTop: 0, color:'var(--color-primary)'}}>{post.title}</h1>
          <div className="meta">{[post.author, formatDate(post.publishedAt), post.category].filter(Boolean).join(' · ')}</div>
          <div style={{marginTop: 16, whiteSpace: 'pre-wrap', lineHeight: 1.6}}>
            {post.content}
          </div>
          <div style={{marginTop: 16}}>
            <Link to="/" className="btn">← Back</Link>
          </div>
        </div>
      </section>
      <aside className="list">
        <section className="card">
          <div className="card-body">
            <h3 style={{margin:0}}>About this post</h3>
            <p style={{marginTop:8, color:'var(--color-secondary)'}}>Minimalist by design. Focused content with clarity.</p>
          </div>
        </section>
      </aside>
    </article>
  );
}

export default Post;
