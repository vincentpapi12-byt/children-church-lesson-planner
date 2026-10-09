const revealSections=document.querySelectorAll(".reveal-section");

revealSections.forEach((section) => {
   const observer = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting) {
    entries[0].target.classList.add("visible");
  }

    });

    observer.observe(section);
});



const motto = document.getElementById("typing-motto");

if (motto) {
    const mottoText = motto.textContent.trim();
    motto.textContent = "";

    let letterIndex = 0;
    let isDeleting = false;

    function typeMotto() {
        if (!isDeleting) {
            motto.textContent = mottoText.substring(0, letterIndex + 1);
            letterIndex++;

            if (letterIndex === mottoText.length) {
                isDeleting = true;
                setTimeout(typeMotto, 2000);
                return;
            }
        } else {
            motto.textContent = mottoText.substring(0, letterIndex - 1);
            letterIndex--;

            if (letterIndex === 0) {
                isDeleting = false;
            }
        }

        setTimeout(typeMotto, isDeleting ? 35 : 65);
    }

    typeMotto();
}