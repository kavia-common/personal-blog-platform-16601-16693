import React, { useState, useEffect } from 'react';

/**
// PUBLIC_INTERFACE
 * PostEditor provides a simple form for creating or editing a post.
 * Props:
 * - initial: initial post object for editing
 * - onSubmit: function(payload) -> Promise/void
 * - onCancel: function() -> void
 */
function PostEditor({ initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [content, setContent] = useState(initial?.content || '');
  const [author, setAuthor] = useState(initial?.author || '');
  const [category, setCategory] = useState(initial?.category || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(initial?.title || '');
    setContent(initial?.content || '');
    setAuthor(initial?.author || '');
    setCategory(initial?.category || '');
  }, [initial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !content.trim()) {
      setError('Please provide both title and content.');
      return;
    }
    const payload = {
      title: title.trim(),
      content: content.trim(),
      author: author.trim() || undefined,
      category: category.trim() || undefined
    };
    await onSubmit?.(payload);
  };

  return (
    <form className="list" onSubmit={handleSubmit}>
      {error && <div className="card" style={{borderColor: 'var(--color-error)'}}><div className="card-body" style={{color: 'var(--color-error)'}}>{error}</div></div>}

      <div className="list">
        <label className="meta">Title</label>
        <input className="input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Post title" />
      </div>

      <div className="list">
        <label className="meta">Content</label>
        <textarea className="textarea" rows="10" value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Write your post..." />
      </div>

      <div className="list" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
        <div>
          <label className="meta">Author</label>
          <input className="input" value={author} onChange={(e)=>setAuthor(e.target.value)} placeholder="Author (optional)" />
        </div>
        <div>
          <label className="meta">Category</label>
          <input className="input" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Category (optional)" />
        </div>
      </div>

      <div style={{display:'flex', gap:8}}>
        <button type="submit" className="btn primary">{initial ? 'Save Changes' : 'Create Post'}</button>
        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default PostEditor;
