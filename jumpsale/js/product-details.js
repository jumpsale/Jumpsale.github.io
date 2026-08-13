// ==========================
// PRODUCT IMAGE
// ==========================

function changeImage(img) {

    const mainImage =
        document.getElementById("mainImage");

    if (mainImage) {
        mainImage.src = img.src;
    }

    document.querySelectorAll(".thumb").forEach(item => {
        item.classList.remove("active");
    });

    img.classList.add("active");
}


// ==========================
// URL PRODUCT ID
// ==========================

const params =
    new URLSearchParams(window.location.search);

const productId =
    params.get("id");


// ==========================
// ADMIN PRODUCTS
// ==========================

const adminProducts =
    JSON.parse(
        localStorage.getItem("products")
    ) || [];


// ==========================
// CONVERT ADMIN PRODUCTS
// ==========================

const convertedAdminProducts = adminProducts.map(p => ({

    id: String(p.id),

    name: p.name,

    price: Number(p.price),

    oldPrice: p.oldPrice || "",

    discount: p.discount || "",

    category: p.category || "Other",

    description: p.description || "",

    // ==========================
    // ADMIN PRODUCT 4 IMAGES
    // ==========================

    images: [
        p.images?.[0] || p.image || "",
        p.images?.[1] || "",
        p.images?.[2] || "",
        p.images?.[3] || ""
    ],

    // ==========================
    // STOCK
    // ==========================

    stock: Number(p.stock) || 0,

    // ==========================
    // PRODUCT SPECS
    // ==========================

    specs: {

        brand: p.brand || "JumpSale",

        category: p.category || "Other",

        color: p.color || "N/A",

        connectivity: p.connectivity || "N/A"

    }

}));


// ==========================
// ALL PRODUCTS
// ==========================

const allProducts = [

    ...products,

    ...convertedAdminProducts

];


// ==========================
// FIND PRODUCT
// ==========================

const product =
    allProducts.find(
        p =>
        String(p.id) ===
        String(productId)
    );


// ==========================
// PRODUCT NOT FOUND
// ==========================

if (!product) {

    document.body.innerHTML = `

        <div class="container text-center py-5">

            <h2>Product Not Found</h2>

            <p>
                This product is no longer available.
            </p>

            <a
                href="index.html"
                class="btn btn-warning">

                Back to Home

            </a>

        </div>

    `;

    throw new Error(
        "Product not found"
    );
}


// ==========================
// QUANTITY
// ==========================

let qty = 1;

const qtyInput =
    document.getElementById("qty");

if (qtyInput) {

    qtyInput.value =
        qty;
}


// ==========================
// INCREASE QUANTITY
// ==========================

function increaseQty() {

    const stock =
        Number(product.stock) || 0;


    if (stock <= 0) {

        alert(
            "❌ Product is out of stock."
        );

        return;
    }


    if (qty >= stock) {

        alert(
            "Only " +
            stock +
            " item(s) available in stock."
        );

        return;
    }


    qty++;


    if (qtyInput) {

        qtyInput.value =
            qty;
    }
}


// ==========================
// DECREASE QUANTITY
// ==========================

function decreaseQty() {

    if (qty > 1) {

        qty--;

        if (qtyInput) {

            qtyInput.value =
                qty;
        }
    }
}


// ==========================
// RELATED PRODUCTS
// ==========================

const relatedContainer =
    document.getElementById(
        "relatedProducts"
    );


if (relatedContainer) {

    const relatedProducts =
        allProducts.filter(item =>

            item.category ===
            product.category &&

            String(item.id) !==
            String(product.id)

        );


    relatedProducts
        .slice(0, 4)
        .forEach(item => {

            relatedContainer.innerHTML += `

                <div class="col-md-3 mb-3">

                    <div class="card h-100">

                        <img
                            src="${item.images[0]}"
                            class="card-img-top"
                            alt="${item.name}"
                        >

                        <div class="card-body text-center">

                            <h6>
                                ${item.name}
                            </h6>

                            <h5 class="text-danger">
                                ₹${item.price}
                            </h5>

                        </div>

                    </div>

                </div>

            `;

        });

}


// ==========================
// BUTTONS
// ==========================

const addCartBtn =
    document.getElementById(
        "addCart"
    );


