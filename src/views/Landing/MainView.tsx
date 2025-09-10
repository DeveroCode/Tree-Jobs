import { useEffect, useRef } from "react";
import { getPostulationsWorks } from "@/api/UserWorkAPI";
import Categories from "@/components/landing/Categories";
import SearchBar from "@/components/landing/SearchBar";
import Partners from "@/components/landing/Partners";
import WorkCard from "@/components/Principal/WorkCard";
import { useQuery } from "@tanstack/react-query";
import { categories } from "../../data/categories";
import { partners } from "../../data/patners";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import type { JobCardData } from "@/types/index";
import { Mail, Send } from "lucide-react";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function MainView() {
  const { data } = useQuery({
    queryFn: getPostulationsWorks,
    queryKey: ["workAccount"],
    refetchOnWindowFocus: false,
    retry: false,
  });

  const totalWorks = data?.length || 0;
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Animations refs
  const heroRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const joinUsRef = useRef<HTMLDivElement | null>(null);
  const partnersRef = useRef<HTMLDivElement | null>(null);
  const jobsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      const [title, subtitle, search] = heroRef.current.children;
      gsap.from(title, { y: 40, opacity: 0, duration: 1 });
      gsap.from(subtitle, { y: 30, opacity: 0, delay: 0.3, duration: 1 });
      gsap.from(search, { scale: 0.8, opacity: 0, delay: 0.6, duration: 1 });
    }

    // Stats
    if (statsRef.current) {
      gsap.from(statsRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
      });
    }

    // Categories cards
    if (categoriesRef.current) {
      gsap.from(categoriesRef.current.children, {
        opacity: 0,
        x: 100,
        stagger: 0.15,
        duration: 1,
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 80%",
        },
      });
    }

    // Join Us section
    if (joinUsRef.current) {
      const [image, text] = joinUsRef.current.children;
      gsap.from(image, {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: joinUsRef.current,
          start: "top 75%",
        },
      });
      gsap.from(text, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: joinUsRef.current,
          start: "top 75%",
        },
      });
    }

    // Partners logos
    if (partnersRef.current) {
      gsap.from(partnersRef.current.children, {
        scale: 0.5,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: partnersRef.current,
          start: "top 85%",
        },
      });
    }

    // Jobs cards
    if (jobsRef.current) {
      gsap.from(jobsRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        scrollTrigger: {
          trigger: jobsRef.current,
          start: "top 80%",
        },
      });
    }

    // Infinite Categories Slider
    if (sliderRef.current) {
      const slider = sliderRef.current;
      setTimeout(() => {
        const items = Array.from(slider.children) as HTMLElement[];
        if (items.length === 0) return;

        const itemWidth = items[0].offsetWidth + 32;
        const totalWidth = itemWidth * items.length;

        gsap.killTweensOf(slider);

        gsap.to(slider, {
          x: `-=${totalWidth / 2}`,
          duration: 40,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: (x) => {
              const val = parseFloat(x);
              return (val % (totalWidth / 2)) + "px";
            },
          },
        });
      }, 100);
    }
  }, [data]);

  if (!data) return null;

  return (
    <>
      {/* Hero */}
      <main className="p-8 md:p-16 lg:p-32" ref={heroRef}>
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold capitalize">
            Unlock <span className="text-purple-800/90">careers</span> made for
            you
          </h1>
          <p className="text-sm sm:text-base text-gray-500 text-center">
            {totalWorks} career opportunities — your next move starts here.
          </p>
          <SearchBar />
        </div>
      </main>

      {/* Stats */}
      <section
        className="bg-purple-800/10 p-8 md:p-16 lg:p-32 flex flex-col md:flex-row justify-between gap-8"
        ref={statsRef}
      >
        <div className="w-full md:w-1/3">
          <span className="text-gray-500 capitalize">Join connect today</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl capitalize">
            experience with number
          </h2>
        </div>
        <ul className="w-full md:w-2/3 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-3">
          {" "}
          <li>
            {" "}
            <legend className="text-4xl font-semibold text-purple-700">
              {" "}
              90%{" "}
            </legend>{" "}
            <p className="text-gray-500 font-extralight">
              {" "}
              Our users find jobs according to their profile.{" "}
            </p>{" "}
          </li>{" "}
          <div className="md:border-l-2 border-purple-200 h-15" />{" "}
          <li>
            {" "}
            <legend className="text-4xl font-semibold text-purple-700">
              {" "}
              85%{" "}
            </legend>{" "}
            <p className="text-gray-500 font-extralight">
              {" "}
              Employers connect with qualified candidates faster.{" "}
            </p>{" "}
          </li>{" "}
          <div className="md:border-l-2 border-purple-200 h-15" />{" "}
          <li>
            {" "}
            <legend className="text-4xl font-semibold text-purple-700">
              {" "}
              70%{" "}
            </legend>{" "}
            <p className="text-gray-500 font-extralight">
              {" "}
              Users get responses to applications within the first week.{" "}
            </p>{" "}
          </li>{" "}
        </ul>
      </section>

      {/* Categories */}
      <section className="py-56 overflow-hidden">
        {" "}
        <h3 className="text-6xl text-center font-semibold capitalize">
          {" "}
          One platform many <p className="text-purple-700">solutions</p>{" "}
        </h3>{" "}
        <div ref={sliderRef} className="flex w-max gap-8 mt-12">
          {" "}
          {[...categories, ...categories].map((cat, i) => (
            <div className="flex-shrink-0 mt-10" key={cat.id + "-" + i}>
              {" "}
              <Categories cat={cat} />{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </section>

      {/* Join Us */}
      <section className="py-16 sm:py-32 lg:py-64 px-6 sm:px-12 bg-white">
        <div
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16 max-w-7xl mx-auto"
          ref={joinUsRef}
        >
          {/* Left Content (Image) */}
          <div className="relative w-full h-56 sm:h-72 md:h-[400px] flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-700/20 to-gray-700/5 rounded-2xl shadow-md"></div>
            <img
              src="/hero.jpg"
              alt="Join TreeJobs"
              className="absolute z-10 w-4/5 h-full object-cover rounded-2xl shadow-xl sm:-bottom-1/4 md:-bottom-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
              loading="lazy"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-6 text-center md:text-left">
            <span className="text-purple-700 font-semibold uppercase tracking-wide text-sm sm:text-base">
              Career Growth
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug text-gray-900">
              Get Matched With <br className="hidden sm:block" />
              The Most Valuable Jobs, <br className="hidden sm:block" />
              Just <span className="text-purple-700">Drop Your CV</span> at
              TreeJobs
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto md:mx-0">
              Upload your CV and let employers find you faster. Highlight your
              skills, connect with top companies, and take the next step in your
              career journey today.
            </p>
            <Link
              className="flex items-center justify-center gap-2 w-full sm:w-fit bg-purple-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:bg-purple-800 transition"
              to="/auth/login"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                />
              </svg>
              Upload Your CV
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <div className="bg-purple-700/5 py-24 px-12">
        <legend className="text-xl md:text-2xl font-semibold text-center capitalize">
          More than <span className="text-purple-700">10,000 companies</span>{" "}
          sponsor TreeJobs
        </legend>

        <div
          className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mt-12 px-4 md:px-32"
          ref={partnersRef}
        >
          {partners.map((partner) => (
            <Partners key={partner.id} partner={partner} />
          ))}
        </div>
      </div>

      {/* Jobs Features */}
      <section className="pt-32 pb-64 px-12">
        <h5 className="text-center text-5xl font-semibold capitalize">
          <span className="text-purple-700">Featured</span> job circulars
        </h5>

        {data.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            ref={jobsRef}
          >
            {data.map((job: JobCardData) => (
              <WorkCard key={job._id} work={job} />
            ))}
          </div>
        ) : (
          <h5 className="text-center text-2xl font-semibold text-gray-500">
            No jobs found
          </h5>
        )}
      </section>

      {/* End section */}
      <section className="bg-gray-100 p-24 relative">
        <div className="bg-white p-6 md:p-12 rounded-2xl absolute top-0 shadow-lg w-80 md:w-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row justify-between gap-5 items-center">
          <div className="md:w-1/2">
            <h6 className="text-2xl md:text-4xl capitalize font-semibold">
              Don't want to miss out on{" "}
              <span className="text-purple-700">any jobs</span>?
            </h6>
          </div>

          <form className="p-2 px-5 bg-white rounded-full shadow-md mt-3 w-72 md:w-2xl border border-gray-100 flex items-center justify-between">
            <fieldset className="md:w-1/2 flex items-center gap-4">
              <Mail className="w-4 h-4" />
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Enter your email"
                className="focus:outline-none text-gray-600"
              />
            </fieldset>

            <button className="py-2 bg-purple-800 text-white rounded-full px-5 cursor-pointer hidden md:block">
              Subscribe
            </button>
            <button className="bg-purple-800 text-white rounded-full p-2 cursor-pointer md:hidden">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        <Footer />
      </section>
    </>
  );
}
