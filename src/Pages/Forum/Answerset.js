import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Modal, message } from "antd";
import { showMessage } from "../../Components/Message/Message";
import "./customModal.css";
import { RiDeleteBin6Line } from "react-icons/ri";
const { confirm } = Modal;

function Answerset(props) {
  const [answerlist, setAnswerlist] = useState(props.answerlist);
  const navigate = useNavigate();

  useEffect(() => {
    setAnswerlist(props.answerlist);
  }, [props.answerlist]);

  const handleEdit = (answerId, questionId) => {
    navigate(`/forum/discussion/${questionId}?edit=true&answerId=${answerId}`);
  };

  const showDeleteConfirm = (answerId) => {
    confirm({
      title: "Are you sure you want to delete this answer?",
      icon: null,
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: { className: "delete-btn" },
      cancelButtonProps: { className: "cancel-btn" },
      onOk() {
        handleDelete(answerId);
      },
      onCancel() {
        console.log("Cancel");
      },
      className: "custom-delete-modal",
    });
  };

  const handleDelete = async (answerId) => {
    try {
      await axios.delete(
        `http://localhost:8010/answers/deleteAnswer/${answerId}`
      );
      const updatedAnswerlist = answerlist.filter(
        (record) => record.answerId !== answerId
      );
      setAnswerlist(updatedAnswerlist);
      showMessage("success", "Answer Deleted Successfully");
    } catch (error) {
      console.error("Error deleting the answer", error);
      showMessage("error", "Failed to delete the answer");
    }
  };

  return (
    <div>
      {answerlist &&
        answerlist.map((record) => (
          <div className="question-answer-container" key={record.answerId}>
            <Link to={`/forum/discussion/${record.questionId}`}>
              <h4 className="question-title">{record.questionTitle}</h4>
              <p className="answer-text">{record.comment}</p>
              <div className="action-buttons">
                <button
                  className="edit-button"
                  onClick={(event) => {
                    event.preventDefault();
                    handleEdit(record.answerId, record.questionId);
                  }}
                >
                  <FaRegEdit />
                </button>

                <RiDeleteBin6Line
                  className="delete-button"
                  onClick={(event) => {
                    event.preventDefault();
                    showDeleteConfirm(record.answerId);
                  }}
                />
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Answerset;