const buyNowBtn =
    document.getElementById(
        "buyNow"
    );


const stockStatus =
    document.getElementById(
        "stockStatus"
    );


// ==========================
// STOCK STATUS
// ==========================

function updateStockStatus() {

    const stock =
        Number(product.stock) || 0;


    // ==========================
    // OUT OF STOCK
    // ==========================

    if (stock <= 0) {


        if (addCartBtn) {

            addCartBtn.disabled =
                true;

            addCartBtn.style.opacity =
                "0.5";

            addCartBtn.style.cursor =
                "not-allowed";

            addCartBtn.innerHTML =
                "❌ Out of Stock";
        }


        if (buyNowBtn) {

            buyNowBtn.disabled =
                true;

            buyNowBtn.style.opacity =
                "0.5";

            buyNowBtn.style.cursor =
                "not-allowed";

            buyNowBtn.innerHTML =
                "❌ Out of Stock";
        }


        if (stockStatus) {

            stockStatus.innerHTML = `

                <span
                    class="text-danger"
                    style="font-size:14px;">

                    ❌ Out of Stock

                </span>

            `;
        }


        return;
    }


    // ==========================
    // IN STOCK
    // ==========================

    if (addCartBtn) {

        addCartBtn.disabled =
            false;

        addCartBtn.style.opacity =
            "1";

        addCartBtn.style.cursor =
            "pointer";

        addCartBtn.innerHTML = `

            <i class="bi bi-cart-plus"></i>

            Add to Cart

        `;
    }


    if (buyNowBtn) {

        buyNowBtn.disabled =
            false;

        buyNowBtn.style.opacity =
            "1";

        buyNowBtn.style.cursor =
            "pointer";

        buyNowBtn.innerHTML =
            "⚡ Buy Now";
    }


    if (stockStatus) {

        stockStatus.innerHTML = `

            <span
                class="text-success"
                style="font-size:14px;">

                ✔ In Stock (${stock} Left)

            </span>

        `;
    }
}


updateStockStatus();


// ==========================
// ADD TO CART
// ==========================

if (addCartBtn) {

    addCartBtn.onclick =
        function () {


            const stock =
                Number(product.stock) || 0;


            if (stock <= 0) {

                alert(
                    "❌ This product is out of stock."
                );

                return;
            }


            if (qty > stock) {

                alert(
                    "Only " +
                    stock +
                    " item(s) available."
                );

                return;
            }


            let cart =
                JSON.parse(
                    localStorage.getItem(
                        "cart"
                    )
                ) || [];


            const exist =
                cart.find(
                    item =>
                    String(item.id) ===
                    String(product.id)
                );


            // PRODUCT ALREADY IN CART

            if (exist) {


                if (
                    Number(exist.qty) +
                    Number(qty)
                    <=
                    stock
                ) {

                    exist.qty =
                        Number(exist.qty) +
                        Number(qty);

                } else {

                    alert(
                        "Only " +
                        stock +
                        " item(s) available."
                    );

                    exist.qty =
                        stock;
                }


            } else {


                // NEW PRODUCT

                cart.push({

                    id:
                        String(product.id),

                    name:
                        product.name,

                    price:
                        Number(product.price),

                    image:
                        product.images[0],

                    stock:
                        stock,

                    qty:
                        Number(qty)

                });

            }


            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            updateBadge();


            alert(
                "✅ Product added to cart."
            );

        };
}


// ==========================
// CART BADGE
// ==========================

function updateBadge() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "cart"
            )
        ) || [];


    let count = 0;


    cart.forEach(item => {

        count +=
            Number(item.qty) || 0;

    });


    document
        .querySelectorAll(
            ".cart-count"
        )
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


updateBadge();


// ==========================
// BUY NOW
// ==========================

if (buyNowBtn) {

    buyNowBtn.onclick =
        function () {


            const stock =
                Number(product.stock) || 0;


            if (stock <= 0) {

                alert(
                    "❌ This product is out of stock."
                );

                return;
            }


            if (qty > stock) {

                alert(
                    "Only " +
                    stock +
                    " item(s) available."
                );

                return;
            }


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


            const buyNowProduct = [{

                id:
                    String(product.id),

                name:
                    product.name,

                price:
                    Number(product.price),

                image:
                    product.images[0],

                stock:
                    stock,

                qty:
                    Number(qty)

            }];


            localStorage.setItem(
                "buyNow",
                JSON.stringify(
                    buyNowProduct
                )
            );


            window.location.href =
                "checkout.html";

        };
}


