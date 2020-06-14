/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navBar = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");

/**
 *
 * Begin Main Functions
 *
 */

// build the nav
function GenerateNavList() {
  let item = document.createElement("li");


  // Add class 'active' to section when near top of viewport
  item.addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
  });

  // Build li elements
  // Navigation is built dynamically as an unordered list
  for (let i of sections) {
    item = document.createElement("li");
    item.className = "nav_item";
    item.innerText = i.getAttribute("data-nav");
    item.addEventListener("click", function () {
      i.scrollIntoView({
        behavior: "smooth",
      });
    });
    navBar.appendChild(item);
  }
}

function ActivateOnScrollSection() {
  let activeSection = sections[0];
  let header = document.querySelector(".main__hero");
  let li = document.querySelectorAll("li");

  // Scroll to anchor ID using scrollTO event
  window.addEventListener("scroll", function (event) {
    // if viewport located on the header, activiate section 1 as a default section
    if (isEleInViewport(header)) {
      for (let ele of li) {
        if (ele.innerText === "Section 1") {
          ele.classList.add("nav_item_active");
        } else {
          //avoid activating two sections at the same time
          if (ele.classList.contains("nav_item_active")) {
            ele.classList.remove("nav_item_active");
          }
        }
      }
    } else {
      // activate sections based on the scrolling event
      for (let i of sections) {
        if (isEleInViewport(i)) {
          activeSection = i;
          i.classList.add("nav_item_active");
        } else {
          if (i.classList.contains("nav_item_active")) {
            i.classList.remove("nav_item_active");
          }
        }
      }
      // activate sections based on selected links
      for (let ele of li) {
        if (ele.innerText === activeSection.getAttribute("data-nav")) {
          ele.classList.add("nav_item_active");
        } else {
          if (ele.classList.contains("nav_item_active")) {
            ele.classList.remove("nav_item_active");
          }
        }
      }
    }
  });
}

//http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
// check if elements visible in the viewport
function isEleInViewport(element) {
  let rect = element.getBoundingClientRect();
//   let winHeight = window.innerHeight || document.documentElement.clientHeight;
//   let winWidth = window.innerWidth || document.documentElement.clientWidth;
  return (
    // rect.left >= 0 &&
    // rect.top >= 0 &&
    // rect.left + rect.width <= winWidth &&
    // rect.top + rect.height <= winHeight
    rect.top >= 0 &&
    rect.top <=
      0.4 * (window.innerHeight || document.documentElement.clientHeight)
  
  );
}

// Build menu
// Scroll to section on link click
GenerateNavList();

// Set sections as active
ActivateOnScrollSection();
