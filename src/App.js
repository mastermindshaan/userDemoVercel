import React from "react";
import Container from 'react-bootstrap/Container';
import UserInputList from './UserInputList';
import "./App.css";
const getUserLoginAPIUrl = "https://api-server-user.vercel.app//user";
const App = () => {
  return (
    <Container>
    <UserInputList getUserLoginAPIUrl={getUserLoginAPIUrl} />
    </Container>
  );
}
      

export default App;
