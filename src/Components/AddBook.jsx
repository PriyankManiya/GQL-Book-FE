import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import Query from "../Queries/Queries";
function AddBook(props) {
  const [name, setname] = useState("");
  const [genre, setgenre] = useState("");
  const [authorId, setauthorId] = useState("");

  const { data: dataGetA, loading: loadingGetA, refetch } = useQuery(
    Query.getAuthorsQuery
  );

  const [AddBookMutation] = useMutation(Query.addBookMutation);

  const addUser = async () => {
    await AddBookMutation({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: Query.getBooksQuery }],
    })
      .then(() => {
        setname("");
        setgenre("");
        setauthorId("");
        console.log("Successfully Added");
      })
      .catch((error) => {
        console.log("error----->", error);
      });
  };

  const displayAuthors = () => {
    if (!loadingGetA) {
      return dataGetA?.authors?.map((author, index) => {
        return (
          <option key={index} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    addUser();
    // console.log("name----->", name);
    // console.log("genre------>", genre);
    // console.log("authorId----->", authorId);
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => {
            setgenre(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          value={authorId}
          onChange={(e) => {
            setauthorId(e.target.value);
          }}
        >
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
