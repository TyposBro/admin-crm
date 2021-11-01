import Topbar from "./components/topbar/Topbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
function App() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
      </div>
    </>
  );
}

export default App;
