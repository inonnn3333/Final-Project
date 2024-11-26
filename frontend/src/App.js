import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './components/Login';
import Home from './components/Home';
import MyTrainings from './components/MyTrainings.jsx'
import Footer from './components/Footer.jsx';
import Users from './components/Users.jsx';
import Signup from './components/Signup.jsx';
import { UserProvider } from './components/UserContext.js';

function App() {
  return (
      <Router>
    <UserProvider>
      <Header/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} /> 
          <Route path="/my-favorites" element={<MyTrainings />} />
          <Route path="/my-users" element={<Users />} />
        </Routes>
      <Footer/>
    </UserProvider>
      </Router>
  );
}

export default App;
