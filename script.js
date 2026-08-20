let currentLanguage = "ka";
let currentCategory = "all";

const translations = {
  ka: {
    subtitle: "გემრიელი საკვები და კარგი განწყობა",
    openStatus: "🟢 ღიაა",
    address: "📍 ბათუმი, გორგილაძის ქუჩა 25",
    hours: "🕒 09:00 - 23:00",
    call: "📞 დარეკვა",
    instagram: "📷 Instagram",
    map: "📍 რუკაზე ნახვა",
    search: "🔎 მოძებნე კერძი...",
    all: "ყველა",
    pizza: "🍕 პიცა",
    burger: "🍔 ბურგერი",
    drink: "🥤 სასმელები",
    dessert: "🍰 დესერტი",
    popular: "პოპულარული",
    new: "ახალი",
    qrTitle: "ჩვენი QR მენიუ",
    qrText: "დაასკანერე და გახსენი მენიუ ტელეფონიდან",
customizeTitle: "შეცვლა",
removeTitle: "🚫 რის გარეშე?",
extrasTitle: "➕ დამატებით",
extraCheese: "დამატებითი ყველი +2 ₾",
extraSauce: "დამატებითი სოუსი +1 ₾",
saveChoice: "✓ არჩევის შენახვა",
noChoice: "ცვლილება არ აგირჩევია"
},

  en: {
    subtitle: "Delicious food and good mood",
    openStatus: "🟢 Open",
    address: "📍 Batumi, Gorgiladze Street 25",
    hours: "🕒 09:00 - 23:00",
    call: "📞 Call",
    instagram: "📷 Instagram",
    map: "📍 View on map",
    search: "🔎 Search food...",
    all: "All",
    pizza: "🍕 Pizza",
    burger: "🍔 Burgers",
    drink: "🥤 Drinks",
    dessert: "🍰 Desserts",
    popular: "Popular",
    new: "New",
    qrTitle: "Our QR Menu",
    qrText: "Scan and open the menu on your phone",
customizeTitle: "Customize",
removeTitle: "🚫 Remove ingredients",
extrasTitle: "➕ Extras",
extraCheese: "Extra cheese +2 ₾",
extraSauce: "Extra sauce +1 ₾",
saveChoice: "✓ Save selection",
noChoice: "No changes selected"
},

ru: {
    subtitle: "Вкусная еда и хорошее настроение",
    openStatus: "🟢 Открыто",
    address: "📍 Батуми, улица Горгиладзе 25",
    hours: "🕒 09:00 - 23:00",
    call: "📞 Позвонить",
    instagram: "📷 Instagram",
    map: "📍 Посмотреть на карте",
    search: "🔎 Найти блюдо...",
    all: "Все",
    pizza: "🍕 Пицца",
    burger: "🍔 Бургеры",
    drink: "🥤 Напитки",
    dessert: "🍰 Десерты",
    popular: "Популярное",
    new: "Новинка",
    qrTitle: "Наше QR-меню",
  qrText: "Отсканируйте код и откройте меню на телефоне",
customizeTitle: "Изменить",
removeTitle: "🚫 Убрать ингредиенты",
extrasTitle: "➕ Дополнительно",
extraCheese: "Дополнительный сыр +2 ₾",
extraSauce: "Дополнительный соус +1 ₾",
saveChoice: "✓ Сохранить выбор",
noChoice: "Изменения не выбраны"
}
};

