import React from "react";
import { Link } from "react-router-dom";

export default function Header({ title }) {
  return (
    <Link to="/">
      <h1 className="font-light text-xl md:text-2xl">{title}</h1>
    </Link>
  );
}
