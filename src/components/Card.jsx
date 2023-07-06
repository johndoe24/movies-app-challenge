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

import Button from "./Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Card({ details }) {
  const [showModal, setShowModal] = useState(false);
  const favList = useSelector((state) => state.favoriteShows.value);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcceptDelete = () => {
    dispatch(removeFavorite({ id: details.id, name: details.name }));
    setOpen(false);
  };

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
              <AiFillHeart onClick={handleClickOpen} />
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
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmation Required"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you continue this show will be removed from you list of
              favorite shows. However you can later add it again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAcceptDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </figure>
  );
}

export default Card;
