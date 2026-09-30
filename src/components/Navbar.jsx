import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { navigation, profile } from "../data/profile";
import Magnetic from "./motion/Magnetic";
import useReducedMotion from "../hooks/useReducedMotion";
import styles from "./Navbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const lightPage =
    location.pathname !== "/" && location.pathname !== "/contact";
  const root = useRef(null);
  const dialog = useRef(null);
  const panel = useRef(null);
  const returnFocus = useRef(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("/");
  const reduced = useReducedMotion();
  const { contextSafe } = useGSAP({ scope: root });
  useEffect(() => {
    setActive(location.pathname === "/" ? "/" : location.pathname);
    const scroll = () => setScrolled(window.scrollY > 120);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(entry.target.id === "home" ? "/" : "/#work");
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    ["home", "work"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => {
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
    };
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  const showMenu = contextSafe((event) => {
    if (open) return;
    returnFocus.current = event.currentTarget;
    dialog.current.showModal();
    setOpen(true);
    gsap.fromTo(
      panel.current,
      {
        xPercent: 105,
        borderTopLeftRadius: "35%",
        borderBottomLeftRadius: "35%",
      },
      {
        xPercent: 0,
        borderTopLeftRadius: "0%",
        borderBottomLeftRadius: "0%",
        duration: reduced ? 0 : 0.7,
        ease: "power3.inOut",
        overwrite: true,
      },
    );
    gsap.fromTo(
      panel.current.querySelectorAll("[data-menu-link]"),
      { x: 70, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        delay: reduced ? 0 : 0.16,
        duration: reduced ? 0 : 0.65,
        stagger: reduced ? 0 : 0.055,
        ease: "power3.out",
        overwrite: true,
      },
    );
  });
  const hideMenu = contextSafe((href) => {
    if (!open || closing) return;
    setClosing(true);
    gsap.to(panel.current, {
      xPercent: 105,
      duration: reduced ? 0 : 0.5,
      ease: "power3.inOut",
      overwrite: true,
      onComplete: () => {
        dialog.current.close();
        setOpen(false);
        setClosing(false);
        if (typeof href === "string") {
          navigate(href);
        } else returnFocus.current?.focus({ preventScroll: true });
      },
    });
  });
  return (
    <header
      ref={root}
      className={`${styles.root} ${lightPage ? styles.lightPage : ""}`}
    >
      <nav className={styles.nav} aria-label="Main navigation">
        <Magnetic>
          <Link to="/" className={styles.brand} aria-label="David Atef — home">
            <span className={styles.copyright}>©</span>
            <span className={styles.brandClip}>
              <span className={styles.brandText}>
                Code by David<span>David Atef</span>
              </span>
            </span>
          </Link>
        </Magnetic>
        <div className={styles.desktopLinks}>
          {navigation.slice(1).map((link) => (
            <Magnetic key={link.href}>
              <Link
                to={link.href}
                className={styles.navLink}
                aria-current={active === link.href ? "location" : undefined}
              >
                {link.label}
              </Link>
            </Magnetic>
          ))}
        </div>
        <button
          className={styles.mobileMenu}
          type="button"
          onClick={showMenu}
          aria-expanded={open}
          aria-controls="site-menu"
        >
          <i />
          Menu
        </button>
      </nav>
      <div
        className={`${styles.floating} ${scrolled ? styles.floatingVisible : ""}`}
        inert={!scrolled ? "" : undefined}
      >
        <Magnetic>
          <button
            className={styles.menuButton}
            type="button"
            onClick={showMenu}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-menu"
            tabIndex={scrolled ? 0 : -1}
          >
            <span />
            <span />
          </button>
        </Magnetic>
      </div>
      <dialog
        ref={dialog}
        id="site-menu"
        className={styles.dialog}
        aria-labelledby="menu-heading"
        onCancel={(event) => {
          event.preventDefault();
          hideMenu();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) hideMenu();
        }}
      >
        <div ref={panel} className={styles.panel}>
          <div className={styles.closeWrap}>
            <Magnetic>
              <button
                type="button"
                autoFocus
                className={`${styles.menuButton} ${styles.close}`}
                aria-label="Close menu"
                disabled={closing}
                onClick={() => hideMenu()}
              >
                <span />
                <span />
              </button>
            </Magnetic>
          </div>
          <div className={styles.menuMain}>
            <h2 id="menu-heading" className={styles.label}>
              Navigation
            </h2>
            <div className={styles.rule} />
            <nav aria-label="Expanded navigation" className={styles.menuLinks}>
              {navigation.map((link) => (
                <Link
                  data-menu-link
                  key={link.href}
                  to={link.href}
                  aria-current={active === link.href ? "location" : undefined}
                  onClick={(event) => {
                    if (
                      event.metaKey ||
                      event.ctrlKey ||
                      event.shiftKey ||
                      event.altKey ||
                      event.button !== 0
                    )
                      return;
                    event.preventDefault();
                    hideMenu(link.href);
                  }}
                >
                  {link.label}
                  <i />
                </Link>
              ))}
            </nav>
          </div>
          <div className={styles.menuSocial}>
            <p className={styles.label}>Socials</p>
            <div>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </header>
  );
}
