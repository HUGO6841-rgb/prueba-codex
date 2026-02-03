const whatsappNumber = "51993276760";

const buildWhatsAppMessage = ({ intent, ...values }) => {
  const lines = ["Hola KliqCarGo 👋", "Quiero vender mi auto y conseguir la mejor oferta."];

  if (intent === "car") {
    lines.push("Estoy evaluando vender este auto con ustedes:");
  }

  if (values.brand) lines.push(`Marca: ${values.brand}`);
  if (values.model) lines.push(`Modelo: ${values.model}`);
  if (values.year) lines.push(`Año: ${values.year}`);

  if (values.name) lines.push(`Nombre: ${values.name}`);
  if (values.phone) lines.push(`Teléfono: ${values.phone}`);

  lines.push("¿Podemos coordinar la evaluación y los siguientes pasos?");

  return lines.join("\n");
};

const buildWhatsAppLink = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const whatsappLinks = document.querySelectorAll(".whatsapp-link");
whatsappLinks.forEach((link) => {
  const { whatsappIntent, brand, model, year } = link.dataset;
  link.href = buildWhatsAppLink(
    buildWhatsAppMessage({
      intent: whatsappIntent || "general",
      brand,
      model,
      year,
    })
  );
});

const quickForm = document.querySelector("#quick-form");
if (quickForm) {
  quickForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!quickForm.reportValidity()) return;

    const formData = new FormData(quickForm);
    const message = buildWhatsAppMessage({
      intent: "cta",
      name: formData.get("name"),
      phone: formData.get("phone"),
      brand: formData.get("brand"),
    });

    window.open(buildWhatsAppLink(message), "_blank");
    quickForm.reset();
  });
}

const leadForm = document.querySelector("#lead-form");
const toast = document.querySelector("#toast");
if (leadForm && toast) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!leadForm.reportValidity()) return;

    const formData = new FormData(leadForm);
    const values = Object.fromEntries(formData.entries());
    const message = buildWhatsAppMessage({ intent: "lead", ...values });

    toast.textContent = "¡Listo! Un asesor de KliqCarGo te contactará muy pronto.";
    toast.style.display = "block";

    setTimeout(() => {
      window.open(buildWhatsAppLink(message), "_blank");
    }, 700);

    leadForm.reset();
  });
}

const filters = {
  brand: document.querySelector("#filter-brand"),
  year: document.querySelector("#filter-year"),
  price: document.querySelector("#filter-price"),
};
const inventoryCards = document.querySelectorAll(".car-card");

const applyFilters = () => {
  const brand = filters.brand?.value || "";
  const year = filters.year?.value || "";
  const priceRange = filters.price?.value || "";
  const [minPrice, maxPrice] = priceRange
    ? priceRange.split("-").map((value) => Number(value))
    : [0, Infinity];

  inventoryCards.forEach((card) => {
    const matchesBrand = !brand || card.dataset.brand === brand;
    const matchesYear = !year || card.dataset.year === year;
    const priceValue = Number(card.dataset.price);
    const matchesPrice = !priceRange || (priceValue >= minPrice && priceValue <= maxPrice);

    card.style.display = matchesBrand && matchesYear && matchesPrice ? "grid" : "none";
  });
};

Object.values(filters).forEach((filter) => {
  filter?.addEventListener("change", applyFilters);
});

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    const isExpanded = item.getAttribute("aria-expanded") === "true";
    faqItems.forEach((button) => button.setAttribute("aria-expanded", "false"));
    item.setAttribute("aria-expanded", String(!isExpanded));
  });
});
