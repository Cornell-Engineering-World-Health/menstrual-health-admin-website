import React, { useState, useRef } from 'react';
import { useFlexLayout } from 'react-table';
import { TextForm } from "./TextForm.js";
import ReactTooltip from "react-tooltip";

import "./ScriptGenerator.css";
import userEvent from '@testing-library/user-event';

const styles = {
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
  // tabSwitch = "character", "module", or "questions"
  const [tabSwitch, setTabSwitch] = useState("character");

  // Characters.json state variables
  const [char, setChar] = useState({
    charName: "",
    charFile: "",
  });

  // Characters.json methods
  const handleCharChange = (event) => {
    const name = event.target.name;
    setChar({
      ...char,
      [name]: event.target.value,
    });
  };

  // Adds character to master char array (allCharsArray[])
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

  // Populate table with characters in the master char array, if any
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

  // Upload & edit existing Character.json state variables
  const [uploadChar, setUploadChar] = useState(""); // Stores the uploaded file
  const [editedCharJson, setEditedCharJson] = useState(""); // Stores edits to the file

  // Upload & edit Character.json methods
  // Read uploaded JSON into a textarea field editedCharJson
  const handleCharJsonSubmit = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = async (e) => {
      let result = e.target.result
      setUploadChar(result);
    };
  };

  // Record edits to the file
  const handleCharJsonChange = (e) => {
    setEditedCharJson(e.target.value);
  }


  // Questions.json state variables
  const [questionType, setQuestionType] = useState("multiple_choice"); // Question type
  const [question, setQuestion] = useState({
    questionText: "",
    explanationText: "",
    questionAudio: "",
    explanationAudio: "",
    imageOptions: [], // * ONLY for MC
    answerChoices: "", // * ONLY for MC
    correctAnswer: "", // * ONLY for MC
    orderedImages: [] // * ONLY for D&D
    // Note: D&D also has current_answer[] field, initiated to null
  })

  // Questions.json methods
  const handleQuestionChange = (event) => {
    const name = event.target.name;
    setQuestion({
      ...question,
      [name]: event.target.value,
    });
  };

  // Add question to master questions array (allQuestionsArray[])
  const onQuestionSubmit = (event) => {
    event.preventDefault();
    let id = allQuestionsArray.length + 1; // id of next character
    if (questionType === "multiple_choice") {
      allQuestionsArray.push({
        question_text: `${question.questionText}`,
        explanation_text: `${question.explanationText}`,
        question_id: id,
        question_audio: `${question.questionAudio}`,
        explanation_audio: `${question.explanationAudio}`,
        type: `${questionType}`,
        image_options: question.imageOptions,
        choices: question.answerChoices.split(","),
        correct_answer: question.correctAnswer.split(","),
      })
    } else {
      allQuestionsArray.push({
        question_text: `${question.questionText}`,
        explanation_text: `${question.explanationText}`,
        question_id: id,
        question_audio: `${question.questionAudio}`,
        explanation_audio: `${question.explanationAudio}`,
        type: `${questionType}`,
        ordered_image_ids: question.orderedImages,
        current_answer: [],
      })
    }
    setQuestion({
      questionText: "",
      explanationText: "",
      questionAudio: "",
      explanationAudio: "",
      imageOptions: [],
      answerChoices: "",
      correctAnswer: "",
      orderedImages: []
    });
  }



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
            <label id="frame_type" htmlFor="frame_type">Action or Dialogue?*</label>
            <select name="type" value={script.type} onChange={handleScriptChange} className="large-form" id="frame_type">
              <option value="action">Action</option>
              <option value="line">Dialogue</option>
            </select>
          </div>
          <div className="script-form">
            <label id="frame_type" htmlFor="frame_type">Character*</label>
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
          <label id="dialogue_file" htmlFor="dialogue_file">Dialogue Audio</label>
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
          <label id="bkgd_file" htmlFor="bkgd_file">Background Image*</label>
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
                <label id="char_file" htmlFor="char_file">Character image:</label>
                <input
                  name="charFile"
                  type="file"
                  // For file inputs, make input uncontrolled in order to extract filename w/o errors
                  onChange={e => { setChar({ ...char, charFile: e.target.files[0].name }) }}
                  accept="image/*"
                  id="char_file"
                />
                <button onClick={onCharSubmit}>
                  Add Character
                </button>
              </form>
            </section>
            <section>
              <h3>2. Download resulting JSON</h3>
              <button>
                <a
                  href={"data:'text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allCharsArray))}
                  download="character.json"
                >
                  Download JSON
                </a>
              </button>
            </section>
          </div>
          <div className="script-generator-page-container">
            <h2>Upload &amp; Edit Existing JSON</h2>
            <h3>1. Upload the existing JSON file. JSON format only. The JSON will appear in the text area below in string type.</h3>
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
                onChange={handleCharJsonSubmit}
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
                onClick={e => {
                  e.preventDefault();
                  try {
                    let newJson = JSON.parse(editedCharJson);
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                Download Edited JSON
                </button>
            </form>
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
                  name="questionText"
                  type="text"
                  value={question.questionText}
                  onChange={handleQuestionChange}
                  placeholder="Question Text*"
                />
                <input
                  name="explanationText"
                  type="text"
                  value={question.explanationText}
                  onChange={handleQuestionChange}
                  placeholder="Explanation Text*"
                />
                <label id="question_audio" htmlFor="question_audio">Question Audio:</label>
                <input
                  name="questionAudio"
                  type="file"
                  onChange={e => { setQuestion({ ...question, questionAudio: e.target.files[0].name }) }}
                  accept="audio/*"
                  id="question_audio"
                />
                <label id="answer_audio" htmlFor="answer_audio">Answer Audio:</label>
                <input
                  name="explanationAudio"
                  type="file"
                  onChange={e => { setQuestion({ ...question, explanationAudio: e.target.files[0].name }) }}
                  accept="audio/*"
                  id="answer_audio"
                />
                <ul>
                  <li onClick={() => { setQuestionType("multiple_choice") }}>Multiple Choice</li>
                  <li onClick={() => { setQuestionType("drag_and_drop") }}>Drag &amp; Drop</li>
                </ul>
                {questionType === "multiple_choice" &&
                  <div>
                    <label id="image_options" htmlFor="image_options">Image options:</label>
                    <input
                      name="imageOptions"
                      type="file"
                      multiple
                      onChange={e => {
                        let fileNames = []; // Stores filenames of all images selected
                        for (let i = 0; i < e.target.files.length; i++) {
                          fileNames.push(e.target.files[i].name);
                        }
                        setQuestion({ ...question, imageOptions: fileNames });
                      }}
                      accept="images/*"
                      id="image_options"
                    />
                    <input
                      name="answerChoices"
                      type="text"
                      value={question.answerChoices}
                      onChange={handleQuestionChange}
                      placeholder="Answer choices (separate by commas, no spaces)*"
                    />
                    <input
                      name="correctAnswer"
                      type="text"
                      value={question.correctAnswer}
                      onChange={handleQuestionChange}
                      placeholder="Correct answer(s) (separate by commas, no spaces)*"
                    />
                  </div>
                }
                {questionType === "drag_and_drop" &&
                  <div>
                    <label id="ordered_images" htmlFor="ordered_images">Ordered Images:</label>
                    <input
                      name="orderedImages"
                      type="file"
                      multiple
                      onChange={e => {
                        let fileNames = [];
                        for (let i = 0; i < e.target.files.length; i++) {
                          fileNames.push(e.target.files[i].name);
                        }
                        setQuestion({ ...question, orderedImages: fileNames, });
                      }}
                      accept="images/*"
                      id="ordered_images"
                    />
                  </div>
                }
                <button onClick={onQuestionSubmit}>Submit Question</button>
              </form>
            </section>
            <section>
              <h3>2. Download resulting JSON.</h3>
              <button>
                <a
                  href={"data:'text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allQuestionsArray))}
                  download={`questions${modNum}.json`}
                >
                  Download JSON
                </a>
              </button>
            </section>
            <section>
              <h3>3. View the Q's you have added by clicking "View Questions". An array of all questions will print out to the console.</h3>
              <button onClick={() => { console.log(allQuestionsArray) }}>View Questions</button>
            </section>
          </div>
          <div className="script-generator-page-container">
            <h2>Upload &amp; Edit Existing JSON</h2>
            <h3>1. Upload the existing JSON file. JSON format only. The JSON will appear in the text area below in string type.</h3>
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
                onChange={handleCharJsonSubmit}
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
                onClick={() => { console.log(JSON.parse(editedCharJson.substring(0, editedCharJson.length))) }}
              >
                Download Edited JSON
                </button>
            </form>
          </div>
        </div>
      }
    </div>

  );
}