document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const menu = document.getElementById('menu');

    burger.addEventListener('click', () => {
        menu.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        burger.classList.toggle('active');
        menu.classList.toggle('active');
    });
});