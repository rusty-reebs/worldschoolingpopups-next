import { PER_PAGE } from "./[page]";
import PaginationPage from "../../components/PaginationPage";
import { supabaseClient } from "../../lib/supabaseClient";
import { transformImages } from "../../_helpers/cloudinary";
import Head from "next/head";

const tableName = process.env.NEXT_PUBLIC_TABLE_NAME;

export const getStaticProps = async () => {
  try {
    const { data: lastUpdated } = await supabaseClient
      .from(tableName)
      .select("updated")
      .order("updated", { ascending: false, nullsFirst: false })
      .limit(1)
      .single();

    const { data, count } = await supabaseClient
      .from(tableName)
      .select("*", { count: "exact" })
      .eq("isUnavailable", true)
      .limit(PER_PAGE);

    const result = data.map((event) => {
      const transformedImage = transformImages([event.images[0]]);
      const newUrl = transformedImage.toURL();
      const { images, ...rest } = event;
      return { ...rest, imageUrl: newUrl };
    });

    return {
      props: {
        events: result,
        lastUpdated: lastUpdated.updated,
        total: count,
        currentPage: 1,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

export default function Unavailable({
  events,
  lastUpdated,
  total,
  currentPage,
}) {
  return (
    <div>
      <Head>
        <title>worldschoolingpopups.com - Unavailable Events</title>
        <meta
          name="description"
          content="Your go-to resource for worldschooling events, hubs, and popups!"
          key="desc"
        />
      </Head>
      <PaginationPage
        filter={"unavailable"}
        events={events}
        lastUpdated={lastUpdated}
        currentPage={currentPage}
        total={total}
        perPage={PER_PAGE}
      />
    </div>
  );
}
