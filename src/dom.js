// Module Imports
import {projects, activeProject, changeActiveProject, showAllProjects, showCompletedProject, showIncompletedProject, addProject, addListItem, deleteListItem, editListItem, toggleComplete} from "./main";


const generateList = (() => {

    // Elements
    const mainContainer = document.querySelector(".main-container");

    // Append list wrapper div to main container
    const listWrapper = document.createElement("div");
    listWrapper.setAttribute("class", "list-wrapper");
    mainContainer.appendChild(listWrapper);

    // Append list header row div to wrapper
    const listHeaderRowDiv = document.createElement("div");
    listHeaderRowDiv.setAttribute("class", "list-header-row-div");
    listWrapper.appendChild(listHeaderRowDiv);

    // Append list header row to div
    const listHeaderRow = document.createElement("p");
    let listHeaderRowText = document.createTextNode(`${activeProject.title}`);
    listHeaderRow.appendChild(listHeaderRowText);
    listHeaderRow.setAttribute("class", "list-header-row");
    listHeaderRowDiv.appendChild(listHeaderRow);

    // Append list holder to wrapper
    const listHolder = document.createElement("ul");
    listHolder.setAttribute("class", "list-holder");
    listWrapper.appendChild(listHolder);

    if (activeProject.items) {
        for (let i=0; i<activeProject.items.length; i++) {

            // Append list item container to holder
            const itemContainer = document.createElement("li");
            itemContainer.setAttribute("class", "item-container");
            listHolder.appendChild(itemContainer);
    
            // Append item checkbox to item container
            const itemCheckbox = document.createElement("li");
            itemCheckbox.setAttribute("class", "item-checkbox");
            itemContainer.appendChild(itemCheckbox);
    
            // Append item checkbox div to checkbox
            const itemCheckboxDiv = document.createElement("div");
            if (`${activeProject.items[i].priority}` === "Priority 1") {
                itemCheckboxDiv.setAttribute("class", "item-checkbox-div priority-one");
            }
            else if (`${activeProject.items[i].priority}` === "Priority 2") {
                itemCheckboxDiv.setAttribute("class", "item-checkbox-div priority-two");
            }
            else if (`${activeProject.items[i].priority}` === "Priority 3") {
                itemCheckboxDiv.setAttribute("class", "item-checkbox-div priority-three");
            }
            else {
                itemCheckboxDiv.setAttribute("class", "item-checkbox-div priority-four");
            }
            itemCheckboxDiv.onclick = function() {toggleComplete(activeProject, i)};
            itemCheckbox.appendChild(itemCheckboxDiv);
    
            // Append item to item container
            const item = document.createElement("li");
            const itemText = document.createTextNode(`${activeProject.items[i].title}`);
            item.appendChild(itemText);
            console.log(`${activeProject.items[i].complete}`);
            if (`${activeProject.items[i].complete}` == "true") {
                item.setAttribute("class", "item completed");
            }
            else {
                item.setAttribute("class", "item");
            }
            item.onclick = function() {editListItem(activeProject, i)};
            itemContainer.appendChild(item);
    
            // Append due date to item container
            const itemDueDate = document.createElement("p");
            const itemDueDateText = document.createTextNode(`${activeProject.items[i].dueDate}`);
            itemDueDate.appendChild(itemDueDateText);
            itemDueDate.setAttribute("class", "item-due-date");
            itemContainer.appendChild(itemDueDate);
    
            // Append item delete button div to item container
            const itemDeleteButtonDiv = document.createElement("div");
            itemDeleteButtonDiv.setAttribute("class", "item-delete-button-div");
            itemDeleteButtonDiv.onclick = function() {deleteListItem(activeProject, i)};
            itemContainer.appendChild(itemDeleteButtonDiv);
    
            // Append item delete button first level to item delete button div
            const itemDeleteButtonFirst = document.createElement("div");
            itemDeleteButtonFirst.setAttribute("class", "item-delete-button-first");
            itemDeleteButtonDiv.appendChild(itemDeleteButtonFirst);
    
            // Append item delete button second level to first level
            const itemDeleteButtonSecond = document.createElement("div");
            itemDeleteButtonSecond.setAttribute("class", "item-delete-button-second");
            itemDeleteButtonFirst.appendChild(itemDeleteButtonSecond);
        }
    }

    console.log(activeProject);
    
    // Append add item li to wrapper    
    const addItem = document.createElement("li");
    const addItemText = document.createTextNode("+ Add Task");
    addItem.appendChild(addItemText);
    addItem.setAttribute("class", "add-item-li");
    addItem.onclick = function() {addNewTask();};
    listHolder.appendChild(addItem);

    return {
    }

});

