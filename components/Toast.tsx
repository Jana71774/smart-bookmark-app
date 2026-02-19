export default function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-5 right-5 bg-black text-white px-6 py-3 rounded-lg shadow-lg">
      {message}
    </div>
  );
}
