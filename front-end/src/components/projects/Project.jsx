import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveTasks } from "../../redux/cacheSlice";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import Tasks from "./Tasks";

function Project() {
  const dispatch = useDispatch();
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const activeProject = infoProjects.find((project) => project.isActive);
  const [loading, setLoading] = useState(true);
  // console.log("here3_1");

  // scroll on the top of page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let url = `http://localhost:1337/api/projects/${activeProject.id}?populate=*`;
      try {
        const res = await axios.get(url);
        dispatch(updateActiveTasks(res.data.data));
        console.log("here3");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [activeProject]);

  if (loading) return <p>Loading...</p>;
  return (
    <div style={{ height: "300px" }}>
      <ProjectCard />
      <Tasks />
    </div>
  );
}

export default Project;
