import { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverLay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const overlay = document.getElementById("overlay");
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, overlay)}
      {ReactDOM.createPortal(
        <ModalOverLay>{props.children}</ModalOverLay>,
        overlay
      )}
    </Fragment>
  );
};

export default Modal;
