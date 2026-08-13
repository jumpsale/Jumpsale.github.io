// ==========================
// SEARCH PRODUCT LIST
// ==========================

const searchSuggestions = [

    {
        text: "Mobile",
        url: "search-product.html?search=mobile"
    },

    {
        text: "Wireless Mouse",
        url: "search-product.html?search=wireless%20mouse"
    },

    {
        text: "Gaming Mouse",
        url: "search-product.html?search=gaming%20mouse"
    },

    {
        text: "Mechanical Keyboard",
        url: "search-product.html?search=mechanical%20keyboard"
    },

    {
        text: "Bluetooth Headphones",
        url: "search-product.html?search=bluetooth%20headphones"
    },

    {
        text: "Gaming Laptop",
        url: "search-product.html?search=gaming%20laptop"
    },

    {
        text: "Smart Watch",
        url: "search-product.html?search=smart%20watch"
    },

    {
        text: "Speaker",
        url: "search-product.html?search=speaker"
    }

];


// ==========================
// SEARCH ELEMENTS
// ==========================

const input =
    document.getElementById("searchInput");

const suggestionBox =
    document.getElementById("searchSuggestions");

const searchBtn =
    document.getElementById("searchBtn");


// ==========================
// SEARCH BUTTON
// ==========================

if (searchBtn && input) {

    searchBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const value =
            input.value.trim();

        if (value === "") {
            return;
        }

        window.location.href =
            "search-product.html?search=" +
            encodeURIComponent(value);

    });

}


// ==========================
// ENTER KEY SEARCH
// ==========================

if (input && searchBtn) {

    input.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            e.preventDefault();

            searchBtn.click();

        }

    });

}


// ==========================
// LIVE SEARCH SUGGESTIONS
// ==========================

if (input && suggestionBox) {

    input.addEventListener(
        "input",
        function () {

            const value =
                this.value
                .trim()
                .toLowerCase();

            suggestionBox.innerHTML = "";

            if (value === "") {

                suggestionBox.style.display =
                    "none";

                return;

            }


            const result =
                searchSuggestions.filter(item =>
                    item.text
                    .toLowerCase()
                    .includes(value)
                );


            if (result.length === 0) {

                suggestionBox.style.display =
                    "none";

                return;

            }


            suggestionBox.style.display =
                "block";


            result.forEach(item => {

                suggestionBox.innerHTML += `

                    <a
                        href="${item.url}"
                        class="suggestion-item">

                        <i class="bi bi-search"></i>

                        ${item.text}

                    </a>

                `;

            });

        }
    );

}


// ==========================
// HIDE SUGGESTIONS
// ==========================

document.addEventListener(
    "click",
    function (e) {

        if (
            !e.target.closest(
                ".search-container"
            )
        ) {

            if (suggestionBox) {

                suggestionBox.style.display =
                    "none";

            }

        }

    }
);


// ==========================
// GET SEARCH KEYWORD
// ==========================

const params =
    new URLSearchParams(
        window.location.search
    );


const keyword =
    (
        params.get("search") || ""
    )
    .toLowerCase()
    .trim();


// ==========================
// PRODUCT CONTAINER
// ==========================

const productList =
    document.getElementById(
        "productList"
    );


