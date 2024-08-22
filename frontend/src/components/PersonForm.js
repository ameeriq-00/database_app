import React, { useState } from "react";
import axios from "axios";

const PersonForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, create the person
      const personResponse = await axios.post(
        `http://localhost:3000/api/persons`,
        { Name: name, PhoneNumber: phoneNumber }
      );

      const personID = personResponse.data.PersonID;
      console.log("Person created successfully with ID:", personID);

      if (file) {
        // Then, upload the file linked to the created person
        const formData = new FormData();
        formData.append("file", file);

        const fileResponse = await axios.post(
          `http://localhost:3000/api/import/${personID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("File uploaded successfully:", fileResponse.data);
      }
    } catch (error) {
      console.error(
        "Error creating person or uploading file:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Create Person</button>
    </form>
  );
};

export default PersonForm;
