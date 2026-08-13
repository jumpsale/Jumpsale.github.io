// ==========================
// CONTACT FORM
// ==========================

const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();


        // ==========================
        // GET FORM VALUES
        // ==========================

        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const phone =
            document.getElementById("contactPhone").value.trim();

        const subject =
            document.getElementById("contactSubject").value;

        const message =
            document.getElementById("contactMessage").value.trim();


        // ==========================
        // VALIDATION
        // ==========================

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            subject === "" ||
            message === ""
        ) {

            alert("Please fill all fields.");

            return;

        }


        // ==========================
        // MOBILE VALIDATION
        // ==========================

        if (!/^[0-9]{10}$/.test(phone)) {

            alert("Please enter a valid 10-digit mobile number.");

            return;

        }


        // ==========================
        // GET OLD MESSAGES
        // ==========================

        let contactMessages =
            JSON.parse(
                localStorage.getItem("contactMessages")
            ) || [];


        // ==========================
        // CREATE MESSAGE
        // ==========================

        const contactData = {

            id: "MSG" + Date.now(),

            name: name,

            email: email,

            phone: phone,

            subject: subject,

            message: message,

            date: new Date().toISOString(),

            status: "New"

        };


        // ==========================
        // SAVE MESSAGE
        // ==========================

        contactMessages.push(contactData);

        localStorage.setItem(
            "contactMessages",
            JSON.stringify(contactMessages)
        );


        // ==========================
        // SUCCESS MESSAGE
        // ==========================

        contactSuccess.style.display = "block";


        // ==========================
        // RESET FORM
        // ==========================

        contactForm.reset();


        // ==========================
        // HIDE SUCCESS MESSAGE
        // ==========================

        setTimeout(function () {

            contactSuccess.style.display = "none";

        }, 5000);

    });

}