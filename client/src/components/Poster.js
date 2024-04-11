import { useNavigate } from "react-router-dom";

import './Poster.css';

export default function Poster({ movie }) {
    let navigate = useNavigate(); 
    
    const routeChange = () => { 
        navigate(`/movie/${movie.imdb_id}`);
    }

    const posterPath = `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`;
    return (
      <div className="group-block">
        <div className="">
          <img
            src={posterPath}
            height={"550hv"}
            alt="cell"
            className="img-block"
            onClick={routeChange}
          />
          <div className="text-block">
            <span className="span-text">{movie.title}</span>
          </div>
        </div>
      </div>
    );
  }