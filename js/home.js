// ============================================================
//  home.js  –  Homepage interactivity for VRFMS
//  ► Welcome banner with user name input (no popups)
//  ► Inline Rent Calculator with live validation
//  ► Smooth-scroll for the "Browse Vehicles" CTA
// ============================================================


// ----------  Run after the DOM is fully loaded  ----------
document.addEventListener("DOMContentLoaded", function () {

    // ---- 1. ELEMENT REFERENCES ----
    // Grab every element we will work with and store them in variables.

    var nameInput       = document.getElementById("name-input");
    var nameSubmitBtn   = document.getElementById("name-submit-btn");
    var welcomeMessage  = document.getElementById("welcome-message");

    var daysInput       = document.getElementById("days-input");
    var calculateBtn    = document.getElementById("calculate-btn");
    var resultBox       = document.getElementById("rent-result");

    var featureCards    = document.querySelectorAll(".feature-box");


    // ---- 2. WELCOME BANNER  (replaces prompt + alert) ----
    // When the user types their name and clicks "Say Hello",
    // we display a greeting directly on the page.

    nameSubmitBtn.addEventListener("click", function () {

        // .trim() removes extra spaces from both ends
        var userName = nameInput.value.trim();

        if (userName === "") {
            // No name entered → greet as "Guest"
            welcomeMessage.textContent = "👋 Welcome, Guest!";
        } else {
            // Capitalise the first letter for a polished look
            var capitalisedName = userName.charAt(0).toUpperCase()
                                  + userName.slice(1);
            welcomeMessage.textContent = "👋 Welcome, " + capitalisedName + "!";
        }

        // Show the message with a fade-in effect (CSS class)
        welcomeMessage.classList.add("visible");
    });

    // Allow pressing Enter inside the name input to trigger the button
    nameInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            nameSubmitBtn.click();
        }
    });


    // ---- 3. RENT CALCULATOR  (replaces prompt + alert) ----
    // All inputs and results are shown inline — no popups at all.

    var RATE_PER_DAY   = 1000;   // ₹1,000 per day
    var DISCOUNT_AMOUNT = 500;   // ₹500 flat discount
    var DISCOUNT_THRESHOLD = 7;  // discount kicks in at 7+ days

    calculateBtn.addEventListener("click", function () {

        // Read the number of days from the input field
        var days = parseInt(daysInput.value, 10);

        // --- Validation: make sure the value is a positive number ---
        if (isNaN(days) || days <= 0) {
            resultBox.textContent = "⚠️ Please enter a valid number of days (1 or more).";
            resultBox.className   = "rent-result error visible";
            return;   // stop here — don't calculate
        }

        // --- Calculation ---
        var total    = days * RATE_PER_DAY;
        var discount = 0;

        if (days >= DISCOUNT_THRESHOLD) {
            discount = DISCOUNT_AMOUNT;
            total    = total - discount;
        }

        // --- Build the result string ---
        var message = "Total Rent: ₹" + total.toLocaleString("en-IN");

        if (discount > 0) {
            message += "  (₹" + discount + " discount applied!)";
        }

        message += "  —  for " + days + " day" + (days > 1 ? "s" : "");

        // Show the result on the page
        resultBox.textContent = message;
        resultBox.className   = "rent-result success visible";
    });

    // Allow pressing Enter inside the days input to trigger calculation
    daysInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            calculateBtn.click();
        }
    });


    // ---- 4. FEATURE CARDS — HOVER ANIMATION ON LOAD ----
    // Add a small staggered entrance animation to each card
    // using a CSS class + a short delay per card.

    featureCards.forEach(function (card, index) {
        // setTimeout delays each card's animation slightly
        setTimeout(function () {
            card.classList.add("animate-in");
        }, 150 * index);   // 0 ms, 150 ms, 300 ms …
    });


    // ---- 5. SCROLL-TO-TOP BUTTON ----
    // Shows a small "↑" button when the user scrolls down,
    // and smoothly scrolls back to the top when clicked.

    var scrollBtn = document.getElementById("scroll-top-btn");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 250) {
            scrollBtn.classList.add("visible");
        } else {
            scrollBtn.classList.remove("visible");
        }
    });

    scrollBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
