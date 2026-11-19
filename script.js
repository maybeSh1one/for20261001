const form = document.querySelector("#payment-form");
const cardInput = document.querySelector("#card-number");
const expiryInput = document.querySelector("#expiry");
const cvvInput = document.querySelector("#cvv");
const amountInput = document.querySelector("#amount");
const result = document.querySelector("#result");

function showFieldError(input, text) {
  const field = input.closest(".field");
  field.classList.add("invalid");
  field.querySelector(".error").textContent = text;
}

function clearErrors() {
  document.querySelectorAll(".field").forEach(function (field) {
    field.classList.remove("invalid");
    field.querySelector(".error").textContent = "";
  });
}
function isEmpty(value) {

  return value === "";

}



function validateFields() {
  let isValid = true;

  if(isEmpty()){
    showFieldError(cardInput.value, "不能為空");
    isValid = false;
  }
  if(isEmpty()){
    showFieldError(expiryInput.value, "不能為空");
    isValid = false;
  }
  if(isEmpty()){
    showFieldError(cvvInput.value, "不能為空");
    isValid = false;
  }

  const digits = cardInput.value.replace(/\s/g, "");

  if (!/^\d{16}$/.test(digits)) {
    showFieldError(cardInput, "請輸入 16 位數字");
    isValid = false;
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryInput.value.trim())) {
    showFieldError(expiryInput, "請使用 MM/YY，月份需為 01 到 12");
    isValid = false;
  }

  if (!/^\d{3}$/.test(cvvInput.value.trim())) {
    showFieldError(cvvInput, "請輸入 3 位數字");
    isValid = false;
  }

  const amount = Number(amountInput.value);
  if (!Number.isFinite(amount) || amount < 1 || amount > 50000) {
    showFieldError(amountInput, "金額必須介於 1 到 50000");
    isValid = false;
  }

  return isValid;
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


