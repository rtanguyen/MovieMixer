// MOBILE LOGIC

const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links')

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});

// MODAL LOGIC
const signupButton = document.querySelector('#signup');
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');

console.log(signupButton.innerHTML)

signupButton.addEventListener('click', () =>{
    //console.log('test');
    modal.classList.add('is-active');
});

modalBg.addEventListener('click', () => {
    modal.classList.remove('is-active');
});