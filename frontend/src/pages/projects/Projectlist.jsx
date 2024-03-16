import { useContext } from "react";
import { ProjectsContext } from "../../context/ProjectContext";

export default function Projectlist() {
  const { projects } = useContext(ProjectsContext);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Titel</th>
            <th>Startzeit</th>
            <th>Endzeit</th>
            <th>Aufgaben</th>
            <th>Fortschritt</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects?.map((project, index) => {
            return (
              <tr key={index}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <p className="font-poppins-semibold">{project.title}</p>
                </td>
                <td>
                  <p className="font-poppins-semibold">{project.startDate}</p>
                </td>
                <td>
                  <p className="font-poppins-semibold">{project.endDate}</p>
                </td>
                <th>
                  <progress
                    className="progress progress-success w-56"
                    value={20}
                    max="100"
                  ></progress>
                </th>
                <th>
                  <progress
                    className="progress progress-success w-56"
                    value={20}
                    max="100"
                  ></progress>
                </th>
                <th></th>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Titel</th>
            <th>Startzeit</th>
            <th>Endzeit</th>
            <th>Aufgaben</th>
            <th>Fortschritt</th>
            <th>Status</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
