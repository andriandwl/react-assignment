import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Selamat datang</h1>
      <Link to="/login">Silahkan Login</Link>
    </div>
  );
}
