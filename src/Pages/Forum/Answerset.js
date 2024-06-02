import React from "react";
import { Link } from "react-router-dom";

import loadQuestions from "./Forum";

function Answerset(props) {
  console.log(props);

  return (
    <div>
      {props.answerlist &&
        props.answerlist.map((record) => {
          return (
            <div className="question-row">
              <Link to={`/Questionbar/Detailed/${record.answerId}`}>
                <div className="question-title">
                  <p
                    style={{
                      fontSize: "15px",
                      color: "aliceblue",
                      width: "53rem",
                    }}
                  >
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
