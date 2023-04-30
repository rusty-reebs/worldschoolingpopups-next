export default function Badge({ number }) {
  return (
    <div className="bg-orange rounded-xl text-xs self-center ml-2 mb-2 px-2 py-1 shadow-lg">
      {number}
    </div>
  );
}
