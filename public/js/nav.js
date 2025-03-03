const menuButton = document.querySelector('.menu-button');
const menuLinks = document.querySelector('.menu-links');

menuButton.addEventListener('click', () => {
    menuLinks.classList.toggle('visible');
})
