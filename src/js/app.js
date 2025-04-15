import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  // Imagen de portada (cover)
  let cover =
    variables.includeCover !== false
      ? `<div class="cover"><img src="${variables.background}" /></div>`
      : `<div class="cover"></div>`;

  // Datos con valores por defecto
  const name = variables.name || "Nombre";
  const lastName = variables.lastName || "Apellido";
  const role = variables.role || "Rol";
  const country = variables.country || "Country";
  const city = variables.city || "City";

  // Redes sociales (se renderizan solo si hay dato)
  const twitter = variables.twitter
    ? `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
    : "";
  const github = variables.github
    ? `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`
    : "";
  const linkedin = variables.linkedin
    ? `<li><a href="https://linkedin.com/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
    : "";
  const instagram = variables.instagram
    ? `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
    : "";

  // Renderizado final
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${name} ${lastName}</h1>
      <h2>${role}</h2>
      <h3>${country}, ${city}</h3>
      <ul class="${variables.socialMediaPosition}">
        ${twitter}
        ${github}
        ${linkedin}
        ${instagram}
      </ul>
    </div>
  `;
}

window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-left",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value === "" || this.value === "null"
          ? null
          : this.value === "true"
          ? true
          : this.value === "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values));
    });
  });
};
