import { useState } from "react";
import { Button, Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import Contacts from "./Contacts";

export default function App() {
  const [selectingContact, setSelectingContact] = useState(false);

  return (
    <div className="App">
      <Container>
        <Button onClick={() => setSelectingContact(true)}>Get Contact</Button>

        <Contacts
          selecting={selectingContact}
          onClose={() => setSelectingContact(false)}
        />
      </Container>
    </div>
  );
}
