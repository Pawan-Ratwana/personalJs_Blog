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
const nav = document.querySelector('.nav'),
    navList = nav.querySelectorAll('li'),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

const menuToggle = document.getElementById('menu-toggle');
const toggleButton = document.querySelector('.toggle-button');
const hireMeElement = document.querySelector(".hire-me")

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


hireMeElement.addEventListener('click', function () {
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    addBackSection(sectionIndex);
    removeBackSection();
})

/*====================Smooth Scrolling functionality to Navigate each nav link ==================== */

for (let i = 0; i < navElement.length; i++) {
    (navElement[i]).addEventListener('click', (event) => {
        event.preventDefault();
        // console.log(i)
        const targetSectionId = event.target.textContent.trim().toLowerCase();
        // console.log(targetSectionId)

        const targetSection = document.getElementById(targetSectionId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' })
            targetSection.classList.add("active");
        }

        let interval = setInterval(function () {
            const targetSectionCoordinate = targetSection.getBoundingClientRect();
            if (targetSectionCoordinate.top <= 0) {
                clearInterval(interval);
                return;
            }

            window.scrollBy(0, 50)
        }, 50)
    })
}


/*==================== Skill Bar Animation ==================== */

// Select all elements with class 'progress' and find their child div elements
const progressBar = document.querySelectorAll('.progress>div');

// Event listener for scroll event, triggers the checkScroll function
window.addEventListener('scroll', checkScroll);

// Initialize progress bars
function initialiseBars() {
    for (let bar of progressBar) {
        // Set initial width of each progress bar to 0%
        bar.style.width = 0 + "%";
    }
}

// Function to set target width for each progress bar and start filling it
function targetWidthFxn(bar) {
    let targetWidth = bar.getAttribute('data-bar-width');
    fillBar(bar, targetWidth);
}

// Call the initializeBars function to set initial width of progress bars
initialiseBars();

// Function to fill a progress bar to a target width
function fillBar(bar, targetWidth) {
    let currentWidth = 0;
    let duration = 1000; // Duration of the animation in milliseconds
    let intervalDuration = 10; // Duration between each step in the animation in milliseconds
    let increment = targetWidth / (duration / intervalDuration);

    // Set interval to increase the width of the progress bar gradually
    let interval = setInterval(function () {
        if (currentWidth > targetWidth) {
            clearInterval(interval); // Stop the interval when target width is reached
            return;
        }
        currentWidth += increment;
        bar.style.width = currentWidth + "%"; // Set the width of the progress bar
    }, intervalDuration);
}

// Function to check if a progress bar is within the viewport
function isAnimated(bar) {
    const coordinate = bar.getBoundingClientRect();
    return (
        coordinate.top >= 0 &&
        coordinate.left >= 0 &&
        coordinate.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        coordinate.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to check scroll event and fill progress bars when they come into view
function checkScroll() {
    progressBar.forEach((bar) => {
        if (isAnimated(bar) && !bar.classList.contains("animated")) {
            targetWidthFxn(bar); // Call function to set target width and start filling the progress bar
            bar.classList.add("animated"); // Add 'animated' class to indicate that the progress bar has been animated
        } else if (!isAnimated(bar)) {
            bar.classList.remove('animated'); // Remove 'animated' class if progress bar is out of view
        }
    });
}
