import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

// TODO About component in react-modern-drawer?
// TODO pagination and remove filter context
// TODO ✅ check for correct totals on filters/table views
// TODO remove lastUpdated call from all pages, call once and pass
// TODO ✅ remove pagination when only one page
// TODO check console 404 error in local production for /archived and /unavailable
// TODO ✅ /events redirects to /current
// TODO ✅ completed events reverse order
// TODO ✅ try tailwind 'truncate' for text overflow
// TODO ✅ date sorting - soonest should be at top
// TODO update to react-icons
// TODO ✅ production / dev environments, including Cloudinary test
// TODO clean Cloudinary media library
// TODO ✅ update Full School Year to Follows School Year
// TODO ✅ fix Card bottom line on small screens
// TODO ✅ fix filter buttons spacing/alignment on small screens
// TODO ✅ tablet size styling
// TODO ✅ default sorting on index page
// TODO ✅ fix EventType save on new (not saving default?)
// TODO ✅ check mobile views
// TODO ✅ fade div on state change
// TODO ✅ admin auth
// TODO ✅ Global Map component with no lat/lon
// TODO retain last scroll position
// * green comments

export default function Events() {
  const router = useRouter();
  useEffect(() => {
    router.push("/current");
  }, [router]);
  return (
    <div>
      <Head>
        <title>worldschoolingpopups.com - Current and Upcoming Events</title>
        <meta
          name="description"
          content="Your go-to resource for worldschooling events, hubs, and popups!"
          key="desc"
        />
      </Head>
    </div>
  );
}
