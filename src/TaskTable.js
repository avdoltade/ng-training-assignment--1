import React, { useState } from 'react';
import { Table, Dropdown, ButtonGroup, DropdownButton, Form, Button } from 'react-bootstrap';
import NewTaskModal from './NewTaskModal';

const TaskTable = () => {
  const [tasks, setTasks] = useState([
    { id: 1, user: 'User 1', status: 'Completed', dueDate: '12/10/2024', priority: 'Low', comments: 'This task is good' },
    { id: 2, user: 'User 2', status: 'In Progress', dueDate: '14/09/2024', priority: 'High', comments: 'This task is good' },
    { id: 3, user: 'User 3', status: 'Not Started', dueDate: '18/08/2024', priority: 'Low', comments: 'This task is good' },
    { id: 4, user: 'User 4', status: 'In Progress', dueDate: '12/06/2024', priority: 'Normal', comments: 'This task is good' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const tasksPerPage = 2;

  // Open and close modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Function to add new task
  const handleAddTask = (newTask) => {
    const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1; // Generate a new ID
    const taskWithId = { ...newTask, id: newId };
    setTasks([...tasks, taskWithId]); // Add the new task to the list
  };

  const handleEdit = (id) => {
    console.log('Edit task:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete task:', id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Tasks <span className="text-muted">({tasks.length} Total)</span></h3> {/* Show the total task count */}
        <Button variant="warning" onClick={handleShowModal}>New Task</Button>
      </div>
      <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px' }}
        />
      </div>
      <Table bordered hover>
        <thead className="thead-light">
          <tr>
            <th>Select</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map(task => (
            <tr key={task.id}>
              <td><input type="checkbox" /></td>
              <td>{task.user}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <DropdownButton
                  as={ButtonGroup}
                  title="Options"
                  variant="secondary"
                  id="bg-nested-dropdown"
                >
                  <Dropdown.Item eventKey="1" onClick={() => handleEdit(task.id)}>Edit</Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={() => handleDelete(task.id)}>Delete</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={filteredTasks.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {/* New Task Modal */}
      <NewTaskModal show={showModal} handleClose={handleCloseModal} handleAddTask={handleAddTask} />
    </div>
  );
};

const Pagination = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TaskTable;