function changeLanguage(lang) {
  currentLanguage = lang;
  const t = translations[lang];

  document.documentElement.lang = lang;

  document.getElementById("subtitle").textContent = t.subtitle;
  document.getElementById("openStatus").textContent = t.openStatus;
  document.getElementById("address").textContent = t.address;
  document.getElementById("hours").textContent = t.hours;
  document.getElementById("searchInput").placeholder = t.search;

  document.getElementById("allBtn").textContent = t.all;
  document.getElementById("pizzaBtn").textContent = t.pizza;
  document.getElementById("burgerBtn").textContent = t.burger;
  document.getElementById("drinkBtn").textContent = t.drink;
  document.getElementById("dessertBtn").textContent = t.dessert;

  document.getElementById("qrTitle").textContent = t.qrTitle;
  document.getElementById("qrText").textContent = t.qrText;
  document.getElementById("removeTitle").textContent = t.removeTitle;
  document.getElementById("extrasTitle").textContent = t.extrasTitle;
  document.getElementById("extraCheeseText").textContent = t.extraCheese;
  document.getElementById("extraSauceText").textContent = t.extraSauce;
  document.getElementById("saveChoice").textContent = t.saveChoice;

  const contactButtons = document.querySelectorAll(".contact-btn");

  if (contactButtons[0]) contactButtons[0].textContent = t.call;
  if (contactButtons[1]) contactButtons[1].textContent = t.instagram;
  if (contactButtons[2]) contactButtons[2].textContent = t.map;

  document.querySelectorAll("[data-ka][data-en][data-ru]").forEach(element => {
    element.textContent = element.getAttribute("data-" + lang);
  });

  document.querySelectorAll("[data-badge]").forEach(badge => {
    const type = badge.getAttribute("data-badge");
    badge.textContent = t[type];
  });

  applyFilters();
}

function filterCategory(category, button) {
  currentCategory = category;

  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");
  applyFilters();
}

function searchFood() {
  applyFilters();
}

function applyFilters() {
  const searchValue = document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

  document.querySelectorAll(".food-card").forEach(card => {
    const category = card.getAttribute("data-category");
    const names = card.getAttribute("data-name").toLowerCase();
    const visibleName = card.querySelector("h3").textContent.toLowerCase();

    const categoryMatch =
      currentCategory === "all" ||
      category === currentCategory;

    const searchMatch =
      names.includes(searchValue) ||
      visibleName.includes(searchValue);

    if (categoryMatch && searchMatch) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (typeof QRCode !== "undefined") {
    new QRCode(document.getElementById("qrcode"), {
      text: window.location.href,
      width: 180,
      height: 180
    });
  }
});
let selectedFood = "";

function openCustomize(foodName) {
    selectedFood = foodName;

    const modal = document.getElementById("customizeModal");
    const title = document.getElementById("customizeTitle");

    let customizeWord = "შეცვლა";

if (currentLanguage === "en") {
    customizeWord = "Customize";
}

if (currentLanguage === "ru") {
    customizeWord = "Изменить";
}

let selectedCard = null;
let translatedFoodName = foodName;

document.querySelectorAll(".food-card").forEach(card => {
    const nameElement = card.querySelector("h3");

    if (nameElement && nameElement.getAttribute("data-ka") === foodName) {
        selectedCard = card;

        translatedFoodName =
            nameElement.getAttribute("data-" + currentLanguage) || foodName;
    }
});

if (!selectedCard) {
    return;
}

title.textContent =
    "🍽️ " + translatedFoodName + " — " + customizeWord;

    const description = selectedCard.querySelector("p");

    const ingredients = description
    .getAttribute("data-" + currentLanguage)
    .split(",")
    .map(item => item.trim());

    const options = document.getElementById("removeOptions");

    options.innerHTML = "";

    ingredients.forEach(ingredient => {
        const label = document.createElement("label");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = ingredient;

        label.appendChild(checkbox);
       let removeText = "";

if (currentLanguage === "ka") {
    removeText = ingredient + "-ს გარეშე";
}

if (currentLanguage === "en") {
    removeText = "Without " + ingredient;
}

if (currentLanguage === "ru") {
    removeText = "Без " + ingredient;
}

label.append(" " + removeText);

        options.appendChild(label);
    });

    modal.classList.add("active");
}
function closeCustomize() {
    document.getElementById("customizeModal").classList.remove("active");
}

function saveCustomize() {
    const checked = document.querySelectorAll(
        "#customizeModal input[type='checkbox']:checked"
    );

    const choices = [];

    checked.forEach(function(input) {
        choices.push(input.value);
    });

    if (choices.length === 0) {
        alert("ცვლილება არ აგირჩევია");
        return;
    }

    alert(
        selectedFood +
        "\n\nარჩეულია:\n• " +
        choices.join("\n• ")
    );

    closeCustomize();
}