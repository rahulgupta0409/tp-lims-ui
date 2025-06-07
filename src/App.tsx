import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AppRoutes from "./routes";
import ErrorBoundary from "./components/errorBoundary";
import { BackToTopButton } from "./components/button";
import "./App.css";

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ErrorBoundary>
        <Provider store={store}>
          <Router>
            <BackToTopButton />
            <AppRoutes />
          </Router>
        </Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
