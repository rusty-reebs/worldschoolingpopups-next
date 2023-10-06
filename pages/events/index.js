import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

// TODO cannot unclick Multiple Locations (beside city)
// TODO About component in react-modern-drawer?
// TODO pagination and remove filter context
// TODO remove lastUpdated call from all pages, call once and pass
// TODO check console 404 error in local production for /archived and /unavailable
// TODO update to react-icons
// TODO clean Cloudinary media library
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
