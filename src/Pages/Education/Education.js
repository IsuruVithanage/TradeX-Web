import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import EducationItem from "../../Components/EducationResources/EducationItems";
import "./Education.css";
import axios from "axios";
import Modal from "../../Components/Modal/Modal";
import { TextField } from "@mui/material";
import { getUser } from "../../Storage/SecureLs";

function Education() {
  const [educationItems, setEducationItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isdeleteModalOpen, setIsdeleteModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const userId = getUser().id;

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

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!image) newErrors.image = "Image URL is required";
    if (!url) newErrors.url = "Resource URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8009/admin/addEduResources",
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
      setIsdeleteModalOpen(false);
      loadResources();
    } catch (error) {
      console.error("Error adding resource", error);
      setMessage("Error adding resource");
    }
  };

  const filteredEducationItems = educationItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BasicPage
      isLoading={isLoading}
      tabs={[
        { label: "All", path: "/education" },
        { label: "Favorite", path: "/education/Favorites" },
      ]}
    >
      <div style={{ display: "flex" }}>
        <div className="search">
          <Input
            type={"search"}
            placeholder={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="button"
            value="Add Resources"
            style={{ width: "150px", marginLeft: "85%", marginTop:"15px" }}
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
                <h1
                  style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    color: "white",
                  }}
                >
                  Add Educational Resources
                </h1>
                <form style={{ marginLeft: "2px" }} onSubmit={handleSubmit}>
                  <textarea
                    id="title"
                    value={title}
                    rows="2"
                    cols="40"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="custom-textarea"
                    placeholder="Title"
                  >
                  </textarea>
                  {errors.title && <p className="error">{errors.title}</p>}
                  <textarea
                    id="description"
                    value={description}
                    rows="5"
                    cols="40"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="custom-textarea"
                    placeholder="Description"
                  >
                  </textarea>
                  {errors.description && (
                    <p className="error">{errors.description}</p>
                  )}
                  <textarea
                    id="image"
                    value={image}
                    rows="3"
                    cols="40"
                    onChange={(e) => setImage(e.target.value)}
                    required
                    className="custom-textarea"
                    placeholder="Image"
                  >
                  </textarea>
                  {errors.image && <p className="error">{errors.image}</p>}
                  <textarea
                    id="url"
                    value={url}
                    rows="3"
                    cols="40"
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="custom-textarea"
                    placeholder="url"
                  >
                  </textarea>
                  {errors.url && <p className="error">{errors.url}</p>}

                  <div className="create-admin-btn" style={{marginTop:"10px"}}>
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
        {filteredEducationItems.map((resource) => (
          <EducationItem
            key={resource.eduId}
            eduId={resource.eduId}
            userId={userId}
            title={resource.title}
            description={resource.description}
            image={resource.image}
            url={resource.url}
            isFavorite={resource.isFavorite}
            load={loadResources}
            deleteItem={true}
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
