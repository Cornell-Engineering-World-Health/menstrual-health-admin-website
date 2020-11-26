import React, { useState } from 'react';

import "./ScriptGenerator.css";

const styles = {
  charTableData: {
    border: '1px solid grey',
    padding: '5px 0',
    textAlign: 'center',
    fontSize: '17px',
  },
  errorMessage: {
    fontWeight: 'bold',
    backgroundColor: '#ffcfd6',
    padding: '1%'
  },
  scriptInput: {
    display: 'block',
    margin: '2% 0',
    width: '100%',
  }
}

let allCharsArray = [];
let moduleArray = [];
let allScenesArray = [];
let allQuestionsArray = [];

export const ScriptGenerator = () => {
  // Error messages
  const [error, setError] = useState("");
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


  // Questions.json state variables
  const [questionType, setQuestionType] = useState("multiple_choice"); // Question type
  const [showQuestions, setShowQuestions] = useState(false); // View all Q's added or not
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
    allQuestionsArray = [];
  }

  // MODULE JSON CONST & METHODS
  // Module number
  const [modNum, setModNum] = useState("");
  const [modTitle, setModTitle] = useState("");
  // scenes = scenes, script split into "parts"
  const [scenes, setScenes] = useState({
    background: "",
    charList: "",
  })
  const [showScenes, setShowScenes] = useState(false); // Toggle show all scenes 
  const [chooseScene, setChooseScene] = useState(""); // Select which scene to add a script to  in form
  const [scriptPartType, setScriptPartType] = useState("action"); // Action or dialogue?
  const [script, setScript] = useState({
    charId: "",
    actionType: "",
    dialogue: "",
    dialogueFile: "",
    dialoguePopOutImage: "",
  })
  const [popOutImage, setPopOutImage] = useState(false); // If there is a pop-out image accompanying dialogue
  const [scriptError, setScriptError] = useState(""); // Only occurs if user tries to add a script without adding a scene first

  // Module.json input handleChange method
  const handleScriptChange = (event) => {
    const name = event.target.name;
    setScript({
      ...script,
      [name]: event.target.value,
    });
  };

  // When user submits a scene (no script)
  const onSceneSubmit = (event) => {
    event.preventDefault();
    setScriptError("");
    let charArray = scenes.charList.split(",");
    allScenesArray.push({
      background: `${scenes.background}`,
      characters: charArray.map(elem => parseInt(elem)),
      script: [],
    });
    setScenes({
      background: "",
      charList: "",
    });
  }

  // When user submits a script of a scene
  const onScriptPartSubmit = (event) => {
    event.preventDefault();
    if (allScenesArray.length === 0) {
      setScriptError("Error: Add a scene before adding a script!");
      return false;
    } else if (chooseScene === "") {
      setScriptError("Error: Please select a scene.");
      return false;
    }
    // Adds script part to its respective scene in master scene array (allScenesArray[])
    let scriptPart = allScenesArray[chooseScene].script;
    if (scriptPartType === "action") {
      scriptPart.push({
        type: "action",
        character_id: script.charId,
        action_type: `${script.actionType}`
      })
    } else {
      if (popOutImage) {
        scriptPart.push({
          type: "line",
          character_id: script.charId,
          dialogue: `${script.dialogue}`,
          dialogue_file: `${script.dialogueFile}`,
          pop_out_image: `${script.dialoguePopOutImage}`
        })
      } else {
        scriptPart.push({
          type: "line",
          character_id: script.charId,
          dialogue: `${script.dialogue}`,
          dialogue_file: `${script.dialogueFile}`
        })
      }
    }
    setScript({
      charId: "",
      actionType: "",
      dialogue: "",
      dialogueFile: "",
      dialoguePopOutImage: "",
    })
  }

  // Downloads module.json
  const onModuleSubmit = (event) => {
    event.preventDefault();
    moduleArray.push({
      id: modNum,
      title: `${modTitle}`,
      assessment_path: "questions" + modNum + ".json",
      scenes: allScenesArray
    });
    const link = document.createElement('a');
    link.download = `module${modNum}.json`;
    link.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(moduleArray, null, 2));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    moduleArray = [];
    allScenesArray = [];
  }


  // Upload & edit existing JSON files
  const [uploadJson, setUploadJson] = useState(""); // Stores the uploaded file
  const [editedJson, setEditedJson] = useState(""); // Stores edits to the file

  // Upload & edit Character.json methods
  // Read uploaded JSON into a textarea field editedJson
  const handleUploadJsonSubmit = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = async (e) => {
      let result = e.target.result
      setUploadJson(result);
    };
  };

  // Record edits to the file
  const handleEditJsonChange = (e) => {
    setEditedJson(e.target.value);
    try {
      JSON.parse(e.target.value);
      setError("");
    } catch (e) {
      setError("Syntax error, please check parsing, like commas and brackets");
    }
  }

  const handleEditJsonSubmit = (e) => {
    setError("");
    try {
      let jsonFile = JSON.parse(editedJson);
      const link = document.createElement('a');
      link.download = "character.json";
      link.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonFile, null, 2));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      setError("Syntax error, please check parsing, like commas and brackets");
    }
  }

  return (

    <div className="script-generator-container">
      <nav>
        <ul>
          <li onClick={(e) => setTabSwitch("character")} className={tabSwitch === "character" ? "li-selected" : ""}>Character</li>
          <li onClick={(e) => setTabSwitch("module")} className={tabSwitch === "module" ? "li-selected" : ""}>Module</li>
          <li onClick={(e) => setTabSwitch("question")} className={tabSwitch === "question" ? "li-selected" : ""}>Question</li>
        </ul>
      </nav>
      <p>* Note: File inputs do not reset when you press "submit",
      but consider it as resetted and ignore the previous input.
      If you reuse a file input, make sure you select a new file
      even if it's the same one as before.</p>
      {tabSwitch === "character" &&
        <div /* Character JSON wrapper */ >
          <h1>Generate/Upload Character JSON</h1>
          <div className="script-generator-page-container">
            <section>
              <h2>Add Characters</h2>
              <h3>1. Add characters using the form below. They will appear in the table below!</h3>
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
                  style={styles.scriptInput}
                />
                <label id="char_file" htmlFor="char_file">Character image:</label>
                <input
                  name="charFile"
                  type="file"
                  // For file inputs, make input uncontrolled in order to extract filename w/o errors
                  onChange={e => { setChar({ ...char, charFile: e.target.files[0].name }) }}
                  accept="image/*"
                  id="char_file"
                  style={styles.scriptInput}
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
                  href={"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allCharsArray, null, 2))}
                  download="character.json"
                >
                  Download JSON
                </a>
              </button>
            </section>
          </div>
          <div className="script-generator-page-container">
            <h2>Upload &amp; Edit Existing JSON</h2>
            <h3>1. Upload the existing JSON file. JSON format only. The JSON will appear in the text area in Step #2 in string type.</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
              }}
              encType="multipart/form-data"
              className="script-generator-form-card"
            >
              <input
                name="uploadJson"
                type="file"
                accept=".json"
                onChange={handleUploadJsonSubmit}
                style={styles.scriptInput}
              />
              <button onClick={() => { setEditedJson(uploadJson); setError("") }}>
                Upload
              </button>
            </form>
            <h3>2. Edit the JSON text. Click download when done.
            You will get an error if the JSON fails to parse,
              otherwise the file should download!</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
              }}
              encType="multipart/form-data"
              className="script-generator-form-card"
            >
              <textarea
                name="editExistingFile"
                value={editedJson}
                onChange={handleEditJsonChange}
                rows="30"
                style={{ width: '100%' }}
                placeholder="Uploaded JSON will appear here..."
              />
              <p className="errorMessage" style={error ? { ...styles.errorMessage, display: 'show' } : { display: 'hidden' }}>{error ? error : null}</p>
              <button
                onClick={handleEditJsonSubmit}
                class={!error ? "" : "button-not-enabled"}
              >
                Download Edited JSON
              </button>
            </form>
          </div>
        </div>
      }

      {tabSwitch === "module" &&
        <div>
          <h1>Generate/Edit Module JSON</h1>
          <div className="script-generator-page-container">
            <h2>Add Module</h2>
            <section>
              <h3>1. Fill in module background information. No submit button :D</h3>
              <form
                className="large-form"
                onSubmit={e => {
                  e.preventDefault();
                }}
                encType="multipart/form-data"
                className="script-generator-form-card"
              >
                <input
                  name="modNum"
                  type="number"
                  value={modNum}
                  onChange={(e) => setModNum(e.target.value)}
                  placeholder="Module Number*"
                  style={styles.scriptInput}
                />
                <input
                  name="modTitle"
                  type="text"
                  value={modTitle}
                  onChange={(e) => { setModTitle(e.target.value) }}
                  placeholder="Title*"
                  style={styles.scriptInput}
                />
              </form>
            </section>
            <section>
              <h3>2. Add scene information. The scene and its script
              are split into steps 2 &amp; 3. You can choose to either
              add all the scenes at once, or add a scene and its script
                in chronological order.</h3>
              <form
                className="large-form"
                onSubmit={e => {
                  e.preventDefault();
                }}
                encType="multipart/form-data"
                className="script-generator-form-card"
              >
                <input type="hidden" value="10000000" required />
                <label id="scene_part_background" htmlFor="scene_part_background">Scene background:</label>
                <input
                  name="background"
                  type="file"
                  // For file inputs, make input uncontrolled in order to extract filename w/o errors
                  onChange={e => { setScenes({ ...scenes, background: e.target.files[0].name }) }}
                  accept="image/*"
                  id="scene_part_background"
                  style={styles.scriptInput}
                />
                <input
                  name="charList"
                  type="text"
                  value={scenes.charList}
                  onChange={e => { setScenes({ ...scenes, charList: e.target.value }) }}
                  placeholder="Character(s) ID NUMBER according to characters.json involved in scene (separate by commas, no spaces)*"
                  style={styles.scriptInput}
                />
                <button onClick={onSceneSubmit}>Submit Scene</button>
              </form>
            </section>
            <section>
              <h3>3. Add the script to a scene by splitting it into "parts" using the form below.
              Make sure to select which scene's script you are contributing to.
                View all your scenes by clicking "View Scenes".</h3>
              <button onClick={() => { setShowScenes(!showScenes) }}>{showScenes ? "Hide All Scenes" : "View All Scenes"}</button>
              <div className="view-json-container"><pre>{showScenes ? JSON.stringify(allScenesArray, null, 2) : null}</pre></div>
              <form
                className="large-form"
                onSubmit={e => {
                  e.preventDefault();
                }}
                encType="multipart/form-data"
                className="script-generator-form-card"
              >
                <input type="hidden" value="10000000" required />
                <label htmlFor="choose_scene">Scene: </label>
                <select
                  name="chooseScene"
                  id="choose_scene"
                  defaultValue=""
                  value={chooseScene}
                  onChange={e => { setChooseScene(e.target.value) }}
                  required
                >
                  <option value="" disabled hidden>Choose here</option>
                  {allScenesArray.map((scene, index) => {
                    return (
                      <option value={index}>Scene {index + 1} </option>
                    );
                  })}
                </select>
                <ul>
                  <li onClick={() => { setScriptPartType("action") }} className={scriptPartType === "action" ? "li-selected" : ""}>Action</li>
                  <li onClick={() => { setScriptPartType("dialogue") }} className={scriptPartType === "dialogue" ? "li-selected" : ""}>Dialogue</li>
                </ul>
                <input
                  name="charId"
                  value={script.charId}
                  type="number"
                  onChange={e => { setScript({ ...script, charId: e.target.valueAsNumber }) }}
                  placeholder="Character ID (numerical)*"
                  style={styles.scriptInput}
                />
                {scriptPartType === "action" &&
                  <div>
                    <input
                      name="actionType"
                      type="text"
                      value={script.actionType}
                      onChange={handleScriptChange}
                      placeholder="Action Type*"
                      style={styles.scriptInput}
                    />
                  </div>
                }
                {scriptPartType === "dialogue" &&
                  <div>
                    <input
                      name="dialogue"
                      type="text"
                      value={script.dialogue}
                      onChange={handleScriptChange}
                      placeholder="Dialogue*"
                      style={styles.scriptInput}
                    />
                    <label id="script_part_dialogue" htmlFor="cript_part_dialogue">Dialogue Audio File:</label>
                    <input
                      name="dialogueFile"
                      type="file"
                      // For file inputs, make input uncontrolled in order to extract filename w/o errors
                      onChange={e => { setScript({ ...script, dialogueFile: e.target.files[0].name }) }}
                      accept="audio/*"
                      id="script_part_background"
                      style={styles.scriptInput}
                    />
                    <ul>
                      <li onClick={() => { setPopOutImage(false) }} className={!popOutImage ? "li-selected" : ""}>Doesn't have Pop-out Image</li>
                      <li onClick={() => { setPopOutImage(true) }} className={popOutImage ? "li-selected" : ""}>Has Pop-out Image</li>
                    </ul>
                    {popOutImage &&
                      <div>
                        <label id="pop_out_image" htmlFor="pop_out_image">Pop-out Image:</label>
                        <input
                          name="dialoguePopOutImage"
                          type="file"
                          // For file inputs, make input uncontrolled in order to extract filename w/o errors
                          onChange={e => { setScript({ ...script, dialoguePopOutImage: e.target.files[0].name }) }}
                          accept="image/*"
                          id="pop_out_image"
                          style={styles.scriptInput}
                        />
                      </div>
                    }
                    {popOutImage === false &&
                      <div>
                      </div>
                    }
                  </div>
                }
                <p className="errorMessage" style={scriptError ? { ...styles.errorMessage, display: 'show' } : { display: 'hidden' }}>{scriptError ? scriptError : ""}</p>
                <button
                  onClick={onScriptPartSubmit}
                  class={!scriptError ? "" : "button-not-enabled"}
                >
                  Add Part to Script
                </button>
              </form>
            </section>
            <section>
              <h3>4. Repeat steps #3 &amp; #4 as necessary until you have added all the scenes.</h3>
            </section>
            <section>
              <h3>5. Download resulting JSON</h3>
              <button onClick={onModuleSubmit}>Download JSON</button>
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
                name="uploadJson"
                type="file"
                accept=".json"
                onChange={handleUploadJsonSubmit}
                style={styles.scriptInput}
              />
              <button onClick={() => { setEditedJson(uploadJson); setError("") }}>
                Upload
              </button>
            </form>
            <h3>2. Edit the JSON text. Click download when done.
            You will get an error if the JSON fails to parse,
              otherwise the file should download!</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
              }}
              encType="multipart/form-data"
              className="script-generator-form-card"
            >
              <textarea
                name="editExistingFile"
                value={editedJson}
                onChange={handleEditJsonChange}
                rows="30"
                style={{ width: '100%' }}
                placeholder="Uploaded JSON will appear here..."
              />
              <p className="errorMessage" style={error ? { ...styles.errorMessage, display: 'show' } : { display: 'hidden' }}>{error ? error : null}</p>
              <button
                onClick={handleEditJsonSubmit}
                class={!error ? "" : "button-not-enabled"}
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
            <h2>Add Questions</h2>
            <section>
              <h3>1. View the Q's you have added by clicking "View Questions".</h3>
              <button onClick={() => { setShowQuestions(!showQuestions) }}>{showQuestions ? "Hide Questions" : "View Questions"}</button>
              <div className="view-json-container"><pre>{showQuestions ? JSON.stringify(allQuestionsArray, null, 2) : null}</pre></div>
            </section>
            <section>
              <h3>2. Add questions using the form below.</h3>
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
                  style={styles.scriptInput}
                />
                <input
                  name="questionText"
                  type="text"
                  value={question.questionText}
                  onChange={handleQuestionChange}
                  placeholder="Question Text*"
                  style={styles.scriptInput}
                />
                <input
                  name="explanationText"
                  type="text"
                  value={question.explanationText}
                  onChange={handleQuestionChange}
                  placeholder="Explanation Text*"
                  style={styles.scriptInput}
                />
                <label id="question_audio" htmlFor="question_audio">Question Audio:</label>
                <input
                  name="questionAudio"
                  type="file"
                  onChange={e => { setQuestion({ ...question, questionAudio: e.target.files[0].name }) }}
                  accept="audio/*"
                  id="question_audio"
                  style={styles.scriptInput}
                />
                <label id="answer_audio" htmlFor="answer_audio">Answer Audio:</label>
                <input
                  name="explanationAudio"
                  type="file"
                  onChange={e => { setQuestion({ ...question, explanationAudio: e.target.files[0].name }) }}
                  accept="audio/*"
                  id="answer_audio"
                  style={styles.scriptInput}
                />
                <ul>
                  <li onClick={() => { setQuestionType("multiple_choice") }} className={questionType === "multiple_choice" ? "li-selected" : ""}>Multiple Choice</li>
                  <li onClick={() => { setQuestionType("drag_and_drop") }} className={questionType === "drag_and_drop" ? "li-selected" : ""}>Drag &amp; Drop</li>
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
                      style={styles.scriptInput}
                    />
                    <input
                      name="answerChoices"
                      type="text"
                      value={question.answerChoices}
                      onChange={handleQuestionChange}
                      placeholder="Answer choices (separate by commas, no spaces)*"
                      style={styles.scriptInput}
                    />
                    <input
                      name="correctAnswer"
                      type="text"
                      value={question.correctAnswer}
                      onChange={handleQuestionChange}
                      placeholder="Correct answer(s) (separate by commas, no spaces)*"
                      style={styles.scriptInput}
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
                      style={styles.scriptInput}
                    />
                  </div>
                }
                <button onClick={onQuestionSubmit}>Submit Question</button>
              </form>
            </section>
            <section>
              <h3>3. Download resulting JSON.</h3>
              <button>
                <a
                  href={"data:'text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allQuestionsArray, null, 2))}
                  download={`questions${modNum}.json`}
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
                name="uploadJson"
                type="file"
                accept=".json"
                onChange={handleUploadJsonSubmit}
                style={styles.scriptInput}
              />
              <button onClick={() => { setEditedJson(uploadJson); setError("") }}>
                Upload
              </button>
            </form>
            <h3>2. Edit the JSON text. Click download when done.
            You will get an error if the JSON fails to parse,
              otherwise the file should download!</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
              }}
              encType="multipart/form-data"
              className="script-generator-form-card"
            >
              <textarea
                name="editExistingFile"
                value={editedJson}
                onChange={handleEditJsonChange}
                rows="30"
                style={{ width: '100%' }}
                placeholder="Uploaded JSON will appear here..."
              />
              <p className="errorMessage" style={error ? { ...styles.errorMessage, display: 'show' } : { display: 'hidden' }}>{error ? error : null}</p>
              <button
                onClick={handleEditJsonSubmit}
                class={!error ? "" : "button-not-enabled"}
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