// Module Imports
import {generateList, generateSidebar, generateProjectList, addNewProject} from "./dom";

generateSidebar();
generateList();
generateProjectList();

// Elements
const sidebar = document.querySelector(".sidebar-container");
const sidebarAddProjectButton = document.querySelector(".sidebar-add-project");

// Website Initialisation
window.addEventListener('DOMContentLoaded', (event) => {
    
    sidebar.classList.add("website-loaded");

});

