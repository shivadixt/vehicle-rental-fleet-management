document.addEventListener("DOMContentLoaded", function () {
    const fleetData = [
        { id: "V001", name: "Maruti Swift", type: "Car", price: 1200, status: "available" },
        { id: "V002", name: "Hyundai Creta", type: "SUV", price: 2200, status: "rented" },
        { id: "V003", name: "Royal Enfield Classic", type: "Bike", price: 700, status: "available" },
        { id: "V004", name: "Mahindra Bolero", type: "Van", price: 1800, status: "available" }
    ];

    const tableBody = document.getElementById("fleetTableBody");
    const statTotal = document.getElementById("statTotal");
    const statAvailable = document.getElementById("statAvailable");
    const statRented = document.getElementById("statRented");
    const addVehicleForm = document.getElementById("addVehicleForm");
    const vehicleNameInput = document.getElementById("v-name");
    const vehicleTypeSelect = document.getElementById("v-type");
    const vehiclePriceInput = document.getElementById("v-price");
    const feedbackBox = document.getElementById("fleetFeedback");

    let nextIdNumber = 5;

    function updateStatistics() {
        const total = fleetData.length;
        let availableCount = 0;
        let rentedCount = 0;

        fleetData.forEach(function (vehicle) {
            if (vehicle.status === "available") {
                availableCount++;
            } else if (vehicle.status === "rented") {
                rentedCount++;
            }
        });

        statTotal.textContent = total;
        statAvailable.textContent = availableCount;
        statRented.textContent = rentedCount;
    }

    function renderTable() {
        tableBody.innerHTML = "";

        if (fleetData.length === 0) {
            const emptyRow = document.createElement("tr");
            const emptyCell = document.createElement("td");
            emptyCell.colSpan = 6;
            emptyCell.style.textAlign = "center";
            emptyCell.style.padding = "24px";
            emptyCell.style.color = "var(--text-muted)";
            emptyCell.textContent = "No vehicles currently in fleet.";
            emptyRow.appendChild(emptyCell);
            tableBody.appendChild(emptyRow);
            updateStatistics();
            return;
        }

        fleetData.forEach(function (vehicle) {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.style.fontWeight = "600";
            idCell.textContent = vehicle.id;
            row.appendChild(idCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = vehicle.name;
            row.appendChild(nameCell);

            const typeCell = document.createElement("td");
            typeCell.textContent = vehicle.type;
            row.appendChild(typeCell);

            const priceCell = document.createElement("td");
            priceCell.textContent = "Rs. " + vehicle.price.toLocaleString("en-IN");
            row.appendChild(priceCell);

            const statusCell = document.createElement("td");
            const statusBadge = document.createElement("span");
            statusBadge.className = "status-clickable " + (vehicle.status === "available" ? "status-available" : "status-rented");
            statusBadge.textContent = vehicle.status === "available" ? "Available" : "Rented";
            statusBadge.title = "Click to toggle status";
            statusBadge.addEventListener("click", function () {
                toggleVehicleStatus(vehicle.id);
            });
            statusCell.appendChild(statusBadge);
            row.appendChild(statusCell);

            const actionCell = document.createElement("td");
            const actionsWrapper = document.createElement("div");
            actionsWrapper.className = "table-actions";

            const toggleBtn = document.createElement("button");
            toggleBtn.type = "button";
            toggleBtn.className = "btn-action-toggle";
            toggleBtn.textContent = vehicle.status === "available" ? "Mark Rented" : "Mark Available";
            toggleBtn.addEventListener("click", function () {
                toggleVehicleStatus(vehicle.id);
            });
            actionsWrapper.appendChild(toggleBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.className = "btn-action-delete";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function () {
                deleteVehicle(vehicle.id);
            });
            actionsWrapper.appendChild(deleteBtn);

            actionCell.appendChild(actionsWrapper);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });

        updateStatistics();
    }

    function toggleVehicleStatus(vehicleId) {
        const vehicle = fleetData.find(function (item) {
            return item.id === vehicleId;
        });

        if (vehicle) {
            vehicle.status = vehicle.status === "available" ? "rented" : "available";
            renderTable();
        }
    }

    function deleteVehicle(vehicleId) {
        const index = fleetData.findIndex(function (item) {
            return item.id === vehicleId;
        });

        if (index !== -1) {
            fleetData.splice(index, 1);
            renderTable();
        }
    }

    addVehicleForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = vehicleNameInput.value.trim();
        const type = vehicleTypeSelect.value;
        const price = parseInt(vehiclePriceInput.value, 10);

        if (!name || isNaN(price) || price <= 0) {
            return;
        }

        const formattedId = "V" + String(nextIdNumber).padStart(3, "0");
        nextIdNumber++;

        fleetData.push({
            id: formattedId,
            name: name,
            type: type,
            price: price,
            status: "available"
        });

        renderTable();
        addVehicleForm.reset();

        feedbackBox.textContent = name + " (" + formattedId + ") added to fleet.";
        feedbackBox.classList.add("visible");
        setTimeout(function () {
            feedbackBox.classList.remove("visible");
        }, 3000);
    });

    renderTable();
});
