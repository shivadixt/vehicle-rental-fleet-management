document.addEventListener("DOMContentLoaded", function () {
    var nameInput       = document.getElementById("name-input");
    var nameSubmitBtn   = document.getElementById("name-submit-btn");
    var welcomeMessage  = document.getElementById("welcome-message");
    var daysInput       = document.getElementById("days-input");
    var calculateBtn    = document.getElementById("calculate-btn");
    var resultBox       = document.getElementById("rent-result");
    var featureCards    = document.querySelectorAll(".feature-box");

    nameSubmitBtn.addEventListener("click", function () {
        var userName = nameInput.value.trim();
        if (userName === "") {
            welcomeMessage.textContent = "Welcome, Guest!";
        } else {
            var capitalisedName = userName.charAt(0).toUpperCase()+ userName.slice(1);                                  
            welcomeMessage.textContent = "Welcome, " + capitalisedName + "!";
        }
        welcomeMessage.classList.add("visible");
    });
    nameInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            nameSubmitBtn.click();
        }
    });
    var RATE_PER_DAY   = 1000;  
    var DISCOUNT_AMOUNT = 500;   
    var DISCOUNT_THRESHOLD = 7; 

    calculateBtn.addEventListener("click", function () {
        var days = parseInt(daysInput.value, 10);
        if (isNaN(days) || days <= 0) {
            resultBox.textContent = "Please enter a valid number of days (1 or more).";
            resultBox.className   = "rent-result error visible";
            return;
        }
        var total    = days * RATE_PER_DAY;
        var discount = 0;

        if (days >= DISCOUNT_THRESHOLD) {
            discount = DISCOUNT_AMOUNT;
            total    = total - discount;
        }
        var message = "Total Rent: ₹" + total.toLocaleString("en-IN");
        if (discount > 0) {
            message += "  (₹" + discount + " discount applied!)";
        }

        message += "  —  for " + days + " day" + (days > 1 ? "s" : "");
        resultBox.textContent = message;
        resultBox.className   = "rent-result success visible";
    });
    daysInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            calculateBtn.click();
        }
    });

    featureCards.forEach(function (card, index) {
        setTimeout(function () {
            card.classList.add("animate-in");
        }, 150 * index);
    });
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
