/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/

/**
 * 
 * GLOBAL VARIABLES
 *  
 */
// Basic Info Elements
const userName = document.getElementById("name");
const JobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
// T-Shirt Section Elements
const color = document.getElementById("color");
const design = document.getElementById("design");
// Set variables to reference the payment methods elements available.
const payment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
// Selecting the Required Form elements
const form = document.querySelector('form');
const email = document.getElementById("email");
const cardNumber = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
// Activities Section elements and checkboxes
const activities = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
const activitiesBox = document.getElementById('activities-box');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

/**
 * 
 * BASIC INFO
 *  
 */


// When the page loads, focus the first form field: the input element for the "Name" field.
userName.focus();
// Hide the "text field" with the id of "other-job-role" so it is not displayed when the form loads.
otherJobRole.style.display = "none";

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
 * 
 * T-SHIRT INFO
 *  
 */

// Disable the color `<select>` element on page load.
color.disabled = true;
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
 * 
 * PAYMENTE INFO
 *  
 */

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

/**
 * 
 * VISUAL VALIDATION ERRORS
 *  
 */

/**
 * This `showOrHideError` function will show an error notice element when a 
 * required form field is invalid (show is true) or hide when a field is valid (show is false).
 *
 * @param {boolean} show - This parameter represents a truth value: true or false.
 * @param {object} element - This parameter represents the required form field where the notice will be displayed.
 */

function showOrHideError(show, element) {
    // show an error notice element when show is true, hide when false
    if (show) {
        element.parentElement.classList.add("not-valid");
        element.parentElement.classList.remove("valid");
        element.parentElement.lastElementChild.style.display = "block";
    } else {
        element.parentElement.classList.add("valid");
        element.parentElement.classList.remove("not-valid");
        element.parentElement.lastElementChild.style.display = "none";
    }
}

/**
 * 
 * VALIDATORS: HELPER FUNCTIONS
 *  
 */

function nameValidator(nameField) {
    return /^[a-zA-Z]+\s?[a-zA-Z]*?\s?[a-zA-Z]*?$/.test(nameField);
    // This tests that there is at least a first name containing only letters, and allows for a middle and last name.
}

function emailValidator(emailField) {
    return /^[^@]+@[^@.]+\.([a-z]{2,})+$/i.test(emailField);
    // Tthis tests that there is a few characters for the username, followed by “@”, followed by a few more characters 
    // and followed by for example a “.com or .org or .net, etc” for the domain name.
}

function cardValidator(cardField) {
    return /^\b\d{13,16}\b$/.test(cardField);
    // This tests that there is a 13 to 16 digit number without dashes or spaces.
}

function zipValidator(zipField) {
    return /^\b\d{5}\b$/.test(zipField);
    // This tests that there is a 5 digit number without spaces.
}

function cvvValidator(cvvField) {
    return /^\b\d{3}\b$/.test(cvvField);
    // This tests that there is a 3 digit number without spaces.
}

/**
 * This `activitiesValidator` function returns true/false either an array is empty or not.
 * @param {array} arr - This parameter represents the array of elements we need to validate.
 */

function activitiesValidator(arr) {
    if (arr.length >= 1) {
        return true;
    } else {
        return false;
    }
}

/**
 * This `createHandler` function creates a reusable module pattern to validate form fields.
 *
 * @param {function} validator - This parameter represents the validator function that returns a tested regular expression.
 * @param {object} field - This parameter represents the required form field to validate inside the inner function.
 */
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
 * REGISTER FOR ACTIVITIES
 * 
 * - Accessibility.
 * - Conflicting Activity Times.
 * - Activity Cost Calculator.
 * - Activity Visual Validation Error.
 * 
 */

/**
 * Accessibility:
 * Loop for each activity `checkbox input` element to listen for the `focus` and `blur` event.
 */
checkboxes.forEach(activity => {
    activity.addEventListener("focus", e => {
        activity.parentElement.classList.add('focus');
    });
    activity.addEventListener("blur", e => {
        activity.parentElement.classList.remove('focus');
    });
});

/**
 * Conflicting Activity Times:
 * This arrow function `activityTime` prevents any conflicting activity times avoiding users  
 * from selecting activities that occur at the same time.
 */

const activityTimes = (e) => {
    // Variable to store the checkbox input that was just clicked
    const clicked = e.target;

    // Variable to store the `data-day-and-time` attribute of the checkbox that was just clicked
    const clickedType = clicked.getAttribute('data-day-and-time');

    // Loop over the checkbox input elements
    for (let i = 0; i < checkboxes.length; i++) {
        const checkboxType = checkboxes[i].getAttribute('data-day-and-time');

        // `if` statement to disable/enable the checkboxes activities
        if (checkboxType === clickedType && clicked !== checkboxes[i]) {
            //`if/else` statement to check if the clicked checkbox is checked or unchecked
            if (clicked.checked) {
                // If is checked, then disable the elements with the same `data-day-and-time` value 
                // than the checkbox that was just checked.
                checkboxes[i].disabled = true;
            } else {
                // Otherwise, if the checkbox is unchecked, enable the elements with 
                // the same `data-day-and-time` value than the checkbox that was just unchecked.
                checkboxes[i].disabled = false;
            }
        }
    }
    // Add the `.disabled` style class for checkbox parent labels
    [...checkboxes].forEach(cb => (cb.disabled) ? cb.parentElement.classList.add('disabled') : cb.parentElement.classList.remove('disabled'));
}

