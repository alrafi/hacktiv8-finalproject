import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Header from "../components/Header";
import Movie from "../components/Movie";
import { HashLoader } from "react-spinners";

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

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState(null);
  const [trendingId, setTrendingId] = useState(0);

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
    setMovies(data.Search);
  };

  const getTrendingMovies = async (imdbId) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const res = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`
    );
    const data = await res.json();
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
        <Header title="FinProH8" />
        <Search />
      </div>
      {trending && movies.length > 0 ? (
        <div className="mt-8 mb-6">
          <p className="text-xl font-bold mb-4">Trending</p>
          {trending && (
            <div className="w-full mb-8 flex h-[480px]">
              <span className="w-[160px] md:w-[400px] h-[480-px] bg-[#000000] rounded-l-2xl" />
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
                return <Movie movie={movie} key={movie.imdbID} />;
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
