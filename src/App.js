import Topbar from "./components/topbar/Topbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Home from "./pages/home/Home.jsx";
function App() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Home />
      </div>
    </>
  );
}

export default App;
