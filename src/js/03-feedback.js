import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));
populateForm();

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  if (form.email.value === '' || form.message.value === '') {
    alert('Всі поля мають бути заповнені!');
  } else {
    console.log(formData);
    evt.currentTarget.reset();

    localStorage.removeItem(STORAGE_KEY);
    formData = {};
  }
}

function populateForm() {
  const savedObject = JSON.parse(localStorage.getItem(STORAGE_KEY));

  for (const key in savedObject) {
    if (key) {
      form[key].value = savedObject[key];
      formData = savedObject;
    }
  }
}
