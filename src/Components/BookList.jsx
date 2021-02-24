import React, { useState } from "react";
import { graphql } from "react-apollo";
import Query from "../Queries/Queries";
import BookDetail from "../Components/BookDetail";

function BookList(props) {
  const [bookId, setbookId] = useState("");

  const getAllBooks = () => {
    var data = props.data;
    if (data.loading) {
      return <h3>Loading Books....</h3>;
    } else {
      return data.books.map((book, index) => {
        return (
          <li
            key={index}
            onClick={(e) => {
              setbookId(book.id);
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  };
  return (
    <div id="book-list">
      <ul>{getAllBooks()}</ul>
      <BookDetail bookId={bookId} />
    </div>
  );
}

export default graphql(Query.getBooksQuery)(BookList);
