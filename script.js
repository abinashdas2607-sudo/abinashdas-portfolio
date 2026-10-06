
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});



document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});



const sections = document.querySelectorAll(
    ".section, .hero-content"
);

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },

    {
        threshold: 0.12
    }

);


sections.forEach(section => {

    observer.observe(section);

});



function openCertificate(button) {

    const card = button.closest(".certificate-card");

    const image = card.querySelector("img");

    const modal = document.getElementById(
        "certificateModal"
    );

    const modalImage = document.getElementById(
        "modalImage"
    );

    modalImage.src = image.src;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeCertificate() {

    const modal = document.getElementById(
        "certificateModal"
    );

    modal.classList.remove("active");

    document.body.style.overflow = "";

}



document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeCertificate();

    }

});



document.getElementById(
    "certificateModal"
).addEventListener("click", event => {

    if (event.target.id === "certificateModal") {

        closeCertificate();

    }

});



window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(5, 8, 12, 0.92)";

    } else {

        navbar.style.background =
            "rgba(5, 8, 12, 0.75)";

    }

});




const contactForm =
    document.getElementById("contact-form");

const formStatus =
    document.getElementById("form-status");

const submitButton =
    contactForm.querySelector(".contact-submit");


contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();



    submitButton.classList.add("loading");

    submitButton.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <span>Sending...</span>
    `;

    formStatus.textContent = "";

    formStatus.className = "form-status";


    try {

        const response = await fetch(
            contactForm.action,
            {
                method: "POST",

                body: new FormData(contactForm),

                headers: {
                    "Accept": "application/json"
                }
            }
        );


        if (response.ok) {


            formStatus.textContent =
                "✓ Message sent successfully. Thank you!";

            formStatus.classList.add("success");

            contactForm.reset();


            submitButton.innerHTML = `
                <i class="fas fa-check"></i>
                <span>Message Sent</span>
            `;



            setTimeout(() => {

                submitButton.classList.remove("loading");

                submitButton.innerHTML = `
                    <i class="fas fa-paper-plane"></i>
                    <span>Send Message</span>
                `;

            }, 4000);


        } else {

            throw new Error("Form submission failed");

        }


    } catch (error) {


        formStatus.textContent =
            "✕ Something went wrong. Please try again.";

        formStatus.classList.add("error");


        submitButton.classList.remove("loading");

        submitButton.innerHTML = `
            <i class="fas fa-paper-plane"></i>
            <span>Send Message</span>
        `;

    }

});