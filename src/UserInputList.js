import React, { useState, Fragment } from "react";
import axios from "axios";
import md5 from "md5";
import { Row, Col, Form, Button, ButtonGroup, Alert, Table } from 'react-bootstrap';

const UserInputList = (props) => {
    const { getUserLoginAPIUrl } = props;
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrorMsg] = useState("");
    const [listInd, setListInd] = useState(false);
    const [userList, setUserList] = useState([]);

    const handleUserChange = e => {
        const val = e.target.value;
        if (errMsg) {
            setErrorMsg('');
        }
        setUser(val)
    }
    const handlePasswordChange = e => {
        const pass = e.target.value;
        if (errMsg) {
            setErrorMsg('');
        }
        setPassword(pass);
    }
    const handleBackToForm = () => {
        setListInd(false);
        setUserList([])
    }
    const handleSubmitClick = () => {
        const cred = md5(password)
        axios.post(getUserLoginAPIUrl, {
            user,
            cred
        })
            .then((response) => {
                if (response.data.length) {
                    setPassword("");
                    setUser("");
                    setListInd(true);
                    setUserList(response.data);

                } else {
                    setErrorMsg('No User Found');
                    setListInd(false);
                }
            });
    }
    const renderUserInputForm = () => {
        return <Row>
            <Col xs={6}>
                <h1>User Form</h1>
                <hr />
                {errMsg ? <Alert variant="danger">
                    {errMsg}
                </Alert> : null}
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupUser">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter user" value={user} onChange={handleUserChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    </Form.Group>
                    <ButtonGroup className="mb-3" controlId="formGroupSubmit">
                        <Button disabled={!(user && password)} onClick={handleSubmitClick}>Submit</Button>
                    </ButtonGroup>
                </Form>
            </Col>
        </Row>
    }

    const renderIterativeUserList = () => {
        return userList.map((user, idx) => {
            return (<tr key={`${user}-${idx}`}>
                <td>{user.userid}</td>
                <td>{user.password_hash}</td>
                <td>{user.role}</td>
                <td>Not Working</td>
            </tr>)
        })
    }

    const renderListItem = () => {
        return (
            <Fragment>
                <h1>User List</h1>
                <hr />
                <Row className="mb-3">
                    <Col xs={12} className="text-end">
                        <Button onClick={handleBackToForm} variant="light">Back To Form</Button>
                    </Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>Password Hash</th>
                            <th>Role</th>
                            <th>Raw Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderIterativeUserList()}
                    </tbody>
                </Table>
            </Fragment>)
    }
    return (
        <Fragment>
            {listInd ? renderListItem() : renderUserInputForm()}
        </Fragment>
    );
}

export default UserInputList;
