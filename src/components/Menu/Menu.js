import React from "react";
import classes from "./Menu.module.css";
import Card from "../UI/Card";
import MenuItems from "./MenuItems";
const Menu = (props) => {
  const saveAddedItems = (addedItems) => {
    props.addedItems(addedItems);
  };
  return (
    <Card className={classes["menu-container"]}>
      <ul>
        {props.menuItems.map((item) => {
          return (
            <MenuItems
              onAddingItem={saveAddedItems}
              item={item}
              key={item.id}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Menu;
