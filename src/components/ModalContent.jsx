/* eslint-disable react/prop-types */
import "./ModalContent.css";
import { useSelector, useDispatch } from "react-redux";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineClockCircle,
} from "react-icons/ai";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/FavoriteList";

export default function ModalContent({ onClose, details }) {
  const favList = useSelector((state) => state.favoriteShows.value);

  const dispatch = useDispatch();
  return (
    <div className="modal">
      <figure className="movie_modal">
        <div className="modal_movie_poster">
          <img src={details.image.medium} className="movie__img" />
        </div>

        <div className="modal_movie_content">
          <h1 className="modal_movie_title">{details.name}</h1>

          <div className="modal_movie_genres">
            {details.genres
              ? details.genres.map((genre) => (
                  <div className="modal_movie_tag " key={genre}>
                    {genre}
                  </div>
                ))
              : null}
          </div>
          <p
            className="modal_movie_description"
            dangerouslySetInnerHTML={{ __html: details.summary }}
          ></p>
          <div className="modal_movie_details">
            {favList.find((item) => item.id === details.id) ? (
              <div className="tooltip modal_movie_detail">
                <AiFillHeart
                  className="icons icons-red"
                  onClick={() => {
                    dispatch(
                      removeFavorite({ id: details.id, name: details.name })
                    );
                  }}
                />
                <span className="tooltiptext">click to dislike</span>
              </div>
            ) : (
              <div className="tooltip modal_movie_detail">
                <AiOutlineHeart
                  className="icons icons-red"
                  onClick={() => {
                    dispatch(
                      addFavorite({ id: details.id, name: details.name })
                    );
                  }}
                />
                <span className="tooltiptext">click to like</span>
              </div>
            )}

            <p className="modal_movie_detail">
              <span className="icons icons-grey">
                <AiOutlineClockCircle />
              </span>
              {details.runtime} min.
            </p>

            {details.externals.imdb ? (
              <p className="modal_movie_detail">
                <a
                  href={"https://www.imdb.com/title/" + details.externals.imdb}
                  target="_blank"
                  rel="noreferrer"
                >
                  IMDB
                </a>
              </p>
            ) : null}
          </div>
        </div>
        <div className="modal_close" onClick={onClose}>
          Close
        </div>
      </figure>
    </div>
  );
}
