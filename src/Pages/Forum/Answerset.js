import React from "react";
import { Link } from "react-router-dom";

import loadQuestions from "./Forum";

function Answerset(props) {
  console.log(props);

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
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default Answerset;
