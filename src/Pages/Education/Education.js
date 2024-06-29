import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import EducationItem from "../../Components/EducationResources/EducationItems";
import "./Education.css";
import axios from "axios";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import Modal from "../../Components/Modal/Modal";
import { TextField } from "@mui/material";

function Education() {
  const [educationItems, setEducationItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isdeleteModalOpen, setIsdeleteModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const userId = 1;

  const loadResources = async (e) => {
    axios
      .get("http://localhost:8009/education/getAllEduResources/" + userId)
      .then((res) => {
        setEducationItems(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error getting eduResources", error);
        setEducationItems([]);
        setIsLoading(false);
      });
  };
  
  useEffect(() => {
    setIsLoading(true);
    loadResources();  
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8009/education/addEduResources",
        {
          title,
          description,
          image,
          url,
        }
      );

      setMessage(response.data.message);
      setTitle("");
      setDescription("");
      setImage("");
      setUrl("");
    } catch (error) {
      console.error("Error adding resource", error);
      setMessage("Error adding resource");
    }
  };

  // const handleDelete = async (eduId) => {
  //   try {
  //     await axios.delete(`http://localhost:8009/education/deleteEduResources/${eduId}`);
  //     setEducationItems(educationItems.filter((resource) => resource.id !== eduId));
  //   } catch (error) {
  //     console.error("Error deleting resource", error);
  //     // Handle error state or display an error message
  //   }
  // };

  return (
    <BasicPage
      isLoading={isLoading}
      tabs={[
        { label: "All", path: "/education" },
        { label: "Favorite", path: "/education/Favorites" },
      ]}
    >
      {/* <SidePanelWithContainer
        header="Video List"
        style={{height:"91vh"}}
        sidePanel={ <div className="video-list">
          <div style={{ display: "block" }}>
        
            <h4>Market Analysis</h4>
            <ul>
              <li>Technical Analysis</li>
              <li>Fundamental Analysis</li>
              <li>Market Trends and Predictions</li>
            </ul>
            <h4>Market Analysis</h4>
            <ul>
              <li>Technical Analysis</li>
              <li>Fundamental Analysis</li>
              <li>Market Trends and Predictions</li>
            </ul>
            <h4>Market Analysis</h4>
            <ul>
              <li>Technical Analysis</li>
              <li>Fundamental Analysis</li>
              <li>Market Trends and Predictions</li>
            </ul>
          </div>
        </div>}> */}
      <div style={{ display: "flex" }}>
        <div className="search">
          <Input type={"search"} placeholder={"search"} />
        </div>
        <div>
          <Input
            type="button"
            value="Add Resources"
            style={{ width: "150px", marginLeft: "85%" }}
            onClick={() => setIsdeleteModalOpen(true)}
          />
          <Modal
            open={isdeleteModalOpen}
            close={() => setIsdeleteModalOpen(false)}
          >
            <div
              style={{
                width: "450px",
              }}
            >
              <div
                style={{
                  width: "300px",
                  margin: "auto",
                  marginBottom: "25px",
                }}
              >
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                  Add Education Resources
                </h1>
                <form style={{ marginLeft: "3px" }}>
                  <Input
                    type="text"
                    placeholder="title"
                    className="Add-edu"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="description"
                    className="Add-edu"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    height="200px"
                  />
                  <Input
                    type="text"
                    placeholder="image"
                    className="Add-edu"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />

                  <Input
                    type="text"
                    placeholder="url"
                    className="Add-edu"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                  {/* <TextField
                    className="custom-textfield"
                    variant="outlined"
                    placeholder="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <TextField
                    className="custom-textfield"
                    variant="outlined"
                    placeholder="description"
                    id="description"
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <TextField
                    className="custom-textfield"
                    variant="outlined"
                    placeholder="image"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                  <TextField
                    className="custom-textfield"
                    variant="outlined"
                    placeholder="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  /> */}

                  <div className="create-admin-btn">
                    <Input
                      type="button"
                      style={{ width: "110px" }}
                      value="Submit"
                      onClick={handleSubmit}
                    />
                    <Input
                      type="button"
                      style={{ width: "110px" }}
                      onClick={() => setIsdeleteModalOpen(false)}
                      value="Cancel"
                      red
                    />
                  </div>
                </form>
                {message && (
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1rem",
                      marginTop: "10px",
                    }}
                  >
                    {message}
                  </p>
                )}
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div className="education-resources">
      {educationItems.map(resource => (
        <EducationItem
          key={resource.eduId}
          eduId={resource.eduId}
          userId={resource.userId}
          title={resource.title}
          description={resource.description}
          image={resource.image}
          url={resource.url}
          isFavorite={resource.isFavorite}
          load={loadResources}
        />
      ))}
      </div>

      {/* </SidePanelWithContainer> */}
      {/* <div style={{ display: "flex" }}>
      </div> */}
    </BasicPage>
  );
}

export default Education;
