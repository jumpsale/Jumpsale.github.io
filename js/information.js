
// ========================================
// SHOW INFORMATION PAGE
// ========================================

function showInfo(pageId, button) {

    // सभी pages hide
    document.querySelectorAll(".info-page").forEach(page => {

        page.classList.remove("active");

    });


    // सभी buttons से active हटाओ
    document.querySelectorAll(".info-tab").forEach(btn => {

        btn.classList.remove("active");

    });


    // Selected page show
    const page =
        document.getElementById(pageId);

    if (page) {

        page.classList.add("active");

    }


    // Selected button active
    if (button) {

        button.classList.add("active");

    }

}


// ========================================
// OPEN SECTION FROM FOOTER LINK
// ========================================

document.addEventListener("DOMContentLoaded", function () {


    // URL से section निकालो

    const params =
        new URLSearchParams(window.location.search);

    const section =
        params.get("section");


    // अगर URL में section नहीं है
    // तो FAQ default खुलेगा

    const sectionToOpen =
        section || "faq";


    // सभी buttons
    const buttons =
        document.querySelectorAll(".info-tab");


    // सही button ढूंढो

    let selectedButton = null;


    buttons.forEach(button => {

        const onclickValue =
            button.getAttribute("onclick");


        if (
            onclickValue &&
            onclickValue.includes(
                "'" + sectionToOpen + "'"
            )
        ) {

            selectedButton = button;

        }

    });


    // Page open करो

    showInfo(
        sectionToOpen,
        selectedButton
    );

});
