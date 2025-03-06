const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    const checkboxes = document.querySelectorAll(`input[type=checkbox]:checked`);
    if (checkboxes.length <= 0) {
        const checkbox = document.querySelector('input[type=checkbox]');
        checkbox.setCustomValidity('Please select at least one category');
        event.preventDefault();
    }
})
