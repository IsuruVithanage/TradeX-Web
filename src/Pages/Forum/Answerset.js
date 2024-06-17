import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import loadQuestions from "./Forum";
import axios from "axios";
import { useState } from "react";
import { showMessage } from "../../Components/Message/Message";
import { Modal, message } from "antd";
import "./customModal.css";
const { confirm } = Modal;

function Answerset(props) {
  console.log(props);
  const [answerlist, setAnswerlist] = useState(props.answerlist);

  const showDeleteConfirm = (answerId) => {
    confirm({
      title: "Are you sure you want to delete this answer?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(answerId);
      },
      onCancel() {
        console.log("Cancel");
      },
      className: "custom-modal",
    });
  };

  const handleDelete = async (answerId) => {
    try {
      await axios.delete(
        `http://localhost:8010/answers/deleteAnswer/${answerId}`
      );
      const updateAnswerlist = answerlist.filter(
        (record) => record.answerId !== answerId
      );
      setAnswerlist(updateAnswerlist);
      showMessage("success", "Answer Deleted Succesfully");
    } catch (error) {
      console.error("Error delete the answer", error);
      showMessage("error", "Failed to delete the answer");
    }
  };

  return (
    <div>
      {props.answerlist &&
        props.answerlist.map((record) => {
          <h6 style={{ display: "inline-block" }}>Question : </h6>;
          const questionTitle = record.question
            ? record.question.title
            : "Unknown Title";
          return (
            <div className="question-row">
              <Link to={`/Questionbar/Detailed/${record.answerId}`}>
                <div className="question-title">
                  <p> {questionTitle}</p>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "aliceblue",
                      width: "53rem",
                    }}
                  >
                    <h6 style={{ display: "inline-block" }}>Answer : </h6>
                    {record.comment}
                  </p>
                  <div
                    className="edit-button"
                    style={{ display: "inline-block", marginRight: "0.5rem" }}
                  >
                    <FaEdit style={{ color: "white" }} />
                  </div>
                  <div
                    className="delete-icon"
                    style={{ display: "inline-block" }}
                    onClick={(event) => {
                      event.preventDefault();
                      showDeleteConfirm(record.answerId);
                    }}
                  >
                    <MdDelete />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default Answerset;
