import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/Head";

export default function Home() {
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
