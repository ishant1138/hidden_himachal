document.addEventListener("DOMContentLoaded", function () {
  const galleryGrid = document.querySelector(".gallery-grid");
  const prevBtn = document.querySelector(".prev-gallery");
  const nextBtn = document.querySelector(".next-gallery");
  const dots = document.querySelectorAll(".gallery-dot");

  let currentIndex = 0;
  const itemsPerPage = 6;
  const totalItems = document.querySelectorAll(".gallery-item").length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  function updateGallery() {
    const items = document.querySelectorAll(".gallery-item");
    items.forEach((item, index) => {
      const pageStart = currentIndex * itemsPerPage;
      const pageEnd = pageStart + itemsPerPage;

      if (index >= pageStart && index < pageEnd) {
        item.style.display = "block";
        item.style.opacity = "1";
      } else {
        item.style.display = "none";
        item.style.opacity = "0";
      }
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    // Update button states
    prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
    nextBtn.style.opacity = currentIndex === totalPages - 1 ? "0.5" : "1";
  }

  // Navigation functions
  function navigate(direction) {
    if (direction === "prev" && currentIndex > 0) {
      currentIndex--;
    } else if (direction === "next" && currentIndex < totalPages - 1) {
      currentIndex++;
    }
    updateGallery();
  }

  // Event listeners
  prevBtn.addEventListener("click", () => navigate("prev"));
  nextBtn.addEventListener("click", () => navigate("next"));

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateGallery();
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      navigate("prev");
    } else if (e.key === "ArrowRight") {
      navigate("next");
    }
  });

  // Initialize gallery
  updateGallery();
});
