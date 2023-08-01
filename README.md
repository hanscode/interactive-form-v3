# Treehouse FSJS Techdegree
### Project 3: Interactive Form
Author - Hans Steffens

## Project Overview
In this project, I'll use JavaScript to enhance an interactive registration form for a fictional Full Stack conference.

## Features
Using the supplied HTML and CSS files, I'll add JavaScript to make the form more user-friendly by:

- Adding customized and conditional behavior and interactivity.
- Real Time Messages: This app provides form validation error indications at the moment they occur to better user experience. For example:
    - Name Field:  As the user is typing if an error occur, an error notices is displayed. If numbers are provided the error messahe will be "_Provide only letters..._". Also, the same message provide additional guidence in case the name must be formatted correclty, for instance, only middle and last name are allowed, nothing else. So the full messages will be: "_Please enter only letters. The name can only be followed by a middle and a last name without spaces at the end._"
    - Email Field: While the user is typing a notice is displayed regarding the right email format until the email is formatted correctly.
    - Payment info fields: Error messages are provided when the user interaction occurs with each of these fields. The credit card field must be a number between 13 to 16 digits, the zip field must be 5 digits and the CVV field must be 3 digits.
    - Activities Checkboxes: If the user selects one checkbox but decides to unchecked it and none checkboxes are checked, the section will be border with a red color and a message that says: "_Choose at least one activity._".
- Conditional Error Messages:
    - Card Number Field: If the user types letters, a new error message is displayed instantly ("_It looks like you're trying to use a type of credit card we don't accept._"). If the user deletes the content leaving the field empty, a new message is shown.: "_Please provide a credit card number_"
    - Zip Code Field: If the users provides letters, the new error notice will be "_Oops. Invalid Zip Code. Please enter only numbers._". If the user deletes the content leaving the field empty, a new message is shown "_Please provide a zip code._"
    - CVV Field: Like the Zip Code field, the CVV must be numbers. However if the user enters letters, the error message will be: "_Oops. Invalid CVV._" Also, if the user deletes the content leaving the field empty, a new message is shown:"_Please provide the CVV number / Card Security Code._"
    - Name Field: If the user deletes the content and leaves the field empty, then the error message will say: "_Name field cannot be blank._"
    - Email Field: Leaving this field empty the user interaction with this field will display an error that will say: "_Please provide an email address_"
