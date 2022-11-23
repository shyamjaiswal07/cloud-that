import React, { useReducer, useState } from "react";
import Cards from "react-credit-cards";
import { usePaymentInputs } from "react-payment-inputs";
import {
  Form,
  FormField,
  Label,
  Button,
  Message,
  Modal
} from "semantic-ui-react";
import "react-credit-cards/es/styles-compiled.css";

const initialState = {
  cvc: "",
  expiry: "",
  name: "",
  number: "",
  focus: "",
  issuer: ""
};
console.log(initialState)

const reducer = (state, action) => {
  switch (action.type) {
    case "CVC":
      return { ...state, cvc: action.payload };
    case "EXPIRY":
      return { ...state, expiry: action.payload };
    case "NUMBER":
      return { ...state, number: action.payload };
    case "NAME":
      return { ...state, name: action.payload };
    case "FOCUS":
      return { ...state, focus: action.payload };
    case "ISSUER":
      return { ...state, issuer: action.payload };
    default:
      return state;
  }
};

const AddCreditCardModal = ({ open, closeModal, handleSave }) => {
  const [maxLength, setMaxLength] = useState(16);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cvc, expiry, name, number, focus } = state;
  const {
    meta: { erroredInputs = {}, touchedInputs = {} },
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();
  const isValid =
    !erroredInputs.cardNumber &&
    !erroredInputs.cvc &&
    !erroredInputs.expiryDate;

  const handleInputFocus = e => {
    dispatch({ type: "FOCUS", payload: e.target.name });
  };
  const handleInputChange = e => {
    dispatch({ type: e.target.name.toUpperCase(), payload: e.target.value });
  };
  const handleExpiryChange = e => {
    dispatch({ type: "EXPIRY", payload: e.target.value.replace(/\s/g, "") });
  };
  const handleFormSubmit = e => {
    e.preventDefault();

    handleSave(state);
    closeModal();
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <Modal.Header>Card</Modal.Header>
      <Modal.Content>
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={name}
          number={number}
          callback={({ maxLength: length, issuer }, valid) => {
            if (valid) {
              dispatch({ type: "ISSUER", payload: issuer });
            }

            if (maxLength !== length) {
              setMaxLength(length);
            }
          }}
        />
        <Form onSubmit={handleFormSubmit}>
          <FormField>
            <Label>Name</Label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </FormField>
          <FormField>
            {touchedInputs.cardNumber && erroredInputs.cardNumber && (
              <Message
                list={["The card number is invalid"]}
                size="tiny"
                negative
              />
            )}
            <Label>Card Number</Label>
            <input
              {...getCardNumberProps({
                onChange: handleInputChange,
                value: number
              })}
              name="number"
              placeholder="Number"
              onFocus={handleInputFocus}
              maxLength={maxLength}
              required
            />
          </FormField>
          <FormField>
            {touchedInputs.expiryDate && erroredInputs.expiryDate && (
              <Message
                list={["The expiration date is invalid"]}
                size="tiny"
                negative
              />
            )}
            <Label>Expiration date:</Label>
            <input
              {...getExpiryDateProps({
                onChange: handleExpiryChange,
                value: expiry
              })}
              name="expiry"
              placeholder="Expiration date"
              onFocus={handleInputFocus}
              required
            />
          </FormField>
          <FormField>
            {touchedInputs.cvc && erroredInputs.cvc && (
              <Message list={["Invali date"]} size="tiny" negative />
            )}
            <Label>CVC:</Label>
            <input
              {...getCVCProps({ onChange: handleInputChange, value: cvc })}
              name="cvc"
              placeholder="CVC"
              onFocus={handleInputFocus}
              maxLength={4}
              required
            />
          </FormField>

          <Button type="submit" color="green" disabled={!isValid} inverted>
            Add
          </Button>
          <Button type="button" onClick={closeModal} color="red" inverted>
            Clear
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default AddCreditCardModal;
