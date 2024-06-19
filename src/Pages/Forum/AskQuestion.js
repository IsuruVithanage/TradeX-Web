import React, { useState } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import "./askQuestion.css";
import Input from "../../Components/Input/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { showMessage } from "../../Components/Message/Message";

function AskQuestion() {
  const Tabs = [
    { label: "Latest", path: "/forum" },
    { label: "My Problems", path: "/forum/myProblems" },
    { label: "My Answers", path: "/forum/myAnswers" },
  ];

  const [values, setValues] = useState({
    questionId: null,
    userId: 1,
    title: "",
    description: "",
    views: 0,
    likes: 0,
    replies: 0,
  });

  const handleDescriptionChange = (content) => {
    setValues((prevOrder) => ({
      ...prevOrder,
      description: content,
    }));
  };

  const handleTitleChange = (content) => {
    setValues((prevOrder) => ({
      ...prevOrder,
      title: content,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const buttonType = event.nativeEvent.submitter.value;

    if (buttonType === "Cancel") {
      showMessage("error", "Question adding failed", 1.5);
      return;
    }

    // Strip HTML tags from description
    const strippedDescription = values.description.replace(/<[^>]*>?/gm, "");
    const updatedValues = { ...values, description: strippedDescription };
    console.log(updatedValues);
    axios
      .post("http://localhost:8010/forum", updatedValues)
      .then((res) => {
        console.log("Data added success");
        showMessage("success", "Question posted", 1.5);
      })
      .catch((err) => {
        console.log(err);
        showMessage("error", "Failed to post question", 1.5);
      });
  };
  return (
    <BasicPage tabs={Tabs}>
      <SidePanelWithContainer
        style={{ height: "91vh" }}
        header="Favourites"
        sidePanel={
          <div>
            <p className="sub-title">Technical Analysis</p>
            <p className="sub-title">Understanding cryptocurrency</p>
            <p className="sub-title">Understanding cryptocurrency wallet</p>
          </div>
        }
      >
        <div className="ask-Question">
          <div className="ask-ques-container">
            <h2>Ask Your Question</h2>
            <form onSubmit={handleSubmit}>
              <div className="ask-form-container">
                <label className="ask-ques-title">
                  <h3>Title</h3>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Ex: What are the most highest rated CryptoCurrencies?"
                    name="title"
                    onChange={(e) => handleTitleChange(e.target.value)}
                    style={{ marginLeft: "1rem" }}
                  />
                </label>
                <div className="body">
                  <h3>Description</h3>
                  <div className="text-editor">
                    <ReactQuill
                      theme="snow"
                      name="description"
                      onChange={handleDescriptionChange}
                    />
                  </div>
                </div>
              </div>
              <div className="submit-buttons">
                <input
                  type="submit"
                  value="Post"
                  className="post-button"
                ></input>
                <input
                  type="submit"
                  value="Cancel"
                  className="cancel-button"
                ></input>
              </div>
            </form>
          </div>
        </div>
      </SidePanelWithContainer>
    </BasicPage>
  );
}

export default AskQuestion;
