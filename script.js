const whatsappNumber = "51999999999";

const buildWhatsAppMessage = (values) => {
  const parts = ["Hola KliqCarGo, quiero vender mi auto."];
  if (values.brand) parts.push(`Marca: ${values.brand}`);
  if (values.model) parts.push(`Modelo: ${values.model}`);
  if (values.year) parts.push(`Año: ${values.year}`);
  if (values.name) parts.push(`Nombre: ${values.name}`);
  if (values.phone) parts.push(`Teléfono: ${values.phone}`);
  return parts.join(" ");
};

const buildWhatsAppLink = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const whatsappLinks = document.querySelectorAll(".whatsapp-link");
whatsappLinks.forEach((link) => {
  const data = link.dataset.whatsapp;
  if (data && data.includes("|")) {
    const [model, year] = data.split("|");
    link.href = buildWhatsAppLink(
      buildWhatsAppMessage({ brand: model.split(" ")[0], model, year })
    );
  } else {
    link.href = buildWhatsAppLink(buildWhatsAppMessage({}));
  }
});

const quickForm = document.querySelector("#quick-form");
if (quickForm) {
  quickForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!quickForm.reportValidity()) return;

    const formData = new FormData(quickForm);
    const message = buildWhatsAppMessage({
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
    const message = buildWhatsAppMessage(values);

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
