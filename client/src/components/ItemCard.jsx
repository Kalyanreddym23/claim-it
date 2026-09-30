import { Link } from "react-router-dom";

import { formatDate, ITEM_STATUSES } from "../constants";

export function StatusBadge({ status = "active" }) {
  return <span className={"status status-" + status}>{ITEM_STATUSES[status] || status}</span>;
}

export function ItemCard({ item }) {
  const ownerName = item.owner?.name || "Campus community member";

  return (
    <article className="item-card">
      <div className="item-card-image">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} />
        ) : (
          <span aria-hidden="true">{item.type === "lost" ? "?" : "✓"}</span>
        )}
      </div>
      <div className="item-card-body">
        <div className="item-card-meta">
          <span className={"type-label type-" + item.type}>{item.type}</span>
          <StatusBadge status={item.status} />
        </div>
        <h3>
          <Link to={"/items/" + item._id}>{item.title}</Link>
        </h3>
        <p className="item-card-description">{item.description}</p>
        <dl className="item-details-list">
          <div>
            <dt>Location</dt>
            <dd>{item.location}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{formatDate(item.date)}</dd>
          </div>
        </dl>
        <div className="item-card-footer">
          <span>Posted by {ownerName}</span>
          <Link className="text-link" to={"/items/" + item._id}>
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
