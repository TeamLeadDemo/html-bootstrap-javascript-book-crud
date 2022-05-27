// here i will have JS functions which will consume the enpoints
function printData(){
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
                            </tr>
                            </thead>
                            <tbody>`;
            for(let book of responseJson){
                bookTableData += `<tr><td>${book.id}</td><td>${book.bookTitle}</td><td>${book.bookAuthor}</td>
                                    <td>${book.bookCost}</td></tr>`;
            }
            bookTableData += `</tbody></table>`;
            document.getElementById("content").innerHTML = bookTableData;
        })
        .catch(error => console.log(error));
    
        // continues with code here if we had any
}