# Appointment Preparation Assistant

A responsive, browser-based form that helps patients organize symptoms, medications, questions, and other notes before a medical appointment. The project uses only HTML, CSS, and JavaScript. It does not diagnose conditions or provide medical advice.

## Live project and demonstration

- **Public GitHub repository:** Add your repository URL here after creating it.
- **Unlisted YouTube demonstration (2 minutes maximum):** Add your video URL here after recording and uploading it.

## Features

- Required fields for current symptoms and questions for the clinician.
- Repeatable medication inputs with accessible labels and remove controls.
- Optional patient name, appointment date, and additional notes.
- Client-side validation with clear error messages.
- A formatted summary generated from the entered information.
- Print layout that hides the form and displays only the summary.
- Responsive layout, keyboard-accessible controls, semantic HTML, and visible focus indicators.
- No server, database, API key, or third-party JavaScript library.

## Setup

1. Clone or download this repository.
2. Open the `appointment-prep-assistant` folder in Visual Studio Code.
3. Open `index.html` in a browser. You can also use the VS Code Live Server extension if it is already installed; it is optional and is not required by the project.

## How to use

1. Enter your current symptoms and at least one question for your clinician.
2. Add medication entries as needed. Medication details are optional.
3. Add your name, appointment date, or other notes if you wish.
4. Select **Generate my summary**.
5. Review the summary and select **Print summary** to open the browser's print dialog.

## Privacy and safety

The form processes entries in the browser and does not send them to a server or save them to local storage. Information is cleared when the page is refreshed or closed. Do not use this demonstration with real patient information, especially on a shared device. The tool is for appointment preparation only. It does not interpret symptoms or test results, diagnose conditions, or recommend treatment or medication changes. For emergencies, call 911 or seek emergency care.

## Accessibility

The page uses semantic landmarks, explicit labels, keyboard-operable buttons, visible focus styles, accessible validation messages, and responsive layouts. Colors were selected for strong contrast; verify final contrast ratios with an accessibility checker before submission.

## Files

- `index.html` – page structure and form fields.
- `css/style.css` – visual design, responsive rules, and print styles.
- `js/script.js` – validation, repeatable medication fields, and summary generation.
- `LICENSE` – MIT License.
- `.gitignore` – common files excluded from version control.

## Third-party libraries

None. This project uses browser-native HTML, CSS, and JavaScript APIs.

## Testing checklist

- [ ] Open the page in a current desktop browser and a narrow/mobile viewport.
- [ ] Use Tab and Shift+Tab to navigate all controls.
- [ ] Submit with required fields empty and confirm helpful error messages appear.
- [ ] Add and remove medication fields.
- [ ] Generate a summary and verify all entered text appears correctly.
- [ ] Use Print Summary and confirm only the summary appears in print preview.
- [ ] Check the browser console for errors.
- [ ] Run `index.html` through the Nu HTML Checker: https://validator.w3.org/nu/.
- [ ] Check color contrast with a WCAG contrast checker.
