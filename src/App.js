import React from "react";
import Container from 'react-bootstrap/Container';
import UserInputList from './UserInputList';
import "./App.css";
const getUserLoginAPIUrl = "https://user-demo-vercel-server.vercel.app/user";
const App = () => {
  return (
    <Container>
    <UserInputList getUserLoginAPIUrl={getUserLoginAPIUrl} />
    </Container>
  );
}
      

export default App;
