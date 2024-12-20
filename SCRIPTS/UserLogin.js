document.getElementById("loginForm").addEventListener('submit', async function(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json' // Ensure you set this header
            },
            body: JSON.stringify({
                username: username,  // Convert to JSON string
                password: password
            })
        });
        
        if (response.ok) {
            window.location.href = 'http://localhost:3000/order';
        } else {
            alert("Invalid username or password. Please try again.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Something went wrong. Please try again.");
    }
});
