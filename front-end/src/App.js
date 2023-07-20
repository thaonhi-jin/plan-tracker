import Sidebar from "./components/Sidebar";
import Project from "./components/Project";
import './App.css'
import { useSelector, useDispatch } from "react-redux";
import { setProjectActive } from "./redux/projectSlice";



function App() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const activeProject = projects.find((board) => board.isActive);
  if (!activeProject && projects.length > 0)
    dispatch(setProjectActive({ index: 0 }));

  return (
    <div className="App" style={{ paddingLeft: "250px" }} >
      <Project />
      <Sidebar />
    </div>


  );
}

export default App;
