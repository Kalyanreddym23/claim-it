import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";
import { EmptyState, ErrorMessage, LoadingState } from "../components/PageState";
import { api } from "../services/api";

const itemsOf = (data) => Array.isArray(data) ? data : data?.items || data?.results || [];

export function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api.getItems()
      .then((data) => active && setItems(itemsOf(data).slice(0, 6)))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return (
    <>
      <section className="hero hero-v2">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="container hero-layout">
          <div className="hero-copy-block">
            <div className="hero-badge"><span className="pulse-dot" /> Built for college communities</div>
            <span className="eyebrow">Find it. Claim it. Return it.</span>
            <h1>Lost belongings shouldn't stay lost.</h1>
            <p className="hero-lede">
              Claim-It brings your campus lost-and-found process into one simple place.
              Report items, discover listings, and manage claims with less friction.
            </p>
            <div className="hero-actions">
              <Link className="button button-large" to="/lost">Browse lost items <span>→</span></Link>
              <Link className="button button-secondary button-large" to="/report/lost">Report an item</Link>
            </div>
            <div className="hero-trust">
              <span>⚡ Fast discovery</span>
              <span>⌕ Searchable listings</span>
              <span>✓ Claim tracking</span>
            </div>
          </div>

          <div className="hero-panel">
            <div className="mini-window-top"><span /><span /><span /><small>claim-it / campus</small></div>
            <div className="hero-panel-body">
              <div className="hero-panel-title">
                <div><span className="eyebrow">Live board</span><h3>Recent activity</h3></div>
                <span className="live-pill"><i /> Live</span>
              </div>
              <div className="activity-stack">
                {(items.length ? items.slice(0, 3) : [
                  { _id: "one", title: "Report lost items", location: "Student services", type: "lost" },
                  { _id: "two", title: "Browse found items", location: "Across campus", type: "found" },
                  { _id: "three", title: "Track claim requests", location: "Your dashboard", type: "lost" }
                ]).map((item, i) => (
                  <div className="activity-row" key={item._id}>
                    <div className={`activity-icon ${i === 1 ? "success" : ""}`}>{i === 1 ? "✓" : "↗"}</div>
                    <div><strong>{item.title}</strong><span>{item.location || "Campus"}</span></div>
                    <em>{item.type || "item"}</em>
                  </div>
                ))}
              </div>
              <Link className="panel-link" to="/lost">Open listings <span>→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-grid">
          <div><strong>01</strong><span>Report lost or found items</span></div>
          <div><strong>02</strong><span>Search campus listings</span></div>
          <div><strong>03</strong><span>Submit claim requests</span></div>
          <div><strong>04</strong><span>Manage activity in one dashboard</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading-v2">
            <div><span className="eyebrow">Latest listings</span><h2>What's happening on campus</h2></div>
            <Link className="text-link" to="/lost">View all listings →</Link>
          </div>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {loading ? (
            <LoadingState label="Loading recent listings…" />
          ) : items.length ? (
            <div className="item-grid item-grid-v2">
              {items.map((item) => <ItemCard key={item._id} item={item} />)}
            </div>
          ) : (
            <EmptyState title="Your campus board is waiting">
              <Link className="text-link" to="/register">Create an account and post the first listing.</Link>
            </EmptyState>
          )}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container dark-grid">
          <div>
            <span className="eyebrow eyebrow-light">Simple workflow</span>
            <h2>A small product solving a real campus problem.</h2>
            <p>Claim-It connects the student who lost something, the student who found it, and the information needed to make a safe handoff.</p>
          </div>
          <div className="workflow-list">
            <div><span>01</span><strong>Report</strong><p>Add clear details about an item.</p></div>
            <div><span>02</span><strong>Discover</strong><p>Search listings and compare details.</p></div>
            <div><span>03</span><strong>Claim</strong><p>Send and manage a claim request.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
