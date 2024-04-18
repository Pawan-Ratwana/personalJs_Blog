/*==================== typing Animation ==================== */

var typed = new Typed(".typing", {
    strings: ["", "Web Designer", "Web Developer", "Graphic Designer", "UI Designer"],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true
});

// Get the aside element and navigation links
const aside = document.getElementById('aside');
// let navElement = document.querySelectorAll('.nav a');
const mainContainer = document.getElementById('main-container');
const nav = document.querySelector('.nav'),
    navList = nav.querySelectorAll('li'),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

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
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function () {
        removeBackSection();
        // Remove active class from all navigation links
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
            }
            navList[j].querySelector("a").classList.remove("active")
        }
        // Add active class to the clicked link
        this.classList.add("active");
        showSection(this)
    });
}

// Function to remove 'back-section' class from all sections
function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('back-section');
    }
}

// Function to add 'back-section' class to a specific section
function addBackSection(num) {
    allSection[num].classList.add('back-section')
}

// Function to show a section
function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('active');
    }
    const href = element.getAttribute("href").split('#');
    const taggetHref = href[1];
    document.querySelector("#" + taggetHref).classList.add('active')
}

// Function to update navigation based on the shown section
function updateNav(element) {
    const target = element.getAttribute("href").split('#')[1];
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector('a').classList.remove('active');

        if (target === navList[i].querySelector('a').getAttribute("href").split("#")[1]) {
            navList[i].querySelector('a').classList.add('active');
        }
    }
}

// Event listener for 'hire-me' button
document.querySelector(".hire-me").addEventListener('click', function () {
    const sectionIndex = this.getAttribute("data-section-index");

    showSection(this);
    updateNav(this);
    addBackSection(sectionIndex);
    removeBackSection();
})