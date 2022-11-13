var gifContainer = document.getElementById("gifContainer");
var animation = bodymovin.loadAnimation({
  wrapper: gifContainer,
  animType: "svg",
  loop: true,
  path: "./assets/shop-animated.json",
});

const TOKEN = "5619941217:AAE5kY1yfts2ZxF-GH6pgMOqFF9xyyKyvLg";
const CHAT_ID = "-1001651112145";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const alert__send = document.getElementById("request__send");
const alert__send__popUp = document.getElementById("request__send__popUp");

document.getElementById("tg__request").addEventListener("submit", function (e) {
  e.preventDefault();

  let message = `<b>Новая заявка</b>\n`;
  message += `<b>Имя отправителя: ${this.name.value}</b>\n`;
  message += `<b>Телефон : ${this.phone.value}</b>\n`;
  message += `<b>Комментарий : ${this.comment.value}</b>`;

  axios
    .post(URI_API, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: message,
    })
    .then((res) => {
      this.name.value = "";
      this.phone.value = "";
      this.comment.value = "";
      alert__send.style.display = "block";
      setTimeout(() => {
        alert__send.style.display = "none";
      }, 3000);
    })
    .catch((err) => {
      console.warn(err);
    })
    .finally(() => {
      for (let input of inputs) {
        input.classList.remove("input-error");
      }
    });
});

document
  .getElementById("tg__request__popUp")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let message = `<b>Новая заявка</b>\n`;
    message += `<b>Имя отправителя: ${this.name.value}</b>\n`;
    message += `<b>Телефон : ${this.phone.value}</b>\n`;
    message += `<b>Комментарий : ${this.comment.value}</b>`;

    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then((res) => {
        this.name.value = "";
        this.phone.value = "";
        this.comment.value = "";
        alert__send__popUp.style.display = "block";
        setTimeout(() => {
          alert__send__popUp.style.display = "none";
        }, 3000);
        setTimeout(() => {
          telegrammPopUp.style.display = "none";
        }, 4000);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        for (let input of inputs) {
          input.classList.remove("input-error");
        }
      });
  });

// ***

const popUpBtns = document.querySelectorAll(".popUpBtn");
const telegrammPopUp = document.querySelector(".telegrammPopUp");
const telegrammPopUp__closeBtn = document.getElementById(
  "telegrammPopUp__closeBtn"
);

telegrammPopUp__closeBtn.addEventListener("click", function () {
  telegrammPopUp.classList.toggle("telegrammPopUp-open");
  for (let input of inputs) {
    input.classList.remove("input-error");
  }
});

for (let btn of popUpBtns) {
  btn.addEventListener("click", function () {
    telegrammPopUp.classList.toggle("telegrammPopUp-open");
  });
}

// ***

const inputs = document.querySelectorAll(".requiredInput");

for (let input of inputs) {
  input.addEventListener("focus", () => {
    input.classList.remove("input-error");
  });
  input.addEventListener("blur", () => {
    input.classList.add("input-error");
  });
}

const headerLinksWrapper = document.getElementById("headerLinksWrapper");
const header__btnBurger = document.getElementById("header__btnBurger");

header__btnBurger.addEventListener("click", function () {
  headerLinksWrapper.classList.toggle("headerLinksWrapper-open");
});

const links = document.querySelectorAll(".header__link ");

for (let link of links) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const position = element.offsetTop - 49;
    window.scrollTo({
      left: 0,
      top: position,
    });

    const screenWidth = window.screen.width;
    if (screenWidth < 1280) {
      headerLinksWrapper.classList.toggle("headerLinksWrapper-open");
    }
  });
}
