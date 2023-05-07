export default function Badge({ number }) {
  return (
    <div className="bg-darkblue text-white bg-opacity-80 rounded-xl text-xs self-center ml-2 mb-2 px-2 py-1 shadow-lg">
      {number}
    </div>
  );
}
