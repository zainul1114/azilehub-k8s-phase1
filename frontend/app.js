document.addEventListener("DOMContentLoaded", function () {

    loadTutorials();
    setupContactForm();

});


/*
 * =====================================================
 * Load Tutorials
 * =====================================================
 *
 * Browser
 *    |
 *    | GET /api/tutorials
 *    v
 * Nginx
 *    |
 *    | proxy
 *    v
 * content-service:8000/api/tutorials
 *
 */

async function loadTutorials() {

    try {

        const response = await fetch("/api/tutorials");

        if (!response.ok) {
            throw new Error("Failed to load tutorials");
        }

        const data = await response.json();

        console.log("Tutorial API response:", data);

        /*
         * We can connect this to your existing
         * Trending Tutorials / tutorial sections.
         */

        renderTutorials(data.tutorials);

    } catch (error) {

        console.error("Tutorial API error:", error);

    }
}


/*
 * =====================================================
 * Render Tutorials
 * =====================================================
 */

function renderTutorials(tutorials) {

    const container = document.getElementById("tutorial-list");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    tutorials.forEach(function (tutorial) {

        const item = document.createElement("div");

        item.className = "tutorial-item";

        item.innerHTML = `
            <h4>${tutorial.name}</h4>
            <p>${tutorial.description}</p>
        `;

        container.appendChild(item);

    });
}


/*
 * =====================================================
 * Contact Form
 * =====================================================
 *
 * Browser
 *    |
 *    | POST /api/contacts
 *    v
 * Nginx
 *    |
 *    | proxy
 *    v
 * contact-service:8000/api/contacts
 *
 */

function setupContactForm() {

    const form = document.getElementById("contact-form");

    if (!form) {
        console.log("Contact form not found");
        return;
    }

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const formData = new FormData(form);

        const contactData = {

            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            message: formData.get("message")

        };

        try {

            const response = await fetch("/api/contact", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(contactData)

            });


            const result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.detail || "Failed to submit contact form"
                );

            }


            showContactMessage(
                "Thank you! Your message has been received."
            );

            form.reset();


        } catch (error) {

            console.error("Contact API error:", error);

            showContactMessage(
                "Unable to submit your message. Please try again.",
                true
            );

        }

    });

}


/*
 * =====================================================
 * Contact Message
 * =====================================================
 */

function showContactMessage(message, error = false) {

    let element = document.getElementById("contact-message");

    if (!element) {

        element = document.createElement("div");

        element.id = "contact-message";

        const form = document.getElementById("contact-form");

        if (form) {
            form.parentNode.insertBefore(element, form);
        }

    }

    element.textContent = message;

    element.style.padding = "10px";
    element.style.marginBottom = "15px";

    if (error) {
        element.style.color = "#b00020";
    } else {
        element.style.color = "#008000";
    }

}
