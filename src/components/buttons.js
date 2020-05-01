import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from 'axios';

function Buttons() {
    const [showAddTask, setAddTask] = useState(false);
    const [showDeleteTask, setDeleteTask] = useState(false);

    const closeAddTask = () => setAddTask(false);
    const openAddTask = () => setAddTask(true);

    const closeDeleteTask = () => setDeleteTask(false);
    const openDeleteTask = () => setDeleteTask(true);   

    const color = {
        color: 'red',        
    }

    const state = {
        task: ''
    }

    const handleChange = (e) => {
        state.task = e.target.value
    }

    const handleSubmit = (e) => {
        e.preventDefault();         

        const save = {
            todo: state.task
        }
        
        axios.post('http://localhost:3000/tasks/add', save)
            .then(res => console.log(res.data));            
        
        state.task = ''

        setAddTask(false);
        
    }

    return ( 
        <div>
            <div>
                <button className=" btn btn-primary ml-2" onClick={openAddTask}>Add Task</button>
            </div>

            <Modal show={showAddTask} onHide={closeAddTask}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3" onChange={handleChange}>
                            <FormControl placeholder="Enter task here"></FormControl>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeAddTask}>Close</Button>
                        <Button variant="primary" onClick={handleSubmit}>Add Task</Button>
                    </Modal.Footer>
            </Modal> 

            <Modal >
                <Modal.Header closeButton>
                    <Modal.Title>Delete List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><h3 style={color}>Are you sure you want to delete current list?</h3></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" >Close</Button>
                        <Button variant="primary" >Delete</Button>
                    </Modal.Footer>
            </Modal>
        </div>
        );
}
 
export default Buttons;