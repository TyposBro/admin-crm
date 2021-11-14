import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewProduct from "./pages/newProduct/NewProduct";
import LoginPage from "./pages/login/Login.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/auth/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/(login)">
          {user ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route component={user ? DefaultContainer : LoginContainer} />
      </Switch>
    </Router>
  );
}

const LoginContainer = () => {
  return (
    <Router>
      <Switch>
        <LoginPage />
      </Switch>
    </Router>
  );
};

const DefaultContainer = () => {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/movies">
            <MovieList />
          </Route>
          <Route path="/movie/:movieId">
            <Movie />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
