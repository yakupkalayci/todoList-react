import React from "react";
import Header from "./components/header";
import TodoForm from "./components/todoForm";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <TodoForm />
    </div>
  );
};

export default App;