// ==========================
// WISHLIST
// ==========================

const wishlistBtn =
    document.getElementById(
        "wishlist"
    );


if (wishlistBtn) {

    wishlistBtn.onclick =
        function () {


            let wishlist =
                JSON.parse(
                    localStorage.getItem(
                        "wishlist"
                    )
                ) || [];


            const exist =
                wishlist.find(
                    item =>
                    String(item.id) ===
                    String(product.id)
                );


            if (exist) {

                alert(
                    "Already in Wishlist"
                );

                return;
            }


            wishlist.push(
                product
            );


            localStorage.setItem(
                "wishlist",
                JSON.stringify(
                    wishlist
                )
            );


            alert(
                "❤ Added to Wishlist"
            );

        };
}


// ==========================
// PIN CHECK
// ==========================

const pinInput =
    document.querySelector(
        ".input-group input"
    );


const pinBtn =
    document.querySelector(
        ".input-group button"
    );


const delivery =
    document.querySelector(
        ".text-success"
    );


if (
    pinInput &&
    pinBtn &&
    delivery
) {


    const deliveryPins = [

        110034,
        110033,
        110052,
        110063,
        110026

    ];


    pinInput.addEventListener(
        "input",
        function () {

            delivery.innerHTML =
                "";

        }
    );


    pinBtn.addEventListener(
        "click",
        function () {


            const pin =
                pinInput.value.trim();


            if (pin.length !== 6) {

                delivery.innerHTML = `

                    <span
                        class="text-danger"
                        style="font-size:14px;">

                        ❌ Enter Valid PIN

                    </span>

                `;

                return;
            }


            if (
                deliveryPins.includes(
                    Number(pin)
                )
            ) {

                delivery.innerHTML = `

                    <span
                        class="text-success"
                        style="font-size:14px;">

                        ✅ Delivery Available Tomorrow

                    </span>

                `;

            } else {

                delivery.innerHTML = `

                    <span
                        class="text-danger"
                        style="font-size:14px;">

                        ❌ Delivery Not Available

                    </span>

                `;
            }

        }
    );
}


// ==========================
// LOAD PRODUCT NAME
// ==========================

const productName =
    document.getElementById(
        "productName"
    );


if (productName) {

    productName.innerHTML =
        product.name;
}


// ==========================
// DESCRIPTION
// ==========================

const productDescription =
    document.getElementById(
        "productDescription"
    );


if (productDescription) {

    productDescription.innerHTML =
        product.description;
}


// ==========================
// MAIN IMAGE
// ==========================

const mainImage =
    document.getElementById(
        "mainImage"
    );


if (
    mainImage &&
    product.images[0]
) {

    mainImage.src =
        product.images[0];
}


// ==========================
// THUMBNAIL 1
// ==========================

const thumb1 =
    document.getElementById(
        "thumb1"
    );


if (
    thumb1 &&
    product.images[0]
) {

    thumb1.src =
        product.images[0];
}


// ==========================
// THUMBNAIL 2
// ==========================

const thumb2 =
    document.getElementById(
        "thumb2"
    );


if (
    thumb2 &&
    product.images[1]
) {

    thumb2.src =
        product.images[1];
}


// ==========================
// THUMBNAIL 3
// ==========================

const thumb3 =
    document.getElementById(
        "thumb3"
    );


if (
    thumb3 &&
    product.images[2]
) {

    thumb3.src =
        product.images[2];
}


// ==========================
// THUMBNAIL 4
// ==========================

const thumb4 =
    document.getElementById(
        "thumb4"
    );


if (
    thumb4 &&
    product.images[3]
) {

    thumb4.src =
        product.images[3];
}


// ==========================
// PRICE
// ==========================

const priceElement =
    document.querySelector(
        ".text-danger"
    );


if (priceElement) {

    priceElement.innerHTML =
        "₹" +
        product.price;
}


// ==========================
// OLD PRICE
// ==========================

const oldPrice =
    document.getElementById(
        "oldPrice"
    );


