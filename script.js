const whatsappNumber = "51993276760";

const buildWhatsAppMessage = ({ intent, ...values }) => {
  const lines = [
    "Hola KliqCarGo 👋",
    "Quiero información para comprar o vender un auto con ustedes.",
  ];

  if (intent === "car") {
    lines.push("Estoy interesado en este auto:");
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

const updateWhatsAppLinks = () => {
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
};

updateWhatsAppLinks();

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

const createCarImage = (label) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'>
    <rect width='100%' height='100%' fill='%23F6F7FB'/>
    <path d='M90 270h460l30-60-60-70H190l-70 70z' fill='%231F3A5F' opacity='0.9'/>
    <circle cx='200' cy='280' r='34' fill='%230B1220'/>
    <circle cx='440' cy='280' r='34' fill='%230B1220'/>
    <text x='50%' y='52%' text-anchor='middle' fill='%2364748B' font-size='22' font-family='Inter'>${label}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const inventoryData = [
  {
    marca: "Toyota",
    modelo: "Corolla Cross",
    precio: 32800,
    km: 28365,
    combustible: "Híbrido",
    transmision: "Automático",
    anio: 2022,
    ubicacion: "Miraflores",
    imagen: createCarImage("Toyota Corolla Cross"),
  },
  {
    marca: "Kia",
    modelo: "Seltos",
    precio: 28900,
    km: 41200,
    combustible: "Gasolina",
    transmision: "Mecánico",
    anio: 2021,
    ubicacion: "Surco",
    imagen: createCarImage("Kia Seltos"),
  },
  {
    marca: "Hyundai",
    modelo: "Tucson",
    precio: 35500,
    km: 19800,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2023,
    ubicacion: "San Isidro",
    imagen: createCarImage("Hyundai Tucson"),
  },
  {
    marca: "Mazda",
    modelo: "CX-5",
    precio: 41900,
    km: 15250,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2024,
    ubicacion: "Barranco",
    imagen: createCarImage("Mazda CX-5"),
  },
  {
    marca: "Chevrolet",
    modelo: "Onix",
    precio: 21900,
    km: 56300,
    combustible: "GNV",
    transmision: "Mecánico",
    anio: 2020,
    ubicacion: "Jesús María",
    imagen: createCarImage("Chevrolet Onix"),
  },
  {
    marca: "Nissan",
    modelo: "Kicks",
    precio: 24700,
    km: 49750,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2019,
    ubicacion: "San Miguel",
    imagen: createCarImage("Nissan Kicks"),
  },
  {
    marca: "Suzuki",
    modelo: "Vitara",
    precio: 23300,
    km: 60800,
    combustible: "Gasolina",
    transmision: "Mecánico",
    anio: 2018,
    ubicacion: "La Molina",
    imagen: createCarImage("Suzuki Vitara"),
  },
  {
    marca: "Ford",
    modelo: "Territory",
    precio: 36800,
    km: 22500,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2022,
    ubicacion: "San Borja",
    imagen: createCarImage("Ford Territory"),
  },
];

const filters = {
  brand: document.querySelector("#filter-brand"),
  model: document.querySelector("#filter-model"),
  year: document.querySelector("#filter-year"),
  price: document.querySelector("#filter-price"),
};
const inventoryGrid = document.querySelector("#inventory-grid");

const formatNumber = (value) => value.toLocaleString("es-PE");

const renderInventory = (cars) => {
  if (!inventoryGrid) return;
  inventoryGrid.innerHTML = cars
    .map(
      (car) => `
        <article class="car-card">
          <div class="car-media" aria-hidden="true">
            <img src="${car.imagen}" alt="${car.marca} ${car.modelo} ${car.anio}" />
            <span class="car-tag">Disponible</span>
          </div>
          <div class="car-body">
            <h3>${car.marca} ${car.modelo}</h3>
            <div class="car-price-row">
              <span class="car-price">$${formatNumber(car.precio)}</span>
              <span class="car-location">${car.ubicacion}</span>
            </div>
            <div class="car-specs">
              <span><strong>KM:</strong> ${formatNumber(car.km)} km</span>
              <span><strong>Combustible:</strong> ${car.combustible}</span>
              <span><strong>Transmisión:</strong> ${car.transmision}</span>
              <span><strong>Año:</strong> ${car.anio}</span>
            </div>
          </div>
          <div class="car-footer">
            <a class="btn btn-ghost" href="#formulario">Cotizar</a>
            <a
              class="btn btn-outline whatsapp-link"
              href="https://wa.me/${whatsappNumber}"
              target="_blank"
              rel="noreferrer"
              data-whatsapp-intent="car"
              data-brand="${car.marca}"
              data-model="${car.modelo}"
              data-year="${car.anio}"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </article>
      `
    )
    .join("");

  updateWhatsAppLinks();
};

const populateSelect = (select, options, placeholder) => {
  if (!select) return;
  select.innerHTML = `
    <option value="">${placeholder}</option>
    ${options.map((option) => `<option value="${option}">${option}</option>`).join("")}
  `;
};

const updateFilterOptions = () => {
  const brandOptions = [...new Set(inventoryData.map((car) => car.marca))].sort();
  const yearOptions = [...new Set(inventoryData.map((car) => car.anio))].sort(
    (a, b) => b - a
  );
  populateSelect(filters.brand, brandOptions, "Todas");
  populateSelect(filters.year, yearOptions, "Todos");
  updateModelOptions();
};

const updateModelOptions = () => {
  if (!filters.model) return;
  const selectedBrand = filters.brand?.value || "";
  const models = inventoryData
    .filter((car) => !selectedBrand || car.marca === selectedBrand)
    .map((car) => car.modelo);
  const modelOptions = [...new Set(models)].sort();
  populateSelect(filters.model, modelOptions, "Todos");
};

const applyFilters = () => {
  const brand = filters.brand?.value || "";
  const year = filters.year?.value || "";
  const model = filters.model?.value || "";
  const priceRange = filters.price?.value || "";
  const [minPrice, maxPrice] = priceRange
    ? priceRange.split("-").map((value) => Number(value))
    : [0, Infinity];

  const filteredCars = inventoryData.filter((car) => {
    const matchesBrand = !brand || car.marca === brand;
    const matchesModel = !model || car.modelo === model;
    const matchesYear = !year || String(car.anio) === year;
    const matchesPrice = !priceRange || (car.precio >= minPrice && car.precio <= maxPrice);
    return matchesBrand && matchesModel && matchesYear && matchesPrice;
  });

  renderInventory(filteredCars);
};

Object.values({ model: filters.model, year: filters.year, price: filters.price }).forEach(
  (filter) => {
    filter?.addEventListener("change", applyFilters);
  }
);

filters.brand?.addEventListener("change", () => {
  updateModelOptions();
  applyFilters();
});

updateFilterOptions();
renderInventory(inventoryData);

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    const isExpanded = item.getAttribute("aria-expanded") === "true";
    faqItems.forEach((button) => button.setAttribute("aria-expanded", "false"));
    item.setAttribute("aria-expanded", String(!isExpanded));
  });
});
