import React, { useState } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import axios from "axios";
import "./AddResources.css";

export default function AddResources() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8009/education/addResource", {
        title,
        description,
        image,
        url
      });

      setMessage(response.data.message);
      setTitle('');
      setDescription('');
      setImage('');
      setUrl('');
    } catch (error) {
      console.error("Error adding resource", error);
      setMessage('Error adding resource');
    }
  };

  return (
    <BasicPage
      tabs={[
        { label: "Dashboard", path: "/admin/AdDashboard" },
        { label: "Users", path: "/admin/Users" },
        { label: "Admin", path: "/admin" },
        { label: "Education", path: "/admin/AddResources" },
      ]}
    >
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
        <div className="add-edu-container">
          <h2>Add Educational Resource</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image URL:</label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="url">Resource URL:</label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <button type="submit">Add Resource</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </BasicPage>
  );
}
