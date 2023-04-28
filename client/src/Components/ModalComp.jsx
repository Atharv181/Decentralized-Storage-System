import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Toaster, toast } from "react-hot-toast";

const ModalComp = ({ setModalOpen, allow, fetch, list }) => {
  const [shareAddress, setShareAddress] = useState(null);
  const shareAccess = () => {
    allow(shareAddress);
    
  };

  const fetchList = () => {
    console.log("fetching Started");
    fetch();
    console.log(list);
  };

  useEffect(() => {
    fetchList()
  }, []);
  

  return (
    
    <>
      <Toaster position="top-right" />
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Share Account access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Account address</Form.Label>
              <Form.Control
                type="text"
                placeholder="0xa1b2..."
                autoFocus
                onChange={(event) => setShareAddress(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="text-center m-auto">
              <Button variant="primary" onClick={shareAccess}>
                Share
              </Button>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Dropdown className="mt-4 text-center">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  
                >
                  View Account with Access
                </Dropdown.Toggle>

                <Dropdown.Menu>

                  {list.map((acc,i) =>(
                    <Dropdown.Item href="">{acc}</Dropdown.Item>
                    
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalComp;
