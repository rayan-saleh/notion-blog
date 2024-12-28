import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useConfig } from "@/lib/config";
import { useLocale } from "@/lib/locale";
import useTheme from "@/lib/theme";

const NavBar = () => {
  const BLOG = useConfig();
  const locale = useLocale();
  const links = [
    {
      id: 0,
      name: "LinkedIn",
      to: "https://www.linkedin.com/in/rayan-saleh~/",
      show: true,
      external: true,
    },
    {
      id: 1,
      name: "X",
      to: "https://x.com/_balsam0",
      show: true,
      external: true,
    },
    {
      id: 2,
      name: "GitHub",
      to: "https://github.com/rayan-saleh",
      show: true,
      external: true,
    },
  ];

  const icons = {
    LinkedIn: (
      <div className="mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        width="22"
        height="22"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"
          fillRule="nonzero"
        />
      </svg>
      </div>
    ),
    X: (
      <div className="mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 22"
        width="16"
        height="16"
      >
        <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z" />
      </svg>
      </div>
    ),
    GitHub: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 23"
        width="26"
        height="26"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  };

  return (
    <div className="flex-shrink-0 ">
      <ul className="flex flex-row items-center">
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-gray-500 dark:text-gray-50 nav"
              >
                <Link
                  href={link.to}
                  target={link.external ? "_blank" : null}
                  aria-label={link.name}
                >
                  {icons[link.name]}
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default function Header({ navBarTitle, fullWidth }) {
  const BLOG = useConfig();
  const { dark } = useTheme();

  // Favicon

  // const resolveFavicon = (fallback) =>
  //   !fallback && dark ? "/favicon.dark.png" : "/favicon.png";
  // const [favicon, _setFavicon] = useState(resolveFavicon());
  // const setFavicon = (fallback) => _setFavicon(resolveFavicon(fallback));

  // useEffect(
  //   () => setFavicon(),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [dark]
  // );

  const useSticky = !BLOG.autoCollapsedNavBar;
  const navRef = useRef(/** @type {HTMLDivElement} */ undefined);
  const sentinelRef = useRef(/** @type {HTMLDivElement} */ undefined);
  const handler = useCallback(
    ([entry]) => {
      if (useSticky && navRef.current) {
        navRef.current?.classList.toggle(
          "sticky-nav-full",
          !entry.isIntersecting
        );
      } else {
        navRef.current?.classList.add("remove-sticky");
      }
    },
    [useSticky]
  );

  useEffect(() => {
    const sentinelEl = sentinelRef.current;
    const observer = new window.IntersectionObserver(handler);
    observer.observe(sentinelEl);

    return () => {
      sentinelEl && observer.unobserve(sentinelEl);
    };
  }, [handler, sentinelRef]);

  const titleRef = useRef(/** @type {HTMLParagraphElement} */ undefined);

  function handleClickHeader(/** @type {MouseEvent} */ ev) {
    if (![navRef.current, titleRef.current].includes(ev.target)) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinelRef}></div>
      <div
        className={`sticky-nav group m-auto w-full h-6 flex flex-row justify-between items-center mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? "max-w-lg px-4" : "px-24"
        }`}
        id="sticky-nav"
        ref={navRef}
        onClick={handleClickHeader}
      >
        {/* <svg
          viewBox="0 0 24 24"
          className="caret w-6 h-6 absolute inset-x-0 bottom-0 mx-auto pointer-events-none opacity-30 group-hover:opacity-100 transition duration-100"
        >
          <path
            d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"
            className="fill-black dark:fill-white"
          />
        </svg> */}
        <div className="flex items-center">
          <Link href="/" aria-label={BLOG.title}>
            {/* <Image
              src={favicon}
              width={24}
              height={24}
              alt={BLOG.title}
              onError={() => setFavicon(true)}
            /> */}

            <HeaderName
              ref={titleRef}
              siteTitle={BLOG.title}
              siteDescription={BLOG.description}
              postTitle={navBarTitle}
              onClick={handleClickHeader}
            />
          </Link>
        </div>
        <NavBar />
      </div>
    </>
  );
}

const HeaderName = forwardRef(function HeaderName(
  { siteTitle, siteDescription, postTitle, onClick },
  ref
) {
  return (
    <p
      ref={ref}
      className="header-name font-medium text-gray-600 dark:text-gray-300 capture-pointer-events grid-rows-1 grid-cols-1 items-center"
      onClick={onClick}
    >
      {/* {postTitle && (
        <span className="post-title row-start-1 col-start-1">{postTitle}</span>
      )} */}
      <span className="row-start-1 col-start-1">
        <span className="site-title">{siteTitle}</span>
        {/* <span className="site-description font-normal">
          , {siteDescription}
        </span> */}
      </span>
    </p>
  );
});
