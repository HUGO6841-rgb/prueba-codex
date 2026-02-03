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
    precioUSD: 32800,
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
    precioUSD: 28900,
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
    precioUSD: 35500,
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
    precioUSD: 41900,
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
    precioUSD: 21900,
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
    precioUSD: 24700,
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
    precioUSD: 23300,
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
    precioUSD: 36800,
    km: 22500,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2022,
    ubicacion: "San Borja",
    imagen: createCarImage("Ford Territory"),
  },
  {
    marca: "Volkswagen",
    modelo: "T-Cross",
    precioUSD: 25900,
    km: 38400,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2021,
    ubicacion: "Magdalena",
    imagen: createCarImage("Volkswagen T-Cross"),
  },
  {
    marca: "Honda",
    modelo: "HR-V",
    precioUSD: 27600,
    km: 33500,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2020,
    ubicacion: "Lince",
    imagen: createCarImage("Honda HR-V"),
  },
  {
    marca: "Mitsubishi",
    modelo: "Outlander",
    precioUSD: 34200,
    km: 28700,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2021,
    ubicacion: "Pueblo Libre",
    imagen: createCarImage("Mitsubishi Outlander"),
  },
  {
    marca: "Kia",
    modelo: "Sportage",
    precioUSD: 31900,
    km: 29800,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2022,
    ubicacion: "Miraflores",
    imagen: createCarImage("Kia Sportage"),
  },
  {
    marca: "Toyota",
    modelo: "RAV4",
    precioUSD: 38900,
    km: 21400,
    combustible: "Híbrido",
    transmision: "Automático",
    anio: 2023,
    ubicacion: "San Borja",
    imagen: createCarImage("Toyota RAV4"),
  },
  {
    marca: "Hyundai",
    modelo: "Creta",
    precioUSD: 22900,
    km: 45800,
    combustible: "Gasolina",
    transmision: "Mecánico",
    anio: 2019,
    ubicacion: "Surquillo",
    imagen: createCarImage("Hyundai Creta"),
  },
  {
    marca: "Mazda",
    modelo: "Mazda 3 Sedan",
    precioUSD: 24900,
    km: 37200,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2020,
    ubicacion: "La Molina",
    imagen: createCarImage("Mazda 3 Sedan"),
  },
  {
    marca: "Nissan",
    modelo: "Sentra",
    precioUSD: 22100,
    km: 46500,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2019,
    ubicacion: "Jesús María",
    imagen: createCarImage("Nissan Sentra"),
  },
  {
    marca: "Chevrolet",
    modelo: "Tracker",
    precioUSD: 26800,
    km: 33100,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2021,
    ubicacion: "San Miguel",
    imagen: createCarImage("Chevrolet Tracker"),
  },
  {
    marca: "Suzuki",
    modelo: "Swift",
    precioUSD: 14900,
    km: 58200,
    combustible: "Gasolina",
    transmision: "Mecánico",
    anio: 2018,
    ubicacion: "Breña",
    imagen: createCarImage("Suzuki Swift"),
  },
  {
    marca: "Ford",
    modelo: "Escape",
    precioUSD: 33400,
    km: 27750,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2021,
    ubicacion: "San Isidro",
    imagen: createCarImage("Ford Escape"),
  },
  {
    marca: "Volkswagen",
    modelo: "Tiguan",
    precioUSD: 37900,
    km: 24800,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2022,
    ubicacion: "Miraflores",
    imagen: createCarImage("Volkswagen Tiguan"),
  },
  {
    marca: "Honda",
    modelo: "CR-V",
    precioUSD: 36500,
    km: 26600,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2021,
    ubicacion: "Surco",
    imagen: createCarImage("Honda CR-V"),
  },
  {
    marca: "Mitsubishi",
    modelo: "ASX",
    precioUSD: 21800,
    km: 53300,
    combustible: "Gasolina",
    transmision: "Mecánico",
    anio: 2018,
    ubicacion: "Chorrillos",
    imagen: createCarImage("Mitsubishi ASX"),
  },
  {
    marca: "Toyota",
    modelo: "Yaris",
    precioUSD: 16900,
    km: 60300,
    combustible: "Gasolina",
    transmision: "Mecánico",
    anio: 2017,
    ubicacion: "Callao",
    imagen: createCarImage("Toyota Yaris"),
  },
  {
    marca: "Hyundai",
    modelo: "Elantra",
    precioUSD: 20400,
    km: 51750,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2019,
    ubicacion: "San Borja",
    imagen: createCarImage("Hyundai Elantra"),
  },
  {
    marca: "Kia",
    modelo: "Rio",
    precioUSD: 17800,
    km: 64100,
    combustible: "Gasolina",
    transmision: "Mecánico",
    anio: 2018,
    ubicacion: "Los Olivos",
    imagen: createCarImage("Kia Rio"),
  },
  {
    marca: "Nissan",
    modelo: "X-Trail",
    precioUSD: 32900,
    km: 29500,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2020,
    ubicacion: "Magdalena",
    imagen: createCarImage("Nissan X-Trail"),
  },
  {
    marca: "Mazda",
    modelo: "CX-30",
    precioUSD: 29800,
    km: 24800,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2022,
    ubicacion: "San Isidro",
    imagen: createCarImage("Mazda CX-30"),
  },
  {
    marca: "BMW",
    modelo: "X1",
    precioUSD: 45200,
    km: 19800,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2022,
    ubicacion: "Barranco",
    imagen: createCarImage("BMW X1"),
  },
  {
    marca: "Audi",
    modelo: "Q3",
    precioUSD: 47800,
    km: 17200,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2023,
    ubicacion: "Miraflores",
    imagen: createCarImage("Audi Q3"),
  },
  {
    marca: "Mercedes-Benz",
    modelo: "GLA",
    precioUSD: 49800,
    km: 16500,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2023,
    ubicacion: "San Borja",
    imagen: createCarImage("Mercedes-Benz GLA"),
  },
  {
    marca: "Jeep",
    modelo: "Compass",
    precioUSD: 33600,
    km: 31200,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2021,
    ubicacion: "Surco",
    imagen: createCarImage("Jeep Compass"),
  },
  {
    marca: "Volkswagen",
    modelo: "Golf",
    precioUSD: 21400,
    km: 55900,
    combustible: "Gasolina",
    transmision: "Mecánico",
    anio: 2018,
    ubicacion: "Lince",
    imagen: createCarImage("Volkswagen Golf"),
  },
  {
    marca: "Ford",
    modelo: "Ranger",
    precioUSD: 40900,
    km: 28400,
    combustible: "Diesel",
    transmision: "Automático",
    anio: 2022,
    ubicacion: "Ate",
    imagen: createCarImage("Ford Ranger"),
  },
  {
    marca: "Chevrolet",
    modelo: "Equinox",
    precioUSD: 31400,
    km: 30100,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2021,
    ubicacion: "San Miguel",
    imagen: createCarImage("Chevrolet Equinox"),
  },
  {
    marca: "Suzuki",
    modelo: "Jimny",
    precioUSD: 27900,
    km: 26400,
    combustible: "Gasolina",
    transmision: "Mecánico",
    anio: 2022,
    ubicacion: "La Molina",
    imagen: createCarImage("Suzuki Jimny"),
  },
  {
    marca: "Hyundai",
    modelo: "Santa Fe",
    precioUSD: 39800,
    km: 22700,
    combustible: "Diesel",
    transmision: "Automático",
    anio: 2021,
    ubicacion: "San Isidro",
    imagen: createCarImage("Hyundai Santa Fe"),
  },
  {
    marca: "Toyota",
    modelo: "Hilux",
    precioUSD: 43800,
    km: 33200,
    combustible: "Diesel",
    transmision: "Automático",
    anio: 2022,
    ubicacion: "Ate",
    imagen: createCarImage("Toyota Hilux"),
  },
  {
    marca: "Honda",
    modelo: "Civic",
    precioUSD: 23600,
    km: 40500,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2020,
    ubicacion: "Miraflores",
    imagen: createCarImage("Honda Civic"),
  },
  {
    marca: "Kia",
    modelo: "Sorento",
    precioUSD: 41400,
    km: 24300,
    combustible: "Gasolina",
    transmision: "Automático",
    anio: 2022,
    ubicacion: "San Borja",
    imagen: createCarImage("Kia Sorento"),
  },
  {
    marca: "Nissan",
    modelo: "Versa",
    precioUSD: 16200,
    km: 65700,
    combustible: "Gasolina",
    transmision: "Mecánico",
    anio: 2017,
    ubicacion: "Comas",
    imagen: createCarImage("Nissan Versa"),
  },
];

