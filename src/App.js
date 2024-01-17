import React, { useState } from "react";
import Header from "./components/Header/Header";
import HeroSection from "./components/Hero/HeroSection";
import Menu from "./components/Menu/Menu";

function App() {
  const [addedItems, setAddedItems] = useState([]);
  const menuItems = [
    {
      id: 1,
      dishName: "Sushi",
      description: "Finest fish and veggies",
      price: 22.99,
    },
    {
      id: 2,
      dishName: "Schnitzel",
      description: "A german speciality!",
      price: 16.5,
    },
    {
      id: 3,
      dishName: "Barbecue Burger",
      description: "American, raw, meaty",
      price: 12.99,
    },
    {
      id: 4,
      dishName: "Green Bowl",
      description: "Healthy... and green...",
      price: 18.99,
    },
  ];
  const savedItems = (addedItem) => {
    // if (addedItems.length === 0) {
    //   console.log("Previous State Length: ", addedItems.length);
    //   setAddedItems((prevState) => {
    //     return [addedItem, ...prevState];
    //   });
    // } else if (addedItems.length > 0) {
    //   const filteredArray = addedItems.filter(
    //     (data) => data.id !== addedItem.id
    //   );
    //   setAddedItems((prevState) => {
    //     return [addedItem, ...filteredArray];
    //   });
    // }
    setAddedItems((prevState) => {
      return [addedItem, ...prevState];
    });
  };
  return (
    <>
      <Header cartItems={addedItems} />
      <HeroSection />
      <Menu menuItems={menuItems} addedItems={savedItems} />
    </>
  );
}

export default App;
