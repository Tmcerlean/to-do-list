// Module Imports
import { clearList, clearListHolder, generateList, editTask } from "./dom";

// Projects
let projects = [];

// Item Number
let itemNumber = 0;

// Create Project
const createProject = (title) => {
  projects.push({
    title,
    items: [],
  });

  return {};
};

// All Items
const allItems = () => {
  let itemArray = { title: "All", items: [] };
  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].items.length; j++) {
      itemArray.items.push(projects[i].items[j]);
    }
  }
  return {
    itemArray,
  };
};

// Complete Items
const completeItems = () => {
  let completeItemArray = { title: "Complete", items: [] };
  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].items.length; j++) {
      if (projects[i].items[j].complete == true) {
        completeItemArray.items.push(projects[i].items[j]);
      }
    }
  }
  return {
    completeItemArray,
  };
};

// Incomplete Items
const incompleteItems = () => {
  let incompleteItemArray = { title: "Incomplete", items: [] };
  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].items.length; j++) {
      if (projects[i].items[j].complete == false) {
        incompleteItemArray.items.push(projects[i].items[j]);
      }
    }
  }
  return {
    incompleteItemArray,
  };
};

// Create Inbox
let inbox = createProject("Inbox");

// Active Project
let activeProject = projects[0];

// Change Active Project
let changeActiveProject = function (project) {
  activeProject = project;
};

// Show All Projects
let showAllProjects = function () {
  activeProject = allItems().itemArray;
  clearList();
  generateList();
};

// Show Completed Project
let showCompletedProject = function () {
  activeProject = completeItems().completeItemArray;
  clearList();
  generateList();
};

// Show Incompleted Project
let showIncompletedProject = function () {
  activeProject = incompleteItems().incompleteItemArray;
  clearList();
  generateList();
};

// Add Project
const addProject = () => {
  // Elements
  let newProjectTitle = document.querySelector(".add-project-form-title").value;

  const submitProject = function () {
    // Ensuring no blank entries
    if (newProjectTitle == "") {
      newProjectTitle = "New Project";
    }

    // Ensuring no duplicate entries
    for (let i = 0; i < projects.length; i++) {
      if (newProjectTitle == projects[i].title) {
        array.splice(i, 1);
      }
    }
    createProject(newProjectTitle);
  };

  return {
    submitProject,
  };
};

// Create List Item
const createListItem = (title, dueDate, project, priority) => {
  let item = itemNumber++;
  let complete = false;

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].title == project) {
      projects[i].items.push({
        title,
        dueDate,
        project,
        priority,
        item,
        complete,
      });
    }
  }
  allItems();
  return {};
};

// Add Listen Item
const addListItem = () => {
  // Elements
  let newListItemTitle = document.querySelector(".add-item-form-title").value;
  let newListItemDueDate = document.querySelector(".add-item-form-date").value;
  let newListItemProject = document.querySelector(".add-item-form-project");
  let newListItemProjectSelected =
    newListItemProject.options[newListItemProject.selectedIndex].value;
  let newListItemPriority = document.querySelector(".add-item-form-priority");
  let newListItemPrioritySeleted =
    newListItemPriority.options[newListItemPriority.selectedIndex].value;

  const submitListItem = function () {
    if (newListItemTitle == "") {
      newListItemTitle = "Default Entry";
    }
    createListItem(
      newListItemTitle,
      newListItemDueDate,
      newListItemProjectSelected,
      newListItemPrioritySeleted
    );
    if (activeProject.title == "All") {
      showAllProjects();
    }
  };
  return {
    submitListItem,
  };
};

// Delete List Item
const deleteListItem = (activeProject, i) => {
  if (
    activeProject.title == "All" ||
    activeProject.title == "Incomplete" ||
    activeProject.title == "Complete"
  ) {
    // Find out what project the selected item is in
    let itemsProject = activeProject.items[i].project;
    // Find its item number
    let itemsNumber = activeProject.items[i].itemNumber;
    // Find the index of the project
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].title == itemsProject) {
        var projectIndex = i;
      }
    }
    // Find the index in the project which matches the item number
    for (let j = 0; j < projects[projectIndex].items.length; j++) {
      if (projects[projectIndex].items[j].item == itemsNumber) {
        var itemIndex = j;
      }
    }
    // Delete the item
    projects[projectIndex].items.splice(itemIndex, 1);
    // Update
    showAllProjects();
  } else {
    activeProject.items.splice(i, 1);
    clearList();
    generateList();
  }
};

// Edit List Item
const editListItem = (activeProject, i) => {
  // Hide array
  clearListHolder();

  // Show box and populate it with current information
  editTask(activeProject, i);
};

// Mark Item Complete
const toggleComplete = (activeProject, i) => {
  if (activeProject.items[i].complete == false) {
    activeProject.items[i].complete = true;
    clearList();
    generateList();
  } else {
    activeProject.items[i].complete = false;
    clearList();
    generateList();
  }
};

export {
  projects,
  activeProject,
  changeActiveProject,
  showAllProjects,
  showCompletedProject,
  showIncompletedProject,
  createProject,
  addProject,
  createListItem,
  addListItem,
  deleteListItem,
  editListItem,
  toggleComplete,
};
