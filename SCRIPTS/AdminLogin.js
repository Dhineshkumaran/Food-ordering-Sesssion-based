document.getElementById("loginForm").addEventListener('submit', function(event){
    event.preventDefault();
            
    // Get the entered username and password
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Check if the username and password match the hardcoded values
    if (username === "admin" && password === "password") {
        alert("Login successful!"); // Replace this with your actual logic (e.g., redirect to a dashboard page)
    } else {
        alert("Invalid username or password. Please try again.");
    }
});