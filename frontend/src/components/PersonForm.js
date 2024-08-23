import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const PersonForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [excelFile, setExcelFile] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPerson = async () => {
        try {
          const response = await api.get(`/persons/${id}`);
          const person = response.data;
          setName(person.Name);
          setPhoneNumber(person.PhoneNumber);
        } catch (error) {
          console.error("Error fetching person:", error);
        }
      };

      fetchPerson();
    }
  }, [id]);

  const handleFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const personData = { name, phoneNumber };

      if (id) {
        // Update existing person
        await api.put(`/persons/${id}`, personData);
        if (excelFile) {
          const formData = new FormData();
          formData.append("file", excelFile);
          await api.post(`/import/${id}`, formData);
        }
      } else {
        // Create new person
        const response = await api.post("/persons", personData);
        const newPerson = response.data;

        if (excelFile) {
          const formData = new FormData();
          formData.append("file", excelFile);
          await api.post(`/import/${newPerson.PersonID}`, formData);
        }
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving person:", error);
    }
  };

  const onDelete = async () => {
    try {
      if (id) {
        await api.delete(`/persons/${id}`);
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Person" : "Add Person"}</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Excel File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">{id ? "Update" : "Add"}</button>
        {id && (
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default PersonForm;
