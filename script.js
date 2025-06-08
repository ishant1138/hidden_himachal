// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Search functionality
const searchBox = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

const destinations = [
  "Chanshal Pass",
  "Kinnaur Valley",
  "Dodra Kwar Village",
  "Chandartaal-Nahan Trek",
];

searchBox.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const matches = destinations.filter((dest) =>
    dest.toLowerCase().includes(searchTerm)
  );

  if (searchTerm && matches.length > 0) {
    console.log("Matching destinations:", matches);
    // Here you would typically show the matches in a dropdown
  }
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchTerm = searchBox.value.trim();
  if (searchTerm) {
    // Scroll to matching destination if found
    const matchingDestination = destinations.find((dest) =>
      dest.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchingDestination) {
      const element = document.querySelector(
        `h3:contains('${matchingDestination}')`
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
});

// Add scroll effect to header
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.background = "rgba(0, 0, 0, 0.8)";
    header.style.transition = "background 0.3s ease-in-out";
  } else {
    header.style.background = "transparent";
  }
});

// Trek details button
const trekBtn = document.querySelector(".trek-btn");
if (trekBtn) {
  trekBtn.addEventListener("click", () => {
    const trekDetails = {
      name: "Chandartaal-Nahan Trek",
      difficulty: "Moderate to Difficult",
      duration: "5-6 days",
      altitude: "14,100 ft",
      bestSeason: "June to September",
      highlights: [
        "Pristine mountain lakes",
        "Diverse landscapes",
        "Rich flora and fauna",
        "Traditional villages",
      ],
    };
    alert(`
      ${trekDetails.name}
      
      Difficulty: ${trekDetails.difficulty}
      Duration: ${trekDetails.duration}
      Maximum Altitude: ${trekDetails.altitude}
      Best Season: ${trekDetails.bestSeason}
      
      Highlights:
      ${trekDetails.highlights.join("\n")}
      
      Contact us to book this trek!
    `);
  });
}

// Form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: contactForm.querySelector('input[type="text"]').value,
      email: contactForm.querySelector('input[type="email"]').value,
      destination: contactForm.querySelector("select").value,
      message: contactForm.querySelector("textarea").value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          "Thank you for your inquiry! We've sent you a confirmation email and will get back to you soon."
        );
        contactForm.reset();
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting your form. Please try again later.");
    }
  });
}

// Gallery lightbox effect
const galleryImages = document.querySelectorAll(".gallery-grid img");
galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    // Create lightbox effect
    const lightbox = document.createElement("div");
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      cursor: pointer;
    `;

    const lightboxImg = document.createElement("img");
    lightboxImg.src = img.src.replace("w=400", "w=1200");
    lightboxImg.style.cssText = `
      max-width: 90%;
      max-height: 90vh;
      object-fit: contain;
    `;

    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    lightbox.addEventListener("click", () => {
      lightbox.remove();
    });
  });
});

// Reviews Slider
document.addEventListener("DOMContentLoaded", function () {
  const reviewsSlider = document.querySelector(".reviews-slider");
  const reviewSlides = document.querySelectorAll(".review-slide");
  const prevButton = document.querySelector(".prev-review");
  const nextButton = document.querySelector(".next-review");

  if (!reviewsSlider || reviewSlides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 3000; // 3 seconds per slide

  function updateSlider() {
    const slideWidth = reviewSlides[0].offsetWidth;
    const containerWidth = reviewsSlider.parentElement.offsetWidth;
    const offset = (containerWidth - slideWidth) / 2;
    reviewsSlider.style.transform = `translateX(-${
      currentSlide * slideWidth
    }px)`;

    // Show/hide navigation arrows based on current slide
    if (currentSlide === 0) {
      prevButton.style.opacity = "0";
      prevButton.style.pointerEvents = "none";
    } else {
      prevButton.style.opacity = "1";
      prevButton.style.pointerEvents = "auto";
    }

    if (currentSlide === reviewSlides.length - 1) {
      nextButton.style.opacity = "0";
      nextButton.style.pointerEvents = "none";
    } else {
      nextButton.style.opacity = "1";
      nextButton.style.pointerEvents = "auto";
    }
  }

  function nextSlide() {
    if (currentSlide < reviewSlides.length - 1) {
      currentSlide++;
      updateSlider();
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  }

  function startAutoSlide() {
    if (!slideInterval) {
      slideInterval = setInterval(() => {
        if (currentSlide < reviewSlides.length - 1) {
          nextSlide();
        } else {
          currentSlide = 0;
          updateSlider();
        }
      }, slideDuration);
    }
  }

  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Initialize slider
  updateSlider();
  startAutoSlide();

  // Arrow navigation
  prevButton.addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });

  nextButton.addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  // Pause on hover
  reviewsSlider.addEventListener("mouseenter", stopAutoSlide);
  reviewsSlider.addEventListener("mouseleave", startAutoSlide);

  // Handle window resize
  window.addEventListener("resize", () => {
    updateSlider();
  });
});

// Travel Mode Switching
document.addEventListener("DOMContentLoaded", function () {
  const travelModeButtons = document.querySelectorAll(".travel-mode-btn");

  travelModeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".reach-card");

      // Remove active class from all buttons in the same card
      card.querySelectorAll(".travel-mode-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button with animation
      this.classList.add("active");

      // Get the mode and corresponding info section
      const mode = this.getAttribute("data-mode");
      const infoSection = card.querySelector(`.${mode}-info`);

      // Hide all info sections with fade out
      card.querySelectorAll(".info-section").forEach((section) => {
        if (section !== infoSection) {
          section.style.opacity = "0";
          setTimeout(() => {
            section.classList.remove("active");
          }, 300);
        }
      });

      // Show the selected info section with fade in
      setTimeout(() => {
        infoSection.classList.add("active");
        infoSection.style.opacity = "1";
      }, 300);

      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;
  let scrollTimeout;
  const SCROLL_THRESHOLD = 10; // Minimum scroll amount to trigger animation
  const SCROLL_DELAY = 150; // Delay before hiding navbar

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    // Clear any existing timeout
    clearTimeout(scrollTimeout);

    if (Math.abs(scrollDelta) > SCROLL_THRESHOLD) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        header.classList.add("hidden");
        header.classList.remove("visible");
      } else {
        // Scrolling up
        header.classList.remove("hidden");
        header.classList.add("visible");
      }
    }

    lastScrollY = currentScrollY;
  }

  // Throttle scroll events
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Handle initial state
  handleScroll();
});

// Handle navigation to Dodra Kwar page
document.addEventListener("DOMContentLoaded", function () {
  const dodraKwarLinks = document.querySelectorAll('a[href*="dodra-kwar"]');
  dodraKwarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "dodra-kwar.html";
    });
  });
});

// Contact form handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      try {
        const response = await fetch("/contact", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        alert(data.message);
        contactForm.reset();
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  }
});