const clearList = (() => {

    // Elements
    const mainContainer = document.querySelector(".main-container");

    // Clear display
    mainContainer.textContent = '';
});

const clearListHolder = (() => {

    // Elements
    const listHolder = document.querySelector(".list-holder");

    // Clear display
    listHolder.textContent = '';
});

const addNewTask = (() => {

    // Check if triggered before
    if (document.querySelector(".add-item-new-wrapper")) {

        // Elements
        const addItemNewWrapper = document.querySelector(".add-item-new-wrapper");

        // Hide add item button
        addItemNewWrapper.style.display = "block";

        return
    }

    // Elements
    const addItemLi = document.querySelector(".add-item-li");
    const listHolder = document.querySelector(".list-holder");

    // Hide add item button
    addItemLi.style.display = "none";

    // Create new wrapper
    const addItemNewWrapper = document.createElement("div");
    addItemNewWrapper.setAttribute("class", "add-item-new-wrapper");
    listHolder.appendChild(addItemNewWrapper);

    // Add form
    const addItemForm = document.createElement("form");
    addItemForm.setAttribute("class", "add-item-form");
    addItemNewWrapper.appendChild(addItemForm);

    // Create top row div
    const addItemNewTopRowDiv = document.createElement("div");
    addItemNewTopRowDiv.setAttribute("class", "add-item-new-top-row");
    addItemNewWrapper.appendChild(addItemNewTopRowDiv);

    // Add title entry to form within top row div
    const formTitle = document.createElement("input");
    formTitle.setAttribute("type","text");
    formTitle.setAttribute("placeholder","e.g. Renew gym membership");
    formTitle.setAttribute("name","title");
    formTitle.setAttribute("class", "add-item-form-title");
    addItemNewTopRowDiv.appendChild(formTitle);

    // Create bottom row div
    const addItemNewBottomRowDiv = document.createElement("div");
    addItemNewBottomRowDiv.setAttribute("class", "add-item-new-bottom-row");
    addItemNewWrapper.appendChild(addItemNewBottomRowDiv);

    // Add date entry to form within bottom row div
    const formDate = document.createElement("input");
    formDate.setAttribute("type","date");
    formDate.setAttribute("name","due-date");
    formDate.setAttribute("class", "add-item-form-date");
    addItemNewBottomRowDiv.appendChild(formDate);

    // Add project entry to form within bottom row div
    const formProject = document.createElement("select");
    formProject.setAttribute("name","project");
    formProject.setAttribute("placeholder","Project");
    formProject.setAttribute("class", "add-item-form-project");
    for (let i=0; i<projects.length; i++) {
        let userProjectOption = document.createElement("option");
        userProjectOption.value = `${projects[i].title}`;
        userProjectOption.text = `${projects[i].title}`;
        formProject.appendChild(userProjectOption);
    }
    addItemNewBottomRowDiv.appendChild(formProject);

    // Add priority to form within bottom row div
    const formPriority = document.createElement("select");
    formPriority.setAttribute("name","project");
    formPriority.setAttribute("placeholder","Priority");
    formPriority.setAttribute("class", "add-item-form-priority");
    const priorityOption1 = document.createElement("option");
    priorityOption1.value = "Priority 1";
    priorityOption1.text = "Priority 1";
    formPriority.appendChild(priorityOption1);
    const priorityOption2 = document.createElement("option");
    priorityOption2.value = "Priority 2";
    priorityOption2.text = "Priority 2";
    formPriority.appendChild(priorityOption2);
    const priorityOption3 = document.createElement("option");
    priorityOption3.value = "Priority 3";
    priorityOption3.text = "Priority 3";
    formPriority.appendChild(priorityOption3);
    const priorityOption4 = document.createElement("option");
    priorityOption4.value = "Priority 4";
    priorityOption4.text = "Priority 4";
    formPriority.appendChild(priorityOption4);
    addItemNewBottomRowDiv.appendChild(formPriority);

    // Add submit button to form within bottom row div
    const formSubmitButton = document.createElement("input");
    formSubmitButton.setAttribute("type","submit");
    formSubmitButton.setAttribute("value","Submit");
    formSubmitButton.setAttribute("class", "add-item-form-submit-button");
    addItemNewBottomRowDiv.appendChild(formSubmitButton);

    // Add event listener
    formSubmitButton.onclick = function(){
        addListItem().submitListItem();
        hideNewTaskBox();
        clearList();
        generateList();
    };

    return {
    }
});

