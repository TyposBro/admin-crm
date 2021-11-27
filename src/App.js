import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/auth/AuthContext";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import LoginPage from "./pages/login/Login.jsx";
import Lists from "./pages/lists/Lists";
import ListItem from "./pages/listItem/ListItem";
import NewList from "./pages/newList/NewList";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route>
          {user ? <DefaultContainer user={user} /> : <LoginContainer />}
        </Route>
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

const DefaultContainer = ({ user }) => {
  return (
    <Router>
      <Topbar user={user.info} />
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
          <Route path="/newmovie">
            <NewMovie />
          </Route>
          <Route path="/lists">
            <Lists />
          </Route>
          <Route path="/list/:listId">
            <ListItem />
          </Route>
          <Route path="/newlist">
            <NewList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
