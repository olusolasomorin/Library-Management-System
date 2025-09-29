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
