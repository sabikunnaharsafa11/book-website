
// preloader 
const spin = param => {
    document.getElementById('spinner').style.display = param;
}
// Load Data  
const searchBook = async () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    // Clear Search Input 
    searchInput.value = '';
    // Error Handle message 
    if (searchText === '') {
        document.getElementById('count').innerText = `
        Please Search Something!`;
        document.getElementById('books-container').textContent = '';
    }
    else {
        spin('block');
        //API Url Dynamic 
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        const res = await fetch(url);
        const data = await res.json();
        showBooks(data.docs);
        
    }

}
const showBooks = (books) => {
    const searchResult = document.getElementById('search-result');
    // Clear Books Data 
    searchResult.textContent = '';

    document.getElementById('count').innerText = `
    Book Found: ${books.length}
        `;
    // Error Handle result 
    if (books.length === 0) {
        document.getElementById('count').innerText = `
        No Result Found!! `;
    }
    else {
        books.forEach(book => {
            // Create Dynamically HTML Div
            const div = document.createElement('div');
            div.classList.add('col');
            div.classList.add('card-style')
            div.innerHTML = `
                <div class="card">
                    <img height= '350px' p-5 src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body" style="height:200px; overflow:hidden">
                        <h5 class="card-title"> <b>Book Name:</b> ${book.title}</h5>
                        <p><b>Author Name:</b> ${book.author_name}</p>
                        <p><b>Publisher:</b> ${book.publisher}</p>

                        <p class="card-text"><b>Published year:</b> ${book.first_publish_year}</p>
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        });

    }
    spin('none');

}
