/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/

// Creating and Selecting elements
const userName = document.getElementById("name");
const JobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const color = document.getElementById("color");
const design = document.getElementById("design");

/**
 * Hide the "text field" with the id of "other-job-role" so it is not displayed when the form first loads.
 * When the page first loads, focus the input element for the "Name" field and disabled the color <select> element.
 */

window.addEventListener("load", () => {
    userName.focus();
    otherJobRole.style.display = "none";
    color.setAttribute("disabled", "");
});

/**
 * Evvent listener to listen for changes on `Job Role` <select> element.
 * When a change is detected, display/hide the "text field" (Other Job Role) based on the selection in the drop-down menu.
 */

JobRole.addEventListener("change", () => {
    if (JobRole.value === "other") {
        otherJobRole.style.display = "block";
    } else {
        otherJobRole.style.display = "none";
    }
});

/**
 * Evvent listener on the "Design" <select> element in order to:
 * - Enable The "Color" <select> element.
 * - Display an available color in the "Color" <select> element.
 * - The "Color" dropdown shows only the color options associated with the selected design.
 */

design.addEventListener("change", () => {
    const colors = color.querySelectorAll("option");
    const selected = color.firstElementChild;

    if (design.value === "js puns" || design.value === "heart js") {
        color.removeAttribute("disabled");
        selected.removeAttribute("selected");
    }

    colors.forEach((option) => {
        if (design.value === "js puns") {
            if (option.dataset.theme !== "js puns") {
                option.setAttribute("hidden", "");
            } else {
                option.removeAttribute("hidden");
                selected.nextElementSibling.setAttribute("selected", "");
                selected.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.removeAttribute(
                    "selected",
                    ""
                );
            }
        } else if (design.value === "heart js") {
            if (option.dataset.theme !== "heart js") {
                option.setAttribute("hidden", "");
            } else {
                option.removeAttribute("hidden");
                selected.nextElementSibling.removeAttribute("selected", "");
                selected.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute(
                    "selected",
                    ""
                );
            }
        }
    });
});
