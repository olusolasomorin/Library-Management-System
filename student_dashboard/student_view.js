// Select DOM elements
const bookCards = document.querySelectorAll(".book-card");
const searchInput = document.getElementById("searchInput");
const gridContainer = document.querySelector(".grid-container");
const totalSpan = document.querySelector(".summary-box.total span");
const availableSpan = document.querySelector(".summary-box.available span");
const checkedOutSpan = document.querySelector(".summary-box.checked-out span");

// Convert static HTML into book objects
const books = Array.from(bookCards).map(card => ({
  element: card,
  title: card.querySelector("h3").textContent.toLowerCase(),
  author: card.querySelector(".author").textContent.replace("Author: ", "").toLowerCase(),
  available: card.classList.contains("available")
}));

// Update summary counts
function updateSummary(filteredBooks) {
  totalSpan.textContent = filteredBooks.length;
  availableSpan.textContent = filteredBooks.filter(b => b.available).length;
  checkedOutSpan.textContent = filteredBooks.filter(b => !b.available).length;
}

// Display filtered books
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

// Search handler
searchInput?.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = books.filter(book =>
    book.title.includes(query) || book.author.includes(query)
  );
  displayBooks(filtered);
});

// Initial load
displayBooks(books);
