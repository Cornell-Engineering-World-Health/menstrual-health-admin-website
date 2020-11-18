import React, { useState, useRef } from 'react';
import { useFlexLayout } from 'react-table';
import { TextForm } from "./TextForm.js";
import ReactTooltip from "react-tooltip";

import "./ScriptGenerator.css";

const styles = {
  scriptNav: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  split: {
    display: 'flex',
    flexDirection: 'row',
    flexBasis: '50%',
  },
  label: {
    fontSize: '17px',
    fontWeight: 'normal',
    color: '#757575',
    margin: '0 20px',
  },
  charTableData: {
    border: '1px solid grey',
    padding: '5px 0',
    textAlign: 'center',
    fontSize: '17px',
  },
}

const allCharsArray = [{ id: 1, name: "tam", image: "hello.png" }, { id: 2, name: "sophie", image: "sophie.jpg" }];
const allScenesArray = [];
const framesPerScene = [];
const allQuestionsArray = [
  {
    question_text: "When does puberty occur in girls?",
    explanation_text: "Ages 13-16",
    question_id: 1,
    question_audio: "question1.wav",
    explanation_audio: "answer1.wav",
    type: "multiple_choice",
    image_options: ["what.png", "yo.png"],
    choices: ["Ages 13-16", "Ages 10-12", "Ages 19-21", "Ages 8-10"],
    correct_answer: ["Ages 13-16"]
  },
  {
    question_text: "When does puberty occur in girls?",
    explanation_text: "Ages 13-16",
    question_id: 1,
    question_audio: "question1.wav",
    explanation_audio: "answer1.wav",
    type: "multiple_choice",
    image_options: ["what.png", "yo.png"],
    choices: ["Ages 13-16", "Ages 10-12", "Ages 19-21", "Ages 8-10"],
    correct_answer: ["Ages 13-16"]
  }
];

