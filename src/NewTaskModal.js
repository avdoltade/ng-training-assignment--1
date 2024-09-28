import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const NewTaskModal = ({ show, handleClose, handleAddTask }) => {
  const [newTask, setNewTask] = useState({
    user: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: ''
  });
  // Function to handle input changes
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = () => {
    handleAddTask(newTask);
    handleClose(); // Close the modal after adding the task
    setNewTask({
      user: '',
      status: '',
      dueDate: '',
      priority: '',
      comments: ''
    }); // Reset form fields
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUser">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="user"
              value={newTask.user}
              onChange={handleChange}
              placeholder="Enter user"
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={newTask.status}
              onChange={handleChange}
              placeholder="Enter status"
            />
          </Form.Group>
          <Form.Group controlId="formDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type="text"
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
              placeholder="Enter priority"
            />
          </Form.Group>
          <Form.Group controlId="formComments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              name="comments"
              value={newTask.comments}
              onChange={handleChange}
              placeholder="Enter comments"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewTaskModal;


