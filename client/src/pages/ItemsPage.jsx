import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";
import { EmptyState, ErrorMessage, LoadingState } from "../components/PageState";
import { ITEM_CATEGORIES } from "../constants";
import { api } from "../services/api";

const itemsOf = (data) => Array.isArray(data) ? data : data?.items || data?.results || [];

export function ItemsPage({ type }) {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ search: "", category: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load(next = filters) {
    setLoading(true);
    setError("");
    try {
      setItems(itemsOf(await api.getItems({ type, search: next.search, category: next.category })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load({ search: "", category: "" });
  }, [type]);

  const change = (event) =>
    setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));

  return (
    <section className="section">
      <div className="container">
        <div className="section-heading-v2">
          <div>
            <span className="eyebrow">{type === "lost" ? "Find a listing" : "Help a student"}</span>
            <h1>{type === "lost" ? "Lost items" : "Found items"}</h1>
            <p className="section-copy">Search current {type} listings across your campus.</p>
          </div>
          <Link className="button button-small" to={type === "lost" ? "/report/lost" : "/report/found"}>
            Report {type}
          </Link>
        </div>

        <form className="filter-bar" onSubmit={(e) => { e.preventDefault(); load(); }}>
          <input aria-label="Search" name="search" value={filters.search} onChange={change} placeholder="Search title or description" />
          <select aria-label="Category" name="category" value={filters.category} onChange={change}>
            <option value="">All categories</option>
            {ITEM_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
          </select>
          <button className="button" type="submit">Search</button>
        </form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading ? (
          <LoadingState label="Loading items…" />
        ) : items.length ? (
          <div className="item-grid">{items.map((item) => <ItemCard key={item._id} item={item} />)}</div>
        ) : (
          <EmptyState title={`No ${type} items found`}>Try another search or create a new listing.</EmptyState>
        )}
      </div>
    </section>
  );
}
