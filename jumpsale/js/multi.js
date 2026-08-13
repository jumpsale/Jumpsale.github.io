// ==========================================
// SHARE MENU TOGGLE
// ==========================================

const shareToggleButton =
    document.getElementById("socialToggle");

const shareIconMenu =
    document.getElementById("mobileIcons");


if (shareToggleButton && shareIconMenu) {

    shareToggleButton.addEventListener(
        "click",
        function (event) {

            // Page refresh / form submit rokna
            event.preventDefault();

            // Event ko search button tak jaane se rokna
            event.stopPropagation();

            shareIconMenu.classList.toggle("show");

        }
    );

}




