export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="py-16 text-center">
      <p className="mb-3 text-red-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      )}
    </div>
  );
}
