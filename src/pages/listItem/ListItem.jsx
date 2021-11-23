import { Link, useLocation, useHistory } from "react-router-dom";

import { updateList } from "../../context/list/apiCalls";
import { ListsContext } from "../../context/list/ListContext";
import { useContext, useState } from "react";
import "./listItem.css";

export default function ListItem() {
  const { dispatch } = useContext(ListsContext);
  const location = useLocation();
  const history = useHistory();
  const [list, setList] = useState(location.state.list);

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("[", [e.target.name], "]", ":", value);

    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(list);

    const success = await updateList(list, dispatch);
    console.log(success);
    if (success) {
      history.push("/lists");
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newlist">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder={list.title}
              onChange={handleChange}
            />
          </div>
          <div className="productFormLeft">
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              placeholder={list.genre}
              onChange={handleChange}
            />
          </div>
          <div className="productFormLeft">
            <label>Type</label>
            <input
              type="text"
              name="type"
              placeholder={list.type}
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
