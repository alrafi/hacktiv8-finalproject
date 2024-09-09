import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import SearchForm from "../components/SearchForm";

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const path = window.location.pathname.split("/");
    getMovie(path[2]);
  }, []);

  const getMovie = async (imdbId) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const res = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`
    );
    const data = await res.json();
    setMovie(data);
  };

  return (
    <div className="p-4">
      <div className=" w-full flex justify-between items-center mb-16">
        <Link to="/">
          <h1 className="font-light text-xl md:text-2xl">Hacktiv8 Movies</h1>
        </Link>
        <SearchForm />
      </div>

      {movie ? (
        <div className="flex flex-col md:flex-row md:items-start">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="rounded-2xl object-cover"
          />
          <div className="md:ml-8">
            <p className="text-4xl uppercase font-light tracking-wide mb-4 mt-6 md:mt-0">
              {movie.Title}
            </p>
            <div className="flex mb-4 space-x-4">
              <p>{movie?.imdbRating}</p>
              <span>|</span>
              <p>{movie?.imdbVotes} Reviews</p>
              <span>|</span>
              <p>{movie?.Runtime}</p>
              <span>|</span>
              <p>{movie?.Year}</p>
            </div>
            <p className="font-bold text-lg">Storyline</p>
            <p className="movie-detail-overview mb-4">{movie?.Plot}</p>
            <div className="flex mb-2 w-full">
              <p className="w-1/4 font-bold">Director</p>
              <p className="w-3/4">{movie?.Director}</p>
            </div>
            <div className="flex mb-2 w-full">
              <p className="w-1/4 font-bold">Writer</p>
              <p className="w-3/4">{movie?.Writer}</p>
            </div>
            <div className="flex mb-2 w-full">
              <p className="w-1/4 font-bold">Released</p>
              <p className="w-3/4">{movie?.Released}</p>
            </div>
            <div className="flex mb-2 w-full">
              <p className="w-1/4 font-bold">Genres</p>
              <p className="w-3/4">{movie?.Genre}</p>
            </div>
            <div className="flex mb-2 w-full">
              <p className="w-1/4 font-bold">Actors</p>
              <p className="w-3/4">{movie?.Actors}</p>
            </div>
            <div className="flex mb-2 w-full">
              <p className="w-1/4 font-bold">Awards</p>
              <p className="w-3/4">{movie?.Awards}</p>
            </div>
            <div className="flex mb-2 w-full">
              <p className="w-1/4 font-bold">Country</p>
              <p className="w-3/4">{movie?.Country}</p>
            </div>
            <div className="flex mb-2 w-full">
              <p className="w-1/4 font-bold">Language</p>
              <p className="w-3/4">{movie?.Language}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <HashLoader size={150} />
        </div>
      )}
    </div>
  );
}
