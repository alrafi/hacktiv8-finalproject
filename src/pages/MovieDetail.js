import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import Search from "../components/Search";
import Header from "../components/Header";

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
        <Header title="FinProH8" />
        <Search />
      </div>

      {movie ? (
        <div className="flex flex-col md:flex-row md:items-start">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="rounded-2xl object-cover"
          />
          <div className="md:ml-8">
            <p className="text-2xl md:text-3xl lg:text-4xl uppercase font-light tracking-wide mb-4 mt-6 md:mt-0">
              {movie.Title}
            </p>
            <div className="flex mb-4 space-x-4">
              <div className="flex items-center space-x-1">
                <img src="/star.png" alt="" className="h-3 md:h-4" />
                <p className="text-sm md:text-base">{movie?.imdbRating}</p>
              </div>
              <span>|</span>
              <div className="flex items-center space-x-1">
                <img src="/review.png" alt="" className="h-3 md:h-4" />
                <p className="text-sm md:text-base">
                  {movie?.imdbVotes} Reviews
                </p>
              </div>
              <span>|</span>
              <div className="flex items-center space-x-1">
                <img src="/video.png" alt="" className="h-3 md:h-4" />
                <p className="text-sm md:text-base">{movie?.Runtime}</p>
              </div>
              <span>|</span>
              <div className="flex items-center space-x-1">
                <img src="/calendar.png" alt="" className="h-3 md:h-4" />
                <p className="text-sm md:text-base">{movie?.Year}</p>
              </div>
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
