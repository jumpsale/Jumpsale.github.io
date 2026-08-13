// ==========================================
// ORDER STOCK SYSTEM
// RESTORE STOCK WHEN ORDER IS CANCELLED
// ==========================================


// ==========================================
// GET PRODUCTS
// ==========================================

function getAdminProducts() {

    return JSON.parse(
        localStorage.getItem("products")
    ) || [];

}


// ==========================================
// SAVE PRODUCTS
// ==========================================

function saveAdminProducts(products) {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}


// ==========================================
// GET ORDERS
// ==========================================

function getOrders() {

    return JSON.parse(
        localStorage.getItem("orders")
    ) || [];

}


// ==========================================
// SAVE ORDERS
// ==========================================

function saveOrders(orders) {

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

}


// ==========================================
// RESTORE ORDER STOCK
// ==========================================

function restoreOrderStock(order) {

    if (!order) {

        console.error(
            "Order not found."
        );

        return false;

    }


    // ======================================
    // PREVENT DOUBLE STOCK RETURN
    // ======================================

    if (
        order.stockRestored === true
    ) {

        console.log(
            "Stock already restored for this order."
        );

        return false;

    }


    // ======================================
    // GET PRODUCTS
    // ======================================

    const products =
        getAdminProducts();


    // ======================================
    // ORDER PRODUCTS
    // ======================================

    const orderProducts =
        order.products || [];


    if (
        orderProducts.length === 0
    ) {

        console.log(
            "No products found in order."
        );

        return false;

    }


    // ======================================
    // RESTORE EACH PRODUCT
    // ======================================

    orderProducts.forEach(
        orderItem => {


        const product =
            products.find(
                p =>
                    String(p.id) ===
                    String(orderItem.id)
            );


        // Product exists
        if (product) {


            const oldStock =
                Number(product.stock) || 0;


            const cancelledQty =
                Number(orderItem.qty) || 0;


            product.stock =
                oldStock +
                cancelledQty;


            console.log(
                "Stock restored:",
                product.name,
                "+",
                cancelledQty
            );

        }

    });


    // ======================================
    // SAVE PRODUCTS
    // ======================================

    saveAdminProducts(
        products
    );


    // ======================================
    // MARK STOCK RESTORED
    // ======================================

    order.stockRestored =
        true;


    return true;

}


// ==========================================
// CANCEL ORDER
// ==========================================

function cancelOrderAndRestoreStock(
    orderId
) {


    const orders =
        getOrders();


    // ======================================
    // FIND ORDER
    // ======================================

    const orderIndex =
        orders.findIndex(
            order =>
                String(order.orderId) ===
                String(orderId)
        );


    if (
        orderIndex === -1
    ) {

        alert(
            "Order not found."
        );

        return false;

    }


    const order =
        orders[orderIndex];


    // ======================================
    // ALREADY CANCELLED
    // ======================================

    if (
        order.status ===
        "Cancelled"
    ) {

        alert(
            "This order is already cancelled."
        );

        return false;

    }


    // ======================================
    // RESTORE STOCK
    // ======================================

    const restored =
        restoreOrderStock(
            order
        );


    // ======================================
    // UPDATE ORDER STATUS
    // ======================================

    order.status =
        "Cancelled";


    order.cancelledAt =
        new Date().toLocaleString(
            "en-IN"
        );


    // ======================================
    // SAVE ORDERS
    // ======================================

    saveOrders(
        orders
    );


    // ======================================
    // SUCCESS
    // ======================================

    if (restored) {

     

        alert(
            "Order cancelled successfully."
        );

    }


    return true;

}