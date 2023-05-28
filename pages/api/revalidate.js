//* pagination notes
//* use vercel examples pagination-with-ssg
//* needs to call await res.revalidate on /events, /events/2, /events/3 etc
//? use Supabase edge function to get total records and pages, then call revalidate for each path
//* count records and divide by per-page to get pages
//* revalidate each page

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
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
