import React from 'react';
import { Link } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';


const Menu = () => {
  return (

//    <nav class="navbar navbar-expand-lg bg-body-tertiary">
//      <div class="container-fluid">
//        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
//          <span class="navbar-toggler-icon"></span>
//        </button>
//        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
//          <a class="navbar-brand" href="#">Hidden brand</a>
//          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//            <li class="nav-item">
//              <Link to="/pageHome">Home</Link>
//            </li>
//            <li class="nav-item">
//              <li><Link to="/pageData">Data</Link></li>
//            </li>
//            <li class="nav-item">
//              <li><Link to="/pageBattery">Battery</Link></li>
//            </li>
//
//          </ul>
//          <form class="d-flex" role="search">
//            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
//            <button class="btn btn-outline-success" type="submit">Search</button>
//          </form>
//        </div>
//      </div>
//    </nav>
    <nav>
      <ul>
        <li><Link to="/pageHome">Home</Link></li>
        <li><Link to="/pageData">Data</Link></li>
        <li><Link to="/pageMemory">Memory</Link></li>
        <li><Link to="/pageBatery">Battery</Link></li>
        <li><Link to="/pageBatery">AI</Link></li>
      </ul>
    </nav>

  );
};

export default Menu;
