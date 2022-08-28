// import logo from './logo.svg';
import './App.css';
import { Outlet, Link } from "react-router-dom";

import React from 'react';
import { getLatest, getRarest } from "./api";

class App extends React.Component {
  // function App() {

  // TODO? a better lifecycle method?
  componentDidMount() {
    // called in background
    getLatest();
    getRarest();
  }

  render() {
    return (
      <div>

        <h1>bitST.ART</h1>
        {/* <h1>bitSTART</h1> */}

        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          {/* <Link to="/_news">News</Link> |{" "} */}
          <Link to="/">Home</Link> |{" "}
          {/* <a href="https://mempool.space/" target="_blank">Bitcoin</a> |{" "} */}
          <Link to="/_latest">Latest</Link> |{" "}
          <Link to="/_rarest">Rarest</Link>
          {/* <Link to="/assets">Latest</Link> |{" "}
        <Link to="/rarest">Rarest</Link> */}
          {/* <Link to="/assets">Assets</Link> */}
          {/* <Link to="/assets">Assets</Link> |{" "}
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link> */}
        </nav>
        <Outlet />
      </div>
    );
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
  }

}

export default App;
