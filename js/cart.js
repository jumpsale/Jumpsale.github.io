// ==========================
// CART JS
// ==========================


// ==========================
// CART ELEMENTS
// ==========================

const cartItems =
    document.getElementById("cart-items");

const totalPrice =
    document.getElementById("total-price");

const grandTotal =
    document.getElementById("grand-total");

const totalItems =
    document.getElementById("total-items");

const checkoutBtn =
    document.getElementById("checkoutBtn");


// ==========================
// LOAD CART
// ==========================

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// ==========================
// SAVE CART
// ==========================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateBadge();

}


// ==========================
// UPDATE CART BADGE
// ==========================

function updateBadge() {

    let count = 0;


    cart.forEach(item => {

        count +=
            Number(item.qty) || 0;

    });


    document
        .querySelectorAll(".cart-count")
        .forEach(badge => {

            if (count > 0) {

                badge.style.display =
                    "inline-block";

                badge.innerText =
                    count;

            } else {

                badge.style.display =
                    "none";

            }

        });

}


// ==========================
// RENDER CART
// ==========================

function renderCart() {

    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    // ==========================
    // EMPTY CART
    // ==========================

    if (cart.length === 0) {


        cartItems.innerHTML = `

            <div class="text-center py-5">

                <h3>
                    Your Cart is Empty 🛒
                </h3>

                <p>
                    Add some products to your cart.
                </p>

                <a
                    href="index.html"
                    class="btn btn-warning">

                    Continue Shopping

                </a>

            </div>

        `;


        if (totalPrice) {
            totalPrice.innerText = "0";
        }


        if (grandTotal) {
            grandTotal.innerText = "0";
        }


        if (totalItems) {
            totalItems.innerText = "0";
        }


        updateBadge();

        return;

    }


    // ==========================
    // TOTAL VARIABLES
    // ==========================

    let total = 0;

    let itemsCount = 0;


    // ==========================
    // SHOW CART PRODUCTS
    // ==========================

    cart.forEach((item, index) => {


        const price =
            Number(item.price) || 0;


        const qty =
            Number(item.qty) || 0;


        const stock =
            Number(item.stock) || 0;


        const itemTotal =
            price * qty;


        total += itemTotal;

        itemsCount += qty;


        cartItems.innerHTML += `

            <div class="card mb-3 shadow-sm">

                <div class="row g-0 align-items-center">


                    <!-- IMAGE -->

                    <div
                        class="col-md-2 text-center">

                        <img
                            src="${item.image}"
                            class="img-fluid p-2"
                            style="height:120px;"
                            alt="${item.name}">

                    </div>


                    <!-- PRODUCT INFO -->

                    <div
                        class="col-md-4">

                        <h5>
                            ${item.name}
                        </h5>

                        <p>
                            ₹${price}
                        </p>

                        <small class="text-muted">

                            Stock:
                            ${stock}

                        </small>

                    </div>


                    <!-- QUANTITY -->

                    <div
                        class="col-md-3">


                        <button
                            class="btn btn-sm btn-secondary minus"
                            data-index="${index}">

                            -

                        </button>


                        <span
                            class="mx-2">

                            ${qty}

                        </span>


                        <button
                            class="btn btn-sm btn-secondary plus"
                            data-index="${index}">

                            +

                        </button>


                    </div>


                    <!-- ITEM TOTAL -->

                    <div
                        class="col-md-2">

                        ₹${itemTotal}

                    </div>


                    <!-- REMOVE -->

                    <div
                        class="col-md-1">

                        <button
                            class="btn btn-danger btn-sm remove"
                            data-index="${index}">

                            Remove

                        </button>

                    </div>


                </div>

            </div>

        `;

    });


    // ==========================
    // UPDATE TOTALS
    // ==========================

    if (totalPrice) {

        totalPrice.innerText =
            total;

    }


    if (grandTotal) {

        grandTotal.innerText =
            total;

    }


    if (totalItems) {

        totalItems.innerText =
            itemsCount;

    }


    updateBadge();

}


// ==========================
// CART BUTTON ACTIONS
// ==========================

document.addEventListener(
    "click",
    function (e) {


        // ==========================
        // PLUS BUTTON
        // ==========================

        if (
            e.target.classList.contains(
                "plus"
            )
        ) {


            const index =
                Number(
                    e.target.dataset.index
                );


            const item =
                cart[index];


            if (!item) {
                return;
            }


            const stock =
                Number(item.stock) || 0;


            const qty =
                Number(item.qty) || 0;


            // STOCK CHECK

            if (qty < stock) {


                item.qty =
                    qty + 1;


                saveCart();

                renderCart();


            } else {


                alert(
                    "Maximum " +
                    stock +
                    " item(s) allowed."
                );

            }

        }


        // ==========================
        // MINUS BUTTON
        // ==========================

        if (
            e.target.classList.contains(
                "minus"
            )
        ) {


            const index =
                Number(
                    e.target.dataset.index
                );


            const item =
                cart[index];


            if (!item) {
                return;
            }


            const qty =
                Number(item.qty) || 0;


            if (qty > 1) {


                item.qty =
                    qty - 1;


            } else {


                cart.splice(
                    index,
                    1
                );

            }


            saveCart();

            renderCart();

        }


        // ==========================
        // REMOVE BUTTON
        // ==========================

        if (
            e.target.classList.contains(
                "remove"
            )
        ) {


            const index =
                Number(
                    e.target.dataset.index
                );


            if (
                !cart[index]
            ) {
                return;
            }


            cart.splice(
                index,
                1
            );


            saveCart();

            renderCart();

        }

    }
);


// ==========================
// CHECKOUT BUTTON
// ==========================

if (checkoutBtn) {


    checkoutBtn.addEventListener(
        "click",
        function () {


            // Cart empty check

            if (
                cart.length === 0
            ) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            // Login check

            const loggedUser =
                JSON.parse(
                    localStorage.getItem(
                        "loggedUser"
                    )
                );


            if (!loggedUser) {


                localStorage.setItem(
                    "redirectAfterLogin",
                    "checkout.html"
                );


                window.location.href =
                    "signin.html";


                return;

            }


            // Login hai

            window.location.href =
                "checkout.html";

        }
    );

}


// ==========================
// INITIAL LOAD
// ==========================

updateBadge();

renderCart();