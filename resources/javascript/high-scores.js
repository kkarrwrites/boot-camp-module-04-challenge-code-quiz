// Variables for elements
const buttonGoBackElement = document.querySelector("#button__go-back");

// Adds link to Go Back button on High Scores page
buttonGoBackElement.addEventListener("click", function () {
  window.open("index.html", "_self");
});
