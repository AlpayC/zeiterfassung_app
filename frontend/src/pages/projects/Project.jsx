import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectsContext } from "../../context/ProjectContext";
import Kbd from "../../components/ui/kbd/Kbd";

export default function Project() {
  const { id } = useParams();
  const { projects, refetchProjects } = useContext(ProjectsContext);
  const [project, setProject] = useState();
  const [projectTitle, setProjectTitle] = useState();
  const [projectDescription, setProjectDescription] = useState();
  const [inputOnFocus, setInputOnFocus] = useState(false);
  const [inputDescriptionOnFocus, setInputDescriptionOnFocus] = useState(false);

  useEffect(() => {
    if (projects && id) {
      const filteredProject = projects.find((proj) => proj._id === id);
      setProject(filteredProject);
      console.log(project);
      setProjectTitle(filteredProject.title);
      setProjectDescription(filteredProject.description);
      console.log(projectTitle);
    }
  }, [projects, id, project]);

  const kbdList = [
    {
      title: "Speichern",
      key: " ↵ ",
    },
  ];
  return (
    <section className="h-screen w-full">
      {id}
      <p>{project ? project.title : "Loading..."}</p>
      <div className="relative w-full flex flex-col min-h-max pb-12 mb-2">
        <input
          type="text"
          className="input input-ghost bg-base-300 w-full input-lg"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          onFocus={() => setInputOnFocus(true)}
          onBlur={() => setInputOnFocus(false)}
        />
        {inputOnFocus && (
          <Kbd keyList={kbdList} position={"absolute bottom-0 right-0"} />
        )}
      </div>
      <div className="relative w-full flex flex-col min-h-max pb-12 mb-2">
        <textarea
          className="textarea textarea-ghost bg-base-300 w-full input-lg "
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          onFocus={() => setInputDescriptionOnFocus(true)}
          onBlur={() => setInputDescriptionOnFocus(false)}
        />
        {inputDescriptionOnFocus && (
          <Kbd keyList={kbdList} position={"absolute bottom-0 right-0"} />
        )}
      </div>
    </section>
  );
}
