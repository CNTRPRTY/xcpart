import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
import Home from "./routes/home"
import Latest from "./routes/latest";
// import Assets from "./routes/assets";
import Rarest from "./routes/rarest";
import Asset from "./routes/asset";
// import Expenses from "./routes/expenses";
// import Invoices from "./routes/invoices";
// import Invoice from "./routes/invoice";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>

          <Route index element={<Home />} />

          {/* TODO? cambiarlo a singular asset/ */}
          {/* LO Q PASA, es q si lo dejo como assets pues luego otros paths pudieran ser como stats de los assets... */}



          {/* TODO, but not yet */}
          {/* <Route path="_news" element={
            <main style={{ padding: "1rem" }}>
              <p>NEWsss</p>
            </main>
          } /> */}



          <Route path="_latest" element={<Latest />} />
          {/* <Route path="_latest" element={<Assets />} /> */}
          <Route path="_rarest" element={<Rarest />} />

          <Route path=":assetName" element={<Asset />} />

          {/* <Route path="assets" element={<Assets />} />
          <Route path="assets/:assetName" element={<Asset />} />

          <Route path="rarest" element={<Rarest />} /> */}

          {/* <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />}>
            <Route
              index
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Select an invoice</p>
                </main>
              }
            />
            <Route path=":invoiceId" element={<Invoice />} />
          </Route> */}

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
