var selectedProduct = null; // Зберігає обраний товар

// Функція для відображення товарів вибраної категорії
function showProducts(category) {
    var productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Очищення списку товарів

    var products = getProductsByCategory(category);

    // Додавання товарів до списку
    for (var i = 0; i < products.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = products[i].name;
        li.onclick = function () {
            showProductDetails(this.innerHTML);
            updateSelectedCategory(this.id);
        };
        productList.appendChild(li);
    }

    // Очищення інформації про товар
    document.getElementById("product-details").innerHTML = "";
    selectedProduct = null;
    hideBuyButton();
}

// Функція для відображення інформації про обраний товар
function showProductDetails(productName) {
    var productDetails = document.getElementById("product-details");

    var product = getProductByName(productName);

    // Відображення інформації про товар
    productDetails.innerHTML =
        "<h3>" + product.name + "</h3><p>" + product.description + "</p>";

    // Зберігання обраного товару
    selectedProduct = product;

    showBuyButton();
}

// Функція для відображення кнопки "Купити"
function showBuyButton() {
    var buyButton = document.getElementById("buy-button");
    buyButton.style.display = "block";
}

// Функція для сховування кнопки "Купити"
function hideBuyButton() {
    var buyButton = document.getElementById("buy-button");
    buyButton.style.display = "none";
}

// Функція для оновлення вибраної категорії
function updateSelectedCategory(categoryId) {
    var categories = document.getElementsByTagName("li");
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id === categoryId) {
            categories[i].classList.add("selected");
        } else {
            categories[i].classList.remove("selected");
        }
    }
}

// Функція для відкриття модального вікна форми оформлення замовлення
function openOrderForm() {
    var modal = document.getElementById("order-modal");
    modal.style.display = "block";
}

// Функція для закриття модального вікна форми оформлення замовлення
function closeOrderForm() {
    var modal = document.getElementById("order-modal");
    modal.style.display = "none";
}

// Функція для перевірки даних користувача при підтвердженні замовлення
function submitOrder(event) {
    event.preventDefault();
    var form = document.getElementById("order-form");
    var name = form.name.value;
    var city = form.city.value;
    var delivery = form.delivery.value;
    var payment = form.payment.value;
    var quantity = form.quantity.value;

    // Перевірка на обов'язкові поля
    var errorMessage = document.getElementById("error-message");
    if (!name || !city || !delivery || !payment || !quantity) {
        errorMessage.innerText = "Будь ласка, заповніть всі обов'язкові поля.";
        return;
    }

    // Виведення інформації про замовлення на сторінку
    var orderDetails = document.getElementById("order-details");
    var orderInfo =
        "<h2>Інформація про замовлення</h2>" +
        "<p><b>Товар:</b> " +
        selectedProduct.name +
        "</p>" +
        "<p><b>Кількість:</b> " +
        quantity +
        "</p>" +
        "<p><b>ПІБ покупця:</b> " +
        name +
        "</p>" +
        "<p><b>Місто:</b> " +
        city +
        "</p>" +
        "<p><b>Склад Нової пошти:</b> " +
        delivery +
        "</p>" +
        "<p><b>Спосіб оплати:</b> " +
        payment +
        "</p>";
    orderDetails.innerHTML = orderInfo;

    // Закриття модального вікна
    closeOrderForm();
}

function getProductsByCategory(category) {
    if (category === "electronics") {
        return [
            { name: "Смартфон", description: "Дуже крутий смартфон" },
            { name: "Ноутбук", description: "Можливо, найдорожчий ноутбук на світі" },
        ];
    } else if (category === "clothing") {
        return [
            { name: "Футболка", description: "Класна футболка" },
            { name: "Джинси", description: "Стильні джинси" },
        ];
    } else if (category === "books") {
        return [
            { name: "Роман", description: "Цікавий роман" },
            { name: "Детектив", description: "Напружений детектив" },
        ];
    }
}

function getProductByName(productName) {
    if (productName === "Смартфон") {
        return { name: "Смартфон", description: "Дуже крутий смартфон" };
    } else if (productName === "Ноутбук") {
        return {
            name: "Ноутбук",
            description: "Можливо, найдорожчий ноутбук на світі",
        };
    } else if (productName === "Футболка") {
        return { name: "Футболка", description: "Класна футболка" };
    } else if (productName === "Джинси") {
        return { name: "Джинси", description: "Стильні джинси" };
    } else if (productName === "Роман") {
        return { name: "Роман", description: "Цікавий роман" };
    } else if (productName === "Детектив") {
        return { name: "Детектив", description: "Напружений детектив" };
    }
}
