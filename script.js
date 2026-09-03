// POOJAPRASAD — booking form: live summary + WhatsApp handoff
// WhatsApp number is read from one place so it's easy to update later.
const WHATSAPP_NUMBER = "918103805945";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("booking-form");
  if (!form) return;

  const poojaSelect = document.getElementById("pooja-type");
  const nameInput = document.getElementById("devotee-name");
  const dateInput = document.getElementById("pooja-date");
  const addressInput = document.getElementById("address");

  const summaryEmpty = document.getElementById("summary-empty");
  const summaryFilled = document.getElementById("summary-filled");
  const sPooja = document.getElementById("s-pooja");
  const sName = document.getElementById("s-name");
  const sDate = document.getElementById("s-date");
  const sCity = document.getElementById("s-city");

  function updateSummary() {
    const hasAny = poojaSelect.value || nameInput.value || dateInput.value || addressInput.value;
    if (!hasAny) {
      summaryEmpty.style.display = "block";
      summaryFilled.style.display = "none";
      return;
    }
    summaryEmpty.style.display = "none";
    summaryFilled.style.display = "block";
    sPooja.textContent = poojaSelect.value || "—";
    sName.textContent = nameInput.value || "—";
    sDate.textContent = dateInput.value || "—";
    sCity.textContent = addressInput.value ? addressInput.value.split(",").slice(-2).join(",").trim() : "—";
  }

  [poojaSelect, nameInput, dateInput, addressInput].forEach(function (el) {
    el.addEventListener("input", updateSummary);
    el.addEventListener("change", updateSummary);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const pooja = poojaSelect.value;
    const name = nameInput.value.trim();
    const gotra = document.getElementById("gotra").value.trim();
    const date = dateInput.value;
    const phone = document.getElementById("phone").value.trim();
    const address = addressInput.value.trim();
    const notes = document.getElementById("notes").value.trim();

    const lines = [
      "Namaste, I'd like to book a pooja on POOJAPRASAD:",
      "",
      "Pooja: " + pooja,
      "Devotee Name: " + name,
      gotra ? "Gotra: " + gotra : null,
      "Preferred Date: " + date,
      "Phone: " + phone,
      "Delivery Address: " + address,
      notes ? "Notes: " + notes : null
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join("\n"));
    const waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message;

    window.open(waUrl, "_blank");
  });
});
