import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import crypto from "../../Assets/Images/crypto.png";
import axios from "axios";
import "./EducationItems.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../Components/Modal/Modal";
import Input from "../../Components/Input/Input";

const EducationItem = (props) => {
  const {
    eduId,
    userId,
    title,
    description,
    image,
    url,
    isFavorite,
    load,
    deleteItem,
  } = props;
  const [isHeartFilled, setIsHeartFilled] = useState(isFavorite);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage modal visibility

  const handleHeartClick = () => {
    axios
      .post("http://localhost:8009/education/favorite", {
        eduId,
        userId,
        isFavorite: !isHeartFilled,
      })
      .then((res) => {
        setIsHeartFilled(!isHeartFilled);
      })
      .catch((error) => {
        console.log("error in favorite");
      });
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:8009/admin/deleteEduResources/${eduId}`)
      .then((res) => {
        load();
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.log("Error deleting resource", error);
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="education-container">
        <div className="img-container">
          <img src={image ? image : crypto} alt="..." />
        </div>
        <div className="desc-container">
          <div style={{ display: "flex" }}>
            <div className="news-header-container">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <h1
                  style={{
                    fontSize: "1.6rem",
                    marginTop: "3px",
                    marginLeft: "10px",
                  }}
                >
                  {title}
                </h1>
              </a>
              <p style={{ marginLeft: "10px" }}>
                {description
                  ? description
                  : "Cryptocurrency is digital money that doesn't require a bank or financial institution to verify transactions and can be used for purchases or as an investment."}
              </p>
            </div>
            <div className="favorite-icon-container" onClick={handleHeartClick}>
              {isHeartFilled ? <FaHeart /> : <FaRegHeart />}
            </div>
            {deleteItem && (
              <div
                className="delete-icon-container"
                onClick={handleDeleteClick}
              >
                <RiDeleteBin6Line />
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal open={isDeleteModalOpen} close={() => setIsDeleteModalOpen(false)}>
        <div style={{ width: "300px", margin: "auto", textAlign: "center" }}>
              <h2>Do you confirm to delete this educational item?</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "20px",
                }}
              >
                <Input
                        type="button"
                        style={{ width: "110px" }}
                        onClick={confirmDelete}
                        value="Yes"
                />
                <Input
                        type="button"
                        style={{ width: "110px" }}
                        onClick={() => setIsDeleteModalOpen(false)}
                        value="No"
                        red
                />
              </div>
            </div>
      </Modal>
    </div>
  );
};

export default EducationItem;
