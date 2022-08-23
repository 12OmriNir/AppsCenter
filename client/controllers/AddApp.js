import { addApp } from "../services/service.js";

const pattern = new RegExp(/^\d+$/);

document.addEventListener("DOMContentLoaded", () => {
  const inputs = [...document.forms["appForm"].getElementsByTagName("input")].filter((input) => input.type !== "submit");

  inputs.forEach((input) => {

    input.addEventListener("input", (event) => {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");

      switch (event.target.id) {
        case "nameInput":
          if (event.target.value.length > 3 && event.target.value.length < 30) {
            event.target.classList.add("is-valid");
          } else {
            event.target.classList.add("is-invalid");
          }
          break;

        case "priceInput":
          if (pattern.test(event.target.value)) {
            event.target.classList.add("is-valid");
          } else {
            event.target.classList.add("is-invalid");
          }
          break;

        case "priceInput":
          if (pattern.test(event.target.value)) {
            event.target.classList.add("is-valid");
          } else {
            event.target.classList.add("is-invalid");
          }
          break;

        case "companyInput":
          if (event.target.value.length < 30) {
            event.target.classList.add("is-valid");
          } else {
            event.target.classList.add("is-invalid");
          }
          break;

        case "imageInput":
          if (event.target.value.length < 300) {
            event.target.classList.add("is-valid");
          } else {
            event.target.classList.add("is-invalid");
          }
          break;
      }
    });
  });

  document.forms["appForm"].addEventListener("submit", (event) => {
    event.preventDefault();

    let inputs = [...event.target.getElementsByTagName("input")].filter((input) => input.type !== "submit");

    if (inputs.filter((input) => input.id === "nameInput" || input.id == "priceInput").some((input) => input.value === "") ||
      inputs.some((input) => input.classList.contains("is-invalid"))) {

      document.getElementById("invalidMessage").innerHTML = "Oops, something went Wrong! Check your fields again";
      
    } else {
      const values = [
        inputs.find((input) => input.id === "imageInput").value,
        inputs.find((input) => input.id === "nameInput").value,
        inputs.find((input) => input.id === "priceInput").value,
        document.getElementById("descriptionInput").value,
        inputs.find((input) => input.id === "companyInput").value
      ];

      addApp(values)
      window.location.replace("mainPage.html");
    }
  });
});

