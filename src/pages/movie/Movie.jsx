import { Link, useLocation, Redirect } from "react-router-dom";
import { updateMovie } from "../../context/movie/apiCalls";
import { MoviesContext } from "../../context/movie/MovieContext";
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import upload from "../../utils/firestoreUpload";
import "./movie.css";

export default function Movie() {
  const { dispatch } = useContext(MoviesContext);
  const location = useLocation();

  const [movie, setMovie] = useState(location.state.movie);
  const [ready, setReady] = useState(null);
  const [files, setFiles] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChange = ({ target }) => {
    const value = target.value;
    setMovie({ ...movie, [target.name]: value });
    if (files.length === 0) {
      setReady(true);
    }
  };

  const handleFilesChange = (e) => {
    const file = e.target.files[0];
    const label = e.target.id;
    setFiles([...files, { file, label }]);
    setReady(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await updateMovie(movie, dispatch);
    setRedirect(result);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    upload(files, setMovie, setReady);
  };

  // const upload = (items) => {
  //   setReady(false);
  //   console.log(items);
  //   items.forEach((item) => {
  //     const storageRef = ref(storage, `items/${item.file.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, item.file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress = Math.floor(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         console.log("Upload is " + progress + "% done");
  //         setReady(progress === 100);
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //           setMovie((prev) => {
  //             return { ...prev, [item.label]: url };
  //           });
  //         });
  //       }
  //     );
  //   });
  // };

  return redirect ? (
    <Redirect to="/movies" />
  ) : (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newmovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Age limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie title</label>
            <input
              type="text"
              name="title"
              placeholder={movie.title}
              onChange={handleChange}
            />
            <label>Description</label>
            <textarea
              placeholder={movie.desc}
              rows="4"
              cols="30"
              onChange={handleChange}
              name="desc"
            ></textarea>
            <label>Year</label>
            <input
              type="number"
              placeholder={movie.year}
              onChange={handleChange}
              name="year"
            />
            <label>Age limit</label>
            <input
              type="number"
              placeholder={movie.limit}
              onChange={handleChange}
              name="limit"
            />
            <label>Trailer</label>
            <input
              type="file"
              placeholder={movie.trailer}
              onChange={handleFilesChange}
              name="trailer"
            />
            <label>Video</label>
            <input
              type="file"
              placeholder={movie.video}
              onChange={handleFilesChange}
              name="video"
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label htmlFor="img">
                <Publish />
              </label>
              <input
                type="file"
                id="img"
                style={{ display: "none" }}
                onChange={handleFilesChange}
              />
            </div>
            <div className="productUpload">
              <img src={movie.imgSmall} alt="" className="productUploadImg" />
              <label htmlFor="imgSmall">
                <Publish />
              </label>
              <input
                type="file"
                id="imgSmall"
                style={{ display: "none" }}
                onChange={handleFilesChange}
              />
            </div>
            <div className="productUpload">
              <img src={movie.imgTitle} alt="" className="productUploadImg" />
              <label htmlFor="imgTitle">
                <Publish />
              </label>
              <input
                type="file"
                id="imgTitle"
                style={{ display: "none" }}
                onChange={handleFilesChange}
              />
            </div>
            {ready ? (
              <button className="productButton" onClick={handleSubmit}>
                Update
              </button>
            ) : (
              <button
                className="productButton"
                onClick={handleUpload}
                disabled={isDisabled}
              >
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
