import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Sidebar displaying About info and Categories.
 * Props:
 * - categories: string[] list of categories
 * - onFilter: function(category: string | null) -> void
 */
function Sidebar({ categories = [], onFilter }) {
  return (
    <aside className="list">
      <section className="card sidebar-section">
        <div className="card-body">
          <h3 style={{margin: 0, color: 'var(--color-primary)'}}>About</h3>
          <p style={{marginTop: 8, color: 'var(--color-secondary)'}}>
            A minimalist blog focused on clarity and craftsmanship. No clutter—just content.
          </p>
        </div>
      </section>

      <section className="card sidebar-section">
        <div className="card-body">
          <h3 style={{margin: 0, color: 'var(--color-primary)'}}>Categories</h3>
          <div className="list" style={{marginTop: 12}}>
            <button className="btn" onClick={() => onFilter(null)}>All</button>
            {categories.map((c) => (
              <button key={c} className="btn" onClick={() => onFilter(c)}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="card sidebar-section">
        <div className="card-body">
          <h3 style={{margin: 0, color: 'var(--color-primary)'}}>Admin</h3>
          <div className="list" style={{marginTop: 12}}>
            <Link to="/admin" className="btn">Open Admin</Link>
          </div>
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
