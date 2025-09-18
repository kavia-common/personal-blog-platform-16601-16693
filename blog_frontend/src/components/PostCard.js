import React from 'react';
import { Link } from 'react-router-dom';

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return '';
  }
}

/**
/ PUBLIC_INTERFACE
 * PostCard shows a brief overview of a post
 * Props: { post: { id, title, excerpt?, content?, author?, category?, publishedAt? } }
 */
function PostCard({ post }) {
  const excerpt = post.excerpt || (post.content ? String(post.content).slice(0, 160) + '…' : '');
  return (
    <article className="card">
      <div className="card-body">
        <h2 style={{marginTop: 0}}><Link to={`/post/${post.id}`} style={{color: 'var(--color-primary)'}}>{post.title}</Link></h2>
        <div className="meta">{[post.author, formatDate(post.publishedAt), post.category].filter(Boolean).join(' · ')}</div>
        {excerpt && <p style={{marginTop: 10, color: 'var(--color-text)'}}>{excerpt}</p>}
        <div style={{marginTop: 12}}>
          <Link to={`/post/${post.id}`} className="btn">Read</Link>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
