// ==========================================
// ADMIN PRODUCT SYSTEM
// ADD / UPDATE / EDIT / DELETE
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const productForm =
    document.getElementById("productForm");

const productList =
    document.getElementById("productList");

const message =
    document.getElementById("message");

const formTitle =
    document.getElementById("formTitle");

const saveButton =
    document.getElementById("saveButton");

const cancelButton =
    document.getElementById("cancelButton");


// ==========================================
// EDIT PRODUCT ID
// ==========================================

let editProductId = null;


// ==========================================
// GET PRODUCTS
// ==========================================

function getProducts() {

    return JSON.parse(
        localStorage.getItem("products")
    ) || [];

}


// ==========================================
// SAVE PRODUCTS
// ==========================================

function saveProducts(products) {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}


// ==========================================
// IMAGE TO BASE64
// ==========================================

function imageToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function () {

            resolve(reader.result);

        };

        reader.onerror = function () {

            reject(
                "Image could not be loaded."
            );

        };

        reader.readAsDataURL(file);

    });

}


// ==========================================
// FORM SUBMIT
// ==========================================

productForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();


        // ==================================
        // GET VALUES
        // ==================================

        const name =
            document
                .getElementById("productName")
                .value
                .trim();


        const price =
            Number(
                document
                    .getElementById("price")
                    .value
            );


        const oldPrice =
            Number(
                document
                    .getElementById("oldPrice")
                    .value
            ) || 0;


        const discount =
            document
                .getElementById("discount")
                .value
                .trim();


        const stock =
            Number(
                document
                    .getElementById("stock")
                    .value
            );


        const brand =
            document
                .getElementById("brand")
                .value
                .trim();


        const category =
            document
                .getElementById("category")
                .value
                .trim();


        const color =
            document
                .getElementById("color")
                .value
                .trim();


        const connectivity =
            document
                .getElementById("connectivity")
                .value
                .trim();


        const description =
            document
                .getElementById("description")
                .value
                .trim();


        // ==================================
        // GET IMAGES
        // ==================================

        const image1 =
            document
                .getElementById("image1")
                .files[0];


        const image2 =
            document
                .getElementById("image2")
                .files[0];


        const image3 =
            document
                .getElementById("image3")
                .files[0];


        const image4 =
            document
                .getElementById("image4")
                .files[0];


        // ==================================
        // PRODUCTS
        // ==================================

        let products =
            getProducts();


        // ==================================
        // ADD NEW PRODUCT
        // ==================================

        if (editProductId === null) {


            // Image 1 required

            if (!image1) {

                message.innerHTML = `
                    <div class="alert alert-danger">
                        ❌ Please select Product Image 1.
                    </div>
                `;

                return;

            }


            try {


                // Convert images

                const image1Data =
                    await imageToBase64(image1);


                const image2Data =
                    image2
                        ? await imageToBase64(image2)
                        : "";


                const image3Data =
                    image3
                        ? await imageToBase64(image3)
                        : "";


                const image4Data =
                    image4
                        ? await imageToBase64(image4)
                        : "";


                // ==================================
                // CREATE PRODUCT
                // ==================================

                const product = {

                    id:
                        Date.now().toString(),

                    name:
                        name,

                    price:
                        price,

                    oldPrice:
                        oldPrice,

                    discount:
                        discount,

                    stock:
                        stock,

                    brand:
                        brand,

                    category:
                        category,

                    color:
                        color,

                    connectivity:
                        connectivity,

                    description:
                        description,

                    image:
                        image1Data,

                    images: [

                        image1Data,

                        image2Data,

                        image3Data,

                        image4Data

                    ],

                    specs: {

                        brand:
                            brand,

                        category:
                            category,

                        color:
                            color,

                        connectivity:
                            connectivity

                    }

                };


                // ==================================
                // ADD PRODUCT
                // ==================================

                products.push(product);


                // SAVE

                saveProducts(products);


                // SUCCESS

                message.innerHTML = `
                    <div class="alert alert-success">
                        ✅ Product added successfully!
                    </div>
                `;


                // RESET

                productForm.reset();


                // REFRESH

                displayProducts();


            }

            catch (error) {

                console.error(error);

                message.innerHTML = `
                    <div class="alert alert-danger">
                        ❌ Product could not be added.
                    </div>
                `;

            }


            return;

        }


        // ==================================
        // UPDATE EXISTING PRODUCT
        // ==================================

        const index =
            products.findIndex(
                p =>
                    String(p.id) ===
                    String(editProductId)
            );


        if (index === -1) {

            message.innerHTML = `
                <div class="alert alert-danger">
                    ❌ Product not found.
                </div>
            `;

            return;

        }


        try {


            // Existing product

            const oldProduct =
                products[index];


            // ==================================
            // OLD IMAGE DATA
            // ==================================

            let image1Data =
                oldProduct.images?.[0] ||
                oldProduct.image ||
                "";


            let image2Data =
                oldProduct.images?.[1] ||
                "";


            let image3Data =
                oldProduct.images?.[2] ||
                "";


            let image4Data =
                oldProduct.images?.[3] ||
                "";


            // ==================================
            // NEW IMAGE 1
            // ==================================

            if (image1) {

                image1Data =
                    await imageToBase64(
                        image1
                    );

            }


            // ==================================
            // NEW IMAGE 2
            // ==================================

            if (image2) {

                image2Data =
                    await imageToBase64(
                        image2
                    );

            }


            // ==================================
            // NEW IMAGE 3
            // ==================================

            if (image3) {

                image3Data =
                    await imageToBase64(
                        image3
                    );

            }


            // ==================================
            // NEW IMAGE 4
            // ==================================

            if (image4) {

                image4Data =
                    await imageToBase64(
                        image4
                    );

            }


            // ==================================
            // UPDATE PRODUCT
            // ==================================

            products[index] = {

                ...oldProduct,

                name:
                    name,

                price:
                    price,

                oldPrice:
                    oldPrice,

                discount:
                    discount,

                stock:
                    stock,

                brand:
                    brand,

                category:
                    category,

                color:
                    color,

                connectivity:
                    connectivity,

                description:
                    description,

                image:
                    image1Data,

                images: [

                    image1Data,

                    image2Data,

                    image3Data,

                    image4Data

                ],

                specs: {

                    brand:
                        brand,

                    category:
                        category,

                    color:
                        color,

                    connectivity:
                        connectivity

                }

            };


            // SAVE

            saveProducts(products);


            // SUCCESS MESSAGE

            message.innerHTML = `
                <div class="alert alert-success">
                    ✅ Product updated successfully!
                </div>
            `;


            // RESET EDIT MODE

            cancelEdit();


            // REFRESH

            displayProducts();


        }

        catch (error) {

            console.error(error);

            message.innerHTML = `
                <div class="alert alert-danger">
                    ❌ Product could not be updated.
                </div>
            `;

        }

    }
);


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts() {


    const products =
        getProducts();


    productList.innerHTML = "";


    // NO PRODUCTS

    if (products.length === 0) {

        productList.innerHTML = `
            <div class="col-12">

                <div class="alert alert-info">

                    No products available.

                </div>

            </div>
        `;

        return;

    }


    // PRODUCTS

    products.forEach(product => {


        const image =
            product.images?.[0] ||
            product.image ||
            "";


        const stock =
            Number(product.stock) || 0;


        productList.innerHTML += `

        <div class="col-md-4 mb-4">

            <div class="card h-100 shadow-sm">


                <img
                    src="${image}"
                    class="card-img-top"
                    style="
                        height:220px;
                        object-fit:contain;
                        padding:15px;
                    "
                >


                <div class="card-body">


                    <h5 class="card-title">

                        ${product.name}

                    </h5>


                    <p class="mb-1">

                        <strong>Brand:</strong>

                        ${product.brand || "-"}

                    </p>


                    <p class="mb-1">

                        <strong>Category:</strong>

                        ${product.category || "-"}

                    </p>


                    <p class="mb-1">

                        <strong>Color:</strong>

                        ${product.color || "-"}

                    </p>


                    <p class="mb-1">

                        <strong>Connectivity:</strong>

                        ${product.connectivity || "-"}

                    </p>


                    <p class="mb-1">

                        <strong>Price:</strong>

                        ₹${product.price}

                    </p>


                    <p class="mb-3">

                        <strong>Stock:</strong>

                        ${
                            stock > 0

                            ? `
                                <span class="text-success">
                                    ${stock} Available
                                </span>
                              `

                            : `
                                <span class="text-danger">
                                    ❌ Out of Stock
                                </span>
                              `
                        }

                    </p>


                    <div class="d-flex gap-2">


                        <button
                            class="btn btn-primary btn-sm"
                            onclick="editProduct('${product.id}')"
                        >

                            ✏️ Edit

                        </button>


                        <button
                            class="btn btn-danger btn-sm"
                            onclick="deleteProduct('${product.id}')"
                        >

                            🗑️ Delete

                        </button>


                    </div>


                </div>

            </div>

        </div>

        `;

    });

}


