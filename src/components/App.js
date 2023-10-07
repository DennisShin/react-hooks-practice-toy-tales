import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";
import {v4 as uuid} from 'uuid';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [allToys, setAllToys] = useState([]);
  const [newToyName, setNewToyName] = useState("");
  const [newToyImage, setNewToyImage] = useState("");
  let counter = 9;

  const fetchToys = () => {
    fetch("http://localhost:3001/toys")
    .then(res => res.json())
    .then(data => setAllToys(data))
  }
  useEffect(() => fetchToys(), [])

  function handleNewName(e){
    setNewToyName(e.target.value)
    console.log(typeof(newToyName))
  }
  function handleNewImage(e){
    setNewToyImage(e.target.value)
    console.log(newToyImage)
  }

  function handleNewForm(e){
    e.preventDefault()
    let newToy = {
      "id": uuid(),
      "name": newToyName,
      "image": newToyImage,
      "likes": 0
    }
    
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newToy)
    }).then(res => res.json())
    .then(data => setAllToys([...allToys, data]))
  }


  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

 function handleDelete(e){
  // console.log(e.target.parentNode.id)
  fetch("http://localhost:3001/toys/" + e.target.parentNode.id, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => fetchToys())
 }

 function handleLikes(e){
  console.log(parseInt(e.target.parentNode.querySelector("p").textContent))
  const newLikes = parseInt(e.target.parentNode.querySelector("p").textContent) + 1
  fetch("http://localhost:3001/toys/" + e.target.parentNode.id, {
    method: "PATCH",
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({likes: newLikes})
  })
  .then(res => res.json())
  .then(data => fetchToys())
 }

  return (
    <>
      <Header />
      {showForm ? <ToyForm newToyName={newToyName} newToyImage={newToyImage} handleNewName={handleNewName} handleNewImage={handleNewImage} handleNewForm={handleNewForm}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer allToys={allToys} handleDelete={handleDelete} handleLikes={handleLikes}/>
    </>
  );
}

export default App;
