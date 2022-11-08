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
const popUpBtns = document.querySelectorAll(".popUpBtn");
const telegrammPopUp = document.querySelector(".telegrammPopUp");
const telegrammPopUp__closeBtn = document.getElementById(
  "telegrammPopUp__closeBtn"
);
const inputs = document.querySelectorAll(".requiredInput");

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

for (let input of inputs) {
  input.addEventListener("focus", () => {
    input.classList.remove("input-error");
  });
  input.addEventListener("blur", () => {
    input.classList.add("input-error");
  });
}
