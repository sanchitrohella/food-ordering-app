import React, { useReducer } from "react";
import classes from "./MenuItems.module.css";
import Button from "../UI/Button";

const amountReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      val: action.value,
      amount: action.value,
    };
  } else {
    return {
      val: 1,
      amount: state.amount,
    };
  }
};

const MenuItems = (props) => {
  // const [addedItems, setAddedItems] = useState([]);
  // const [enteredAmount, setEnteredAmount] = useState(1);
  // const [itemAmount, setItemAmount] = useState(1);
  const [amountState, setAmountState] = useReducer(amountReducer, {
    val: 1,
    amount: 1,
  });

  // useEffect(() => {
  //   console.log("Changes Occured!!");
  // }, [addedItems]);

  const amountHandler = (event) => {
    setAmountState({ type: "USER_INPUT", value: Number(event.target.value) });
  };
  const addBtnClickHandler = (item, event) => {
    event.preventDefault();
    const addedItem = {
      dishName: item.dishName,
      price: item.price,
      amount: amountState.amount,
    };

    // if (addedItems.length === 0) {
    //   console.log("Previous State Length: ", addedItems.length);
    //   setAddedItems((prevState) => {
    //     return [addedItem, ...prevState];
    //   });
    // } else if (addedItems.length > 0) {
    //   const filteredArray = addedItems.filter((data) => data.id !== item.id);
    //   setAddedItems((prevState) => {
    //     return [addedItem, ...filteredArray];
    //   });
    // }

    // setAddedItems((prevState) => {
    //   console.log("Previous State Length: ", prevState.length);
    //   if (prevState.length === 0) {
    //     console.log("Entered!!!");
    //     return [addedItem, ...prevState];
    //   } else if (prevState.length > 0) {
    //     const filteredArray = prevState.filter((data) => data.id !== item.id);
    //     return [addedItem, ...filteredArray];
    //   }
    // });
    props.onAddingItem(addedItem);
  };
  return (
    <li className={classes["list-container"]}>
      <div className={classes["item-container"]}>
        <div className={classes.info}>
          <h4>{props.item.dishName}</h4>
          <p className={classes.desc}>{props.item.description}</p>
          <p className={classes.price}>${props.item.price}</p>
        </div>

        <form className={classes["form-container"]}>
          <div className={classes["amount-cont"]}>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              onChange={amountHandler}
              value={amountState.val}
              min="1"
            />
          </div>
          <Button onClick={(event) => addBtnClickHandler(props.item, event)}>
            + Add
          </Button>
        </form>
      </div>
    </li>
  );
};

export default MenuItems;
