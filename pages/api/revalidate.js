export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    // Regenerate index route with new data from Supabase
    await res.revalidate("/events");
    return res.json({ revalidated: true });
  } catch (err) {
    // if error, will continue to show last successful page
    return res.status(500).send("Error revalidating");
  }
}
