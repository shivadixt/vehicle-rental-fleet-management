var name = prompt("Welcome to VRMFS! What is your name?");
if(name ==null || name == ""){
    alert("Welcome, Guest!");
}
else{
    alert("welcome, "+ name+"!");
}
function calculateRent(){
    var days = prompt("How many days do you want to rent? (1000/day INR : 500 dicount on 7>= days)");
    var rate = 1000; // rupees perday
    var total =days*rate;
    if(days>=7){
        total = total - 500;   // discount for a week or more
        alert("Total = Rs. " + total + " (Rs. 500 discount applied!)");
    }
    else{
        alert("Total: " + total);
    }
}