/**
 * Activity Cost Calculator:
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

/**
 * 
 * EVENTS HANDLERS
 * 
 */

// Validation Status Variables
const isValidName = createHandler(nameValidator);
const isValidEmail = createHandler(emailValidator);
const isValidCard = createHandler(cardValidator);
const isValidZip = createHandler(zipValidator);
const isValidCvv = createHandler(cvvValidator);

/**
 * This arrow function `isValidActivities` validates the "Register for Activities" section.
 */
const isValidActivities = () => {
    let userActivities = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            userActivities.push(checkbox);
        }
    });
    const status = activitiesValidator(userActivities);
    const activitiesError = !status;
    showOrHideError(activitiesError, activitiesBox);
    return status;
}

// Listener for updating the total cost in real time as the user check or uncheck activities
activities.addEventListener("change", totalCost);
// Listener for avoding user from selecting activities that occur at the same time.
activities.addEventListener("change", activityTimes);
// Listener to enable the `Color` <select> element when a `Design Theme` is selected.
design.addEventListener("change", shirtColors);
// Listener to display the payment method selected by the user.
payment.addEventListener("change", paymentMethod);

// Form Validators Events
form.addEventListener('submit', (e) => {

    if (!isValidName(userName)) {
        e.preventDefault();
    } else if (!isValidEmail(email)) {
        e.preventDefault();
        // Valid Email: Error Notice Conditions
        if (email.value !== "") {
            email.parentElement.lastElementChild.textContent = "Email address must be formatted correctly.";
        } else {
            email.parentElement.lastElementChild.textContent = "Please provide an email address.";
        }
    } else if (!isValidActivities()) {
        e.preventDefault();
    } else if (payment.value === 'credit-card') {
        // Check if Credit Card Payment Method is selected. if it's so, excute the following conditions
        if (!isValidCard(cardNumber) || !isValidZip(zip) || !isValidCvv(cvv)) {
            e.preventDefault();
        }
    } else {
        // submit form
    }
});

/**
 * 
 * REAL TIME ERROR MESSAGES:
 * Providing form validation error indications at the moment they occur to better serve users.
 * 
 */

// Change some default error messages when the page loads.
cardNumber.parentElement.lastElementChild.textContent = "Please provide a credit card number.";
zip.parentElement.lastElementChild.textContent = "Please provide a zip code.";
cvv.parentElement.lastElementChild.textContent = "Please provide the CVV number / Card Security Code.";

// Real-Time Error Message for Name field.
userName.addEventListener('keyup', e => {

    if (!isValidName(e.target) && e.target.value !== "") {
        e.target.parentElement.lastElementChild.textContent = "Please enter only letters. The name can only be followed by a middle and a last name without spaces at the end.";
    } else {
        e.target.parentElement.lastElementChild.textContent = "Name field cannot be blank.";
    }
});

// Real-Time Error Message for email field.
email.addEventListener('keyup', e => {

    if (!isValidEmail(e.target) && e.target.value !== "") {
        e.target.parentElement.lastElementChild.textContent = "Email address must be formatted correctly.";
    } else {
        e.target.parentElement.lastElementChild.textContent = "Please provide an email address.";
    }
});

// Real-Time Error Message for Activities Section.
activities.addEventListener("change", isValidActivities);

// Real-Time Error Message for Credit Card Number field.
cardNumber.addEventListener('keyup', e => {

    if (!isValidCard(e.target) && e.target.value !== "" && isNaN(e.target.value)) {
        e.target.parentElement.lastElementChild.textContent = "It looks like you're trying to use a type of credit card we don't accept.";
    } else if (!isValidCard(e.target) && e.target.value !== "" && !isNaN(e.target.value)) {
        e.target.parentElement.lastElementChild.textContent = "Credit card number must be between 13 - 16 digits";
    } else {
        e.target.parentElement.lastElementChild.textContent = "Please provide a credit card number.";
    }
});

// Real-Time Error Message for Zip Code field.
zip.addEventListener('keyup', e => {

    if (!isValidZip(e.target) && e.target.value !== "" && isNaN(e.target.value)) {
        e.target.parentElement.lastElementChild.textContent = "Oops. Invalid Zip Code. Please enter only numbers.";
    } else if (!isValidZip(e.target) && e.target.value !== "" && !isNaN(e.target.value)) {
        e.target.parentElement.lastElementChild.textContent = "Zip Code must be 5 digits.";
    } else {
        e.target.parentElement.lastElementChild.textContent = "Please provide a zip code.";
    }
});

// Real-Time Error Message for CVV field.
cvv.addEventListener('keyup', e => {

    if (!isValidCvv(e.target) && e.target.value !== "" && isNaN(e.target.value)) {
        e.target.parentElement.lastElementChild.textContent = "Oops. Invalid CVV.";
    } else if (!isValidCvv(e.target) && e.target.value !== "" && !isNaN(e.target.value)) {
        e.target.parentElement.lastElementChild.textContent = "CVV must be 3 digits.";
    } else {
        e.target.parentElement.lastElementChild.textContent = "Please provide the CVV number / Card Security Code.";
    }
});
