import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import classes from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Modal from "../UI/Modal";
const Header = (props) => {
  const [modalFlag, setModalFlag] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [animeFlag, setAnimeFlag] = useState(false);
  const isMounted = useRef(false);
  const cartBtnClickHandler = () => {
    setModalFlag(true);
  };

  const closeModal = () => {
    setModalFlag(false);
  };
  useEffect(() => {
    let total = 0;
    props.cartItems.forEach((element) => {
      total += element.amount;
    });
    setCartTotal(total);
  }, [props.cartItems]);

  useEffect(() => {
    if (isMounted.current) {
      setAnimeFlag(true);
      const timer = setTimeout(() => {
        setAnimeFlag(false);
      }, 100);
      return () => {
        clearTimeout(timer);
      };
    } else {
      isMounted.current = true;
    }
  }, [cartTotal]);

  const updateCartHandler = (oper) => {
    if (oper === "plus") {
      setCartTotal((prevState) => {
        return prevState + 1;
      });
    } else if (oper === "minus") {
      setCartTotal((prevState) => {
        return prevState - 1;
      });
    }
  };
  return (
    <>
      <AnimatePresence>
        {modalFlag && (
          <Modal
            onClose={closeModal}
            cartItems={props.cartItems}
            updateCart={updateCartHandler}
          />
        )}
      </AnimatePresence>
      <div className={classes["header-container"]}>
        <div className={classes["nav-bar"]}>
          <h3 className={classes.logo}>ReactMeals</h3>
          <div
            className={`${classes["cart-container"]} ${
              animeFlag && classes["pop-animation"]
            }`}
            onClick={cartBtnClickHandler}
          >
            <FontAwesomeIcon className={classes.icon} icon={faCartShopping} />
            <p className={classes.title}>Your Cart</p>
            <div className={classes.amount}>{cartTotal}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
