import "./Error404.scss";

export const Error404 = () => {
  return (
    <div className="error">
      <h1 className="error-title">Error 404 Not Found</h1>
      <h2 className="error-message">Page not found</h2>
      <p className="error-desc">
        The page you are looking for might have been removed, had its name
        changed or is temporarily unavailable.
      </p>
    </div>
  );
};
