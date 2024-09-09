import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/movie/:id" element={<MovieDetail />} exact />
        <Route path="/search/:id" element={<Search />} exact />
      </Routes>
    </div>
  );
}

export default App;
