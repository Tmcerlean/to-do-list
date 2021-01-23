// Module Imports
import {
  generateList,
  generateSidebar,
  generateProjectList,
  toggleMenu,
  closeMobileMenuDefault,
} from "./dom";

generateSidebar();
generateList();
generateProjectList();

// Elements
const sidebar = document.querySelector(".sidebar-container");

// Website Initialisation
window.addEventListener("DOMContentLoaded", (event) => {
  sidebar.classList.add("website-loaded");
  toggleMenu();
  closeMobileMenuDefault();
});
