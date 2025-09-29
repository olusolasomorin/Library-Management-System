

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let display = document.getElementById('login-display').value;

    if (username === "" || password === "") {
        if (username === "") {
            display.textContent = "Username required!"
            display.style.color = "red"
        } else if (password === "") {
            display.textContent = "Username required!"
            display.style.color = "red"
        }
        
    } else if (username !== "admin") {
        display.textContent = "Incorrect username!"
        display.style.color = "red"
    } else if (password !== "library123") {
        display.textContent = "Incorrect password!"
        display.style.color = "red"
    } else {
        display.textContent = "Login successful."
        display.style.color = "green"
    }
}