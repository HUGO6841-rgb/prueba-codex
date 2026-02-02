const ctaButtons = document.querySelectorAll(".primary");

ctaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("clicked");
    button.textContent = "¡Te contactaremos!";

    setTimeout(() => {
      button.classList.remove("clicked");
      button.textContent = "Acción registrada";
    }, 1200);
  });
});

const filterForm = document.querySelector(".filter-form");
if (filterForm) {
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Pronto mostraremos los autos filtrados.");
  });
}
