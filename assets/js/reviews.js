(function () {
  "use strict";
  const grid = document.querySelector("[data-reviews-grid]");
  const summary = document.querySelector("[data-review-summary]");
  const controls = document.querySelector("[data-carousel-controls]");
  if (!grid || typeof clinicData === "undefined") return;

  const hasVerifiedReviews = Array.isArray(clinicData.reviews) && clinicData.reviews.length > 0;
  const placeholderReviews = [
    { name: "Verified review pending", text: "Replace with a verified Google review before publishing.", date: "", rating: null },
    { name: "Verified review pending", text: "Replace with a verified Google review before publishing.", date: "", rating: null },
    { name: "Verified review pending", text: "Replace with a verified Google review before publishing.", date: "", rating: null },
    { name: "Verified review pending", text: "Replace with a verified Google review before publishing.", date: "", rating: null }
  ];
  const reviews = hasVerifiedReviews ? clinicData.reviews : placeholderReviews;

  if (summary) {
    const rating = summary.querySelector(".rating-number");
    const count = summary.querySelector(".review-count");
    if (clinicData.rating !== null) {
      if (rating) rating.textContent = Number(clinicData.rating).toFixed(1);
      const stars = summary.querySelector(".stars");
      if (stars) stars.setAttribute("aria-label", `${clinicData.rating} out of 5 stars`);
    } else if (rating) rating.textContent = "—";
    if (clinicData.reviewCount !== null && count) count.textContent = `${clinicData.reviewCount} Google reviews`;
  }

  grid.innerHTML = reviews.slice(0, 6).map((review) => {
    const isPlaceholder = !hasVerifiedReviews || review.isPlaceholder;
    const rating = Number(review.rating);
    const stars = Number.isFinite(rating) && rating > 0 ? "★".repeat(Math.min(5, rating)) + "☆".repeat(Math.max(0, 5 - rating)) : "Rating pending";
    return `<article class="review-card${isPlaceholder ? " review-card-placeholder" : ""}">
      <div class="review-card-top"><span class="reviewer">${escapeHtml(review.name || review.author || "Google reviewer")}</span><span class="review-date">${escapeHtml(review.date || "")}</span></div>
      <div class="review-stars" aria-label="${Number.isFinite(rating) && rating > 0 ? `${rating} out of 5 stars` : "Rating pending"}">${stars}</div>
      <p>${escapeHtml(review.text || "")}</p>
      ${isPlaceholder ? `<span class="review-placeholder-label">Development placeholder</span>` : ""}
    </article>`;
  }).join("");

  if (controls && reviews.length > 3) {
    controls.hidden = false;
    const position = controls.querySelector("[data-review-position]");
    const prev = controls.querySelector("[data-review-prev]");
    const next = controls.querySelector("[data-review-next]");
    let offset = 0;
    const update = (direction) => {
      offset = (offset + direction + reviews.length) % reviews.length;
      const cards = grid.querySelectorAll(".review-card");
      cards.forEach((card, index) => { card.style.order = String((index - offset + reviews.length) % reviews.length); });
      if (position) position.textContent = `${offset + 1} / ${reviews.length}`;
    };
    if (prev) prev.addEventListener("click", () => update(-1));
    if (next) next.addEventListener("click", () => update(1));
  }

  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character])); }
})();
