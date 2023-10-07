import React from "react";

function ToyForm({ newToyName, newToyImage, handleNewName, handleNewImage, handleNewForm }) {
  
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleNewForm}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={newToyName}
          onChange={handleNewName}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={newToyImage}
          onChange={handleNewImage}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
