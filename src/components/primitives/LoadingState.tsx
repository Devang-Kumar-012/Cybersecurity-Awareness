export function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="loading-spinner" />
      <span>Preparing experience</span>
    </div>
  );
}
