import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateInfoList, setProjectActive } from './redux/cacheSlice';
import { readData, url } from './data/CRUD'
import Sidebar from "./components/SideBar";
import Project from "./components/projects/Project";
// import Dashboard from "./components/dashboard/Dashboard";


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const activeProject = infoProjects.find((project) => project.isActive);
  console.log("here1")

  useEffect(() => {
    if (!activeProject && infoProjects.length > 0) {
      console.log("set active at 0")
      dispatch(setProjectActive(infoProjects[0].id));
    }
  })


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await readData(url)
        dispatch(updateInfoList(res.data.data))
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchData();
  }, [])

  if (loading) return <p>Loading...</p>
  return (
    <div className="App" style={{ paddingLeft: "250px" }}>
      {activeProject && <Project />}
      <Sidebar />
    </div>
  );
}

export default App;
