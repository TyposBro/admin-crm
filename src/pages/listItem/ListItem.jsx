import { Link, useLocation, useHistory } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { updateMovie } from "../../context/movie/apiCalls";
import { MoviesContext } from "../../context/movie/MovieContext";
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import "./listItem.css";

export default function ListItem() {
  const { dispatch } = useContext(MoviesContext);
  const location = useLocation();
  const history = useHistory();
  const [movie, setMovie] = useState(location.state.movie);
  const [img, setImg] = useState(null);
  const [imgSmall, setImgSmall] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [ready, setReady] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await updateMovie(movie, dispatch);
    console.log(success);
    if (success) {
      history.push("/movies");
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    const uploadArray = [];
    if (img) {
      uploadArray.push({ file: img, label: "img" });
    }
    if (imgSmall) {
      uploadArray.push({ file: imgSmall, label: "imgSmall" });
    }
    if (imgTitle) {
      uploadArray.push({ file: imgTitle, label: "imgTitle" });
    }

    if (trailer) {
      uploadArray.push({ file: trailer, label: "trailer" });
    }

    if (video) {
      uploadArray.push({ file: video, label: "video" });
    }
    upload(uploadArray);
  };

  const upload = (items) => {
    items.forEach((item) => {
      const storageRef = ref(storage, `items/${item.file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is " + progress + "% done");
          setReady(progress === 100);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
          });
        }
      );
    });
  };

  return (
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
              placeholder={movie.title}
              onChange={handleChange}
            />
            <label>Description</label>
            <textarea
              placeholder={movie.desc}
              rows="4"
              cols="30"
              onChange={handleChange}
            ></textarea>
            <label>Year</label>
            <input
              type="number"
              placeholder={movie.year}
              onChange={handleChange}
            />
            <label>Age limit</label>
            <input
              type="number"
              placeholder={movie.limit}
              onChange={handleChange}
            />
            <label>Trailer</label>
            <input
              type="file"
              placeholder={movie.trailer}
              onChange={(e) => setTrailer(e.target.files[0])}
            />
            <label>Video</label>
            <input
              type="file"
              placeholder={movie.video}
              onChange={(e) => setVideo(e.target.files[0])}
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
                onChange={(e) => setImg(e.target.files[0])}
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
                onChange={(e) => setImgSmall(e.target.files[0])}
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
                onChange={(e) => setImgTitle(e.target.files[0])}
              />
            </div>
            {ready ? (
              <button className="productButton" onClick={handleSubmit}>
                Update
              </button>
            ) : (
              <button className="productButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
