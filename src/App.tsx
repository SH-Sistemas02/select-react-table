import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import Contacts from "./Contacts";

export default function App() {
  const [selectingContact, setSelectingContact] = useState(false);
  const [selected, setSelected] = useState<string | number | null>(null);
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    if (!selected) {
      return;
    }

    fetch(`https://reqres.in/api/users/${selected}`)
      .then((response) => response.json())
      .then(({ data }) => setContact(data));
  }, [selected]);

  return (
    <div className="App">
      <Container>
        <Button onClick={() => setSelectingContact(true)}>Get Contact</Button>

        <Contacts
          selecting={selectingContact}
          onClose={() => setSelectingContact(false)}
          onSelected={(value) => setSelected(value)}
        />

        <pre>
          <code>{JSON.stringify(contact, null, 2)}</code>
        </pre>
      </Container>
    </div>
  );
}
