import BookList from "./Components/BookList";
import AddBook from "./Components/AddBook";

function App() {
  return (
    <div id="main">
      <h1>Reading List</h1>
      <BookList />
      <AddBook />
    </div>
  );
}

export default App;
