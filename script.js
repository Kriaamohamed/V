/*
====================================================
Kriaa Services
Complete JavaScript
====================================================
*/


/* ==================================================
   DEFAULT PRODUCTS
================================================== */

const defaultProducts = [

    {
        id: 1,
        name: "متابعين انستا",
        price: "10DT",
        image: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        description: "متابعين بجودة ممتازة",
        quantity: "1000 متابع",
        orderName: "1000 Insta Followers"
    },

    {
        id: 2,
        name: "مشاهدات ريلز",
        price: "1DT",
        image: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        description: "سرعة فائقة في التنفيذ",
        quantity: "1000 مشاهدة",
        orderName: "1000 Insta Reels Views"
    },

    {
        id: 3,
        name: "لايكات انستا",
        price: "3DT",
        image: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",
        description: "لايكات حقيقية وآمنة",
        quantity: "1000 لايك",
        orderName: "1000 Insta Likes"
    },

    {
        id: 4,
        name: "متابعين تيك توك",
        price: "15DT",
        image: "https://cdn-icons-png.flaticon.com/512/3046/3046121.png",
        description: "دعم الحساب للانتشار",
        quantity: "1000 متابع",
        orderName: "1000 TikTok Followers"
    },

    {
        id: 5,
        name: "مشاهدات تيك توك",
        price: "1DT",
        image: "https://cdn-icons-png.flaticon.com/512/3046/3046121.png",
        description: "توصيل فوري للمشاهدات",
        quantity: "1000 مشاهدة",
        orderName: "1000 TikTok Views"
    },

    {
        id: 6,
        name: "لايكات تيك توك",
        price: "4DT",
        image: "https://cdn-icons-png.flaticon.com/512/3046/3046121.png",
        description: "تفاعل عالي للفيديو",
        quantity: "1000 لايك",
        orderName: "1000 TikTok Likes"
    },

    {
        id: 7,
        name: "مشتركين يوتيوب",
        price: "20DT",
        image: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
        description: "مشتركين دائمين للقناة",
        quantity: "1000 مشترك",
        orderName: "1000 YouTube Subs"
    }

];


/* ==================================================
   GLOBAL ORDER DATA
================================================== */

let selectedOrderService = "";

let selectedOrderProduct = null;


/* ==================================================
   PRODUCTS
================================================== */

function getProducts() {

    const saved =
        localStorage.getItem(
            "kriaa_products"
        );


    if (saved) {

        try {

            const products =
                JSON.parse(saved);


            if (Array.isArray(products)) {

                return products;

            }

        } catch (error) {

            console.error(
                "Products error:",
                error
            );

        }

    }


    const initial =
        JSON.parse(
            JSON.stringify(
                defaultProducts
            )
        );


    saveProducts(initial);


    return initial;

}


function saveProducts(products) {

    localStorage.setItem(
        "kriaa_products",
        JSON.stringify(products)
    );

}


/* ==================================================
   ORDERS
================================================== */

function getOrders() {

    const saved =
        localStorage.getItem(
            "kriaa_orders"
        );


    if (saved) {

        try {

            const orders =
                JSON.parse(saved);


            if (Array.isArray(orders)) {

                return orders;

            }

        } catch (error) {

            console.error(
                "Orders error:",
                error
            );

        }

    }


    return [];

}


function saveOrders(orders) {

    localStorage.setItem(
        "kriaa_orders",
        JSON.stringify(orders)
    );

}


/* ==================================================
   SHOW PAGE
================================================== */

