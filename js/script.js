
const seachBook = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';


    const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data.docs))   

}

const displayData = data => {

    // console.log(docsData)
    const item = document.getElementById('item')
    item.textContent = '';
    data.slice(0, 12).forEach(e => {
        const div = document.createElement('div');
        div.classList.add('col');
       div.innerHTML = `
        <div class="card h-100">
        <img id="img" src="https://covers.openlibrary.org/b/id/${e.cover_i}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Book Name : ${e.title}</h5>
            <p class="card-text">Author Name : ${e.author_name}</p>
            <small class="text-muted">First Publish Year : ${e.first_publish_year}</small>
        </div>
      
       `
        item.appendChild(div);
        // Search item Numbers
      displayAllItem  (data.length,'block');

    });

    if (data.length === 0) {
        const notFound = document.getElementById('not-found');
        notFound.innerText = `Opps! No Result Found!!`

    } else {
        const notFound = document.getElementById('not-found');
        notFound.style.display = 'none';

    }

}

// search Items number
const displayAllItem = (itemLength) =>{
    const displayNumbers = document.getElementById('total-search-found');
    displayNumbers.innerText = `Search Item Number : ( ${itemLength} )`;
    displayNumbers.style.display = 'block';
};