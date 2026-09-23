export default function EmptyState({ message = "Nothing found." }) {
  return (
    <div className="py-16 text-center text-gray-500">
      <p>{message}</p>
    </div>
  );
}
