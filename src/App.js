import React from "react";
import Container from 'react-bootstrap/Container';
import UserInputList from './UserInputList';
import "./App.css";
const getUserLoginAPIUrl = "http://localhost:3001/user";
const App = () => {
  return (
    <Container>
    <UserInputList getUserLoginAPIUrl={getUserLoginAPIUrl} />
    </Container>
  );
}
      

export default App;