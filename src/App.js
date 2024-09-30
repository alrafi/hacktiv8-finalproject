import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/movie/:id" element={<MovieDetail />} exact />
        <Route path="/search/:id" element={<SearchPage />} exact />
      </Routes>
    </div>
  );
}

export default App;