function show(id) {

    if (
        id === "adminDashboard" &&
        !isAdmin()
    ) {

        alert(
            "غير مسموح بالدخول إلى لوحة الإدارة."
        );

        return;

    }


    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach(
        function(page) {

            page.classList.remove(
                "active"
            );

        }
    );


    const target =
        document.getElementById(id);


    if (!target) {

        return;

    }


    target.classList.add(
        "active"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==================================================
   ORDER MODAL
================================================== */

function openOrderModal(
    service,
    productName
) {

    selectedOrderService =
        service;


    selectedOrderProduct =
        productName || service;


    const modal =
        document.getElementById(
            "orderModal"
        );


    const serviceName =
        document.getElementById(
            "orderServiceName"
        );


    const message =
        document.getElementById(
            "orderMessage"
        );


    if (serviceName) {

        serviceName.textContent =
            selectedOrderProduct;

    }


    if (message) {

        message.textContent = "";

    }


    if (modal) {

        modal.classList.add(
            "show"
        );

    }


    const name =
        document.getElementById(
            "customerName"
        );


    if (name) {

        setTimeout(
            function() {

                name.focus();

            },
            100
        );

    }

}


function closeOrderModal() {

    const modal =
        document.getElementById(
            "orderModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/* ==================================================
   SUBMIT ORDER
================================================== */

function submitOrderWhatsApp() {

    const name =
        document.getElementById(
            "customerName"
        ).value.trim();


    const accountLink =
        document.getElementById(
            "accountLink"
        ).value.trim();


    const contentLink =
        document.getElementById(
            "contentLink"
        ).value.trim();


    const quantity =
        document.getElementById(
            "orderQuantity"
        ).value;


    const messageElement =
        document.getElementById(
            "orderMessage"
        );


    if (!name) {

        messageElement.textContent =
            "⚠️ اكتب اسمك أولاً.";

        return;

    }


    /*
       Save order
    */

    const orders =
        getOrders();


    const order = {

        id:
            Date.now(),

        service:
            selectedOrderProduct ||
            selectedOrderService,

        name:
            name,

        accountLink:
            accountLink,

        contentLink:
            contentLink,

        quantity:
            quantity,

        method:
            "WhatsApp",

        status:
            "pending",

        createdAt:
            new Date().toLocaleString(
                "ar-TN"
            )

    };


    orders.unshift(
        order
    );


    saveOrders(
        orders
    );


    /*
       WhatsApp message
    */

    const phone =
        "21627049943";


    const whatsappMessage =
        "مرحباً، أريد طلب خدمة من Kriaa Services.%0A%0A" +

        "👤 الاسم: " +
        encodeURIComponent(name) +

        "%0A" +

        "🛍️ الخدمة: " +
        encodeURIComponent(
            order.service
        ) +

        "%0A" +

        "🔢 العدد: " +
        encodeURIComponent(
            quantity
        ) +

        "%0A" +

        "🔗 رابط الحساب: " +
        encodeURIComponent(
            accountLink ||
            "غير موجود"
        ) +

        "%0A" +

        "🎬 رابط الفيديو/الصورة: " +
        encodeURIComponent(
            contentLink ||
            "غير موجود"
        ) +

        "%0A%0A" +

        "⏱️ أرجو تجهيز الطلب خلال 2h أو أقل.";


    window.open(
        "https://wa.me/" +
        phone +
        "?text=" +
        whatsappMessage,
        "_blank"
    );


    messageElement.textContent =
        "✅ تم تسجيل الطلب وفتح WhatsApp.";


    renderAdminOrders();

}


/* ==================================================
   BASIC ORDER
================================================== */

function order(service) {

    openOrderModal(
        service,
        service
    );

}


/* ==================================================
   WHATSAPP FLOAT
================================================== */

function whatsapp() {

    window.open(
        "https://wa.me/21627049943",
        "_blank"
    );

}


/* ==================================================
   DESCRIPTION
================================================== */

function desc(text) {

    alert(
        "ℹ️ " + text
    );

}


/* ==================================================
   LOGIN
================================================== */

function openLogin() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (!modal) return;


    modal.classList.add(
        "show"
    );


    const message =
        document.getElementById(
            "loginMessage"
        );


    if (message) {

        message.textContent =
            "";

    }


    const username =
        document.getElementById(
            "usernameInput"
        );


    if (username) {

        setTimeout(
            function() {

                username.focus();

            },
            100
        );

    }

}


function closeLogin() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/* ==================================================
   LOGIN
================================================== */

function login() {

    const username =
        document.getElementById(
            "usernameInput"
        ).value.trim();


    const password =
        document.getElementById(
            "passwordInput"
        ).value;


    const message =
        document.getElementById(
            "loginMessage"
        );


    if (
        !username ||
        !password
    ) {

        message.textContent =
            "يرجى إدخال اسم المستخدم وكلمة المرور.";

        return;

    }


    /*
       ADMIN
    */

    if (
        username === "admin" &&
        password === "26738291"
    ) {

        localStorage.setItem(
            "kriaa_logged_in",
            "true"
        );

        localStorage.setItem(
            "kriaa_role",
            "admin"
        );


        closeLogin();

        updateLoginUI();


        document.getElementById(
            "usernameInput"
        ).value = "";


        document.getElementById(
            "passwordInput"
        ).value = "";


        alert(
            "تم تسجيل الدخول كـ Admin."
        );


        return;

    }


    /*
       NORMAL USER
    */

    localStorage.setItem(
        "kriaa_logged_in",
        "true"
    );


    localStorage.setItem(
        "kriaa_role",
        "user"
    );


    closeLogin();

    updateLoginUI();


    document.getElementById(
        "usernameInput"
    ).value = "";


    document.getElementById(
        "passwordInput"
    ).value = "";


    alert(
        "تم تسجيل الدخول بنجاح."
    );

}


/* ==================================================
   AUTH
================================================== */

function isLoggedIn() {

    return (
        localStorage.getItem(
            "kriaa_logged_in"
        ) === "true"
    );

}


function isAdmin() {

    return (
        isLoggedIn() &&
        localStorage.getItem(
            "kriaa_role"
        ) === "admin"
    );

}


/* ==================================================
   LOGIN UI
================================================== */

function updateLoginUI() {

    const loginButton =
        document.getElementById(
            "loginButton"
        );


    const adminButton =
        document.getElementById(
            "adminButton"
        );


    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (loginButton) {

        loginButton.style.display =
            isLoggedIn()
                ? "none"
                : "inline-block";

    }


    if (logoutButton) {

        logoutButton.style.display =
            isLoggedIn()
                ? "inline-block"
                : "none";

    }


    if (adminButton) {

        adminButton.style.display =
            isAdmin()
                ? "inline-block"
                : "none";

    }

}


/* ==================================================
   LOGOUT
================================================== */

function logout() {

    localStorage.removeItem(
        "kriaa_logged_in"
    );


    localStorage.removeItem(
        "kriaa_role"
    );


    show("home");

    updateLoginUI();

}


/* ==================================================
   ADMIN DASHBOARD
================================================== */

function openAdminDashboard() {

    if (!isAdmin()) {

        alert(
            "غير مسموح بالدخول إلى لوحة الإدارة."
        );

        return;

    }


    renderAdminProducts();

    renderAdminOrders();

    show(
        "adminDashboard"
    );

}


/* ==================================================
   STORE PRODUCTS
================================================== */

function renderProducts() {

    const container =
        document.getElementById(
            "productsContainer"
        );


    if (!container) return;


    const products =
        getProducts();


    container.innerHTML =
        "";


    products.forEach(
        function(product) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                product.image;


            image.alt =
                product.name;


            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                product.name;


            const price =
                document.createElement(
                    "p"
                );


            price.className =
                "price";


            price.textContent =
                product.price;


            const quantity =
                document.createElement(
                    "p"
                );


            quantity.textContent =
                product.quantity ||
                "";


            const group =
                document.createElement(
                    "div"
                );


            group.className =
                "btn-group";


            const buy =
                document.createElement(
                    "button"
                );


            buy.className =
                "buy-btn";


            buy.textContent =
                "شراء";


            buy.onclick =
                function() {

                    openOrderModal(
                        product.orderName ||
                        product.name,
                        product.name
                    );

                };


            const description =
                document.createElement(
                    "button"
                );


            description.className =
                "desc-btn";


            description.textContent =
                "وصف";


            description.onclick =
                function() {

                    desc(
                        product.description ||
                        "لا يوجد وصف"
                    );

                };


            group.appendChild(
                buy
            );


            group.appendChild(
                description
            );


            card.appendChild(
                image
            );


            card.appendChild(
                title
            );


            card.appendChild(
                price
            );


            card.appendChild(
                quantity
            );


            card.appendChild(
                group
            );


            container.appendChild(
                card
            );

        }
    );

}


/* ==================================================
   IMAGE FILE TO BASE64
================================================== */

function imageToBase64(file) {

    return new Promise(
        function(resolve, reject) {

            const reader =
                new FileReader();


            reader.onload =
                function() {

                    resolve(
                        reader.result
                    );

                };


            reader.onerror =
                function() {

                    reject(
                        new Error(
                            "Image reading failed"
                        )
                    );

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


/* ==================================================
   IMAGE PREVIEW
================================================== */

document.addEventListener(
    "change",
    function(event) {

        if (
            event.target.id !==
            "newProductImage"
        ) {

            return;

        }


        const file =
            event.target.files[0];


        const preview =
            document.getElementById(
                "imagePreview"
            );


        if (
            !file ||
            !preview
        ) {

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function(e) {

                preview.style.display =
                    "block";


                preview.innerHTML =
                    `
                    <img
                        src="${e.target.result}"
                        alt="Preview"
                    >
                    `;

            };


        reader.readAsDataURL(
            file
        );

    }
);


/* ==================================================
   ADD PRODUCT
================================================== */

async function addProduct() {

    if (!isAdmin()) {

        alert(
            "يجب تسجيل الدخول كـ Admin."
        );

        return;

    }


    const name =
        document.getElementById(
            "newProductName"
        ).value.trim();


    const price =
        document.getElementById(
            "newProductPrice"
        ).value.trim();


    const imageFile =
        document.getElementById(
            "newProductImage"
        ).files[0];


    const description =
        document.getElementById(
            "newProductDescription"
        ).value.trim();


    const quantity =
        document.getElementById(
            "newProductQuantity"
        ).value.trim();


    if (!name || !price) {

        alert(
            "أدخل اسم المنتج والسعر."
        );

        return;

    }


    let image =
        "https://cdn-icons-png.flaticon.com/512/3081/3081559.png";


    if (imageFile) {

        try {

            image =
                await imageToBase64(
                    imageFile
                );

        } catch (error) {

            alert(
                "تعذر قراءة الصورة."
            );

            return;

        }

    }


    const products =
        getProducts();


    products.push({

        id:
            Date.now(),

        name:
            name,

        price:
            price,

        image:
            image,

        description:
            description ||
            "لا يوجد وصف",

        quantity:
            quantity ||
            "خدمة متوفرة",

        orderName:
            name

    });


    saveProducts(
        products
    );


    document.getElementById(
        "newProductName"
    ).value = "";


    document.getElementById(
        "newProductPrice"
    ).value = "";


    document.getElementById(
        "newProductImage"
    ).value = "";


    document.getElementById(
        "newProductDescription"
    ).value = "";


    document.getElementById(
        "newProductQuantity"
    ).value = "";


    const preview =
        document.getElementById(
            "imagePreview"
        );


    if (preview) {

        preview.style.display =
            "none";

        preview.innerHTML =
            "";

    }


    renderProducts();

    renderAdminProducts();


    alert(
        "تمت إضافة المنتج بنجاح."
    );

}


/* ==================================================
   ADMIN PRODUCTS
================================================== */

function renderAdminProducts() {

    const container =
        document.getElementById(
            "adminProducts"
        );


    if (!container) return;


    if (!isAdmin()) {

        container.innerHTML =
            "<p>غير مسموح.</p>";

        return;

    }


    const products =
        getProducts();


    container.innerHTML =
        "";


    products.forEach(
        function(product) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "admin-product";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                product.image;


            image.alt =
                product.name;


            const info =
                document.createElement(
                    "div"
                );


            info.className =
                "admin-product-info";


            const title =
                document.createElement(
                    "h4"
                );


            title.textContent =
                product.name;


            const price =
                document.createElement(
                    "span"
                );


            price.textContent =
                product.price;


            const br =
                document.createElement(
                    "br"
                );


            const description =
                document.createElement(
                    "small"
                );


            description.textContent =
                product.description ||
                "";


            info.appendChild(
                title
            );

            info.appendChild(
                price
            );

            info.appendChild(
                br
            );

            info.appendChild(
                description
            );


            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "admin-actions";


            const edit =
                document.createElement(
                    "button"
                );


            edit.className =
                "edit-btn";


            edit.textContent =
                "تعديل";


            edit.onclick =
                function() {

                    editProduct(
                        product.id
                    );

                };


            const remove =
                document.createElement(
                    "button"
                );


            remove.className =
                "delete-btn";


            remove.textContent =
                "حذف";


            remove.onclick =
                function() {

                    deleteProduct(
                        product.id
                    );

                };


            actions.appendChild(
                edit
            );


            actions.appendChild(
                remove
            );


            item.appendChild(
                image
            );


            item.appendChild(
                info
            );


            item.appendChild(
                actions
            );


            container.appendChild(
                item
            );

        }
    );

}


/* ==================================================
   EDIT PRODUCT
================================================== */

function editProduct(id) {

    if (!isAdmin()) {

        return;

    }


    const products =
        getProducts();


    const product =
        products.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!product) return;


    const newName =
        prompt(
            "اسم المنتج:",
            product.name
        );


    if (newName === null)
        return;


    const newPrice =
        prompt(
            "السعر:",
            product.price
        );


    if (newPrice === null)
        return;


    const newDescription =
        prompt(
            "الوصف:",
            product.description
        );


    if (newDescription === null)
        return;


    const newQuantity =
        prompt(
            "الكمية:",
            product.quantity
        );


    if (newQuantity === null)
        return;


    product.name =
        newName.trim() ||
        product.name;


    product.price =
        newPrice.trim() ||
        product.price;


    product.description =
        newDescription.trim() ||
        product.description;


    product.quantity =
        newQuantity.trim() ||
        product.quantity;


    product.orderName =
        product.name;


    saveProducts(
        products
    );


    renderProducts();

    renderAdminProducts();

}


/* ==================================================
   DELETE PRODUCT
================================================== */

function deleteProduct(id) {

    if (!isAdmin()) {

        return;

    }


    const products =
        getProducts();


    const product =
        products.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!product) return;


    const confirmed =
        confirm(
            'هل تريد حذف "' +
            product.name +
            '"؟'
        );


    if (!confirmed)
        return;


    const updated =
        products.filter(
            function(item) {

                return item.id !== id;

            }
        );


    saveProducts(
        updated
    );


    renderProducts();

    renderAdminProducts();

}


/* ==================================================
   ADMIN ORDERS
================================================== */

function renderAdminOrders() {

    const container =
        document.getElementById(
            "adminOrders"
        );


    const count =
        document.getElementById(
            "ordersCount"
        );


    if (!container)
        return;


    if (!isAdmin()) {

        container.innerHTML =
            "<p>غير مسموح.</p>";

        return;

    }


    const orders =
        getOrders();


    if (count) {

        count.textContent =
            orders.length;

    }


    if (orders.length === 0) {

        container.innerHTML =
            `
            <div class="no-orders">
                لا توجد طلبات حتى الآن.
            </div>
            `;

        return;

    }


    container.innerHTML =
        "";


    orders.forEach(
        function(order) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "admin-order";


            if (
                order.status ===
                "completed"
            ) {

                item.classList.add(
                    "completed"
                );

            }


            const top =
                document.createElement(
                    "div"
                );


            top.className =
                "order-top";


            const id =
                document.createElement(
                    "span"
                );


            id.className =
                "order-id";


            id.textContent =
                "#" +
                order.id;


            const status =
                document.createElement(
                    "span"
                );


            status.className =
                "order-status";


            status.textContent =
                order.status ===
                "completed"
                    ? "🟢 مكتمل"
                    : "🟠 قيد التنفيذ";


            top.appendChild(
                id
            );


            top.appendChild(
                status
            );


            const details =
                document.createElement(
                    "div"
                );


            details.className =
                "order-details";


            details.innerHTML =
                `
                <strong>👤 العميل:</strong>
                ${escapeHTML(order.name)}
                <br>

                <strong>🛍️ الخدمة:</strong>
                ${escapeHTML(order.service)}
                <br>

                <strong>🔢 العدد:</strong>
                ${escapeHTML(order.quantity)}
                <br>

                <strong>📱 الطريقة:</strong>
                ${escapeHTML(order.method)}
                <br>

                <strong>🕒 وقت الطلب:</strong>
                ${escapeHTML(order.createdAt)}
                <br>

                <strong>🔗 الحساب:</strong>
                ${
                    order.accountLink
                    ?
                    `<a href="${escapeAttribute(order.accountLink)}" target="_blank">فتح الرابط</a>`
                    :
                    "غير موجود"
                }

                <br>

                <strong>🎬 الفيديو/الصورة:</strong>
                ${
                    order.contentLink
                    ?
                    `<a href="${escapeAttribute(order.contentLink)}" target="_blank">فتح الرابط</a>`
                    :
                    "غير موجود"
                }
                `;


            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "order-actions";


            if (
                order.status !==
                "completed"
            ) {

                const complete =
                    document.createElement(
                        "button"
                    );


                complete.className =
                    "order-complete-btn";


                complete.textContent =
                    "✅ تم إكمال الطلب";


                complete.onclick =
                    function() {

                        setOrderStatus(
                            order.id,
                            "completed"
                        );

                    };


                actions.appendChild(
                    complete
                );

            } else {

                const pending =
                    document.createElement(
                        "button"
                    );


                pending.className =
                    "order-pending-btn";


                pending.textContent =
                    "↩️ إعادة لقيد التنفيذ";


                pending.onclick =
                    function() {

                        setOrderStatus(
                            order.id,
                            "pending"
                        );

                    };


                actions.appendChild(
                    pending
                );

            }


            const remove =
                document.createElement(
                    "button"
                );


            remove.className =
                "order-delete-btn";


            remove.textContent =
                "🗑️ حذف الطلب";


            remove.onclick =
                function() {

                    deleteOrder(
                        order.id
                    );

                };


            actions.appendChild(
                remove
            );


            item.appendChild(
                top
            );


            item.appendChild(
                details
            );


            item.appendChild(
                actions
            );


            container.appendChild(
                item
            );

        }
    );

}


/* ==================================================
   ORDER STATUS
================================================== */

function setOrderStatus(
    id,
    status
) {

    if (!isAdmin()) {

        return;

    }


    const orders =
        getOrders();


    const order =
        orders.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!order)
        return;


    order.status =
        status;


    saveOrders(
        orders
    );


    renderAdminOrders();

}


/* ==================================================
   DELETE ORDER
================================================== */

function deleteOrder(id) {

    if (!isAdmin()) {

        return;

    }


    const confirmed =
        confirm(
            "هل تريد حذف هذا الطلب؟"
        );


    if (!confirmed)
        return;


    const orders =
        getOrders();


    const updated =
        orders.filter(
            function(order) {

                return order.id !== id;

            }
        );


    saveOrders(
        updated
    );


    renderAdminOrders();

}


/* ==================================================
   LANGUAGE
================================================== */

const translations = {

    ar: {

        home:
            "الرئيسية",

        services:
            "الخدمات",

        designs:
            "تصاميم",

        login:
            "تسجيل الدخول",

        logout:
            "تسجيل الخروج",

        heroTitle:
            "🔥 كبّر حسابك بسهولة",

        heroText:
            "خدمات سريعة ونتائج مضمونة 100%",

        start:
            "ابدأ الآن",

        servicesTitle:
            "📊 خدماتنا المطورة",

        thumbnails:
            "🎨 الصور المصغرة",

        orderDesign:
            "اطلب تصميمك",

        loginTitle:
            "🔐 تسجيل الدخول"

    },


    fr: {

        home:
            "Accueil",

        services:
            "Services",

        designs:
            "Designs",

        login:
            "Connexion",

        logout:
            "Déconnexion",

        heroTitle:
            "🔥 Développez votre compte facilement",

        heroText:
            "Services rapides et résultats garantis à 100%",

        start:
            "Commencer",

        servicesTitle:
            "📊 Nos services",

        thumbnails:
            "🎨 Miniatures",

        orderDesign:
            "Commander",

        loginTitle:
            "🔐 Connexion"

    },


    en: {

        home:
            "Home",

        services:
            "Services",

        designs:
            "Designs",

        login:
            "Login",

        logout:
            "Logout",

        heroTitle:
            "🔥 Grow your account easily",

        heroText:
            "Fast services with 100% guaranteed results",

        start:
            "Get Started",

        servicesTitle:
            "📊 Our Services",

        thumbnails:
            "🎨 Thumbnails",

        orderDesign:
            "Order Design",

        loginTitle:
            "🔐 Login"

    }

};


/* ==================================================
   CHANGE LANGUAGE
================================================== */

function changeLanguage(
    language
) {

    if (
        !translations[language]
    ) {

        language = "ar";

    }


    const data =
        translations[
            language
        ];


    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(
            function(element) {

                const key =
                    element.getAttribute(
                        "data-i18n"
                    );


                if (
                    data[key] !==
                    undefined
                ) {

                    element.textContent =
                        data[key];

                }

            }
        );


    if (
        language ===
        "ar"
    ) {

        document.documentElement.lang =
            "ar";

        document.documentElement.dir =
            "rtl";

    } else {

        document.documentElement.lang =
            language;

        document.documentElement.dir =
            "ltr";

    }


    localStorage.setItem(
        "kriaa_language",
        language
    );

}


/* ==================================================
   LOAD LANGUAGE
================================================== */

function loadLanguage() {

    let language =
        localStorage.getItem(
            "kriaa_language"
        );


    if (
        !language ||
        !translations[language]
    ) {

        language =
            "ar";

    }


    const selector =
        document.getElementById(
            "languageSelect"
        );


    if (selector) {

        selector.value =
            language;

    }


    changeLanguage(
        language
    );

}


/* ==================================================
   SECURITY HELPERS
================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(value) {

    return String(value)
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

}


/* ==================================================
   MODAL OUTSIDE CLICK
================================================== */

document.addEventListener(
    "click",
    function(event) {

        const loginModal =
            document.getElementById(
                "loginModal"
            );


        const orderModal =
            document.getElementById(
                "orderModal"
            );


        if (
            loginModal &&
            event.target ===
            loginModal
        ) {

            closeLogin();

        }


        if (
            orderModal &&
            event.target ===
            orderModal
        ) {

            closeOrderModal();

        }

    }
);


/* ==================================================
   ENTER KEY
================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key !==
            "Enter"
        ) {

            return;

        }


        const loginModal =
            document.getElementById(
                "loginModal"
            );


        if (
            loginModal &&
            loginModal.classList.contains(
                "show"
            )
        ) {

            login();

        }

    }
);


/* ==================================================
   INITIALIZATION
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        show(
            "home"
        );


        renderProducts();


        updateLoginUI();


        loadLanguage();

    }
);
