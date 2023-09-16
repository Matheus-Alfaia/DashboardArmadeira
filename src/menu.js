import React from 'react';
import { Link } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';


const Menu = () => {
  return (
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
