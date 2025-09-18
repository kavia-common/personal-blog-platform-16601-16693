import React, { useEffect, useState } from 'react';
import { listPosts, createPost, deletePost, updatePost } from '../api/client';
import PostEditor from '../components/PostEditor';

/**
// PUBLIC_INTERFACE
 * Admin page for managing posts: add, edit, delete.
 * Note: No authentication layer here; integrate with your auth later if needed.
 */
function Admin() {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState({loading: true, error: ''});
  const [editingId, setEditingId] = useState(null);
  const [creating, setCreating] = useState(false);

  async function refresh() {
    setState(s => ({...s, loading: true, error: ''}));
    try {
      const p = await listPosts();
      setPosts(Array.isArray(p) ? p : []);
      setState({loading: false, error: ''});
    } catch (e) {
      setState({loading: false, error: e.message || 'Failed to load posts.'});
    }
  }

  useEffect(() => { refresh(); }, []);

  const selected = posts.find(p => p.id === editingId);

  const handleCreate = async (payload) => {
    await createPost(payload);
    setCreating(false);
    await refresh();
  };

  const handleUpdate = async (payload) => {
    if (!editingId) return;
    await updatePost(editingId, payload);
    setEditingId(null);
    await refresh();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await deletePost(id);
    await refresh();
  };

  return (
    <div className="layout">
      <section className="list">
        <div className="card elevated">
          <div className="card-body" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h2 style={{margin:0, color:'var(--color-primary)'}}>Manage Posts</h2>
            {!creating && !editingId && <button className="btn success" onClick={()=>setCreating(true)}>+ New Post</button>}
          </div>
        </div>

        {state.loading && <div className="card"><div className="card-body">Loading…</div></div>}
        {state.error && <div className="card" style={{borderColor:'var(--color-error)'}}><div className="card-body" style={{color:'var(--color-error)'}}>{state.error}</div></div>}

        {creating && (
          <div className="card">
            <div className="card-body">
              <h3 style={{marginTop:0}}>Create Post</h3>
              <PostEditor
                initial={null}
                onSubmit={handleCreate}
                onCancel={() => setCreating(false)}
              />
            </div>
          </div>
        )}

        {editingId && selected && (
          <div className="card">
            <div className="card-body">
              <h3 style={{marginTop:0}}>Edit Post</h3>
              <PostEditor
                initial={selected}
                onSubmit={handleUpdate}
                onCancel={() => setEditingId(null)}
              />
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-body">
            <div className="list">
              {(!posts || posts.length === 0) && <div className="meta">No posts yet.</div>}
              {posts.map((p) => (
                <div key={p.id} className="card">
                  <div className="card-body" style={{display:'flex', justifyContent:'space-between', gap:12}}>
                    <div>
                      <div style={{fontWeight:600}}>{p.title}</div>
                      <div className="meta">{p.category || '—'} · {p.author || 'Unknown'}</div>
                    </div>
                    <div style={{display:'flex', gap:8}}>
                      <button className="btn" onClick={()=>setEditingId(p.id)}>Edit</button>
                      <button className="btn error" onClick={()=>handleDelete(p.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      <aside className="list">
        <section className="card">
          <div className="card-body">
            <h3 style={{marginTop:0}}>API</h3>
            <p className="meta">This UI expects REST endpoints:</p>
            <pre className="code">
{`GET    /posts
GET    /posts/:id
POST   /posts
PUT    /posts/:id
DELETE /posts/:id
GET    /categories (optional)`}
            </pre>
            <p className="meta">Configure REACT_APP_API_BASE_URL in your .env.</p>
          </div>
        </section>
      </aside>
    </div>
  );
}

export default Admin;
