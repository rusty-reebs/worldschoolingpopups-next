import { PER_PAGE } from "./[page]";
import PaginationPage from "../../components/PaginationPage";
import { supabaseClient } from "../../lib/supabaseClient";
import { transformImages } from "../../_helpers/cloudinary";

const tableViewName = "completed";
const tableName = "production";

export const getStaticProps = async () => {
  try {
    const { data: lastUpdated } = await supabaseClient
      .from(tableName)
      .select("updated")
      .order("updated", { ascending: false, nullsFirst: false })
      .limit(1)
      .single();

    const { data, count } = await supabaseClient
      .from(tableViewName)
      .select("*", { count: "exact" })
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

export default function Completed({ events, lastUpdated, total, currentPage }) {
  return (
    <PaginationPage
      filter={"completed"}
      events={events}
      lastUpdated={lastUpdated}
      currentPage={currentPage}
      total={total}
      perPage={PER_PAGE}
    />
  );
}
