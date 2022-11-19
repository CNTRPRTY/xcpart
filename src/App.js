// import logo from './logo.svg';
import './App.css';
import { Outlet, Link } from "react-router-dom";

import React from 'react';
import { getLatest, getRarest, getAllpage } from "./api";

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
    getAllpage(1);
  }

  handleSearchChange(event) {
    // handleChange(event) {
    this.setState({ search: event.target.value });
  }

  handleSearchSubmit(event) {
    // handleSubmit(event) {
    event.preventDefault();
    const to_navigate = this.state.search.replace(/\s/g, ''); // remove all whitespace (https://stackoverflow.com/a/6623263)
    this.setState({ search: '' });
    this.props.router.navigate(`/${to_navigate}`);
  }

  handleAgree(event) {
    this.setState({ terms_accepted: true });
  }

  render() {

    let show_button = null;
    const button_value = "go";
    if (this.state.search.length) {
      show_button = (<span> <input type="submit" value={button_value} /></span>);
    }
    const placeholder = "asset, address or block";
    const with_title = (
      <span>
        {`${this.props.router.location.pathname}`}
      </span>
    );

    const address_bar = (
      <span>
        <form onSubmit={this.handleSearchSubmit}>
          <input type="text" value={this.state.search} onChange={this.handleSearchChange} placeholder={placeholder} />
          {show_button}
        </form>
      </span>
    );

    let show_terms = null;
    if (!this.state.terms_accepted) {
      show_terms = (
        <dialog open style={{
          // https://stackoverflow.com/a/43370443
          position: "fixed",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <h1>Welcome to XCP.ART</h1>
          <h2>First step:</h2>
          <h3>Read terms of use:</h3>
          <p>
            Bitcoin is the source of all data in this application.{' '}
            As a universally open and permissionless network, it can contain ANY kind of content.{' '}
            XCP.ART reads this data and shows it as is, only using metadata (not the content of the data) to determine what to show.
          </p>
          <p>
            <b>
              If you are using this application, you are agreeing to not make XCP.ART responsible for the content that is presented.
            </b>
          </p>
          <button onClick={this.handleAgree}>Agree and proceed</button>
          {' '}
        </dialog>
      );
    }

    return (
      <div style={{ padding: "1rem" }}>

        {show_terms}

        <h1>XCP.ART{with_title}</h1>

        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          {address_bar}
          <Link to="/">Home</Link> |{" "}
          <Link to="/_latest">Latest</Link> |{" "}
          <Link to="/_rarest">Rarest</Link> |{" "}
          <Link to="/_all">All</Link>
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