const hideNewTaskBox = (() => {

    // Elements
    const addItemLi = document.querySelector(".add-item-li");
    const addItemNewWrapper = document.querySelector(".add-item-new-wrapper");

    if(addItemNewWrapper) {
        // Hide new task box
        addItemNewWrapper.style.display = "none";
    }

    // Unhide add item button
    addItemLi.style.display = "block";

    return {
    }
});

const editTask = ((activeProject, i) => {

    // Form Information
    let formTitle = activeProject.items[i].title;
    let formDate = activeProject.items[i].dueDate;

    // Elements
    const addItemLi = document.querySelector(".add-item-li");
    const listHolder = document.querySelector(".list-holder");

    // Create new wrapper
    const editItemNewWrapper = document.createElement("div");
    editItemNewWrapper.setAttribute("class", "edit-item-new-wrapper");
    listHolder.appendChild(editItemNewWrapper);

    // Add form
    const editItemForm = document.createElement("form");
    editItemForm.setAttribute("class", "edit-item-form");
    editItemNewWrapper.appendChild(editItemForm);

    // Create top row div
    const editItemNewTopRowDiv = document.createElement("div");
    editItemNewTopRowDiv.setAttribute("class", "edit-item-new-top-row");
    editItemNewWrapper.appendChild(editItemNewTopRowDiv);

    // Add title entry to form within top row div
    const editFormTitle = document.createElement("input");
    editFormTitle.setAttribute("type","text");
    editFormTitle.setAttribute("name","title");
    editFormTitle.setAttribute("class", "edit-item-form-title");
    editFormTitle.setAttribute("value", formTitle);
    editItemNewTopRowDiv.appendChild(editFormTitle);

    // Create bottom row div
    const editItemNewBottomRowDiv = document.createElement("div");
    editItemNewBottomRowDiv.setAttribute("class", "edit-item-new-bottom-row");
    editItemNewWrapper.appendChild(editItemNewBottomRowDiv);

    // Add date entry to form within bottom row div
    const editFormDate = document.createElement("input");
    editFormDate.setAttribute("type","date");
    editFormDate.setAttribute("name","due-date");
    editFormDate.setAttribute("class", "edit-item-form-date");
    editFormDate.setAttribute("value", formDate);
    editItemNewBottomRowDiv.appendChild(editFormDate);

    // Add submit button to form within bottom row div
    const editFormSubmitButton = document.createElement("input");
    editFormSubmitButton.setAttribute("type","submit");
    editFormSubmitButton.setAttribute("value","Submit");
    editFormSubmitButton.setAttribute("class", "edit-item-form-submit-button");
    editItemNewBottomRowDiv.appendChild(editFormSubmitButton);

    //Add event listener
    editFormSubmitButton.onclick = function(){

        // Form Information
        activeProject.items[i].title = editFormTitle.value;
        activeProject.items[i].dueDate = editFormDate.value;

        // editListItem().submitEditListItem(activeProject, i);
        // hideNewTaskBox();
        clearList();
        generateList();
    };

    return {
    }
});

const generateSidebar = (() => {

    // Elements
    const sidebarContainer = document.querySelector(".sidebar-container");

    // Create link container
    const linkContainer = document.createElement("div");
    linkContainer.setAttribute("class", "sidebar-links");
    sidebarContainer.appendChild(linkContainer);

    // Create link for all items
    const allItems = document.createElement("div");
    allItems.setAttribute("class", "sidebar-item");
    let allItemsText = document.createTextNode("All");
    allItems.addEventListener("click", showAllProjects);
    allItems.appendChild(allItemsText);
    linkContainer.appendChild(allItems);

    // Create link for today's items
    const todayItems = document.createElement("div");
    todayItems.setAttribute("class", "sidebar-item");
    let todayItemsText = document.createTextNode("Today");
    todayItems.appendChild(todayItemsText);
    linkContainer.appendChild(todayItems);

    // Create link for weeks's items
    const weekItems = document.createElement("div");
    weekItems.setAttribute("class", "sidebar-item");
    let weekItemsText = document.createTextNode("Week");
    weekItems.appendChild(weekItemsText);
    linkContainer.appendChild(weekItems);

    // Create link for complete items
    const completeItems = document.createElement("div");
    completeItems.setAttribute("class", "sidebar-item");
    let completeItemsText = document.createTextNode("Complete");
    completeItems.addEventListener("click", showCompletedProject);
    completeItems.appendChild(completeItemsText);
    linkContainer.appendChild(completeItems);

    // Create link for incomplete items
    const incompleteItems = document.createElement("div");
    incompleteItems.setAttribute("class", "sidebar-item");
    let incompleteItemsText = document.createTextNode("Incomplete");
    incompleteItems.addEventListener("click", showIncompletedProject);
    incompleteItems.appendChild(incompleteItemsText);
    linkContainer.appendChild(incompleteItems);

    // Create sidebar project holder
    const sidebarProjectHolder = document.createElement("div");
    sidebarProjectHolder.setAttribute("class", "sidebar-project-holder");
    linkContainer.appendChild(sidebarProjectHolder);

    // Create sidebar add project link
    const sidebarAddProjectLink = document.createElement("div");
    sidebarAddProjectLink.setAttribute("class", "sidebar-add-project");
    let sidebarAddProjectLinkText = document.createTextNode("+ Add Project");
    sidebarAddProjectLink.appendChild(sidebarAddProjectLinkText);
    sidebarAddProjectLink.addEventListener("click", addNewProject);
    linkContainer.appendChild(sidebarAddProjectLink);
});

