import React from "react";
import classes from "./HeroSection.module.css";
import meals from "../../assests/meals.jpg";
import Card from "../UI/Card";

const HeroSection = () => {
  return (
    <>
      <div className={classes["hero-container"]}>
        <img src={meals} alt="Meals" />
        <Card className={classes.description}>
          <h3>Delicious Food, Delivered To You</h3>
          <p>
            Choose your favorite meal from our broad selection of available
            meals and enjoy a delicious lunch or dinner at home.
          </p>
          <p>
            All meals are cooked with high-quality ingredients, just-in-time and
            of course by experienced chefs!
          </p>
        </Card>
      </div>
    </>
  );
};

export default HeroSection;
