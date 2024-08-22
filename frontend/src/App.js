import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PersonsList from "./components/PersonsList";
import PersonDetails from "./components/PersonDetails";
import PersonForm from "./components/PersonForm";
import Archive from "./components/Archive";
import CallsLog from "./components/CallsLog";
import Dispatch from "./components/Dispatch";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PersonsList />} />
          <Route path="/persons/:id" element={<PersonDetails />} />
          <Route path="/add-person" element={<PersonForm />} />
          <Route path="/edit-person/:id" element={<PersonForm />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/calls-log" element={<CallsLog />} />
          <Route path="/dispatch" element={<Dispatch />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
