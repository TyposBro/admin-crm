import { useContext, useState } from "react";
import upload from "../../utils/firestoreUpload";
import { createMovie } from "../../context/movie/apiCalls";
import { MoviesContext } from "../../context/movie/MovieContext";
import "./newMovie.css";
import { useHistory } from "react-router";

export default function NewMovie() {
  const { dispatch } = useContext(MoviesContext);
  const [movie, setMovie] = useState({});
  // const [img, setImg] = useState(null);
  // const [imgSmall, setImgSmall] = useState(null);
  // const [imgTitle, setImgTitle] = useState(null);
  // const [trailer, setTrailer] = useState(null);
  // const [video, setVideo] = useState(null);
  const [ready, setReady] = useState(false);
  const history = useHistory();
  const [media, setMedia] = useState([]);
  const [isDisabled, setDisabled] = useState(false);

  const handleMediaChange = ({ target }) => {
    setMedia([...media, { label: target.name, file: target.files[0] }]);
  };

  const handleChange = ({ target }) => {
    setMovie({ ...movie, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createMovie(movie, dispatch);
    history.push("/movies");
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setDisabled(true);
    upload(media, setMovie, setReady);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img" onChange={handleMediaChange} />
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={handleMediaChange}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail</label>
          <input
            type="file"
            id="imgSmall"
            name="imgSmall"
            onChange={handleMediaChange}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Spider-Man"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea
            rows="4"
            cols="30"
            placeholder="Description"
            name="desc"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Action"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="2:10"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="number"
            placeholder="2021"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="number"
            placeholder="3"
            name="limit"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Type</label>
          <select
            value={movie.isSeries}
            id="isSeries"
            name="isSeries"
            onChange={handleChange}
          >
            <option></option>
            <option value={false}>Movie</option>
            <option value={true}>Series</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" onChange={handleMediaChange} />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name="video" onChange={handleMediaChange} />
        </div>
        {ready ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button
            disabled={isDisabled}
            className="addProductButton"
            onClick={handleUpload}
          >
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
