import React, { useState } from 'react';
import { useFlexLayout } from 'react-table';
import { TextForm } from "./TextForm.js";
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

const allCharsArray = [];
const allQuestionsArray = [];
let moduleNum = -1;

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
  const [question, setQuestion] = useState({
    qText: "",
    aText: "",
    qAudio: "",
    aAudio: "",
    type: "",
    images: [],
    a: []
  })


  // TODO: only get filename...
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

  const handleQuestionChange = (event) => {
    const name = event.target.name;
    setQuestion({
      ...mod,
      [name]: event.target.valueAsNumber,
    });
  };

  const SceneForm = () => {
    return (
      <form c
        lassName="large-form"
        onSubmit={e => {
          e.preventDefault();
        }}
        accept=""
      >
        <label>
          <input
            name="charName"
            type="text"
            value={char.charName}
            onChange={handleCharChange}
            placeholder="Character Name*"
          />
        </label>
      </form>
    )
  }

  // Adds character to master char array [allCharsArray]
  const onCharSubmit = (event) => {
    event.preventDefault();
    let id = allCharsArray.length + 1; // id of next character
    allCharsArray.push({
      id: `${id}`,
      name: `${char.charName}`,
      image: `${char.charFile}`
    })
    console.log(allCharsArray); // delete
    setChar({
      charName: "",
      charFile: "",
    });
  }

  const onQuestionSubmit = (event) => {
    event.preventDefault();
    let id = allCharsArray.length + 1; // id of next character
    allCharsArray.push({
      id: `${id}`,
      name: `${char.charName}`,
      image: `${char.charFile}`
    })
    console.log(allCharsArray); // delete
    setChar({
      charName: "",
      charFile: "",
    });
  }

  const createCharJson = (event) => {
    let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allCharsArray));
  }

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
            <input
              name="charName"
              type="text"
              value={char.charName}
              onChange={handleCharChange}
              placeholder="Character Name*"
            />
            <label id="char_file" for="char_file">Character Image:</label>
            <input
              name="charFile"
              type="file"
              value={char.charFile}
              onChange={handleCharChange}
              accept="image/*"
              id="char_file"
            />
            <div className={"addbar-submit-button"} onClick={onCharSubmit}>
              Add Character
            </div>
          </form>
          <a
            className={"addbar-submit-button"}
            href={"data:'text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allCharsArray)) + "'"}
            download="character.json"
          >
            Download JSON
          </a>
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

      {jsonSwitch === "question" &&
        <form
          className="large-form"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <input type="hidden" value="10000000" required />
          <input
            name="modNum"
            type="number"
            value={mod.modNum}
            onChange={handleModChange}
            placeholder="Module Number*"
          />
          <input
            name="qText"
            type="text"
            value={question.qText}
            onChange={handleQuestionChange}
            placeholder="Question Text*"
          />
          <input
            name="aText"
            type="text"
            value={question.aText}
            onChange={handleQuestionChange}
            placeholder="Explanation Text*"
          />
          <label id="question_audio" for="question_audio">Question Audio:</label>
          <input
            name="qAudio"
            type="file"
            value={question.qAudio}
            onChange={handleQuestionChange}
            accept="audio/*"
            id="question_audio"
          />
          <label id="answer_audio" for="answer_audio">Answer Audio:</label>
          <input
            name="aAudio"
            type="file"
            value={question.aAudio}
            onChange={handleQuestionChange}
            accept="audio/*"
            id="answer_audio"
          />
          <label id="question_type" for="question_type">Question Type:</label>
          <select name="type" id="question_type">
            <option value="multiple_choice">Multiple Choice</option>
            <option value="drag_and_drop">Drag &amp; Drop</option>
          </select>
          <label>Answer Images (in order if drag &amp; drop)</label>
          <input
            name="images"
            type="file"
            multiple
            value={question.images}
            onChange={handleQuestionChange}
            accept="images/*"
          />
          <input
            name="a"
            type="text"
            value={question.a}
            onChange={handleQuestionChange}
            placeholder="Correct Answer(s) (separate by commas)*"
          />
          <div className={"addbar-submit-button"}>
            Next
        </div>
        </form>
      }
    </div>
  );
}