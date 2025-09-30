function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let result = document.getElementById('loginDisplay');

    if (username === "" || password === "") {
        result.textContent = "Username and Password required!";
        result.style.color = "red";
        return;
    } else if (username !== "admin") {
        result.textContent = "Incorrect username!";
        result.style.color = "red";
        return;
    } else if (password !== "library123") {
        result.textContent = "Incorrect password!";
        result.style.color = "red";
        return;
    }

    result.textContent = "Login successful.";
    result.style.color = "green";

    setTimeout(() => {
        window.location.href = "dashboard.html"; 
    }, 1000);
    
}

function logout() {
    setTimeout(() => {
        window.location.href = "dashboard_login.html"; 
    }, 1000);
}

function studentPage() {
    
    window.location.href = "../student_dashboard/student_view.html"; 
    
}