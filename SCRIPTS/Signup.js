let form = document.getElementById("signupForm");
form.addEventListener('submit', async function (event) {
    event.preventDefault();
    // Get the entered values
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Regular expressions for username and password validation
    let regex_user = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let regex_pass = /^[a-zA-Z\-]+$/;

    // Check if username and password meet the required criteria
    if (username.length == 0 || !regex_user.test(username)) {
        document.getElementById("usernameHelp").innerText = "Please enter a valid Username (6-16 characters long)";
        document.getElementById("username").classList.add('is-invalid');
    } else {
        document.getElementById("usernameHelp").innerText = "Enter a username (6-16 characters long)";
        document.getElementById("username").classList.remove('is-invalid');
    }
    if (password.length == 0 || !regex_pass.test(password)) {
        document.getElementById("passwordHelp").innerText = "Please enter a valid Password (only letters and hyphens)";
        document.getElementById("password").classList.add('is-invalid');
    } else {
        document.getElementById("passwordHelp").innerText = "Enter a password (only letters and hyphens)";
        document.getElementById("password").classList.remove('is-invalid');
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }  
    
    form.submit();
    console.log("Signup successful!");
    
});