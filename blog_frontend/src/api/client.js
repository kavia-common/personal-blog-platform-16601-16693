//
// Lightweight API client for blog posts management.
// All functions are PUBLIC_INTERFACE and documented for clarity.
//
// Environment:
// - REACT_APP_API_BASE_URL must be set by the orchestrator in .env
//

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

/**
 * Internal helper for fetch with JSON.
 */
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// PUBLIC_INTERFACE
export async function listPosts() {
  /** List posts with metadata (title, excerpt, date, category). */
  return request('/posts', { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function getPost(id) {
  /** Fetch a single post by id. */
  return request(`/posts/${encodeURIComponent(id)}`, { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function createPost(payload) {
  /** Create a new post.
   * payload: { title, content, author, category, publishedAt? }
   */
  return request('/posts', { method: 'POST', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function updatePost(id, payload) {
  /** Update a post by id.
   * payload: partial or full fields.
   */
  return request(`/posts/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function deletePost(id) {
  /** Delete a post by id. */
  return request(`/posts/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

// PUBLIC_INTERFACE
export async function listCategories() {
  /** Optional categories endpoint; if not available, derive from posts at caller. */
  try {
    return await request('/categories', { method: 'GET' });
  } catch {
    return [];
  }
}

export default {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  listCategories
};
