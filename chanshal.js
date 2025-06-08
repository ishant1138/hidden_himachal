document.addEventListener("DOMContentLoaded", () => {
  let lastScrollTop = 0;
  const header = document.querySelector("header");
  const hero = document.querySelector(".hero");
  const scrollThreshold = 50;

  // Function to check if we've scrolled past hero section
  const isPastHero = () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    return window.scrollY > heroBottom - header.offsetHeight;
  };

  // Function to update navbar appearance
  const updateNavbar = () => {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // Handle navbar hiding
    if (Math.abs(lastScrollTop - currentScroll) > 5) {
      if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
        header.classList.add("nav-hidden");
      } else {
        header.classList.remove("nav-hidden");
      }
    }

    // Handle navbar opacity
    if (isPastHero()) {
      header.classList.add("opaque");
    } else {
      header.classList.remove("opaque");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  };

  // Initial check
  updateNavbar();

  // Add scroll event listener
  window.addEventListener("scroll", updateNavbar, { passive: true });
});
