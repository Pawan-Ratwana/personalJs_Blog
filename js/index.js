/*==================== typing Animation ==================== */

var typed = new Typed(".typing", {
    strings: ["", "Web Designer", "Web Developer", "Graphic Designer", "UI Designer"],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true
});

// Get the aside element and navigation links
const aside = document.getElementById('aside');
let navElement = document.querySelectorAll('.nav a');
const mainContainer = document.getElementById('main-container');
const navList = document.querySelectorAll('.nav li');
const totalNavList = navList.length;
const menuToggle = document.getElementById('menu-toggle');
const toggleButton = document.querySelector('.toggle-button');

/*==================== Toggle Button ==================== */

// Toggle aside and toggle button when menu toggle button is clicked
menuToggle.addEventListener('click', () => {
    toggleButton.classList.toggle('active');
    aside.classList.toggle('active');
    toggleButton.classList.toggle('tagActive');
});

// Remove active class from aside and toggle button when clicking outside of aside
document.querySelector('.main-content').addEventListener('click', () => {
    aside.classList.remove('active')
    toggleButton.classList.remove('active')
})


// Remove active class from aside and toggle button when scrolling outside of aside
window.addEventListener('scroll', () => {
    if (aside.classList.contains('active')) {
        aside.classList.remove('active')
        toggleButton.classList.remove('active');
    }
})

/*==================== Navigate to nav link ==================== */

// Add click event listener to each navigation link
for (let i = 0; i <= totalNavList - 1; i++) {
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function () {
        // Remove active class from all navigation links
        for (let j = 0; j < totalNavList; j++) {
            navList[j].querySelector(".nav a").classList.remove("active");
        }
        // Add active class to the clicked link
        this.classList.add("active");
    });
}