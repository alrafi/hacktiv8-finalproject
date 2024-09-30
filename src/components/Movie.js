import React from "react";
import { Link } from "react-router-dom";

export default function Movie({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="" key={movie.imdbID}>
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
}
