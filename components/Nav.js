import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaWindowClose } from "react-icons/fa";

export default function Nav() {
  useEffect(() => {
    document.getElementById("hamburger").onclick = function toggleMenu() {
      const navToggle = document.getElementsByClassName("toggle");
      for (let i = 0; i < navToggle.length; i++) {
        navToggle.item(i).classList.toggle("hidden");
      }
    };
  });
  return (
    <nav className="flex flex-wrap items-center justify-between mb-5 p-5 lg:w-full lg:px-9 lg:mb-9 bg-darkblue">
      <div className="flex flex-col">
        <h1 className="flex text-white text-lg lg:text-2xl">
          <Link href="/events">
            <Image src="/globe-favicon.svg" width={30} height={30} alt="logo" />
          </Link>
          &nbsp;worldschoolingpopups.com
        </h1>
        <h3 className="text-white text-sm italic pl-9 -mt-1.5 lg:mt-0">
          <span className="underline decoration-yellow decoration-2 underline-offset-1">
            your go-to resource for events!
          </span>
        </h3>
      </div>
      <div className="flex lg:hidden text-white">
        <button id="hamburger">
          <p className="toggle block text-2xl">
            <FaBars />
          </p>
          <p className="toggle hidden text-2xl">
            <FaWindowClose />
          </p>
        </button>
      </div>
      <div className="toggle hidden lg:flex w-full lg:w-auto text-center text-bold mt-5 lg:mt-0 border-t-2 border-lightblue lg:border-none">
        <Link
          href="/events"
          className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
        >
          🏠&nbsp;&nbsp;Home
        </Link>
        <Link
          href="/about"
          className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
        >
          ℹ️&nbsp;&nbsp;About
        </Link>
        <Link
          href="/events/map"
          className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
        >
          🗺&nbsp;&nbsp;Map
        </Link>
        <Link
          // href="/events/search"
          href="#"
          className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
        >
          <p>🔎&nbsp;&nbsp;Search</p>
          <p className="text-xs">
            <i className="fas fa-star text-yellow"></i>&nbsp;Coming Soon!&nbsp;
            <i className="fas fa-star text-yellow"></i>
          </p>
        </Link>
        <Link
          href="/admin"
          className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
        >
          ⚙️&nbsp;&nbsp;Admin
        </Link>
      </div>
    </nav>
  );
}
