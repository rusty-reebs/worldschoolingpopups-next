import Nav from "@/components/components/Nav";

export default function About() {
  return (
    <div className="bg-yellow h-screen w-full text-black">
      <Nav />
      <div>
        <h3 className="text-lg text-center mb-6 lg:mb-12 lg:text-2xl">About</h3>
        <div className="ml-7 mr-5 lg:container lg:mx-auto">
          <ul className="list-disc list-outside text-sm lg:text-lg">
            <li className="mb-6">
              This site is a free listing for all worldschooling popups and
              events. It is meant to be a directory and a resource. If you need
              information about an event, please contact the event host via the
              provided email, Facebook page, or website.
            </li>
            <li className="italic mb-6">
              We are not affiliated with any of the events listed.
            </li>
            {/* <li className="mb-3">It receives over 100 visitors per week.</li> */}
            <li>
              For questions or suggestions, please email us at
              <a
                href="mailto:worldschoolingpopups@gmail.com"
                className="underline decoration-orange decoration-2"
              >
                &nbsp;worldschoolingpopups@gmail.com
              </a>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
