const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    const checkboxes = document.querySelectorAll(`input[type=checkbox]:checked`);
    if (checkboxes.length <= 0) {
        const categoryError = document.querySelector('.category-error');
        categoryError.classList.remove('hidden');
        event.preventDefault();
    }
})
