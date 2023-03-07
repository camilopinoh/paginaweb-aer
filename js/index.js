// Navbar/Sidebar
const menuBtn = document.querySelectorAll(".menu-btn");
const menu = document.querySelector(".menu");
const links = document.querySelectorAll(".menu li");

//Abrir y cerrar Sidebar
menuBtn.forEach((btn) => {
  btn.addEventListener("click", sideNavToggle);
});

function sideNavToggle() {
  // Retraso de animacion
  let delay = 100;
  // Toggle para abrir menu
  menu.classList.toggle("menu-open");

  // Sidenav link animacion slide
  setTimeout(() => {
    // Resetear animacion despues de que todo termine
    resetAnimations();
  }, delay * (links.length + 1));

  // Agregar animacion a los links
  links.forEach((link) => {
    // Opacidad
    link.style.opacity = "0";
    // Animacion
    link.style.animation = "slideIn 400ms ease-in-out forwards";
    // Retraso
    link.style.animationDelay = delay + "ms";

    //Incrementar retraso por cada link
    delay += 100;
  });

  // Resetar animaciones para poder ser activadas otra vez
  function resetAnimations() {
    //Seleccionar todos los links
    links.forEach((link) => {
      //Remover las animaciones
      link.style.animation = "none";
      //Cambiar opacidad por defecto
      link.style.opacity = "1";
    });
  }
}

//Slider
const control = document.querySelectorAll(".slider-control");
const controlMob = document.querySelectorAll(".pagination-mobile > li");
const title = document.querySelector(".title");
const subTitle = document.querySelectorAll(".sub-title");
const img = document.querySelector(".thumbnail");
const count = document.querySelector(".slider-count");
const progress = document.querySelector(".progress div");

let id = 0;

// Datos
// Array con rutas de archivos de imagenes para slider

const images = ["./img/img1.jpg", "./img/img2.jpg", "./img/img3.jpg"];

// Array con widths de progreso para el slider

const progressWidth = ["33.33%", "66.66%", "100%"];

// Variaciones de texto para slider

const text = ["Work", "Active", "Travel"];

//Control de paginaciones
for (let i = 0; i < control.length; i++) {
  // Agregar evento click para todas las paginaciones
  control[i].addEventListener("click", () => {
    //Ejecutar funcion slider
    slider(i);
    //  Establecer id al index de la paginacion cliqueada
    id = i;
    // Detener auto slide
    stopAutoSlide();
  });

  //Agregar evento de click para todas las paginacion en mobile
  controlMob[i].addEventListener("click", () => {
    //Ejecutar funcion slider
    slider(i);
    //  Establecer id al index de la paginacion cliqueada
    id = i;
    // Detener auto slide
    stopAutoSlide();
  });
}

function slider(i) {
  // Cambiar thumbnail
  img.src = images[i];
  // Progreso de barra
  progress.style.width = progressWidth[i];
  // Cambiar titulo
  title.innerText = text[i] + " Collection";
  // Cambiar subtitulo
  subTitle.forEach((sub) => {
    sub.innerText = text[i] + " Collection";
  });

  // Cambiar numero de slide
  count.innerText = "/0" + (i + 1);

  //Remover clase active de todo
  for (let i = 0; i < control.length; i++) {
    control[i].classList.remove("active");
    controlMob[i].classList.remove("pag-active");
  }

  //Resetear clase active al cliequear un elemento
  control[i].classList.add("active");
  controlMob[i].classList.add("pag-active");
}

// Automatizacion de slider
function nextSlide() {
  // Incrementar img id
  id++;
  // Verificar si el id es mayor que el munero de slide disponibles
  if (id > control.length - 1) {
    id = 0;
  }
  //Ejecutar la funcion slider
  slider(id);
}

//Automatizar slider
let autoSlide = setInterval(nextSlide, 10000);

//Detener slide automatico
function stopAutoSlide() {
  clearInterval(autoSlide);

  //Reinciar auto slider
  autoSlide = setInterval(nextSlide, 10000);
}
