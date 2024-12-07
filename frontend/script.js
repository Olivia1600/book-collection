const API_URL = 'http://localhost:5000/books';

// Fetch and display books
async function fetchBooks() {
  const response = await fetch(API_URL);
  const books = await response.json();
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach((book) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${book.title} by ${book.author} (${book.year})
      <button class="delete" onclick="deleteBook('${book._id}')">Delete</button>
    `;
    bookList.appendChild(li);
  });
}

// Add a new book
document.getElementById('book-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, year }),
  });
  if (response.ok) {
    fetchBooks();
    e.target.reset();
  }
});

// Delete a book
async function deleteBook(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchBooks();
}

// Load books on page load
fetchBooks();
