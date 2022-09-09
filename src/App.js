// import logo from './logo.svg';
import './App.css';
import { Outlet, Link } from "react-router-dom";

import React from 'react';
import { getLatest, getRarest } from "./api";

import { withRouter } from './routes/shared/classhooks';

class App extends React.Component {
  // function App() {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      terms_accepted: false,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAgree = this.handleAgree.bind(this);
  }

  // TODO? a better lifecycle method?
  componentDidMount() {
    // called in background
    getLatest();
    getRarest();
  }

  handleSearchChange(event) {
    // handleChange(event) {
    this.setState({ search: event.target.value });
  }

  handleSearchSubmit(event) {
    // handleSubmit(event) {
    event.preventDefault();
    const to_navigate = this.state.search.replace(/\s/g, ''); // remove all whitespace (https://stackoverflow.com/a/6623263)
    // const to_navigate = this.state.search.trim();
    this.setState({ search: '' });
    this.props.router.navigate(`/${to_navigate}`);
    // this.props.router.navigate(`/${this.state.search}`);
    // this.setState({ search: '' });
  }

  handleAgree(event) {
    this.setState({ terms_accepted: true });
  }

  render() {

    // console.log(`rrrrrrrrr1`);
    // console.log(JSON.stringify(this.props));
    // console.log(`rrrrrrrrr2`);

    let with_title = null;
    // if (this.props.router.location.pathname === '/') {
    let show_button = null;
    const button_value = "go";
    // const button_value = "get";
    if (this.state.search.length) {
      show_button = (<span> <input type="submit" value={button_value} /></span>);
      // show_button = (<span> <input type="submit" value="get" /></span>);
    }
    const placeholder = "asset, address or block";
    // const placeholder = "get asset, address or block";
    // const placeholder = "search: asset / address / block";
    with_title = (
      <span>
        {`${this.props.router.location.pathname}`}
        {/* / */}
        <form onSubmit={this.handleSearchSubmit}>
          {/* <form onSubmit={this.handleSubmit}> */}
          <input type="text" value={this.state.search} onChange={this.handleSearchChange} placeholder={placeholder} />
          {/* <input type="text" value={this.state.search} onChange={this.handleChange} placeholder={placeholder} /> */}
          {/* <input type="text" value={this.state.search} onChange={this.handleChange} placeholder="asset, address or block" /> */}
          {/* / <input type="text" onChange={this.handleChange} placeholder="search" /> */}
          {show_button}
          {/* <input type="submit" value="go" /> */}
        </form>
      </span>
    );
    // }
    // else {
    //   with_title = `${this.props.router.location.pathname}`;
    // }

    let show_terms = null;
    if (!this.state.terms_accepted) {
      show_terms = (
        <dialog open style={{

          // https://stackoverflow.com/a/43370443

          position: "fixed",
          // "display": "flex",
          justifyContent: "center",
          alignItems: "center",
          // "justify-content": "center",
          // "align-items": "center",
          // padding: "10%",

          // position: "fixed",
          // // display: "flex",
          // height: "50%",
          // width: "50%",

          // "align-items": "center",
          // "justify-content": "center",
          // top: "200px !important",
        }}>

          <h3>bitSTART Terms of Use:</h3>

          <p>
            Bitcoin is the source of all data in this application.{' '}
            As a universally open and permissionless network, it can contain ANY kind of content.{' '}
            {/* Please be aware that bitSTART does not have any control of the contents that are going to be presented. */}
            bitSTART reads this data and shows it as is, only using metadata (not the content of the data) to determine what to show.
          </p>
          <p>
            <b>
              If you are using this application, you are agreeing to not make bitSTART responsible for the content that is presented.
              {/* If you are using this application, you are agreeing to not make bitSTART responsible for anything in relation to the content that is presented. */}
            </b>
            {/* You must agree to not make bitSTART responsible for anything in relation to the content that will be presented. */}
          </p>

          {/* <p>Greetings, one and all!</p> */}
          {/* <form onSubmit={this.handleAgree} method="dialog"> */}
          <button onClick={this.handleAgree}>Agree and proceed</button>
          {' '}
          {/* <button onClick={this.handleNotAgreeSubmit}>Do not agree, exit the application</button> */}
          {/* </form> */}
        </dialog>
      );
    }

    return (
      <div style={{ padding: "1rem" }}>

        {show_terms}

        <h1>bitST.ART{with_title}</h1>
        {/* <h1>bitST.ART{`${this.props.router.location.pathname}`}</h1> */}
        {/* <h1>bitST.ART</h1> */}
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

          <Link to="/_rarest">Rarest</Link> |{" "}
          <Link to="/_all">All</Link>

          {/* <Link to="/_rarest">Rarest</Link> */}
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

// https://stackoverflow.com/a/60879343
export default withRouter(App);
// export default App;
