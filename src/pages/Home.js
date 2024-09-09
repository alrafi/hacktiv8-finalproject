import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { HashLoader } from "react-spinners";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState(null);
  const [trendingId, setTrendingId] = useState(0);

  const trendingIds = [
    {
      id: "tt1630029",
      url: "https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vREc0547VKqEv.jpg",
    },
    {
      id: "tt1160419",
      url: "https://image.tmdb.org/t/p/original/eeijXm3553xvuFbkPFkDG6CLCbQ.jpg",
    },
    {
      id: "tt15398776",
      url: "http://image.tmdb.org/t/p/original/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
    },
    {
      id: "tt4154796",
      url: "https://image.tmdb.org/t/p/original/h9q0ozwMWy7CK5U7FSZsMVtbsCQ.jpg",
    },
  ];

  useEffect(() => {
    getMovies();
    const _id = Math.floor(Math.random() * trendingIds.length);
    setTrendingId(_id);
    getTrendingMovies(trendingIds[_id].id);
  }, []);

  const getMovies = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const res = await fetch(`https://www.omdbapi.com/?s=man&apikey=${apiKey}`);
    const data = await res.json();
    console.log("data", data);
    setMovies(data.Search);
  };

  const getTrendingMovies = async (imdbId) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const res = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`
    );
    const data = await res.json();
    console.log("trending", data);
    // setMovies(data.Search);
    setTrending(data);
  };

  const background = (backdrop) => {
    return {
      backgroundImage: `linear-gradient(to right, #000, transparent 50%, transparent), url(${backdrop})`,
    };
  };

  return (
    <div className="p-4 w-full">
      <div className=" w-full flex justify-between items-center">
        <Link to="/">
          <h1 className="font-light text-xl md:text-2xl">H8 Movies</h1>
        </Link>
        <SearchForm />
      </div>
      {trending && movies.length > 0 ? (
        <div className="mt-8">
          <p className="text-xl font-bold mb-4">Trending</p>
          {trending && (
            <div className="w-full mb-8 flex h-[480px]">
              <span className="w-[400px] h-[480-px] bg-[#000000] rounded-l-2xl" />
              <div
                className="featured-wrapper rounded-r-2xl"
                style={background(trendingIds[trendingId].url)}
              ></div>
              <div className="desc text-white p-6 md:p-12">
                <Link to={`/movie/${trending.imdbID}`} className="">
                  <h1 className="text-2xl md:text-3xl font-bold mb-6">
                    {trending.Title}
                  </h1>
                </Link>
                <div className="flex mb-6 space-x-8 text-sm md:text-base">
                  <h5>{`${trending.imdbRating} Rating`}</h5>
                  <h5>{`${trending.imdbVotes} Reviews`}</h5>
                  <h5 className="">{trending.Year}</h5>
                </div>
                <p className="font-light text-sm md:text-base">
                  {trending.Plot}
                </p>
              </div>
            </div>
          )}
          <p className="text-xl font-bold mb-4">Popular Movies</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {movies?.length > 0 &&
              movies.map((movie) => {
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
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-96">
          <HashLoader size={150} />
        </div>
      )}
    </div>
  );
}
