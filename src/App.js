import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './menu';
import Memory from './pageMemory';
import Batery from './pageBatery';
import Data from './pageData';
import Home from './pageHome';


const App = () => {
  return (
    <Router>
       <nav className="navbar navbar-expand-lg bg-body-secoundary">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">Armadeira Dashboard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/pageHome">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/pageData">Data</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/pageBatery">Battery</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">AI</Link>
                    </li>
                    <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button class="btn btn-outline-light" type="submit">Search</button>
                    </form>
                  </ul>
                </div>
              </div>
            </nav>
      <Routes>
        <Route path="/pageHome" element={<Home/>} />
        <Route path="/pageMemory" element={<Memory/>} />
        <Route path="/pageBatery" element={<Batery/>} />
        <Route path="/pageData" element={<Data/>} />

      </Routes>
    </Router>
  );
};

export default App;