if (oldPrice) {

    oldPrice.innerHTML =
        product.oldPrice
        ? "₹" +
          product.oldPrice
        : "";
}


// ==========================
// DISCOUNT
// ==========================

const discount =
    document.getElementById(
        "discount"
    );


if (discount) {

    discount.innerHTML =
        product.discount || "";
}


// ==========================
// PRODUCT SPECS
// ==========================

const brand =
    document.getElementById(
        "brand"
    );


if (brand) {

    brand.innerHTML =
        product.specs.brand;
}


const category =
    document.getElementById(
        "category"
    );


if (category) {

    category.innerHTML =
        product.specs.category;
}


const color =
    document.getElementById(
        "color"
    );


if (color) {

    color.innerHTML =
        product.specs.color;
}


const connectivity =
    document.getElementById(
        "connectivity"
    );


if (connectivity) {

    connectivity.innerHTML =
        product.specs.connectivity;
}


// ==========================
// REVIEWS
// ==========================

let reviews =
    JSON.parse(
        localStorage.getItem(
            "reviews"
        )
    ) || [];


let showAllReviews = false;


const reviewForm =
    document.getElementById(
        "reviewForm"
    );


const reviewList =
    document.getElementById(
        "reviewList"
    );


// ==========================
// REVIEW IMAGE UPLOAD
// ==========================

const reviewImage =
    document.getElementById(
        "reviewImage"
    );


const imagePreview =
    document.getElementById(
        "imagePreview"
    );


const imageError =
    document.getElementById(
        "imageError"
    );


