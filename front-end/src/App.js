// import Sidebar from "./components/Sidebar";
// import Project from "./components/Project";
import './App.css'
import { useSelector, useDispatch } from "react-redux";
import { setProjectActive } from "./redux/projectSlice";
// strapi demo
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import StrapiDemo from "./data/StrapiDemo";


function App() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const activeProject = projects.find((board) => board.isActive);
  if (!activeProject && projects.length > 0)
    dispatch(setProjectActive({ index: 0 }));

  // strapi demo
  const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache(),
  });


  return (
    <ApolloProvider client={client}>
      {/* <div className="App" style={{ paddingLeft: "250px" }} >
        <Project />
        <Sidebar />
      </div> */}
      <StrapiDemo />
    </ApolloProvider>

  );
}

export default App;
