import { CssBaseline } from "@mui/material"
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import JobDetails from "./pages/JobDetails";
import SearchBar from "./components/SearchBar"

function App() {
  return (
    <>
      <Router>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/:jobId" element={<JobDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;