if (reviewImage) {

    reviewImage.addEventListener(
        "change",
        function () {


            if (imagePreview) {

                imagePreview.innerHTML =
                    "";
            }


            if (imageError) {

                imageError.innerHTML =
                    "";
            }


            const file =
                this.files[0];


            if (!file) {

                return;
            }


            const maxSize =
                100 * 1024;


            if (
                file.size >
                maxSize
            ) {

                if (imageError) {

                    imageError.innerHTML =
                        "❌ Image must be 100 KB or less.";

                }


                this.value =
                    "";

                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (e) {


                    if (!imagePreview) {

                        return;
                    }


                    imagePreview.innerHTML = `

                        <div
                            class="review-image-preview">

                            <img
                                src="${e.target.result}"
                                class="review-uploaded-image"
                                alt="Review Image"
                            >

                            <button
                                type="button"
                                id="removeReviewImage">

                                ×

                            </button>

                        </div>

                    `;


                    const removeBtn =
                        document.getElementById(
                            "removeReviewImage"
                        );


                    if (removeBtn) {

                        removeBtn.addEventListener(
                            "click",
                            function () {


                                reviewImage.value =
                                    "";


                                imagePreview.innerHTML =
                                    "";


                                if (imageError) {

                                    imageError.innerHTML =
                                        "";
                                }

                            }
                        );
                    }

                };


            reader.readAsDataURL(
                file
            );

        }
    );
}


// ==========================
// SHOW REVIEWS
// ==========================

function showReviews() {

    if (!reviewList) {

        return;
    }


    reviewList.innerHTML =
        "";


    const productReviews =
        reviews.filter(
            r =>
            String(r.id) ===
            String(product.id)
        );


    const totalReviews =
        document.getElementById(
            "totalReviews"
        );


    if (totalReviews) {

        totalReviews.innerHTML =
            productReviews.length;
    }


    let total = 0;


    productReviews.forEach(
        r => {

            total +=
                Number(r.star);

        }
    );


    const avgRating =
        document.getElementById(
            "avgRating"
        );


    if (avgRating) {

        if (
            productReviews.length >
            0
        ) {

            avgRating.innerHTML =
                (
                    total /
                    productReviews.length
                ).toFixed(1);

        } else {

            avgRating.innerHTML =
                "0";
        }
    }


    const reviewsToShow =
        showAllReviews
        ? productReviews
        : productReviews.slice(
            0,
            5
        );


    reviewsToShow.forEach(
        r => {


            reviewList.innerHTML += `

                <div
                    class="review-item">

                    <div
                        class="review-header">

                        <h5>
                            ${r.name}
                        </h5>

                        <div
                            class="review-menu">

                            <button
                                type="button"
                                class="menu-btn"
                                data-index="${reviews.indexOf(r)}">

                                <i
                                    class="bi bi-three-dots-vertical">
                                </i>

                            </button>


                            <div
                                class="menu-dropdown">

                                <button
                                    type="button"
                                    class="edit-review"
                                    data-index="${reviews.indexOf(r)}">

                                    <i
                                        class="bi bi-pencil">
                                    </i>

                                    Edit

                                </button>


                                <button
                                    type="button"
                                    class="delete-review"
                                    data-index="${reviews.indexOf(r)}">

                                    <i
                                        class="bi bi-trash">
                                    </i>

                                    Delete

                                </button>

                            </div>

                        </div>

                    </div>


                    <div
                        class="review-stars">

                        ${
                            "★".repeat(
                                Number(r.star)
                            )
                        }

                        ${
                            "☆".repeat(
                                5 -
                                Number(r.star)
                            )
                        }

                    </div>


                    <p
                        class="review-text">

                        ${r.review}

                    </p>


                    <div
                        class="review-date">

                        <i
                            class="bi bi-clock">
                        </i>

                        ${r.dateTime || ""}

                    </div>


                    ${
                        r.image
                        ? `

                            <div
                                class="review-image-container">

                                <img
                                    src="${r.image}"
                                    class="review-image-zoom"
                                    alt="Review Image"
                                >

                            </div>

                        `
                        : ""
                    }

                </div>

                <hr>

            `;

        }
    );


    const moreReviewsBtn =
        document.getElementById(
            "moreReviewsBtn"
        );


    if (moreReviewsBtn) {

        if (
            productReviews.length >
            5 &&
            !showAllReviews
        ) {

            moreReviewsBtn.style.display =
                "inline-block";

        } else {

            moreReviewsBtn.style.display =
                "none";
        }
    }
}


// ==========================
// MORE REVIEWS
// ==========================

const moreReviewsBtn =
    document.getElementById(
        "moreReviewsBtn"
    );


if (moreReviewsBtn) {

    moreReviewsBtn.addEventListener(
        "click",
        function () {

            showAllReviews =
                true;

            showReviews();

        }
    );
}


showReviews();


// ==========================
// PRODUCT RATING
// ==========================

function updateProductRating() {

    const productReviews =
        reviews.filter(
            r =>
            String(r.id) ===
            String(product.id)
        );


    const ratingElement =
        document.getElementById(
            "productRating"
        );


    const countElement =
        document.getElementById(
            "productReviewCount"
        );


    if (
        !ratingElement ||
        !countElement
    ) {

        return;
    }


    if (
        productReviews.length ===
        0
    ) {

        ratingElement.innerHTML =
            "0.0 ★";

        countElement.innerHTML =
            "0";

        return;
    }


    let totalStars =
        0;


    productReviews.forEach(
        review => {

            totalStars +=
                Number(
                    review.star
                );

        }
    );


    const average =
        totalStars /
        productReviews.length;


    ratingElement.innerHTML =
        average.toFixed(1) +
        " ★";


    countElement.innerHTML =
        productReviews.length;
}


updateProductRating();


// ==========================
// REVIEW IMAGE MODAL
// ==========================

document.addEventListener(
    "click",
    function (e) {


        const image =
            e.target.closest(
                ".review-image-zoom"
            );


        if (!image) {

            return;
        }


        const modal =
            document.getElementById(
                "reviewImageModal"
            );


        const fullImage =
            document.getElementById(
                "reviewFullImage"
            );


        if (
            !modal ||
            !fullImage
        ) {

            return;
        }


        fullImage.src =
            image.src;


        modal.style.display =
            "flex";


        document.body.style.overflow =
            "hidden";

    }
);


// ==========================
// REVIEW MENU
// ==========================

document.addEventListener(
    "click",
    function (e) {


        document
            .querySelectorAll(
                ".review-menu"
            )
            .forEach(
                menu => {

                    menu.classList.remove(
                        "active"
                    );

                }
            );


        const btn =
            e.target.closest(
                ".menu-btn"
            );


        if (btn) {

            e.stopPropagation();

            btn.parentElement.classList.add(
                "active"
            );
        }

    }
);


// ==========================
// EDIT REVIEW
// ==========================

document.addEventListener(
    "click",
    function (e) {


        const editBtn =
            e.target.closest(
                ".edit-review"
            );


        if (!editBtn) {

            return;
        }


        const index =
            Number(
                editBtn.dataset.index
            );


        if (!reviews[index]) {

            return;
        }


        const reviewName =
            document.getElementById(
                "reviewName"
            );


        const reviewStar =
            document.getElementById(
                "reviewStar"
            );


        const reviewText =
            document.getElementById(
                "reviewText"
            );


        if (reviewName) {

            reviewName.value =
                reviews[index].name;
        }


        if (reviewStar) {

            reviewStar.value =
                reviews[index].star;
        }


        if (reviewText) {

            reviewText.value =
                reviews[index].review;
        }


        reviews.splice(
            index,
            1
        );


        localStorage.setItem(
            "reviews",
            JSON.stringify(
                reviews
            )
        );


        showReviews();

        updateProductRating();


        if (reviewForm) {

            window.scrollTo({

                top:
                    reviewForm.offsetTop -
                    100,

                behavior:
                    "smooth"

            });

        }

    }
);


// ==========================
// DELETE REVIEW
// ==========================

document.addEventListener(
    "click",
    function (e) {


        const deleteBtn =
            e.target.closest(
                ".delete-review"
            );


        if (!deleteBtn) {

            return;
        }


        const index =
            Number(
                deleteBtn.dataset.index
            );


        if (
            confirm(
                "Delete this review?"
            )
        ) {

            reviews.splice(
                index,
                1
            );


            localStorage.setItem(
                "reviews",
                JSON.stringify(
                    reviews
                )
            );


            showReviews();

            updateProductRating();

        }

    }
);


// ==========================
// SAVE REVIEW
// ==========================

if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const imageInput =
                document.getElementById(
                    "reviewImage"
                );


            function saveReview(
                imageData = ""
            ) {


                reviews.push({

                    id:
                        product.id,

                    name:
                        document.getElementById(
                            "reviewName"
                        ).value,

                    star:
                        Number(
                            document.getElementById(
                                "reviewStar"
                            ).value
                        ),

                    review:
                        document.getElementById(
                            "reviewText"
                        ).value,

                    image:
                        imageData,

                    dateTime:
                        new Date()
                        .toLocaleString(
                            "en-IN"
                        )

                });


                localStorage.setItem(
                    "reviews",
                    JSON.stringify(
                        reviews
                    )
                );


                reviewForm.reset();


                const preview =
                    document.getElementById(
                        "imagePreview"
                    );


                const error =
                    document.getElementById(
                        "imageError"
                    );


                if (preview) {

                    preview.innerHTML =
                        "";
                }


                if (error) {

                    error.innerHTML =
                        "";
                }


                showReviews();

                updateProductRating();

            }


            if (
                !imageInput ||
                !imageInput.files[0]
            ) {

                saveReview();

                return;
            }


            const file =
                imageInput.files[0];


            const maxSize =
                100 * 1024;


            if (
                file.size >
                maxSize
            ) {

                const error =
                    document.getElementById(
                        "imageError"
                    );


                if (error) {

                    error.innerHTML =
                        "❌ Image must be 100 KB or less.";
                }


                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (e) {

                    saveReview(
                        e.target.result
                    );

                };


            reader.readAsDataURL(
                file
            );

        }
    );
}


// ==========================
// OPEN REVIEW IMAGE
// ==========================

function openReviewImage(image) {

    const modal =
        document.getElementById(
            "reviewImageModal"
        );


    const fullImage =
        document.getElementById(
            "reviewFullImage"
        );


    if (
        !modal ||
        !fullImage
    ) {

        return;
    }


    fullImage.src =
        image;


    modal.style.display =
        "flex";


    document.body.style.overflow =
        "hidden";
}


// ==========================
// CLOSE REVIEW IMAGE
// ==========================

function closeReviewImage() {

    const modal =
        document.getElementById(
            "reviewImageModal"
        );


    const fullImage =
        document.getElementById(
            "reviewFullImage"
        );


    if (
        !modal ||
        !fullImage
    ) {

        return;
    }


    modal.style.display =
        "none";


    fullImage.src =
        "";


    document.body.style.overflow =
        "";
}