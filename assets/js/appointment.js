(function () {
  "use strict";
  const form = document.getElementById("appointment-form");
  if (!form || typeof clinicData === "undefined") return;
  const dateInput = document.getElementById("preferred-date");
  const submitButton = form.querySelector("[data-submit-button]");
  const status = document.getElementById("form-status");
  const fields = {
    fullName: { element: document.getElementById("full-name"), error: document.getElementById("full-name-error"), message: "Please enter your name." },
    mobile: { element: document.getElementById("mobile-number"), error: document.getElementById("mobile-number-error"), message: "Enter a valid 10-digit Indian mobile number." },
    ageGroup: { element: document.getElementById("age-group"), error: document.getElementById("age-group-error"), message: "Please select an age group." },
    preferredDate: { element: document.getElementById("preferred-date"), error: document.getElementById("preferred-date-error"), message: "Please choose a future date." },
    preferredTime: { element: document.getElementById("preferred-time"), error: document.getElementById("preferred-time-error"), message: "Please choose a preferred time window." },
    patientStatus: { element: document.getElementById("patient-status"), error: document.getElementById("patient-status-error"), message: "Please select patient status." },
    consultationType: { element: document.getElementById("consultation-type"), error: document.getElementById("consultation-type-error"), message: "Please select a consultation type." },
    consent: { element: document.getElementById("consent"), error: document.getElementById("consent-error"), message: "Please confirm that MHC may contact you." }
  };

  if (dateInput) {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0];
    dateInput.min = localDate;
  }

  Object.values(fields).forEach(({ element }) => {
    if (element) element.addEventListener("blur", () => validateField(element.name));
    if (element && element.tagName === "SELECT") element.addEventListener("change", () => validateField(element.name));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearStatus();
    const honeypot = form.querySelector("#website");
    if (honeypot && honeypot.value.trim()) return;
    const valid = Object.keys(fields).map(validateField).every(Boolean);
    if (!valid) {
      const firstInvalid = Object.values(fields).map(({ element }) => element).find((element) => element && element.getAttribute("aria-invalid") === "true");
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    if (submitButton) { submitButton.disabled = true; submitButton.setAttribute("aria-busy", "true"); submitButton.textContent = "Preparing WhatsApp…"; }
    const values = new FormData(form);
    const message = [
      clinicData.appointment.whatsappIntro,
      "",
      `Name: ${values.get("fullName")}`,
      `Mobile: ${values.get("mobile")}`,
      `Age group: ${values.get("ageGroup")}`,
      `Preferred date: ${values.get("preferredDate")}`,
      `Preferred time: ${values.get("preferredTime")}`,
      `Patient status: ${values.get("patientStatus")}`,
      `Consultation type: ${values.get("consultationType")}`,
      values.get("message") ? `Short message: ${values.get("message")}` : "",
      "",
      "This is an appointment request, not a confirmed booking."
    ].filter(Boolean).join("\n");
    const whatsappUrl = `https://wa.me/${clinicData.phoneInternational}?text=${encodeURIComponent(message)}`;
    if (status) status.textContent = "Opening WhatsApp. Please send the prepared message to contact MHC.";
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    form.reset();
    if (submitButton) { submitButton.disabled = false; submitButton.removeAttribute("aria-busy"); submitButton.innerHTML = "Continue to WhatsApp <span aria-hidden=\"true\">↗</span>"; }
  });

  function validateField(name) {
    const config = fields[name];
    if (!config || !config.element) return true;
    const element = config.element;
    const value = element.type === "checkbox" ? element.checked : element.value.trim();
    let errorMessage = "";
    if (!value) errorMessage = config.message;
    if (!errorMessage && name === "mobile" && !/^[6-9]\d{9}$/.test(String(value).replace(/\s+/g, ""))) errorMessage = config.message;
    if (!errorMessage && name === "preferredDate") {
      const chosen = new Date(`${value}T00:00:00`);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (Number.isNaN(chosen.getTime()) || chosen < today) errorMessage = config.message;
    }
    const field = element.closest(".field");
    if (field) field.classList.toggle("is-invalid", Boolean(errorMessage));
    element.setAttribute("aria-invalid", String(Boolean(errorMessage)));
    if (config.error) config.error.textContent = errorMessage;
    return !errorMessage;
  }

  function clearStatus() { if (status) { status.textContent = ""; status.classList.remove("is-error"); } }
})();
