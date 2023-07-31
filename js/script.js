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
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

// Hide the following payment methods initially upon page load.
paypal.style.display = "none";
bitcoin.style.display = "none";

// "Credit Card" payment method selected for the user by default.
payment.firstElementChild.nextElementSibling.selected = true;

// This `paymentMethod` arrow function hides all payment sections in the form’s UI except the selected one.
const paymentMethod = (e) => {
    const payWith = e.target.value;
    paypal.style.display = "none";
    bitcoin.style.display = "none";
    creditCard.style.display = "none";
    document.getElementById(payWith).style.display = "block";
}

// Selecting the Required Form elements
const form = document.querySelector('form');
const email = document.getElementById("email");
const cardNumber = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');

/**
 * 
 * VALIDATORS: HELPER FUNCTIONS
 *  
 */

function showOrHideError(show, element) {
    // show an error notice element when show is true, hide when false
    if (show) {
        element.className = "not-valid";
        element.classList.remove("valid");
        element.parentElement.lastElementChild.style.display = "block";
    } else {
        element.className = "valid";
        element.classList.remove("not-valid");
        element.parentElement.lastElementChild.style.display = "none";
    }
}

function nameValidator(nameField) {
    return /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameField);
}

function emailValidator(emailField) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailField);
}

function cardValidator(cardField) {
    return /^\b\d{13,16}\b$/.test(cardField);
}

function zipValidator(zipField) {
    return /^\b\d{5}\b$/.test(zipField);
}

function cvvValidator(cvvField) {
    return /^\b\d{3}\b$/.test(cvvField);
}

function createHandler(validator) {
    return function (field) {
        const value = field.value;
        const valid = validator(value);
        const showError = !valid;
        showOrHideError(showError, field);
        return valid;
    }
}

/**
 * 
 * ACCESSIBILITY: For the activities blocks
 * 
 */

const allActivities = document.querySelectorAll('input[type="checkbox"]');

allActivities.forEach(activity => {
    activity.addEventListener("focus", e => {
        activity.parentElement.classList.add('focus');
    });
    activity.addEventListener("blur", e => {
        activity.parentElement.classList.remove('focus');
    });
});

/**
 * 
 * EVENTS HANDLERS
 * 
 */

// Listener for updating the total cost in real time as the user check or uncheck activities
activities.addEventListener("change", totalCost);
// Listener to enable the `Color` <select> element when a `Design Theme` is selected.
design.addEventListener("change", shirtColors);
// Listener to display the payment method selected by the user.
payment.addEventListener("change", paymentMethod);

// Form Validators Events
form.addEventListener('submit', (e) => {

    e.preventDefault();
    
    const isValidName = createHandler(nameValidator);
    const isValidEmail = createHandler(emailValidator);
    const isValidCard = createHandler(cardValidator);
    const isValidZip = createHandler(zipValidator);
    const isValidCvv = createHandler(cvvValidator);

    if (!isValidName(userName)) {
        e.preventDefault();
    } else if (!isValidEmail(email)) {
        e.preventDefault();
    } else if (payment.value === 'credit-card') {
        if (!isValidCard(cardNumber) || !isValidZip(zip) || !isValidCvv(cvv)) {
            e.preventDefault();
        }
    } else {
        // submit form
    }
}); 