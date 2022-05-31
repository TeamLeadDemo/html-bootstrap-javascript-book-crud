// here i will have JS functions which will consume the enpoints
function getAllBooks(){
    // just testing
    console.log("data printed on the console....");

    //document.write("data printed on the document...")
    //document.getElementById("content").innerHTML = "data printed on the document below nav...";

    // we need to consume the endpoint http://localhost:7474/books to get all the book details here
    // for this we can place an asynchronous call to the javalin's jetty server
    // 2 ways
        // - XMLHttpRequest
        // - fetch api - works with promises

    // let's use fetch api to consume the end point, it is an asynchronous call
    // we make use of template literals to maintain the formatting
                            
    fetch("http://localhost:7474/books")
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            let bookTableData = `<table class="table table-striped">
                            <thead>
                            <tr>
                                <th>Book ID</th>
                                <th>Book Title</th>
                                <th>Book Author</th>
                                <th>Book Cost</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>`;
            for(let book of responseJson){
                bookTableData += `<tr>
                                    <td>${book.id}</td>
                                    <td>${book.bookTitle}</td>
                                    <td>${book.bookAuthor}</td>
                                    <td>${book.bookCost}</td>
                                    <td><button 
                                            type="button" 
                                            class="btn btn-danger"
                                            onclick="deleteBook(${book.id})">Remove</button></td>
                                  </tr>`;
            }
            bookTableData += `</tbody></table>`;
            document.getElementById("content").innerHTML = bookTableData;
        })
        .catch(error => console.log(error));
    
        // continues with code here if we had any
}

function deleteBook(bookId){
    console.log(bookId);
    fetch("http://localhost:7474/books/"+bookId, {method: 'delete'})
        .then(response => {
            console.log(response);
            getAllBooks();
        })
}

function displayAddBookForm(){
     let bookForm = `<div class="container">
                        <form>
                            <div class="mb-3 mt-3">
                                <label for="bTitle" class="form-label">Book Title:</label>
                                <input type="text" class="form-control" id="bTitle" placeholder="Enter book title" name="bookTitle">
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="bAuthor" class="form-label">Book Author:</label>
                                <input type="text" class="form-control" id="bAuthor" placeholder="Enter book author" name="bookAuthor">
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="bGenre" class="form-label">Book Genre:</label>
                                <input type="text" class="form-control" id="bGenre" placeholder="Enter book genre" name="bookGenre">
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="bCost" class="form-label">Book Cost</label>
                                <input type="text" class="form-control" id="bCost" placeholder="Enter book cost" name="bookCost">
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="bImage" class="form-label">Book Image Url:</label>
                                <input type="text" class="form-control" id="bImage" placeholder="Enter book image" name="bookImageUrl">
                            </div>
                            <button type="button" class="btn btn-primary" onclick="addBook()">Add a New Book</button>
                        </form>
                    </div>
                    `;
    document.getElementById("content").innerHTML = bookForm;


}

function addBook(){

    // construct a java script object whose properties match the bookpojo object's properties
        // of the back end application
    let newBook = {
        id: 0,
        bookTitle: document.getElementById("bTitle").value,
        bookGenre: document.getElementById("bGenre").value,
        bookAuthor: document.getElementById("bAuthor").value,
        bookCost: document.getElementById("bCost").value,
        bookImage: document.getElementById("bImage").value
    }
    fetch("http://localhost:7474/books", {
        method: 'post',
        body: JSON.stringify(newBook) // converts JS object to JSON 
    })
    .then(response => getAllBooks());
}