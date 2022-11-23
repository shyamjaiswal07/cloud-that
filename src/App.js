import React, { useState } from "react";
import {
  Container,
  Header,
  Button,
} from "semantic-ui-react";

import AddCreditCardModal from "./components/AddCreditCardModal";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClick = () => {
    setModalOpen(prevState => !prevState);
  };
const addCreditCard =()=>{

}

  return (
    <Container
      style={{
        marginTop: "75px"
      }}
    >
      <Header>
        <h1>Payment Method</h1>
      </Header>
      {modalOpen && (
        <AddCreditCardModal
          open={modalOpen}
          closeModal={handleModalClick}
          handleSave={addCreditCard}
        />
      )}
<Button onClick={handleModalClick} primary inverted>      
          Payment By Card
          </Button>
    </Container>
  );
}