const generateProjectList = (() => {

    // Elements
    const sidebarProjectHolder = document.querySelector(".sidebar-project-holder");

    // Iterate through length of current projects
    for (let i=0; i<projects.length; i++) {

        if (sidebarProjectHolder.textContent == '') {
            // Create sidebar project holder
            let sidebarProjectHolderText = document.createTextNode("Projects");
            sidebarProjectHolder.appendChild(sidebarProjectHolderText);
        }

        // Append project to sidebar project holder
        const project = document.createElement("div");
        const projectText = document.createTextNode(`- ${projects[i].title}`);
        project.appendChild(projectText);
        project.setAttribute("class", "sidebar-project");
        sidebarProjectHolder.appendChild(project);

        // Add event listener
        project.onclick = function(){
            changeActiveProject(projects[i]);
            clearList();
            generateList();
        };
    }

    return {
    }
});

const clearProjectList = (() => {

    // Elements
    const sidebarProjectHolder = document.querySelector(".sidebar-project-holder");

    // Clear display
    sidebarProjectHolder.textContent = '';
});

const addNewProject = (() => {

    // Check if triggered before
    if (document.querySelector(".add-project-new-wrapper")) {

        // Elements
        const addProjectNewWrapper = document.querySelector(".add-project-new-wrapper");

        // Hide add item button
        addProjectNewWrapper.style.display = "block";

        return
    }

    // Elements
    const addProjectDiv = document.querySelector(".sidebar-add-project");
    const sidebarProjectHolder = document.querySelector(".sidebar-project-holder");

    // Hide add project div
    addProjectDiv.style.display = "none";

    // Create new wrapper
    const addProjectNewWrapper = document.createElement("div");
    addProjectNewWrapper.setAttribute("class", "add-project-new-wrapper");
    sidebarProjectHolder.appendChild(addProjectNewWrapper);

    // Add form
    const addProjectForm = document.createElement("form");
    addProjectForm.setAttribute("class", "add-project-form");
    addProjectNewWrapper.appendChild(addProjectForm);

    // Add project title entry to form
    const projectFormTitle = document.createElement("input");
    projectFormTitle.setAttribute("type","text");
    projectFormTitle.setAttribute("placeholder","e.g. Travelling");
    projectFormTitle.setAttribute("name","title");
    projectFormTitle.setAttribute("class", "add-project-form-title");
    addProjectNewWrapper.appendChild(projectFormTitle);

    // Add submit button to form
    const projectFormSubmitButton = document.createElement("input");
    projectFormSubmitButton.setAttribute("type","submit");
    projectFormSubmitButton.setAttribute("value","Submit");
    projectFormSubmitButton.setAttribute("class", "add-project-form-submit-button");
    addProjectNewWrapper.appendChild(projectFormSubmitButton);

    // Add event listener
    projectFormSubmitButton.onclick = function(){
        addProject().submitProject();
        hideNewProjectBox();
        clearProjectList();
        generateProjectList();
    };

    return {
    }
});

const hideNewProjectBox = (() => {

    // Elements
    const addProjectDiv = document.querySelector(".sidebar-add-project");
    const addProjectNewWrapper = document.querySelector(".add-project-new-wrapper");

    // Hide new projet box
    addProjectNewWrapper.style.display = "none";

    // Unhide add project button
    addProjectDiv.style.display = "block";

    return {
    }
});


// Module Exports
export {generateList, clearList, clearListHolder, generateSidebar, generateProjectList, addNewProject, editTask};