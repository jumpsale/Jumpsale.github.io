const params = new URLSearchParams(window.location.search);

const urlOrderId = decodeURIComponent(
    params.get("id") || ""
).trim();

const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

let order = orders.find(o =>
    String(o.orderId).trim() === urlOrderId
);


// Numeric ID se bhi try karo
if (!order) {

    const urlNumber =
        urlOrderId.match(/\d+/)?.[0];

    if (urlNumber) {

        order = orders.find(o => {

            const storedNumber =
                String(o.orderId)
                    .match(/\d+/)?.[0];

            return storedNumber === urlNumber;

        });

    }
}


// Order nahi mila
if (!order) {

    document.querySelector(
        ".order-details-container"
    ).innerHTML = `

        <div class="order-card text-center">

            <h3>❌ Order Not Found</h3>

            <p>
                Order ID:
                <strong>${urlOrderId}</strong>
            </p>

            <a
                href="orders.html"
                class="btn btn-warning">

                ← Back to My Orders

            </a>

        </div>

    `;

} else {


    // Order ID
    document.getElementById("orderId").innerText =
        order.orderId || "-";


    // Date
    document.getElementById("orderDate").innerText =
        order.date || "-";


    // Status
    document.getElementById("orderStatus").innerText =
        order.status || "Pending";


    // Products
    const productsContainer =
        document.getElementById("productsContainer");

    productsContainer.innerHTML = "";

    let productTotal = 0;


    const products =
        Array.isArray(order.products)
            ? order.products
            : [];


    products.forEach(product => {

        const qty =
            Number(product.qty) || 1;

        const price =
            Number(product.price) || 0;

        const itemTotal =
            price * qty;

        productTotal += itemTotal;


        productsContainer.innerHTML += `

            <div class="product-item">

                ${
                    product.image
                    ?
                    `
                    <img
                        src="${product.image}"
                        class="product-image"
                        alt="${product.name}">
                    `
                    :
                    `
                    <div class="product-image
                                d-flex
                                align-items-center
                                justify-content-center">

                        📦

                    </div>
                    `
                }

                <div class="product-info">

                    <h5>
                        ${product.name || "Product"}
                    </h5>

                    <p class="mb-1">
                        Quantity:
                        <strong>${qty}</strong>
                    </p>

                    <p class="mb-0 product-price">
                        ₹${price} × ${qty}
                    </p>

                </div>

                <div class="product-total">
                    ₹${itemTotal}
                </div>

            </div>

        `;

    });


    // Total
    const grandTotal =
        Number(order.total) || productTotal;


    const deliveryCharge =
        Math.max(
            0,
            grandTotal - productTotal
        );


    document.getElementById("productTotal")
        .innerText =
        "₹" + productTotal;


    document.getElementById("deliveryCharge")
        .innerText =
        "₹" + deliveryCharge;


    document.getElementById("grandTotal")
        .innerText =
        "₹" + grandTotal;

}