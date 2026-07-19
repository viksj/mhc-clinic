(function () {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  const scrollTopButton = document.querySelector("[data-scroll-top]");
  const yearTargets = document.querySelectorAll("[data-copyright-year]");
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  yearTargets.forEach((target) => { target.textContent = String(new Date().getFullYear()); });

  const closeMenu = () => {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navigation.classList.remove("is-open");
  };

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 18);
    if (scrollTopButton) scrollTopButton.classList.toggle("is-visible", window.scrollY > 500);
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));
  }

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".site-navigation a[href^='#']"));
  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.removeAttribute("aria-current"));
        const active = navLinks.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
        if (active) active.setAttribute("aria-current", "page");
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const revealItems = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -70px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const serviceGrid = document.querySelector("[data-services]");
  const suggestedServices = [
    { title: "General consultation", text: "A space to discuss your current concerns and health history with the practitioner." },
    { title: "Family health discussion", text: "A practical conversation about care questions affecting more than one member of the family." },
    { title: "Child health discussion", text: "A parent-led consultation conversation for questions about a child’s wellbeing." },
    { title: "Women’s health discussion", text: "A respectful setting to bring personal health questions for individual assessment." },
    { title: "Lifestyle and wellness", text: "Talk through everyday routines and wellbeing goals without promising a particular result." },
    { title: "Follow-up consultation", text: "A later conversation to review how things are going and discuss next steps." }
  ];
  const iconSet = ["◌", "✦", "⌂", "+", "○", "↗"];
  if (serviceGrid) {
    const services = clinicData.services.length ? clinicData.services : suggestedServices;
    serviceGrid.innerHTML = services.slice(0, 6).map((service, index) => `
      <article class="service-card">
        <span class="service-index">0${index + 1}</span>
        <span class="service-icon" aria-hidden="true">${iconSet[index % iconSet.length]}</span>
        <h3>${escapeHtml(service.title || service.name || "Consultation")}</h3>
        <p>${escapeHtml(service.text || service.description || "Discuss your concerns and learn whether this consultation is suitable for you.")}</p>
        <a class="text-link" href="#appointment">Request consultation <span aria-hidden="true">↗</span></a>
      </article>`).join("");
  }

  const hours = Array.isArray(clinicData.openingHours) ? clinicData.openingHours : [];
  const hoursSummary = document.querySelector("[data-hours-summary]");
  const hoursList = document.querySelector("[data-hours-list]");
  const hoursFaq = document.querySelector("[data-hours-faq]");
  if (hours.length) {
    const shortDays = { Sunday: "Sun", Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu", Friday: "Fri", Saturday: "Sat" };
    const summaryText = hours.map((item) => `${shortDays[item.day] || item.day} ${item.hours}`).join(" · ");
    if (hoursSummary) hoursSummary.textContent = summaryText;
    if (hoursList) hoursList.innerHTML = hours.map((item) => `${escapeHtml(item.day)}: ${escapeHtml(item.hours)}`).join("<br>");
    if (hoursFaq) hoursFaq.textContent = `Current verified hours are ${hours.map((item) => `${item.day}, ${item.hours}`).join(", and ")}. Please call or WhatsApp the clinic to confirm availability and other days.`;
  }

  const galleryGrid = document.querySelector("[data-gallery-grid]");
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const lightboxCaption = document.querySelector("[data-lightbox-caption]");
  let galleryIndex = 0;
  let lastFocusedElement = null;
  const gallery = Array.isArray(clinicData.gallery) ? clinicData.gallery : [];

  if (galleryGrid) {
    galleryGrid.innerHTML = gallery.map((item, index) => `
      <button class="gallery-item" type="button" data-gallery-index="${index}" aria-label="Open ${escapeAttribute(item.title || "clinic image")} image">
        <!-- Placeholder image: replace with an authentic MHC clinic photograph before publishing. -->
        <img src="${escapeAttribute(item.src)}" width="640" height="420" loading="lazy" alt="${escapeAttribute(item.alt || item.title || "Clinic image")}">
        <span class="gallery-overlay"><strong>${escapeHtml(item.title || "Clinic image")}</strong><small>${escapeHtml(item.category || "MHC gallery")}</small></span>
      </button>`).join("");
    galleryGrid.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-gallery-index]");
      if (!trigger) return;
      openLightbox(Number(trigger.getAttribute("data-gallery-index")), trigger);
    });
  }

  function openLightbox(index, trigger) {
    if (!lightbox || !lightboxImage || !gallery.length) return;
    galleryIndex = (index + gallery.length) % gallery.length;
    const item = gallery[galleryIndex];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt || item.title || "Clinic image";
    if (lightboxCaption) lightboxCaption.textContent = `${item.title || "Clinic image"} — ${item.category || "MHC gallery"}`;
    lastFocusedElement = trigger || document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    const closeButton = lightbox.querySelector(".lightbox-close");
    if (closeButton) closeButton.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
  }
  function moveLightbox(direction) { openLightbox(galleryIndex + direction, lastFocusedElement); }

  if (lightbox) {
    lightbox.querySelectorAll("[data-lightbox-close]").forEach((element) => element.addEventListener("click", closeLightbox));
    const previous = lightbox.querySelector("[data-lightbox-prev]");
    const next = lightbox.querySelector("[data-lightbox-next]");
    if (previous) previous.addEventListener("click", () => moveLightbox(-1));
    if (next) next.addEventListener("click", () => moveLightbox(1));
    lightbox.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
      if (event.key === "Tab") {
        const focusable = Array.from(lightbox.querySelectorAll("button"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
  }

  document.querySelectorAll("[data-faq-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      const panel = document.getElementById(trigger.getAttribute("aria-controls"));
      trigger.setAttribute("aria-expanded", String(!isExpanded));
      if (panel) panel.hidden = isExpanded;
    });
  });

  if (clinicData.video && clinicData.video.src) {
    const placeholder = document.querySelector("[data-video-placeholder]");
    if (placeholder) {
      placeholder.innerHTML = `<video controls playsinline preload="metadata" poster="${escapeAttribute(clinicData.video.poster || "")}"><source src="${escapeAttribute(clinicData.video.src)}" type="video/mp4"><track kind="captions" srclang="en" label="English"${clinicData.video.transcript ? ` src="${escapeAttribute(clinicData.video.transcript)}"` : ""}><p>Your browser does not support HTML5 video. Please contact MHC for an introduction.</p></video>`;
      placeholder.classList.add("has-video");
    }
  }

  const schemaTarget = document.getElementById("local-business-schema");
  if (schemaTarget && typeof clinicData !== "undefined") {
    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: clinicData.fullName,
      medicalSpecialty: "Homeopathic",
      telephone: `+${clinicData.phoneInternational}`,
      address: { "@type": "PostalAddress", streetAddress: "E-129, Road Number 2, Opposite Government Hospital Road, Budaniya Chauraha, Murlipura Scheme", addressLocality: "Jaipur", addressRegion: "Rajasthan", postalCode: "302039", addressCountry: "IN" },
      sameAs: [clinicData.googleBusinessUrl]
    };
    if (window.location.protocol !== "file:") schema.url = window.location.href.split("#")[0];
    if (clinicData.openingHours.length) schema.openingHours = clinicData.openingHours.map((item) => item.hours ? `${item.day} ${item.hours}` : item);
    if (clinicData.practitioner.name) schema.employee = { "@type": "Person", name: clinicData.practitioner.name };
    if (clinicData.gallery.some((item) => !item.isPlaceholder)) schema.image = clinicData.gallery.filter((item) => !item.isPlaceholder).map((item) => item.src);
    if (clinicData.rating !== null && clinicData.reviewCount !== null) schema.aggregateRating = { "@type": "AggregateRating", ratingValue: clinicData.rating, reviewCount: clinicData.reviewCount };
    schemaTarget.textContent = JSON.stringify(schema);
  }

  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character])); }
  function escapeAttribute(value) { return escapeHtml(value); }
})();
