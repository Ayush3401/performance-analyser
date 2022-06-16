import React, { useContext, useState, useRef } from "react";
import { DataContext } from "../contexts/DataContext";
import { NavBar } from "../components/NavBar";
import ThirdPartyTable from '../components/ThirdPartyTable'
import { thirdPartyWeb } from '../utility/third-party-web/entity-finder-api'
import { getHostname, transformData, generateGraph } from '../utility/thirdPartyUtility';
import { Navigate } from 'react-router-dom';
import "../styles/ThirdPartySummary.css"
export default function ThirdPartySummary() {

  //Global data context
  const dataContext = useContext(DataContext);
  let data = dataContext.data.data;
  data = data["third-party-summary"];
  // Checking if user had previously modified the page or not
  // Reference to key field for new URL
  const keyRef = useRef(null);
  // Reference to value field for new Entity
  const valueRef = useRef(null);
  // State to store whether the graph should be shown or not.
  const [displayGraph, setDisplayGraph] = useState();
  // State to store the type of the graph to be generated. Defaults to the main thread time graph.
  const [value, setValue] = useState("mainthread");

  // This function updates the state of the graph to be shown or not
  function passData(data) {
    setDisplayGraph(data);
  }

  // This function is fired whenever a different type of graph is requested and it sets the value of the type of graph requested in the state
  function changeHandler(e) {
    setValue(e.target.value);
  }

  const {entities, scripts, thirdPartyScripts,mapping, domainWiseScripts}=dataContext.data.thirdParty;
  
  const userData = dataContext.data.thirdParty.userInput;

  const [userInput, setUserInput] = useState(userData);
  const [entityArray, setEntityArray] = useState(entities);
  const [scriptsArray, setScriptsArray] = useState(scripts);
  const [thirdPartyScriptsArray, setThirdPartyScriptsArray] = useState(thirdPartyScripts);
  const [mappingArray, setMappingArray] = useState(mapping);
  const [dropdownScripts, setDropdownScripts] = useState(domainWiseScripts);

  function renderTable(newUserInput) {
    const byEntity = new Map();
    const entityWiseScripts = new Map();
    const scripts = scriptsArray;
    const thirdPartyScripts = [];
    scripts.forEach(script => {
      let scriptURL = getHostname(script.url);
      if (!scriptURL) {
        return {};
      }
      let entity = thirdPartyWeb.getEntity(scriptURL);
      if (!entity) {
        entity = newUserInput.find(entity => getHostname(entity.key) === scriptURL);
        if (entity) {
          entity = { name: entity.value };
        }
      }
      let scriptData = script.data;
      const defaultConfig = {
        mainThreadTime: 0,
        blockingTime: 0,
        transferSize: 0
      }
      if (entity) {
        thirdPartyScripts.push(script);
        const currentEntity = byEntity.get(entity.name) || { ...defaultConfig };
        const scriptForEntity = entityWiseScripts.get(entity.name) || [];
        scriptForEntity.push(script.url);
        entityWiseScripts.set(entity.name, scriptForEntity);
        currentEntity.mainThreadTime += scriptData.mainThreadTime;
        currentEntity.blockingTime += scriptData.blockingTime;
        currentEntity.transferSize += scriptData.transferSize;
        byEntity.set(entity.name, currentEntity);
      }
    })
    const entities = Array.from(byEntity.entries());
    const mapping = Array.from(entityWiseScripts.entries());
    setMappingArray(mapping);
    setEntityArray(entities);
    setThirdPartyScriptsArray(thirdPartyScripts);
  }


  function onAdd() {
    const key = keyRef.current.value;
    const value = valueRef.current.value;
    if (!key || !value || userInput.find((ip) => ip.key === key)) {
      alert('Invalid Entry');
      return;
    }
    const newUserInput = [...userInput, { key, value }];
    setUserInput(newUserInput);
    renderTable(newUserInput);
    const hostname = getHostname(key);
    setDropdownScripts(dropdownScripts.filter(script => {
      return script != hostname;
    }))
    keyRef.current.value = "";
    valueRef.current.value = "";
  }


  function onRemove(index) {
    const newUserInput = [...userInput.slice(0, index), ...userInput.slice(index + 1)];
    renderTable(newUserInput);
    const hostname = getHostname(userInput[index].key);
    setUserInput(newUserInput);
    if (!hostname) {
      return;
    }
    setDropdownScripts([...dropdownScripts, hostname]);
  }


  return (
    <>
      {!data && <Navigate to="/" />}
      {data && (
        <div>
          <NavBar />
          {data.details ? (
            <>
              <h1 style={{ textAlign: "center" }}>Third Party Summary</h1>
              <h4 style={{ textAlign: "center" }}> {data.title} </h4>
              <h6 style={{ textAlign: "center" }}>
                {" "}
                Third-party code can significantly impact load performance.
                Limit the number of redundant third-party providers and try to
                load third-party code after your page has primarily finished
                loading.{" "}
              </h6>
              <div className="table-container">
                <ThirdPartyTable
                  id={"third-party-summary"}
                  all={scriptsArray}
                  scripts={thirdPartyScriptsArray}
                  userInput={userInput}
                  entities={entityArray}
                  mapping={mappingArray}
                  domainWiseScripts={dropdownScripts}
                  passData={passData}
                />
                <h1>Add your own entities below:-</h1>
                <table className="entity-input">
                  <thead>
                    <tr>
                      <th>URL</th>
                      <th>ENTITY NAME</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {userInput.map(({ key, value }, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <input
                              type="text"
                              value={key}
                              onChange={(e) => {
                                setUserInput([
                                  ...userInput.slice(0, index),
                                  { key: e.target.value, value },
                                  ...userInput.slice(index + 1),
                                ]);
                              }}
                              spellCheck="false"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => {
                                setUserInput([
                                  ...userInput.slice(0, index),
                                  { key, value: e.target.value },
                                  ...userInput.slice(index + 1),
                                ]);
                              }}
                              spellCheck="false"
                            />
                          </td>
                          <td>
                            <img
                              src="remove.png"
                              alt="Remove"
                              onClick={
                                (e) => {
                                  onRemove(index);
                                }
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}

                    <tr>
                      <td>
                        <select className='entity-select'
                          ref={keyRef}
                          placeholder="Key"
                        >
                          {dropdownScripts.map((script, idx) => {
                            return <option key={idx} value={"https://" + script}>{script}</option>
                          })}
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          ref={valueRef}
                          placeholder="Value"
                          spellCheck="false"
                        />
                      </td>
                      <td>
                        <img src="add.png" alt="Add" onClick={onAdd} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="graph-container">
                {displayGraph && (
                  <>
                    <h1>Graph:-</h1>
                    <select
                      value={value}
                      onChange={changeHandler}
                      style={{ marginTop: "2em" }}
                    >
                      <option value="mainthread">Main Thread Time</option>
                      <option value="blocking">Render Blocking Time</option>
                    </select>
                    {generateGraph(thirdPartyScriptsArray, value)}
                  </>
                )}
              </div>
            </>
          ) : (
            <h2 style={{ textAlign: "center" }}> Nothing to show here... </h2>
          )}
        </div>
      )}
    </>
  );
}
