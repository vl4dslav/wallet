import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation";
import "./App.scss";
import Home from "./routes/home/Home";
import Stats from "./routes/stats/Stats";
import Settings from "./routes/settings/Settings";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path="home" element={<Home />} />
            <Route path="stats" element={<Stats />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
