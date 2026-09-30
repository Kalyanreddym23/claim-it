export function LoadingState({ label = "Loading…" }) {
  return (
    <div className="page-state" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

export function ErrorMessage({ children }) {
  return (
    <div className="message message-error" role="alert">
      {children}
    </div>
  );
}

export function SuccessMessage({ children }) {
  return (
    <div className="message message-success" role="status">
      {children}
    </div>
  );
}

export function EmptyState({ title, children }) {
  return (
    <section className="empty-state">
      <span className="empty-icon" aria-hidden="true">
        ◌
      </span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </section>
  );
}
