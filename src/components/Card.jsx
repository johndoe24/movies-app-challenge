/* eslint-disable react/prop-types */
import "./Card.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import ModalContent from "./ModalContent.jsx";
import { useSelector, useDispatch } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/FavoriteList";

function Card({ details }) {
  const [showModal, setShowModal] = useState(false);
  const favList = useSelector((state) => state.favoriteShows.value);
  const dispatch = useDispatch();

  const openModal = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setShowModal(true);
  };

  return (
    <figure className="movie">
      <div className="movie_poster">
        <img src={details.image.medium} className="movie_img" />
      </div>
      <div className="movie_content">
        <div className="movie_title">
          <h1 className="heading_primary">{details.name}</h1>
        </div>
        <div className="movie_genre">
          {details.genres
            ? details.genres.map((genre) => (
                <div className="movie_tag" key={genre}>
                  {genre}
                </div>
              ))
            : null}
        </div>
      </div>

      <div className="movie_detail">
        <div className="favorite">
          <div className="card-icons">
            {favList.find((item) => item.id === details.id) ? (
              <AiFillHeart
                onClick={() => {
                  dispatch(
                    removeFavorite({ id: details.id, name: details.name })
                  );
                }}
              />
            ) : (
              <AiOutlineHeart
                onClick={() => {
                  dispatch(addFavorite({ id: details.id, name: details.name }));
                }}
              />
            )}
          </div>
        </div>

        <button className="show_details" onClick={openModal}>
          Show details
        </button>
        {showModal &&
          createPortal(
            <ModalContent
              onClose={() => setShowModal(false)}
              details={details}
            />,
            document.body
          )}
      </div>
    </figure>
  );
}

export default Card;
