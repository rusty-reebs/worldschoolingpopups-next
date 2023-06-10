import { PER_PAGE } from "./[page]";
import PaginationPage from "../../components/PaginationPage";
import { supabaseClient } from "../../lib/supabaseClient";
import { transformImages } from "../../_helpers/cloudinary";

const tableName = "current";

export const getStaticProps = async () => {
  try {
    const { data, count } = await supabaseClient
      .from(tableName)
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
        total: count,
        currentPage: 1,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

export default function Current({ events, total, currentPage }) {
  return (
    <PaginationPage
      events={events}
      currentPage={currentPage}
      total={total}
      perPage={PER_PAGE}
    />
  );
}