// Agar productList nahi mila
if (!productList) {

    console.error(
        "productList element not found!"
    );

} else {


    // ==========================
    // ADMIN PRODUCTS
    // ==========================

    const adminProducts =
        JSON.parse(
            localStorage.getItem(
                "products"
            )
        ) || [];


    // ==========================
    // CONVERT ADMIN PRODUCTS
    // ==========================

    const convertedAdminProducts =
        adminProducts.map(product => ({

            id:
                String(product.id),

            name:
                product.name,

            price:
                Number(product.price),

            oldPrice:
                product.oldPrice || "",

            discount:
                product.discount || "",

            category:
                product.category || "Other",

            description:
                product.description || "",

            images: [

                product.image

            ],

            // IMPORTANT
            // Stock 0 ko 0 hi rakho

            stock:
                Number(product.stock) || 0

        }));


    // ==========================
    // ALL PRODUCTS
    // ==========================

    const allProducts = [

        ...products,

        ...convertedAdminProducts

    ];


    // ==========================
    // SEARCH FILTER
    // ==========================

    const filteredProducts =
        allProducts.filter(product => {

            const name =
                (
                    product.name || ""
                )
                .toLowerCase();

            const category =
                (
                    product.category || ""
                )
                .toLowerCase();

            const description =
                (
                    product.description || ""
                )
                .toLowerCase();


            return (

                name.includes(keyword) ||

                category.includes(keyword) ||

                description.includes(keyword)

            );

        });


    // ==========================
    // REVIEWS
    // ==========================

    const reviews =
        JSON.parse(
            localStorage.getItem(
                "reviews"
            )
        ) || [];


    // ==========================
    // PRODUCT RATING
    // ==========================

    function getProductRating(
        productId
    ) {

        const productReviews =
            reviews.filter(
                r =>
                    String(r.id) ===
                    String(productId)
            );


        if (
            productReviews.length === 0
        ) {

            return {

                rating: "0.0",

                count: 0

            };

        }


        let total = 0;


        productReviews.forEach(
            r => {

                total +=
                    Number(r.star) || 0;

            }
        );


        return {

            rating:
                (
                    total /
                    productReviews.length
                ).toFixed(1),

            count:
                productReviews.length

        };

    }


    // ==========================
    // NO PRODUCT FOUND
    // ==========================

    if (
        filteredProducts.length === 0
    ) {

        productList.innerHTML = `

            <div
                class="col-12 text-center py-5">

                <h3>
                    No Products Found
                </h3>

                <p>
                    Try another search.
                </p>

            </div>

        `;

    } else {


        // ==========================
        // SHOW PRODUCTS
        // ==========================

        filteredProducts.forEach(
            product => {


                const productRating =
                    getProductRating(
                        product.id
                    );


                const image =
                    product.images &&
                    product.images[0]
                        ? product.images[0]
                        : "";


                // ==========================
                // STOCK TEXT
                // ==========================

                let stockText = "";


                if (
                    Number(product.stock) <= 0
                ) {

                    stockText = `

                        <p class="stock">

                            <span
                                class="text-danger"
                                style="font-size:14px;">

                                ❌ Out of Stock

                            </span>

                        </p>

                    `;

                } else {

                    stockText = `

                        <p class="stock">

                            <span
                                class="text-success"
                                style="font-size:14px;">

                                ✔ In Stock
                                (${product.stock} Left)

                            </span>

                        </p>

                    `;

                }


                // ==========================
                // PRODUCT HTML
                // ==========================

                productList.innerHTML += `

                    <div
                        class="search-product-list">

                        <div
                            class="search-product">


                            <!-- PRODUCT IMAGE -->

                            <div
                                class="search-product-image">

                                <img
                                    src="${image}"
                                    alt="${product.name}">

                            </div>


                            <!-- PRODUCT INFO -->

                            <div
                                class="search-product-info">


                                <!-- PRODUCT NAME -->

                                <h3>
                                    ${product.name}
                                </h3>


                                <!-- RATING -->

                                <div class="rating">

                                    <div
                                        class="product-rating">


                                        <span
                                            class="rating-stars">

                                            ⭐⭐⭐⭐⭐

                                        </span>


                                        <span
                                            class="rating-number">

                                            ${productRating.rating}

                                        </span>


                                        <span
                                            class="rating-count">

                                            (${productRating.count}
                                            Reviews)

                                        </span>


                                    </div>

                                </div>


                                <!-- DESCRIPTION -->

                                <p
                                    class="description">

                                    ${
                                        product.description ||
                                        "No description available."
                                    }

                                </p>


                                <!-- PRICE -->

                                <div
                                    class="price">

                                    ₹${product.price}


                                    ${
                                        product.oldPrice
                                        ? `

                                            <span
                                                class="old-price">

                                                ₹${product.oldPrice}

                                            </span>

                                        `
                                        : ""
                                    }


                                    ${
                                        product.discount
                                        ? `

                                            <span
                                                class="discount">

                                                ${product.discount}

                                            </span>

                                        `
                                        : ""
                                    }

                                </div>


                                <!-- STOCK -->

                                ${stockText}


                                <!-- BUTTON -->

                                <div
                                    class="product-buttons">


                                    <a
                                        href="product-details.html?id=${product.id}"
                                        class="btn btn-outline-dark">

                                        View Details

                                    </a>


                                </div>


                            </div>


                        </div>

                    </div>

                `;

            }
        );

    }

}