export const ScriptGenerator = () => {
  const [tabSwitch, setTabSwitch] = useState("character");
  // navSwitch = "character", "module", or "questions"
  const [navSwitch, setNavSwitch] = useState("character");
  // For characters.json
  const [char, setChar] = useState({
    charName: "",
    charFile: "",
  });

  // Module number
  const [modNum, setModNum] = useState("");
  // scenes = scenes, script = frames within a scene
  const [scenes, setScenes] = useState({
    background: "",
    charList: "",
    script: [],
  })
  const [script, setScript] = useState({
    type: "action",
    charId: "1",
    actionType: "",
    dialogue: "",
    dialogueFile: "",
  })
  // For questions.json
  const [question, setQuestion] = useState({
    questionText: "",
    answerText: "",
    questionAudio: "",
    answerAudio: "",
    questionType: "",
    images: [],
    answerChoices: [],
    correctAnswer: []
  })

  // TODO: only get filename...
  const handleCharChange = (event) => {
    const name = event.target.name;
    setChar({
      ...char,
      [name]: event.target.value,
    });
  };

  const handleScenesChange = (event) => {
    const name = event.target.name;
    setScenes({
      ...scenes,
      [name]: event.target.value,
    });
  };

  const handleScriptChange = (event) => {
    const name = event.target.name;
    setScript({
      ...script,
      [name]: event.target.value,
    });
  };

  const handleQuestionChange = (event) => {
    const name = event.target.name;
    setQuestion({
      ...question,
      [name]: event.target.valueAsNumber,
    });
  };

  // Adds character to master char array [allCharsArray]
  const onCharSubmit = (event) => {
    event.preventDefault();
    let id = allCharsArray.length + 1; // id of next character
    allCharsArray.push({
      id: id,
      name: char.charName.charAt(0).toUpperCase() + char.charName.slice(1).toLowerCase(),
      image: `${char.charFile}`
    })
    setChar({
      charName: "",
      charFile: "",
    });
  }

  const onFrameSubmit = (event) => {
    event.preventDefault();
    framesPerScene.push({
      type: `${script.type}`,
      character_id: parseInt(script.charId),
      action_type: `${script.actionType}`,
      dialogue: `${script.dialogue}`,
      dialogue_file: `${script.dialogueFile}`
    })
    console.log(framesPerScene);
    setScript({
      type: "action",
      charId: "1",
      actionType: "",
      dialogue: "",
      dialogueFile: "",
    })
  }

  const onSceneSubmit = (event) => {
    event.preventDefault();
    let charArray = scenes.charList.split(",");
    allScenesArray.push({
      background: `${scenes.background}`,
      characters: charArray.map(elem => parseInt(elem)),
      script: framesPerScene.map(elem => { return (elem) })
    });
    console.log(allScenesArray);
    setScenes({
      background: "",
      charList: "",
      script: [],
    })
  }

  const onModuleSubmit = (event) => {
    event.preventDefault();
    allCharsArray = [{ id: 1, name: "tam", image: "hello.png" }, { id: 2, name: "sophie", image: "sophie.jpg" }];
    allScenesArray = [];
    framesPerScene = [];
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

  const generateCharTooltip = () => {
    //check if fields are missing
    let tooltip = "Missing: ";
    if (char.charName === "" && char.charFile === "")
      return (tooltip += "first name, last name");
    if (char.charName === "") return (tooltip += "last name");
    if (char.charFile === "") return (tooltip += "first name");

    //check if student is valid
    let errorMessage = "um";
    return errorMessage;
  };

  // Adding module.json assets
  const [addModule, setAddModule] = useState("frame");
  const moduleForm = () => {
    // Adding all the frames within one scene
    if (addModule === "frame") {
      return (
        <form
          className="large-form"
          onSubmit={e => {
            e.preventDefault();
          }}
          encType="multipart/form-data"
        >
          <input type="hidden" value="10000000" required />
          <div className="script-form">
            <label id="frame_type" htmlFor="frame_type" style={styles.label}>Action or Dialogue?*</label>
            <select name="type" value={script.type} onChange={handleScriptChange} className="large-form" id="frame_type">
              <option value="action">Action</option>
              <option value="line">Dialogue</option>
            </select>
          </div>
          <div className="script-form">
            <label id="frame_type" htmlFor="frame_type" style={styles.label}>Character*</label>
            <select name="charId" value={script.charId} onChange={handleScriptChange} className="large-form" id="frame_type">
              {allCharsArray.map(elem => {
                return (
                  <option value={elem.id}>{elem.name}</option>
                );
              })}
            </select>
          </div>
          <input
            name="actionType"
            type="text"
            value={script.actionType}
            onChange={handleScriptChange}
            placeholder="Action Type"
            className="large-form script-form"
          />
          <input
            name="dialogue"
            type="text"
            value={script.dialogue}
            onChange={handleScriptChange}
            placeholder="Dialogue"
            className="large-form script-form"
          />
          <label id="dialogue_file" htmlFor="dialogue_file" style={styles.label}>Dialogue Audio</label>
          <input
            name="dialogueFile"
            type="file"
            value={script.dialogueFile}
            onChange={handleScriptChange}
            accept="audio/*"
            id="dialogue_file"
            className="script-form"
          />
          <div style={styles.buttonsContainer}>
            <div style={styles.button} className={"addbar-submit-button"} onClick={onFrameSubmit}>Add Frame to Scene</div>
            <div style={styles.button} className={"addbar-submit-button"} onClick={() => setAddModule("scene")}>All Frames Added!</div>
          </div>
        </form>

      );
    }
    // Adding the scene to the module
    else if (addModule === "scene") {
      return (
        <form
          className="large-form"
          onSubmit={e => {
            e.preventDefault();
          }}
          encType="multipart/form-data"
        >
          <input type="hidden" value="10000000" required />
          <label id="bkgd_file" htmlFor="bkgd_file" style={styles.label}>Background Image*</label>
          <input
            name="background"
            type="file"
            value={scenes.background}
            onChange={handleScenesChange}
            accept="image/*"
            id="bkgd_file"
            className="script-form"
          />
          <input
            name="charList"
            type="text"
            value={scenes.charList}
            onChange={handleScenesChange}
            placeholder="Characters (use IDs) in Scene (separate by commas)*"
            className="large-form script-form"
          />
          <div style={styles.buttonsContainer}>
            <div style={styles.button} className={"addbar-submit-button"} onClick={onSceneSubmit}>Add Scene to Module</div>
            <div style={styles.button} className={"addbar-submit-button"} onClick={() => setAddModule("frame")}>Module has more Scenes</div>
          </div>
          <div style={styles.button} className={"addbar-submit-button"} onClick={() => setAddModule("module")}>All Scenes Added in Module!</div>
        </form>
      )
    }
    // Finalizing json by adding module #
    else {
      return (
        <div>
          <form
            className="large-form"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input
              name="modNum"
              type="number"
              value={modNum}
              onChange={(e) => setModNum(e.target.value)}
              placeholder="Module Number*"
              className="large-form script-form"
            />
          </form>
          <a
            className="button"
            href={"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allScenesArray))}
            download={`module${modNum}.json`}
          >
            Download JSON
          </a>
          <div
            style={styles.button}
            className={"addbar-submit-button"}
            onClick={(event) => {
              onModuleSubmit(event);
              setModNum("");
              setAddModule("frame");
            }}
          >
            Back to the Beginning
          </div>
        </div>
      )
    }
  }

  const populateCharTable = () => {
    return allCharsArray.map((char) => {
      return (
        <tr>
          <td style={styles.charTableData}>{char.name}</td>
          <td style={styles.charTableData}>{char.image}</td>
        </tr>
      );
    })
  }

  const [uploadChar, setUploadChar] = useState("");
  const [editedCharJson, setEditedCharJson] = useState("");
  const uploadCharJson = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = async (e) => {
      let result = e.target.result
      console.log("e.target.result" + result);
      setUploadChar(result);
    };
  };

  const handleCharJsonChange = (e) => {
    setEditedCharJson(e.target.value);
  }

  const generateQuestionCards = () => {
    return allQuestionsArray.map((q) => {
      return (
        <div className="script-generator-form-card">
          <p><span style={{ fontWeight: "bold" }}>Question:</span> {q.question_text}</p>
          <p><span style={{ fontWeight: "bold" }}>Explanation:</span> {q.explanation_text}</p>
          <p><span style={{ fontWeight: "bold" }}>Question Audio:</span> {q.question_audio}</p>
          <p><span style={{ fontWeight: "bold" }}>Answer Audio:</span> {q.explanation_audio}</p>
          <p><span style={{ fontWeight: "bold" }}>Type:</span> {q.type}</p>
          <p>
            <span style={{ fontWeight: "bold" }}>Image Options: </span>
            {q.image_options.map((image) => { return image + ", " })}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Answer Choices:</span>
            {q.choices.map((choice) => { return choice + ", " })}</p>
          <p><span style={{ fontWeight: "bold" }}>Correct/Current Answer:</span> {q.correct_answer}</p>
        </div>
      );
    })
  }

  return (
    <div className="script-generator-container">
      <nav>
        <ul>
          <li onClick={(e) => setTabSwitch("character")}>Character</li>
          <li onClick={(e) => setTabSwitch("module")}>Module</li>
          <li onClick={(e) => setTabSwitch("question")}>Question</li>
        </ul>
      </nav>
      {tabSwitch === "character" &&
        <div /* Character JSON wrapper */ >
          <h1>Generate/Upload Character JSON</h1>
          <div className="script-generator-page-container">
            <section>
              <h2>Add Characters</h2>
              <h3>1. Add characters using the form below. They will appear in the table!</h3>
              <table className="script-generator-table">
                <thead>
                  <tr>
                    <th style={styles.charTableData}>Name</th>
                    <th style={styles.charTableData}>Image File</th>
                  </tr>
                </thead>
                <tbody>
                  {populateCharTable()}
                </tbody>
              </table>
              <form
                onSubmit={e => {
                  e.preventDefault();
                }}
                encType="multipart/form-data"
                className="script-generator-form-card"
              >
                <input type="hidden" value="10000000" required />
                <input
                  name="charName"
                  type="text"
                  value={char.charName}
                  onChange={handleCharChange}
                  placeholder="Character Name*"
                />
                <input
                  name="charFile"
                  type="file"
                  value={char.charFile}
                  onChange={handleCharChange}
                  accept="image/*"
                />
                <button onClick={onCharSubmit}>
                  Add Character
              </button>
              </form>
            </section>
            <section>
              <h3>2. Download resulting JSON</h3>
              <div>
                <button>
                  <a
                    href={"data:'text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allCharsArray)) + "'"}
                    download="character.json"
                  >
                    Download JSON
                </a>
                </button>
              </div>
            </section>
          </div>
          <div className="script-generator-page-container">
            <h2>Upload &amp; Edit Existing JSON</h2>
            <h3>1. Upload the existing JSON file. JSON format only. The JSON will appear in the text area below in string type.</h3>
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                }}
                encType="multipart/form-data"
                className="script-generator-form-card"
              >
                <input
                  name="uploadChar"
                  type="file"
                  accept=".json"
                  onChange={uploadCharJson}
                />
                <button onClick={() => { setEditedCharJson(uploadChar) }}>
                  Upload
                </button>
              </form>
              <h3>2. Edit the JSON text. Click download when done and the JSON will print to the console!</h3>
              <form
                onSubmit={e => {
                  e.preventDefault();
                }}
                encType="multipart/form-data"
                className="script-generator-form-card"
              >
                <input
                  name="editExistingFile"
                  type="textarea"
                  value={editedCharJson}
                  onChange={handleCharJsonChange}
                  rows="30"
                  placeholder="Uploaded JSON will appear here..."
                />
                <button
                  onClick={() => { console.log(JSON.parse(editedCharJson.substring(0, editedCharJson.length - 1))) }}
                >
                  Download Edited JSON
                </button>
              </form>
            </div>
          </div>
        </div>
      }

      {tabSwitch === "question" &&
        <div>
          <h1>Generate/Edit Question JSON</h1>
          <div className="script-generator-page-container">
            <section>
              <h2>Add Questions</h2>
              <h3>1. Add questions using the form below.</h3>
              <form
                className="large-form"
                onSubmit={e => {
                  e.preventDefault();
                }}
                encType="multipart/form-data"
                className="script-generator-form-card"
              >
                <input type="hidden" value="10000000" required />
                <input
                  name="modNum"
                  type="number"
                  value={modNum}
                  onChange={(e) => setModNum(e.target.value)}
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
                <label id="question_audio" htmlFor="question_audio">Question Audio:</label>
                <input
                  name="qAudio"
                  type="file"
                  value={question.qAudio}
                  onChange={handleQuestionChange}
                  accept="audio/*"
                  id="question_audio"
                />
                <label id="answer_audio" htmlFor="answer_audio">Answer Audio:</label>
                <input
                  name="aAudio"
                  type="file"
                  value={question.aAudio}
                  onChange={handleQuestionChange}
                  accept="audio/*"
                  id="answer_audio"
                />
                <div className="script-form">
                  <label id="question_type" htmlFor="question_type" style={styles.label}>Question Type:</label>
                  <select name="type" id="question_type">
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="drag_and_drop">Drag &amp; Drop</option>
                  </select>
                </div>
                <label style={styles.label}>Answer Images (in order if drag &amp; drop)</label>
                <input
                  name="images"
                  type="file"
                  multiple
                  value={question.images}
                  onChange={handleQuestionChange}
                  accept="images/*"
                  className="script-form"
                />
                <input
                  name="a"
                  type="text"
                  value={question.a}
                  onChange={handleQuestionChange}
                  placeholder="Correct Answer(s) (separate by commas)*"
                  className="large-form script-form"
                />
                <div style={styles.button} className={"addbar-submit-button"}>
                  {script.charId ? "Add Frame" : "Submit"}
                </div>
              </form>
            </section>
            <section>
              <h3>2. Download resulting JSON.</h3>
            </section>
            <section>
              <h3>3. View the Q's you have added by clicking "Show All".</h3>
              {generateQuestionCards()}
            </section>
          </div>
        </div>
      }







      <div>
        <div style={styles.split}>
          <div className="script-generator-container">
            <div className="registration-add-student-title">Generate JSON Script</div>
            <div style={styles.scriptNav}>

              <div
                className="script-generator-nav-button"
                style={navSwitch === "module" ? { textDecoration: 'underline' } : { textDecoration: 'none' }}
                onClick={() => setNavSwitch("module")}
              >
                Module
        </div>
              <div
                className="script-generator-nav-button"
                style={navSwitch === "question" ? { textDecoration: 'underline' } : { textDecoration: 'none' }}
                onClick={() => setNavSwitch("question")}>
                Questions
        </div>
            </div>
            {navSwitch === "module" &&
              <div>
                {moduleForm()}
              </div>
            }
            {navSwitch === "question" &&
              <form
                className="large-form"
                onSubmit={e => {
                  e.preventDefault();
                }}
                encType="multipart/form-data"

              >
                <input type="hidden" value="10000000" required />
                <input
                  name="modNum"
                  type="number"
                  value={modNum}
                  onChange={(e) => setModNum(e.target.value)}
                  placeholder="Module Number*"
                />
                <input
                  name="qText"
                  type="text"
                  value={question.qText}
                  onChange={handleQuestionChange}
                  placeholder="Question Text*"
                  className="large-form script-form"
                />
                <input
                  name="aText"
                  type="text"
                  value={question.aText}
                  onChange={handleQuestionChange}
                  placeholder="Explanation Text*"
                  className="large-form script-form"
                />
                <div className="script-form">
                  <label id="question_audio" htmlFor="question_audio" style={styles.label}>Question Audio:</label>
                  <input
                    name="qAudio"
                    type="file"
                    value={question.qAudio}
                    onChange={handleQuestionChange}
                    accept="audio/*"
                    id="question_audio"
                  />
                </div>
                <label id="answer_audio" htmlFor="answer_audio" style={styles.label}>Answer Audio:</label>
                <input
                  name="aAudio"
                  type="file"
                  value={question.aAudio}
                  onChange={handleQuestionChange}
                  accept="audio/*"
                  id="answer_audio"
                  className="script-form"
                />
                <div className="script-form">
                  <label id="question_type" htmlFor="question_type" style={styles.label}>Question Type:</label>
                  <select name="type" id="question_type">
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="drag_and_drop">Drag &amp; Drop</option>
                  </select>
                </div>
                <label style={styles.label}>Answer Images (in order if drag &amp; drop)</label>
                <input
                  name="images"
                  type="file"
                  multiple
                  value={question.images}
                  onChange={handleQuestionChange}
                  accept="images/*"
                  className="script-form"
                />
                <input
                  name="a"
                  type="text"
                  value={question.a}
                  onChange={handleQuestionChange}
                  placeholder="Correct Answer(s) (separate by commas)*"
                  className="large-form script-form"
                />
                <div style={styles.button} className={"addbar-submit-button"}>
                  {script.charId ? "Add Frame" : "Submit"}
                </div>
              </form>
            }
          </div>

        </div>
      </div>
    </div >
  );
}