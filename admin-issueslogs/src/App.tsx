import React, { useEffect, useState } from "react";
import "./App.css";
import IssueLog from "./issuelogmodel";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

function App() {
  const [issueLog, setIssueLog] = useState<IssueLog[]>();
  const [project, setProject] = useState("");
  const [module, setModule] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [responseId, setResponseId] = useState(null);
  const [error, setError] = useState<string | null>(null);


  //main function to get data list
  const fetchIssues = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7121/api/AdminIssueLogs"
      );
      setIssueLog(response.data);
    } catch (e: any) {
      console.error("No se pudo conectar al backend:", e);
      setError("Error to get the List: " + e.message);
    }
  };

  //function to insert data
  const handleIssueInsert = async () => {
    let params = {
      project: project,
      module: module,
      errorDescription: errorDescription,
      type: type,
      state: state,
    };

    try {
      const response = await axios.post(
        "https://localhost:7121/api/AdminIssueLogs",
        params
      );
      fetchIssues();
      setResponseId(response.data.id);
      setError(null);
    } catch (e: any) {
      setError("Error to Insert: " + e.Message);
      setResponseId(null);
    }
  };

  //function to update data 1.1
  function handleUpdate(issue: IssueLog) {
    handleIssueUpdate(issue).then(() => {
      fetchIssues(); // 🔄 refresh data after put
    });
  }

  //function to update data 1.2
  const handleIssueUpdate = async (issue: IssueLog) => {
    issue.state = "fixed";

    try {
      const response = await axios.put(
        `https://localhost:7121/api/AdminIssueLogs/${issue.id}`,
        issue
      );

      setResponseId(response.data?.id);
      setError(null);

      let data = null;

      setError(null);
    } catch (e: any) {
      setError("Error to Update: " + e.message);
      setResponseId(null);
    }
  };

  //execute main function
  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="container App">
      <header className="App-header">
        <p>
          <h2>Admin Issues Tracker</h2>
        </p>

        <div className="container">
          <div className="row">
            <form onSubmit={handleIssueInsert} className="col-12">
              <h5 className="mb-3">New Issue</h5>
              <div className="row g-2">
                <div className="col-2">
                  <input
                    type="text"
                    id="project"
                    placeholder="Insert project"
                    value={project}
                    className="form-control"
                    onChange={(e) => setProject(e.target.value)}
                  />
                </div>

                <div className="col-2">
                  <input
                    type="text"
                    id="module"
                    placeholder="Insert module"
                    value={module}
                    className="form-control"
                    onChange={(e) => setModule(e.target.value)}
                  />
                </div>

                <div className="col-2">
                  <input
                    type="text"
                    id="errorDescription"
                    placeholder="Insert description"
                    value={errorDescription}
                    className="form-control"
                    onChange={(e) => setErrorDescription(e.target.value)}
                  />
                </div>

                <div className="col-2">
                  <input
                    type="text"
                    id="type"
                    placeholder="Insert type"
                    value={type}
                    className="form-control"
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>

                <div className="col-2">
                  <input
                    type="text"
                    id="state"
                    placeholder="Insert state"
                    value={state}
                    className="form-control"
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary col-2">
                  Insert
                </button>
              </div>
            </form>
          </div>
          <br />
        </div>
        {issueLog ? (
          <div className="container">
            <table className="table table-striped table w-auto m-3 ">
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
                        className="btn btn-primary"
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
          <div style={{ color: "gray", marginTop: "10px" }}>{error}</div>
        )}
      </header>
      <div>
        <label>{`${error}`}</label>
      </div>
    </div>
  );
}

export default App;
