const revealSections=document.querySelectorAll(".reveal-section");

revealSections.forEach((section) => {
   const observer = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting) {
    entries[0].target.classList.add("visible");
  }

    });

    observer.observe(section);
});