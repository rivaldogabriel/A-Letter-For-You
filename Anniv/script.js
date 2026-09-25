/* =========================================
   PIN SYSTEM
========================================= */

const correctPIN = "121225";

let enteredPIN = "";

const pinScreen = document.getElementById("pinScreen");
const mainContent = document.getElementById("mainContent");

const pinDots = document.querySelectorAll(".pin-dot");
const pinError = document.getElementById("pinError");

const keys = document.querySelectorAll(".key");


function updatePinDots() {

    pinDots.forEach((dot, index) => {

        if (index < enteredPIN.length) {

            dot.classList.add("active");

        } else {

            dot.classList.remove("active");

        }

    });

}


function checkPIN() {

    if (enteredPIN.length !== 6) {
        return;
    }


    if (enteredPIN === correctPIN) {

        pinError.classList.remove("show");

        pinScreen.classList.add("hide");

        setTimeout(() => {

            mainContent.classList.remove("hidden");

            startHearts();

        }, 500);

    } else {

        pinError.classList.add("show");

        enteredPIN = "";

        updatePinDots();

        setTimeout(() => {

            pinError.classList.remove("show");

        }, 1500);

    }

}


keys.forEach(key => {

    key.addEventListener("click", () => {

        const value = key.dataset.key;


        if (value === "backspace") {

            enteredPIN = enteredPIN.slice(0, -1);

            updatePinDots();

            return;

        }


        if (!value) {
            return;
        }


        if (enteredPIN.length >= 6) {
            return;
        }


        enteredPIN += value;

        updatePinDots();

        if (enteredPIN.length === 6) {

            setTimeout(checkPIN, 150);

        }

    });

});


/* Keyboard support */

document.addEventListener("keydown", event => {

    if (!mainContent.classList.contains("hidden")) {
        return;
    }


    if (/^[0-9]$/.test(event.key)) {

        if (enteredPIN.length < 6) {

            enteredPIN += event.key;

            updatePinDots();

            if (enteredPIN.length === 6) {

                setTimeout(checkPIN, 150);

            }

        }

    }


    if (event.key === "Backspace") {

        enteredPIN = enteredPIN.slice(0, -1);

        updatePinDots();

    }

});


/* =========================================
   MUSIC PLAYER
========================================= */

const music = document.getElementById("music");

const playMusic = document.getElementById("playMusic");
const restartMusic = document.getElementById("restartMusic");
const muteMusic = document.getElementById("muteMusic");

const progressBar = document.getElementById("progressBar");

const currentTimeElement = document.getElementById("currentTime");
const durationElement = document.getElementById("duration");


function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }


    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");


    return `${minutes}:${remainingSeconds}`;

}


music.addEventListener("loadedmetadata", () => {

    durationElement.textContent =
        formatTime(music.duration);

});


music.addEventListener("timeupdate", () => {

    const percentage =
        (music.currentTime / music.duration) * 100;


    progressBar.style.width =
        `${percentage || 0}%`;


    currentTimeElement.textContent =
        formatTime(music.currentTime);

});


playMusic.addEventListener("click", () => {

    if (music.paused) {

        music.play()
            .then(() => {

                playMusic.textContent = "Ⅱ";

            })
            .catch(() => {

                alert(
                    "Tambahkan file music.mp3 ke folder website terlebih dahulu."
                );

            });

    } else {

        music.pause();

        playMusic.textContent = "▶";

    }

});


music.addEventListener("ended", () => {

    playMusic.textContent = "▶";

});


restartMusic.addEventListener("click", () => {

    music.currentTime = 0;

    music.play()
        .then(() => {

            playMusic.textContent = "Ⅱ";

        })
        .catch(() => {});

});


muteMusic.addEventListener("click", () => {

    music.muted = !music.muted;

    muteMusic.textContent =
        music.muted ? "×" : "♫";

});


/* Click progress bar */

const progressContainer =
    document.querySelector(".progress-container");


progressContainer.addEventListener("click", event => {

    if (!music.duration) {
        return;
    }


    const width =
        progressContainer.clientWidth;


    const clickX =
        event.offsetX;


    music.currentTime =
        (clickX / width) * music.duration;

});


/* =========================================
   RELATIONSHIP COUNTER
========================================= */

const startDate =
    new Date("2025-12-12T00:00:00");


function calculateRelationship() {

    const now = new Date();


    let years =
        now.getFullYear() -
        startDate.getFullYear();


    let months =
        now.getMonth() -
        startDate.getMonth();


    let days =
        now.getDate() -
        startDate.getDate();


    if (days < 0) {

        months--;

        const previousMonth =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            );

        days += previousMonth.getDate();

    }


    if (months < 0) {

        years--;

        months += 12;

    }


    document.getElementById("years")
        .textContent = years;


    document.getElementById("months")
        .textContent = months;


    document.getElementById("days")
        .textContent = days;

}


calculateRelationship();


setInterval(
    calculateRelationship,
    1000 * 60
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   FLOATING HEARTS
========================================= */

const heartsContainer =
    document.getElementById("hearts-container");


function createHeart() {

    if (mainContent.classList.contains("hidden")) {
        return;
    }


    const heart =
        document.createElement("div");


    heart.classList.add("heart");


    heart.textContent =
        Math.random() > 0.5
            ? "♥"
            : "♡";


    const size =
        Math.random() * 16 + 8;


    const duration =
        Math.random() * 7 + 8;


    const left =
        Math.random() * 100;


    heart.style.left =
        `${left}%`;


    heart.style.fontSize =
        `${size}px`;


    heart.style.animationDuration =
        `${duration}s`;


    heartsContainer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, duration * 1000);

}


function startHearts() {

    setInterval(
        createHeart,
        1200
    );

}


/* =========================================
   SMOOTH NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();


            const target =
                document.querySelector(
                    link.getAttribute("href")
                );


            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });