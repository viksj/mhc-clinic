/*
 * MHC content source
 *
 * Keep this file editable and factual. The Google Business Profile supplied for
 * this project is linked throughout the site, but its rating, review count,
 * services, practitioner details, photographs, and video have not been
 * verified here. Do not publish guessed values.
 */
const clinicData = {
  shortName: "MHC",
  fullName: "Maya Homoeopathic Clinic",
  category: "Homoeopathic Clinic",
  phoneDisplay: "+91 77427 50957",
  phoneInternational: "917742750957",
  address: "E-129, Road Number 2, Opposite Government Hospital Road, Budaniya Chauraha, Murlipura Scheme, Murlipura, Jaipur, Rajasthan 302039",
  googleBusinessUrl: "https://maps.app.goo.gl/C6GqfpCFMwrkzAmm8",
  siteUrl: "",
  rating: null, // OWNER: enter the current public Google rating only after verifying it.
  reviewCount: null, // OWNER: enter the current public Google review count only after verifying it.
  openingHours: [
    { day: "Sunday", hours: "10 am–2 pm" },
    { day: "Monday", hours: "12–3 pm, 5–8 pm" }
  ], // OWNER: add or edit only verified day/hour strings.
  practitioner: {
    name: "", // OWNER: add only an owner-approved public practitioner name.
    qualification: "", // OWNER: verify before publishing.
    registrationNumber: "", // OWNER: verify before publishing; do not guess.
    experience: "", // OWNER: use a verified statement, not an estimate.
    photograph: "" // OWNER: add a reuse-cleared professional photograph path if desired.
  },
  clinicEstablished: "", // OWNER: add a verified year only if it should be public.
  services: [], // OWNER: replace with verified service entries before presenting these as confirmed.
  reviews: [], // OWNER: add 4–6 verified public reviews without changing their meaning.
  gallery: [
    { title: "Clinic exterior", category: "Replace with MHC exterior", src: "assets/images/placeholders/gallery-exterior.svg", alt: "Illustrated placeholder for the MHC clinic exterior", isPlaceholder: true },
    { title: "Reception", category: "Replace with MHC reception", src: "assets/images/placeholders/gallery-reception.svg", alt: "Illustrated placeholder for the MHC reception", isPlaceholder: true },
    { title: "Consultation area", category: "Replace with MHC consultation area", src: "assets/images/placeholders/gallery-consultation.svg", alt: "Illustrated placeholder for the MHC consultation area", isPlaceholder: true },
    { title: "Clinic environment", category: "Replace with MHC clinic photograph", src: "assets/images/placeholders/gallery-environment.svg", alt: "Illustrated placeholder for the MHC clinic environment", isPlaceholder: true },
    { title: "Signboard", category: "Replace with MHC signboard", src: "assets/images/placeholders/gallery-signboard.svg", alt: "Illustrated placeholder for the MHC signboard", isPlaceholder: true },
    { title: "Nearby landmark", category: "Replace with verified nearby landmark", src: "assets/images/placeholders/gallery-landmark.svg", alt: "Illustrated placeholder for a nearby Murlipura landmark", isPlaceholder: true }
  ],
  video: {
    src: "", // OWNER: add an owner-approved MP4 path, e.g. assets/video/clinic-introduction.mp4.
    poster: "assets/images/placeholders/hero-illustration.svg",
    transcript: "" // OWNER: add an accessible text transcript when a video is added.
  },
  appointment: {
    whatsappIntro: "Hello MHC, I would like to request an appointment. Please share the available consultation time.",
    mode: "whatsapp" // BACKEND: replace the submission flow in appointment.js when connecting a real endpoint.
  }
};
