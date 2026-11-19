const rawCardNumber = cardInput.value;

const trimmed = rawCardNumber.trim();

const digits = trimmed.replace(/\s/g, "");
const form = document.querySelector("#payment-form");
const result = document.querySelector("#result");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  result.textContent = "submit 事件已觸發";
});


function isEmpty(value) {

  return value.trim() === "";

}

if (isEmpty(cardInput.value)) {

  showFieldError(
    cardInput,
    "請輸入測試卡號"
  );

  return false;

}

function containsDigitsOnly(value) 
{
  return /^\d+$/.test(value);
}

const digits = cardInput.value.replace(
  /\s/g,
  ""
);

if (!containsDigitsOnly(digits)) 
{
  showFieldError(
    cardInput,
    "卡號只能包含數字與空白"
  );
}

function hasLength(value, length) {

  return value.length === length;

}

if (!hasLength(digits, 16)) {
  showFieldError(
    cardInput,
    "測試卡號必須是 16 位數"
  );
}

if (!/^\d{3}$/.test(cvvInput.value)) {
  showFieldError(
    cvvInput,
    "安全碼必須是 3 位數字"
  );
}

const amount = Number(amountInput.value);

if (!Number.isFinite(amount)) {
  showFieldError(
    amountInput,
    "請輸入有效金額"
  );

} else if (amount < 1 || amount > 50000) 
{
  showFieldError(
    amountInput,
    "金額必須介於 1 到 50000"
  );
}

function isValidExpiry(value) {

  const match = value.match(
    /^(0[1-9]|1[0-2])\/(\d{2})$/
  );

  if (!match) return false;

  const month = Number(match[1]);
  const year = Number(match[2]);

  return month >= 1 &&
         month <= 12 &&
         year >= 26;

}

function showFieldError(input, text) {

  const field = input.closest(".field");
  const error = field.querySelector(".error");

  field.classList.add("invalid");
  error.textContent = text;

}

function clearErrors() {
  document.querySelectorAll(".field")
    .forEach(function (field) {
      field.classList.remove("invalid");
      field.querySelector(".error")
        .textContent = "";
    });
}

form.addEventListener("submit", function (event) {

  event.preventDefault();

  clearErrors();

  const cardOK = validateCardNumber();
  const expiryOK = validateExpiry();
  const cvvOK = validateCvv();
  const amountOK = validateAmount();

  if (cardOK && expiryOK && cvvOK && amountOK) {
    result.textContent =
      "欄位檢查完成，測試交易通過";
  }

});
