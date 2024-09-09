import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { HashLoader } from "react-spinners";
import { Pagination } from "flowbite-react";
import { useLocation } from "react-router-dom";

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [pathSegment, setPathSegment] = useState("");

  useEffect(() => {
    const path = location.pathname.split("/");
    setPathSegment(path[2]);
  }, [location.pathname]);

  useEffect(() => {
    if (pathSegment) {
      getMovies(pathSegment, 1);
    }
  }, [pathSegment]);

  const getMovies = async (query, page) => {
    setIsLoading(true);
    const apiKey = process.env.REACT_APP_API_KEY;
    const res = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}&page=${page}`
    );
    const data = await res.json();
    setMovies(data.Search);

    const _totalPages = Math.ceil(data.totalResults / 10);
    setTotalPages(_totalPages);
    setIsLoading(false);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    getMovies(pathSegment, page);
  };

  return (
    <div className="p-4">
      <div className=" w-full flex justify-between items-center">
        <Link to="/">
          <h1 className="font-light text-xl md:text-2xl">H8 Movies</h1>
        </Link>
        <SearchForm />
      </div>
      {movies?.length > 0 && !isLoading ? (
        <div className="mt-8">
          <p className="text-xl font-bold mb-4">Search result: {pathSegment}</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {movies.map((movie) => {
              return (
                <Link
                  to={`/movie/${movie.imdbID}`}
                  className=""
                  key={movie.imdbID}
                >
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="rounded-xl h-58 md:h-48 lg:h-72 mb-2"
                    />
                    <p className="font-semibold text-sm text-center">
                      {movie.Title} ({movie.Year})
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex pt-6 pb-8 justify-center md:justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              previousLabel=""
              nextLabel=""
              showIcons
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-96">
          <HashLoader size={150} />
        </div>
      )}
    </div>
  );
}
