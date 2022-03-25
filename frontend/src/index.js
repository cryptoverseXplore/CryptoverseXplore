import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DAppProvider } from "@usedapp/core";


// const config = {
//   readOnlyChainId: ChainId.Rinkeby,
//   readOnlyUrls: {
//     [ChainId.Rinkeby]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
//   },
// }


ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{}}>
      <App />
    </DAppProvider> 
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
