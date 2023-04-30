export default function EmbeddedMap({ lat, lon }) {
  const googleApi = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Maps Embed API - no charge, unlimited

  return (
    <iframe
      className="w-full h-full"
      style={{ border: 0 }}
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/view?key=${googleApi}&center=${lat},${lon}&zoom=13`}
    ></iframe>
  );
}