const filters = {
  brand: document.querySelector("#filter-brand"),
  model: document.querySelector("#filter-model"),
  price: document.querySelector("#filter-price"),
};
const inventoryGrid = document.querySelector("#inventory-grid");

const formatNumber = (value) => value.toLocaleString("es-PE");
const formatUSD = (value) => `$ ${value.toLocaleString("en-US")}`;

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
            <h3>${car.marca} - ${car.modelo}</h3>
            <div class="car-price-row">
              <span class="car-price">${formatUSD(car.precioUSD)}</span>
              <span class="car-location">${car.ubicacion}</span>
            </div>
            <p class="car-specs">
              ${formatNumber(car.km)} km · ${car.combustible} · ${car.transmision} · ${car.anio}
            </p>
          </div>
          <div class="car-footer">
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
  populateSelect(filters.brand, brandOptions, "Todas");
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
  const model = filters.model?.value || "";
  const priceRange = filters.price?.value || "";
  const [minPrice, maxPrice] = priceRange
    ? priceRange.includes("+")
      ? [Number(priceRange.replace("+", "")), Infinity]
      : priceRange.split("-").map((value) => Number(value))
    : [0, Infinity];

  const filteredCars = inventoryData.filter((car) => {
    const matchesBrand = !brand || car.marca === brand;
    const matchesModel = !model || car.modelo === model;
    const matchesPrice =
      !priceRange || (car.precioUSD >= minPrice && car.precioUSD <= maxPrice);
    return matchesBrand && matchesModel && matchesPrice;
  });

  renderInventory(filteredCars);
};

Object.values({ model: filters.model, price: filters.price }).forEach((filter) => {
  filter?.addEventListener("change", applyFilters);
});

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
