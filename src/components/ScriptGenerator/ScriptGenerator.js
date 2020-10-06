import React, { useState } from 'react';
import { useFlexLayout } from 'react-table';
import { Form } from "./Form.js";
import ReactTooltip from "react-tooltip";

const styles = {
  scriptNav: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  scriptNavButton: {
    fontSize: '17px',
    cursor: 'pointer',
  },
}

export const ScriptGenerator = () => {
  // jsonSwitch = "character", "module", or "questions"
  const [jsonSwitch, setJsonSwitch] = useState("character");
  const [char, setChar] = useState({
    charName: "",
    charFile: "",
  });
  const [mod, setMod] = useState({
    modNum: "",
    numScenes: "",
  });
  const [scenes, setScenes] = useState({
    background: "",
    charList: [],
    script: [],
  })
  const [script, setScript] = useState({
    type: "",
    charId: 0,
    actionType: "",
    dialogue: "",
    dialogueFile: "",
  })

  const handleCharChange = (event) => {
    const name = event.target.name;
    setChar({
      ...char,
      [name]: event.target.value,
    });
  };

  const handleModChange = (event) => {
    const name = event.target.name;
    setMod({
      ...mod,
      [name]: event.target.valueAsNumber,
    });
  };

  const generateCharTooltip = () => {
    //check if fields are missing
    let tooltip = "Missing: ";
    if (char.charName === "" && char.charFile === "")
      return (tooltip += "first name, last name");
    if (char.charName === "") return (tooltip += "last name");
    if (char.charFile === "") return (tooltip += "first name");

    //check if student is valid
    let errorMessage = "fuck";
    return errorMessage;
  };

  return (
    <div>
      <div style={styles.scriptNav}>
        <div style={styles.scriptNavButton} onClick={() => setJsonSwitch("character")}>
          Character
        </div>
        <div style={styles.scriptNavButton} onClick={() => setJsonSwitch("module")}>
          Module
        </div>
        <div style={styles.scriptNavButton} onClick={() => setJsonSwitch("question")}>
          Questions
        </div>
      </div>
      {jsonSwitch === "character" &&
        <div>
          <form
            className="large-form"
            onSubmit={e => {
              e.preventDefault();
            }}
            encType="multipart/form-data"
          >
            <input type="hidden" value="10000000" required />
            <label>
              <input
                name="charName"
                type="text"
                value={char.charName}
                onChange={handleCharChange}
                placeholder="Character Name*"
              />
            </label>
            <label>
              <input
                name="charFile"
                type="file"
                value={char.charFile}
                onChange={handleCharChange}
                accept="image/*"
              />
            </label>
            <div className={"addbar-submit-button"}>
              Add Character
            </div>
          </form>
        </div>
      }
      {jsonSwitch === "module" &&
        <form
          className="large-form"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <label>
            <input
              name="modNum"
              type="number"
              value={mod.modNum}
              onChange={handleModChange}
              placeholder="Module Number*"
            />
          </label>
          <label>
            <input
              name="numScenes"
              type="number"
              value={mod.numScenes}
              onChange={handleModChange}
              placeholder="Number of Scenes*"
            />
          </label>
          <div className={"addbar-submit-button"}>
            Next
          </div>
        </form>
      }
    </div>
  );
}