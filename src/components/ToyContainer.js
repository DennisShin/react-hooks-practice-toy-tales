import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ allToys, handleDelete, handleLikes }) {

  return (
    <div id="toy-collection">{/* Render the collection of ToyCards */}
      {allToys.map((toy) => 
      <ToyCard 
        handleDelete={handleDelete}
        handleLikes={handleLikes}
        key={toy.id}
        id={toy.id} 
        name={toy.name}
        image={toy.image}
        likes={toy.likes}
      />)}
    </div>
  );
}

export default ToyContainer;
