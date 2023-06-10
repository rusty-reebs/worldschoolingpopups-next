import PaginationPage from "../../components/PaginationPage";
import { supabaseClient } from "../../lib/supabaseClient";
import { transformImages } from "../../_helpers/cloudinary";

const tableName = "current";

export const PER_PAGE = 12;

export const getStaticPaths = async () => {
  return {
    // prerender the next 5 pages after the first, which is handled by the index page
    paths: Array.from({ length: 3 }).map((_, i) => `/current/${i + 2}`),
    // block request for non-generated pages and cache them in the background
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const page = Number(params?.page) || 1;
  try {
    const { data, count } = await supabaseClient
      .from(tableName)
      .select("*", { count: "exact" })
      .range((page - 1) * PER_PAGE, page * PER_PAGE - 1);

    if (!data.length) {
      return {
        notFound: true,
      };
    }

    // redirect the first page to /current to avoid duplicated content
    if (page === 1) {
      return {
        redirect: {
          destination: "/current",
          permanent: false,
        },
      };
    }
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
        currentPage: page,
      },
      revalidate: 60 * 60 * 24, // ISR cache: once a day
    };
  } catch (err) {
    console.log(err);
  }
};

export default function PaginatedPage({ events, currentPage, total }) {
  return (
    <PaginationPage
      events={events}
      currentPage={currentPage}
      total={total}
      perPage={PER_PAGE}
    />
  );
}
