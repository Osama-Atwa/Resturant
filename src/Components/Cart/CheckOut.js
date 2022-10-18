import { useRef, useState } from "react";
import classes from "./CheckOut.module.css";

const isEmpty = (value) => {
  return value.trim() === "";
};

const isFiveLength = (value) => value.trim().length === 5;

const CheckOut = (props) => {
  const NameRef = useRef();
  const StreetRef = useRef();
  const PostCodeRef = useRef();
  const CityRef = useRef();
  const [isFormIsValid, setFormValidity] = useState({
    Name: true,
    Street: true,
    PostCode: true,
    City: true,
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredName = NameRef.current.value;
    const enteredStreet = StreetRef.current.value;
    const enteredPostCode = PostCodeRef.current.value;
    const enteredCity = CityRef.current.value;
    setFormValidity({
      Name: !isEmpty(enteredName),
      Street: !isEmpty(enteredStreet),
      PostCode: isFiveLength(enteredPostCode),
      City: !isEmpty(enteredCity),
    });

    const isFormValid =
      !isEmpty(enteredName) &&
      !isEmpty(enteredStreet) &&
      isFiveLength(enteredPostCode) &&
      !isEmpty(enteredCity);
    if (!isFormValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postcode: enteredPostCode,
      street: enteredStreet,
    });
  };

  const NameClassName = `${classes.control} ${
    isFormIsValid.Name ? "" : classes.invalid
  }`;

  const StreetClassName = `${classes.control} ${
    isFormIsValid.Street ? "" : classes.invalid
  }`;

  const PostCodeClassName = `${classes.control} ${
    isFormIsValid.PostCode ? "" : classes.invalid
  }`;
  const CityClassName = `${classes.control} ${
    isFormIsValid.City ? "" : classes.invalid
  }`;
  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <div className={NameClassName}>
        <label htmlFor="name">Name</label>
        <input id="name" ref={NameRef} type="text" />
        {!isFormIsValid.Name && <p>Please Enter Name</p>}
      </div>
      <div className={StreetClassName}>
        <label htmlFor="street">Street</label>
        <input id="street" ref={StreetRef} type="text" />
        {!isFormIsValid.Street && <p>Please Enter Street</p>}
      </div>
      <div className={PostCodeClassName}>
        <label htmlFor="postcode">Post Code</label>
        <input id="postcode" ref={PostCodeRef} type="number" />
        {!isFormIsValid.PostCode && (
          <p>Please Enter a Valid Post Code (length "{"="}" 5)</p>
        )}
      </div>
      <div className={CityClassName}>
        <label htmlFor="city">City</label>
        <input id="city" ref={CityRef} type="text" />
        {!isFormIsValid.City && <p>Please Enter City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.OnCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
