'use strict';

// Appointment Prep Assistant: client-side form handling and printable summary.
const form = document.getElementById('prep-form');
const medicationList = document.getElementById('medication-list');
const addMedicationButton = document.getElementById('add-medication');
const summarySection = document.getElementById('summary-section');
const printSummary = document.getElementById('print-summary');
let medicationCount = 1;

// Create a medication input with a unique label and accessible remove button.
function addMedicationField() {
  medicationCount += 1;
  const row = document.createElement('div');
  row.className = 'repeat-row';

  const label = document.createElement('label');
  label.className = 'sr-only';
  label.htmlFor = `medication-${medicationCount}`;
  label.textContent = `Medication ${medicationCount}`;

  const input = document.createElement('input');
  input.id = `medication-${medicationCount}`;
  input.name = 'medications[]';
  input.type = 'text';
  input.placeholder = 'Medication name and details';

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'remove-button';
  removeButton.textContent = 'Remove';
  removeButton.setAttribute('aria-label', `Remove medication ${medicationCount}`);
  removeButton.addEventListener('click', () => {
    row.remove();
    updateRemoveButtons();
  });

  row.append(label, input, removeButton);
  medicationList.append(row);
  updateRemoveButtons();
  input.focus();
}

// Keep at least one medication field available and label the disabled state clearly.
function updateRemoveButtons() {
  const rows = medicationList.querySelectorAll('.repeat-row');
  rows.forEach((row) => {
    const button = row.querySelector('.remove-button');
    button.disabled = rows.length === 1;
  });
}

addMedicationButton.addEventListener('click', addMedicationField);

function setFieldError(field, errorElement, message) {
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  errorElement.textContent = message;
}

// Build summary elements with textContent so user-entered text is never treated as HTML.
function createSummaryBlock(title, value) {
  const section = document.createElement('section');
  section.className = 'summary-block';
  const heading = document.createElement('h3');
  heading.textContent = title;
  const paragraph = document.createElement('p');
  if (value.trim()) {
    paragraph.textContent = value.trim();
  } else {
    paragraph.textContent = 'No information provided.';
    paragraph.className = 'empty-value';
  }
  section.append(heading, paragraph);
  return section;
}

function createMedicationBlock(medications) {
  const section = document.createElement('section');
  section.className = 'summary-block';
  const heading = document.createElement('h3');
  heading.textContent = 'Current medications';
  section.append(heading);

  if (medications.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'No medications listed.';
    empty.className = 'empty-value';
    section.append(empty);
    return section;
  }

  const list = document.createElement('ul');
  medications.forEach((medication) => {
    const item = document.createElement('li');
    item.textContent = medication;
    list.append(item);
  });
  section.append(list);
  return section;
}

function formatDate(dateValue) {
  if (!dateValue) return 'Not provided';
  // Add a midday time to avoid timezone shifts when formatting a date-only value.
  const date = new Date(`${dateValue}T12:00:00`);
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(date);
}

function generateSummary() {
  const name = document.getElementById('patient-name').value.trim();
  const appointmentDate = document.getElementById('appointment-date').value;
  const symptoms = document.getElementById('symptoms').value.trim();
  const questions = document.getElementById('questions').value.trim();
  const concerns = document.getElementById('concerns').value.trim();
  const medications = [...medicationList.querySelectorAll('input')]
    .map((input) => input.value.trim())
    .filter(Boolean);

  printSummary.replaceChildren();

  const meta = document.createElement('div');
  meta.className = 'summary-meta';
  const nameLine = document.createElement('p');
  const dateLine = document.createElement('p');
  const nameStrong = document.createElement('strong');
  const dateStrong = document.createElement('strong');
  nameStrong.textContent = 'Name: ';
  dateStrong.textContent = 'Appointment date: ';
  nameLine.append(nameStrong, document.createTextNode(name || 'Not provided'));
  dateLine.append(dateStrong, document.createTextNode(formatDate(appointmentDate)));
  meta.append(nameLine, dateLine);
  printSummary.append(
    meta,
    createSummaryBlock('Current symptoms', symptoms),
    createMedicationBlock(medications),
    createSummaryBlock('Questions for the clinician', questions),
    createSummaryBlock('Additional concerns or notes', concerns)
  );

  summarySection.hidden = false;
  summarySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('summary-heading').focus?.();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const symptomsField = document.getElementById('symptoms');
  const questionsField = document.getElementById('questions');
  const symptomsError = document.getElementById('symptoms-error');
  const questionsError = document.getElementById('questions-error');
  const symptomsMissing = !symptomsField.value.trim();
  const questionsMissing = !questionsField.value.trim();

  setFieldError(symptomsField, symptomsError, symptomsMissing ? 'Please describe your current symptoms before creating the summary.' : '');
  setFieldError(questionsField, questionsError, questionsMissing ? 'Please add at least one question for your clinician.' : '');

  if (symptomsMissing || questionsMissing) {
    (symptomsMissing ? symptomsField : questionsField).focus();
    return;
  }
  generateSummary();
});

// Remove old validation messages when the user starts correcting an entry.
document.getElementById('symptoms').addEventListener('input', () => {
  if (document.getElementById('symptoms').value.trim()) {
    setFieldError(document.getElementById('symptoms'), document.getElementById('symptoms-error'), '');
  }
});
document.getElementById('questions').addEventListener('input', () => {
  if (document.getElementById('questions').value.trim()) {
    setFieldError(document.getElementById('questions'), document.getElementById('questions-error'), '');
  }
});

document.getElementById('print-summary-button').addEventListener('click', () => {
  window.print();
});

document.getElementById('edit-summary').addEventListener('click', () => {
  document.getElementById('symptoms').focus();
  document.getElementById('prep-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

form.addEventListener('reset', () => {
  // Reset the repeatable medication area and clear validation/summary after reset completes.
  window.setTimeout(() => {
    medicationList.replaceChildren();
    medicationCount = 0;
    addMedicationField();
    setFieldError(document.getElementById('symptoms'), document.getElementById('symptoms-error'), '');
    setFieldError(document.getElementById('questions'), document.getElementById('questions-error'), '');
    summarySection.hidden = true;
    printSummary.replaceChildren();
  }, 0);
});
