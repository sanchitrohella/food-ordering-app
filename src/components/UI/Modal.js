import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clasess from "./Modal.module.css";
import Card from "./Card";
import Button from "./Button";

const Modal = (props) => {
  const [cartArray, setCartArray] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    const result = [];

    // Create a Map to store the sum of amounts for each unique name
    const nameMap = new Map();

    props.cartItems.forEach((item) => {
      const { dishName, price, amount } = item;
      const key = `${dishName}-${price}`;

      if (nameMap.has(key)) {
        // If the dishName and price combination is already in the Map, add the amount to the existing total
        nameMap.set(key, nameMap.get(key) + amount);
      } else {
        // If the dishName and price combination is not in the Map, add it with the current amount
        nameMap.set(key, amount);
      }
    });

    // Convert the Map back to an array of objects
    nameMap.forEach((amount, key) => {
      const [dishName, price] = key.split("-");
      result.push({ dishName, price: parseFloat(price), amount });
    });
    setCartArray((prevState) => {
      return prevState.concat(result);
    });
  }, [props.cartItems]);

  useEffect(() => {
    let total = 0;
    if (cartArray) {
      cartArray.forEach((item) => {
        total += Number(item.amount) * item.price;
      });
    }
    setTotalAmount(total);
  }, [cartArray]);

  const amountHandler = (item, operation) => {
    if (cartArray) {
      const updatedArray = [];
      cartArray.forEach((ele) => {
        if (ele.dishName === item.dishName) {
          if (operation === "plus") {
            ele.amount += 1;
          } else if (operation === "minus" && ele.amount > 1) {
            ele.amount -= 1;
          }
        }
        updatedArray.push(ele);
      });
      setCartArray((prevState) => {
        return updatedArray;
      });
      props.updateCart(operation);
    }
  };
  return (
    <>
      <div className={clasess.backdrop} onClick={props.onClose}></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={clasess["modal-container"]}
      >
        <Card className={clasess["modal-card"]}>
          <ul>
            {cartArray &&
              cartArray.map((item) => {
                return (
                  <li key={item.dishName}>
                    <div className={clasess["info-container"]}>
                      <h4>{item.dishName}</h4>
                      <div className={clasess["price-container"]}>
                        <p>${item.price}</p>
                        <div className={clasess["amount-cont"]}>
                          x {item.amount}
                        </div>
                      </div>
                    </div>
                    <div className={clasess["button-cont"]}>
                      <button
                        type="click"
                        className={clasess.btn}
                        onClick={() => amountHandler(item, "minus")}
                      >
                        -
                      </button>
                      <button
                        type="click"
                        className={clasess.btn}
                        onClick={() => amountHandler(item, "plus")}
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
          {cartArray.length === 0 && <p>Please Add the Item to the Cart.</p>}
          {cartArray.length > 0 && (
            <div className={clasess["total-cont"]}>
              <h4>Total Amount</h4>
              <h4>${Number(totalAmount).toFixed(2)}</h4>
            </div>
          )}
          <div className={clasess["modal-btn"]}>
            <Button
              className={`${clasess["main-btn"]} ${clasess["secondary-btn"]}`}
              onClick={props.onClose}
            >
              Close
            </Button>
            {cartArray.length > 0 && (
              <Button className={clasess["main-btn"]}>Order</Button>
            )}
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default Modal;
