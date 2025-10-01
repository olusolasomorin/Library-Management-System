const searchInput = document.getElementById("searchInput");
const gridContainer = document.querySelector(".grid-container");
const bookCards = document.querySelectorAll(".book-card");

const totalCount = document.querySelector(".cards h3");
const availableCount = document.querySelector(".card1 h3");
const checkedOutCount = document.querySelector(".card2 h3");

const books = Array.from(bookCards).map(card => {
  const title = card.querySelector("h3").textContent.toLowerCase();
  const author = card.querySelector(".author").textContent.replace("Author: ", "").toLowerCase();
  const available = card.querySelector(".status") !== null;
  return { element: card, title, author, available };
});

function updateSummary(filteredBooks) {
  totalCount.textContent = filteredBooks.length;
  availableCount.textContent = filteredBooks.filter(b => b.available).length;
  checkedOutCount.textContent = filteredBooks.filter(b => !b.available).length;
}

function displayBooks(filteredBooks) {
  gridContainer.innerHTML = "";

  if (filteredBooks.length === 0) {
    gridContainer.innerHTML = `
      <div class="no-results">
         Book not available at the moment.
      </div>
    `;
    updateSummary([]);
    return;
  }

  filteredBooks.forEach(book => {
    gridContainer.appendChild(book.element);
  });

  updateSummary(filteredBooks);
}


searchInput?.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = books.filter(book =>
    book.title.includes(query) || book.author.includes(query)
  );
  displayBooks(filtered);
});


displayBooks(books);

// Load Books into Table
function loadBooks() {
  let books = JSON.parse(localStorage.getItem("bookDetails")) || [];
  const container = document.getElementById("bookContainer");
  container.innerHTML = "";

  books.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <div class="book-title">${book.title}</div>
      <div class="book-author">by ${book.author}</div>
      <div class="book-year">Year: ${book.year}</div>
      <div class="book-status ${book.status === "Available" ? "available" : "checkedout"}">
        ${book.status}
      </div>
    `;

    container.appendChild(card);
  });
}

// Load Counters
function loadCounters() {
  const saved = JSON.parse(localStorage.getItem("counters"));
  if (saved) {
    document.getElementById("totalBooks").innerText = saved.total;
    document.getElementById("availableBooks").innerText = saved.available;
    document.getElementById("checkedOutBooks").innerText = saved.checkedOut;
  }
}

// Listen for changes from librarian (real-time sync)
window.addEventListener("storage", (event) => {
  if (event.key === "bookDetails" || event.key === "counters") {
    loadBooks();
    loadCounters();
  }
});

// On Page Load
window.addEventListener("DOMContentLoaded", () => {
  loadBooks();
  loadCounters();
});