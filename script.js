const form = document.querySelector("#payment-form");
const cardInput = document.querySelector("#card-number");
const expiryInput = document.querySelector("#expiry");
const cvvInput = document.querySelector("#cvv");
const amountInput = document.querySelector("#amount");
const result = document.querySelector("#result");

function showFieldError(input, message) {
  const field = input.closest(".field");
  field.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");
  field.querySelector(".error").textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".field").forEach(function (field) {
    field.classList.remove("invalid");
    field.querySelector(".error").textContent = "";
    field.querySelector("input").removeAttribute("aria-invalid");
  });
}

function isEmpty(value) {
  return value.trim() === "";
}

function validateCardNumber() {
  const value = cardInput.value;
  if (isEmpty(value)) {
    showFieldError(cardInput, "請輸入測試卡號");
    return false;
  }

  const digits = value.replace(/\s/g, "");
  if (!/^\d{16}$/.test(digits)) {
    showFieldError(cardInput, "請輸入 16 位數字");
    return false;
  }

  if (!passesLuhn(digits)) {
    showFieldError(cardInput, "卡號檢查未通過，請確認輸入內容");
    return false;
  }

  return true;
}

function validateExpiry() {
  const value = expiryInput.value.trim();
  if (isEmpty(value)) {
    showFieldError(expiryInput, "請輸入有效期限");
    return false;
  }

  const match = value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
  if (!match) {
    showFieldError(expiryInput, "請使用 MM/YY，月份需為 01 到 12");
    return false;
  }

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    showFieldError(expiryInput, "卡片已過期");
    return false;
  }

  return true;
}

function validateCvv() {
  const value = cvvInput.value.trim();
  if (isEmpty(value)) {
    showFieldError(cvvInput, "請輸入安全碼");
    return false;
  }

  if (!/^\d{3}$/.test(value)) {
    showFieldError(cvvInput, "請輸入 3 位數字");
    return false;
  }

  return true;
}

function validateAmount() {
  const value = amountInput.value.trim();
  if (isEmpty(value)) {
    showFieldError(amountInput, "請輸入付款金額");
    return false;
  }

  const amount = Number(value);
  if (!Number.isFinite(amount) || amount < 1 || amount > 50000) {
    showFieldError(amountInput, "金額必須介於 1 到 50000");
    return false;
  }

  return true;
}

function passesLuhn(cardNumber) {
  const digits = cardNumber.replace(/\s/g, "");
  if (!/^\d+$/.test(digits)) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();
  result.classList.remove("failed");

  const cardOK = validateCardNumber();
  const expiryOK = validateExpiry();
  const cvvOK = validateCvv();
  const amountOK = validateAmount();

  if (cardOK && expiryOK && cvvOK && amountOK) {
    result.textContent = "欄位檢查完成，測試交易通過";
  } else {
    result.textContent = "請修正欄位錯誤後再試一次";
    result.classList.add("failed");
  }
});
