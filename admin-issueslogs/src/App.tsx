import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { json } from "stream/consumers";
import IssueLog from "./issuelogmodel";

function App() {
  const [issueLog, setIssueLog] = useState<IssueLog[]>();
  const [id, setId] = useState(0);
  const [project, setProject] = useState("");
  const [module, setModule] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [responseId, setResponseId] = useState(null);
  const [error, setError] = useState(null);

  const handleIssueInsert = async () => {
    let params = {
      project: project,
      module: module,
      errorDescription: errorDescription,
      type: type,
      state: state,
    };

    try {
      const response = await fetch(
        "https://localhost:7121/api/AdminIssueLogs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );

      const data = await response.json();
      setResponseId(data.id);
      setError(null);
    } catch (e: any) {
      setError(e.Message);
      setResponseId(null);
    }
  };

  function handleUpdate(issue: IssueLog) {
    handleIssueUpdate(issue).then(() => {
      fetchIssues(); // 🔄 refresh data after put
    });
  }

  const handleIssueUpdate = async (issue: IssueLog) => {
    issue.state = "fixed";

    try {
      const response = await fetch(
        `https://localhost:7121/api/AdminIssueLogs/${issue.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(issue),
        }
      );

      let data = null;
      const text = await response.text();

      if (text) {
        data = JSON.parse(text);
        setResponseId(data.id);
      }

      setError(null);
    } catch (e: any) {
      setError(e.message);
      setResponseId(null);
    }
  };

  const fetchIssues = async () => {
    const res = await fetch("https://localhost:7121/api/AdminIssueLogs");
    const data = await res.json();
    setIssueLog(data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <h2>Admin Issues Tracker</h2>
        </p>
        <p>
          <div>
            <form onSubmit={handleIssueInsert}>
              <h5>Insert Issue</h5>
              <input
                type="text"
                id="project"
                placeholder="insert project"
                value={project}
                onChange={(event) => setProject(event.target.value)}
              />
              <input
                type="text"
                id="module"
                placeholder="insert module"
                value={module}
                onChange={(event) => setModule(event.target.value)}
              />
              <input
                type="text"
                id="errorDescription"
                placeholder="insert Description"
                value={errorDescription}
                onChange={(event) => setErrorDescription(event.target.value)}
              />
              <input
                type="text"
                id="type"
                placeholder="insert type"
                value={type}
                onChange={(event) => setType(event.target.value)}
              />
              <input
                type="text"
                id="state"
                placeholder="insert state"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
              <button type="submit">Insert</button>
            </form>
          </div>
        </p>
        <p>
          {issueLog ? (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Module</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {issueLog.map((lg) => (
                    <tr key={lg.id}>
                      <td>{`${lg.project}`}</td>
                      <td>{`${lg.module}`}</td>
                      <td>{`${lg.errorDescription}`}</td>
                      <td>{`${lg.type}`}</td>
                      <td>{`${lg.state}`}</td>
                      <td>
                        <button
                          onClick={() => handleUpdate(lg)}
                          disabled={lg.state ? lg.state == "fixed" : false}
                        >
                          Fixed
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            "cargando..."
          )}
        </p>
      </header>
      <div>
        <label>{`${error}`}</label>
      </div>
    </div>
  );
}

export default App;
