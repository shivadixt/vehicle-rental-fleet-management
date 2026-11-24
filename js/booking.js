document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");
    const fullnameInput = document.getElementById("fullname");
    const phoneInput = document.getElementById("phone");
    const vehicleSelect = document.getElementById("vehicle");
    const pickupDateInput = document.getElementById("pickup-date");
    const returnDateInput = document.getElementById("return-date");

    const phoneError = document.getElementById("phoneError");
    const dateError = document.getElementById("dateError");

    const summaryVehicle = document.getElementById("summaryVehicle");
    const summaryType = document.getElementById("summaryType");
    const summaryDailyRate = document.getElementById("summaryDailyRate");
    const summaryDays = document.getElementById("summaryDays");
    const summaryTotal = document.getElementById("summaryTotal");

    const bookingContainer = document.getElementById("bookingContainer");
    const confirmationCard = document.getElementById("confirmationCard");
    const bookAgainBtn = document.getElementById("bookAgainBtn");

    const confirmId = document.getElementById("confirmId");
    const confirmName = document.getElementById("confirmName");
    const confirmPhone = document.getElementById("confirmPhone");
    const confirmVehicle = document.getElementById("confirmVehicle");
    const confirmDates = document.getElementById("confirmDates");
    const confirmTotal = document.getElementById("confirmTotal");

    function formatDateToInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return year + "-" + month + "-" + day;
    }

    const today = new Date();
    const todayString = formatDateToInput(today);

    pickupDateInput.min = todayString;
    pickupDateInput.value = todayString;
    returnDateInput.min = todayString;
    returnDateInput.value = todayString;

    function calculateRentalDetails() {
        const selectedOption = vehicleSelect.options[vehicleSelect.selectedIndex];
        const vehicleName = selectedOption.getAttribute("data-name") || "Vehicle";
        const vehicleType = selectedOption.getAttribute("data-type") || "Standard";
        const dailyRate = parseInt(selectedOption.getAttribute("data-price"), 10) || 1000;

        const pickupDate = new Date(pickupDateInput.value);
        const returnDate = new Date(returnDateInput.value);

        let durationDays = 1;

        if (pickupDateInput.value && returnDateInput.value) {
            const timeDifference = returnDate.getTime() - pickupDate.getTime();
            const calculatedDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            if (calculatedDays > 0) {
                durationDays = calculatedDays;
            } else if (calculatedDays === 0) {
                durationDays = 1;
            } else {
                durationDays = 0;
            }
        }

        const totalCost = durationDays > 0 ? durationDays * dailyRate : 0;

        summaryVehicle.textContent = vehicleName;
        summaryType.textContent = vehicleType;
        summaryDailyRate.textContent = "Rs. " + dailyRate.toLocaleString("en-IN");
        summaryDays.textContent = durationDays + " Day" + (durationDays === 1 ? "" : "s");
        summaryTotal.textContent = "Rs. " + totalCost.toLocaleString("en-IN");

        return {
            name: vehicleName,
            type: vehicleType,
            dailyRate: dailyRate,
            days: durationDays,
            total: totalCost
        };
    }

    pickupDateInput.addEventListener("change", function () {
        returnDateInput.min = pickupDateInput.value;
        if (returnDateInput.value < pickupDateInput.value) {
            returnDateInput.value = pickupDateInput.value;
        }
        dateError.classList.remove("visible");
        calculateRentalDetails();
    });

    returnDateInput.addEventListener("change", function () {
        if (returnDateInput.value < pickupDateInput.value) {
            dateError.classList.add("visible");
        } else {
            dateError.classList.remove("visible");
        }
        calculateRentalDetails();
    });

    vehicleSelect.addEventListener("change", calculateRentalDetails);

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const phoneRegex = /^[0-9]{10}$/;
        const phoneValue = phoneInput.value.replace(/\s+/g, "");

        let isValid = true;

        if (!phoneRegex.test(phoneValue)) {
            phoneError.classList.add("visible");
            isValid = false;
        } else {
            phoneError.classList.remove("visible");
        }

        if (returnDateInput.value < pickupDateInput.value) {
            dateError.classList.add("visible");
            isValid = false;
        } else {
            dateError.classList.remove("visible");
        }

        if (!isValid) {
            return;
        }

        const details = calculateRentalDetails();
        const referenceCode = "BK-" + Math.floor(100000 + Math.random() * 900000);

        confirmId.textContent = referenceCode;
        confirmName.textContent = fullnameInput.value.trim();
        confirmPhone.textContent = phoneValue;
        confirmVehicle.textContent = details.name + " (" + details.type + ")";
        confirmDates.textContent = pickupDateInput.value + " to " + returnDateInput.value + " (" + details.days + " days)";
        confirmTotal.textContent = "Rs. " + details.total.toLocaleString("en-IN");

        bookingContainer.style.display = "none";
        confirmationCard.classList.add("visible");
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    bookAgainBtn.addEventListener("click", function () {
        bookingForm.reset();
        pickupDateInput.value = todayString;
        returnDateInput.min = todayString;
        returnDateInput.value = todayString;
        phoneError.classList.remove("visible");
        dateError.classList.remove("visible");

        calculateRentalDetails();

        confirmationCard.classList.remove("visible");
        bookingContainer.style.display = "grid";
    });

    calculateRentalDetails();
});
