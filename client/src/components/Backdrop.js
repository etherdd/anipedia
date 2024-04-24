import { NavLink } from 'react-router-dom';

import './Backdrop.css';

export default function Backdrop({ movie }) {
    const backdropPath = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;

    return (
      <div className="group-block">
        <NavLink to={`/movie/${movie.imdb_id}`}>
          <div className="">
            <img
              src={backdropPath}
              height={"600hv"}
              alt="cell"
              className="img-block"
            />
            <div className="text-block">
              <p className="span-title">{movie.title}</p>
              <p className="span-text">{movie.tagline}</p>
            </div>
          </div>
        </NavLink>
        
      </div>
    );
  }