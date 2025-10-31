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

// logout
function logout() {
    setTimeout(() => {
        window.location.href = "dashboard_login.html"; 
    }, 1000);
}

// nav to student page
function studentPage() {
    
    window.location.href = "../student_dashboard/student_view.html"; 
    
}

window.onload = displayBooks;
window.addEventListener("DOMContentLoaded", () => {
  loadCounters();
});

const addBtn = document.getElementById('addBtn');
const popOutPage = document.getElementById('add-book');
const exitPop = document.getElementById('exitPop')
const headerColor = document.getElementById('headStyle')
const cardCont = document.getElementById('cards')
const cardCont1 = document.getElementById('card1')
const cardCont2 = document.getElementById('card2')
const cardCont3 = document.getElementById('table-cont')
const addBook = document.getElementById('addButton2');

// show addbook page
function showAddPage() {
    popOutPage.style.display = "block";

    headerColor.style.opacity ="60%";
    cardCont.style.opacity = "60%"
    cardCont1.style.opacity = "60%"
    cardCont2.style.opacity = "60%"
    cardCont3.style.opacity = "60%"
}

// exit page
function exitPopPage() {
    popOutPage.style.display = "none";

    headerColor.style.opacity ="100%";
    cardCont.style.opacity = "100%"
    cardCont1.style.opacity = "100%"
    cardCont2.style.opacity = "100%"
    cardCont3.style.opacity = "100%"
}

// add event listener
addBtn.addEventListener("click", showAddPage);
exitPop.addEventListener("click", exitPopPage);


// Adding new books
function addBooks() {
    const bookTitle = document.getElementById('addTitle').value.trim();
    const authorName = document.getElementById('addAuthor').value.trim();
    const pubYear = document.getElementById('addYear').value.trim();
    const status = document.getElementById('addStatusType').value.trim();

    if (!bookTitle || !authorName || !pubYear || !status) {
        alert("Please fill all the required field!");
        return;
    }

    saveBook(bookTitle, authorName, pubYear, status);
    console.log(saveBook)
    exitPopPage();
    
    alert("Book added successfully!");
    displayBooks();
    updateCounters();
    reset(popOutPage);
}
// addBook.addEventListener('click', addBooks);

function saveBook(title, author, year, status) {
    let book = JSON.parse(localStorage.getItem("bookDetails")) || [];

    let bookInfos = {title, author, year, status};
    book.push(bookInfos);

    let savedInfo = JSON.stringify(book);

    localStorage.setItem('bookDetails', savedInfo);
}

function getBook() {
    return JSON.parse(localStorage.getItem("bookDetails")) || [];
}

function reset() {
    document.getElementById("addTitle").value = "";
    document.getElementById("addAuthor").value = "";
    document.getElementById("addYear").value = "";
    document.getElementById("addStatusType").value = "";

}

// Display books in the table
function displayBooks() {
  let books = getBook();
  let tableBody = document.getElementById("bookTableBody");

  // Clear old rows
  tableBody.innerHTML = "";

  // Loop through books and insert rows
  books.forEach((book, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>${book.status}</td>
      <td>
          <button class="edit-button" onclick="editBtns(${index})">
              <i class="fa-regular fa-credit-card"></i>
          </button>
          <button class="edit-button" onclick="deleteBook(${index})">
              <i class="fa-solid fa-trash"></i>
          </button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  updateCounters();
}



const edit = document.getElementById('edit-book');

function editBtns() {
    edit.style.display = "block";
    
    headerColor.style.opacity ="60%";
    cardCont.style.opacity = "60%"
    cardCont1.style.opacity = "60%"
    cardCont2.style.opacity = "60%"
    cardCont3.style.opacity = "60%"

    let books = getBook();
    let book = books[index];

    // Fill form with book details
    document.getElementById("editTitle").value = book.title;
    document.getElementById("editAuthor").value = book.author;
    document.getElementById("editYear").value = book.year;
    document.getElementById("editStatusType").value = book.status;

    // Remove the book temporarily
    books.splice(index, 1);
    setBooks(books);
    displayBooks();
}

function setBooks(book) {
    localStorage.setItem("bookDetails", JSON.stringify(book));
}

function exitEditPop() {
    edit.style.display = "none";
    
    headerColor.style.opacity ="100%";
    cardCont.style.opacity = "100%"
    cardCont1.style.opacity = "100%"
    cardCont2.style.opacity = "100%"
    cardCont3.style.opacity = "100%"
}

function searchBooks() {
  let input = document.getElementById("bookSearch").value.toLowerCase();
  let table = document.getElementById("bookTableBody");
  let rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    let match = false;

    for (let j = 0; j < cells.length - 1; j++) { // exclude Actions column
      if (cells[j].textContent.toLowerCase().includes(input)) {
        match = true;
        break;
      }
    }

    rows[i].style.display = match ? "" : "none";
  }
}



function updateCounters() {
  // Get all rows in the table (excluding the header row)
  const rows = document.querySelectorAll("table tbody tr");

  let totalBooks = 0;
  let availableBooks = 0;
  let checkedOutBooks = 0;

  rows.forEach(row => {
    totalBooks++;

    // Get status cell (assuming it's in the 4th column)
    const status = row.cells[3].innerText.trim();

    if (status === "available") {
      availableBooks++;
    } else if (status === "checked-out") {
      checkedOutBooks++;
    }
  });

  // Update the counter cards
  document.getElementById("totalBooks").innerText = totalBooks;
  document.getElementById("availableBooks").innerText = availableBooks;
  document.getElementById("checkedOutBooks").innerText = checkedOutBooks;

    localStorage.setItem("counters", JSON.stringify({
        total: totalBooks,
        available: availableBooks,
        checkedOut: checkedOutBooks
}   ))}


function loadCounters() {
  const savedCounters = localStorage.getItem("counters");
  if (savedCounters) {
    const { total, available, checkedOut } = JSON.parse(savedCounters);

    // Update UI
    document.getElementById("totalBooks").innerText = total;
    document.getElementById("availableBooks").innerText = available;
    document.getElementById("checkedOutBooks").innerText = checkedOut;
  }
}


function deleteBook(index) {
  let books = getBook();

  if (confirm(`Are you sure you want to delete "${books[index].title}"?`)) {
    books.splice(index, 1); // remove that book
    setBooks(books);        // update localStorage
    displayBooks();         // refresh table
    updateCounters();       // refresh counters
    alert("Book deleted successfully!");
  }
}
