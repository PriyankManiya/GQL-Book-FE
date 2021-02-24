import { useQuery } from "react-apollo";
import React from "react";
import { graphql } from "react-apollo";
import Query from "../Queries/Queries";

function BookDetail(props) {
  const { data: bookData, loading } = useQuery(Query.getBookQuery, {
    variables: { id: props.bookId },
  });

  if (!loading && bookData) {
    const { book } = bookData;
    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All Books By This Author :</p>
        <ul className="other-books">
          {book?.author?.books?.map((book, index) => {
            return <li key={index}>{book.name}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <div>No book Selected. </div>;
  }

  // console.log(`Data Of BookDetail --->>>`, data?.book?.genre);
  return (
    <div id="book-details">
      <p>Book Detail Section is Here</p>
    </div>
  );
}

export default BookDetail;