// ==========================================
// EDIT PRODUCT
// ==========================================

function editProduct(id) {


    const products =
        getProducts();


    const product =
        products.find(
            p =>
                String(p.id) ===
                String(id)
        );


    if (!product) {

        alert("Product not found.");

        return;

    }


    // EDIT ID

    editProductId =
        id;


    // ==================================
    // FORM VALUES
    // ==================================

    document.getElementById(
        "productName"
    ).value =
        product.name || "";


    document.getElementById(
        "price"
    ).value =
        product.price || "";


    document.getElementById(
        "oldPrice"
    ).value =
        product.oldPrice || "";


    document.getElementById(
        "discount"
    ).value =
        product.discount || "";


    document.getElementById(
        "stock"
    ).value =
        product.stock ?? 0;


    document.getElementById(
        "brand"
    ).value =
        product.brand ||
        product.specs?.brand ||
        "";


    document.getElementById(
        "category"
    ).value =
        product.category ||
        product.specs?.category ||
        "";


    document.getElementById(
        "color"
    ).value =
        product.color ||
        product.specs?.color ||
        "";


    document.getElementById(
        "connectivity"
    ).value =
        product.connectivity ||
        product.specs?.connectivity ||
        "";


    document.getElementById(
        "description"
    ).value =
        product.description || "";


    // ==================================
    // EDIT MODE UI
    // ==================================

    formTitle.innerText =
        "Update Product";


    saveButton.innerText =
        "Update Product";


    saveButton.classList.remove(
        "btn-warning"
    );


    saveButton.classList.add(
        "btn-success"
    );


    cancelButton.classList.remove(
        "d-none"
    );


    document.getElementById(
        "image1Help"
    ).innerText =
        "Leave images empty to keep existing images.";


    // SCROLL TOP

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// DELETE PRODUCT
// ==========================================

function deleteProduct(id) {


    const products =
        getProducts();


    const product =
        products.find(
            p =>
                String(p.id) ===
                String(id)
        );


    if (!product) {

        alert("Product not found.");

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            product.name +
            "?"
        );


    if (!confirmDelete) {

        return;

    }


    const newProducts =
        products.filter(
            p =>
                String(p.id) !==
                String(id)
        );


    saveProducts(newProducts);


    message.innerHTML = `
        <div class="alert alert-success">
            ✅ Product deleted successfully!
        </div>
    `;


    // अगर deleted product edit mode में था

    if (
        String(editProductId) ===
        String(id)
    ) {

        cancelEdit();

    }


    displayProducts();

}


// ==========================================
// CANCEL EDIT
// ==========================================

function cancelEdit() {


    editProductId = null;


    productForm.reset();


    formTitle.innerText =
        "Add Product";


    saveButton.innerText =
        "Add Product";


    saveButton.classList.remove(
        "btn-success"
    );


    saveButton.classList.add(
        "btn-warning"
    );


    cancelButton.classList.add(
        "d-none"
    );


    document.getElementById(
        "image1Help"
    ).innerText =
        "Image 1 is required for new product.";

}


// ==========================================
// CANCEL BUTTON
// ==========================================

cancelButton.addEventListener(
    "click",
    function () {

        cancelEdit();

    }
);


// ==========================================
// INITIAL LOAD
// ==========================================

displayProducts();

// ==================================================
// LOGOUT
// ==================================================

function logoutAdmin() {

    sessionStorage.removeItem(
        "jumpsaleAdmin"
    );


    window.location.href =
        "admin-login.html";

}