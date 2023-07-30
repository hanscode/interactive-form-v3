/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/

// Creating variables for selecting elements globally.
const userName = document.getElementById("name");
const JobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const color = document.getElementById("color");
const design = document.getElementById("design");
const activities = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');

// When the page loads, focus the first form field: the input element for the "Name" field.
userName.focus();
// Hide the "text field" with the id of "other-job-role" so it is not displayed when the form loads.
otherJobRole.style.display = "none";
// Disable the color `<select>` element on page load.
color.disabled = true;

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
 * This arrow function `shirtColors` executes the following tasks dynamically:
 * - Enable The "Color" <select> element.
 * - Display an available color in the "Color" <select> element.
 * - The "Color" dropdown shows only the color options associated with the selected design.
 */

const shirtColors = (e) => {
    const colors = color.children;
    const selected = color.firstElementChild;

    color.disabled = false;
    selected.removeAttribute("selected");

    for (let i = 0; i < colors.length; i++) {
        let theme = e.target.value;
        let shirt = colors[i].getAttribute('data-theme');

        if (shirt == theme) {
            colors[i].hidden = false;
            colors[i].selected = true;
        } else {
            colors[i].hidden = true;
            colors[i].selected = false;
        }
    }
}

/**
 * This arrow function `totalCost` calculates the total cost 
 * of the selected activities in the "Register for Activities" section.
 */

// The total cost of the activities variable with an initial value of 0.
let total = 0;

const totalCost = (e) => {
    let activityCost = +(e.target.getAttribute('data-cost'));

    if (e.target.checked) {
        total += activityCost;
    } else {
        total -= activityCost;
    }
    activitiesCost.innerHTML = `Total: $${total}`;
}

// Set variables to reference the payment methods elements available.
const payment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const payPal = document.getElementById("paypal");
const bitCoin = document.getElementById("bitcoin");

// Hide the following payment methods initially upon page load.
paypal.style.display = "none";
bitCoin.style.display = "none";

// "Credit Card" payment method selected for the user by default.
payment.firstElementChild.nextElementSibling.setAttribute("selected", "");

// This `paymentMethod` arrow function hides all payment sections in the form’s UI except the selected one.
const paymentMethod = (e) => {
    const payWith = e.target.value;
    paypal.style.display = "none";
    bitCoin.style.display = "none";
    creditCard.style.display = "none";
    document.getElementById(payWith).style.display = "block";
}

// Event Handlers

// Listener for updating the total cost in real time as the user check or uncheck activities
activities.addEventListener("change", totalCost);

// Listener to enable the `Color` <select> element when a `Design Theme` is selected.
design.addEventListener("change", shirtColors);

// Listener to display the payment method selected by the user.
payment.addEventListener("change", paymentMethod);