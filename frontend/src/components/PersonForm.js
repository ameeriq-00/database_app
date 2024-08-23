import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Typography, Grid, Box } from "@mui/material";
import api from "../api";

const PersonForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState({ name: "", phoneNumber: "" });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/persons/${id}`).then((response) => {
        setPerson(response.data);
      });
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;

      // Step 1: Create or update the person
      if (id) {
        response = await api.put(`/persons/${id}`, {
          name: person.name,
          phoneNumber: person.phoneNumber,
        });
      } else {
        response = await api.post("/persons", {
          name: person.name,
          phoneNumber: person.phoneNumber,
        });
      }

      const personID = id || response.data.PersonID;

      // Step 2: Upload the Excel file, if it exists
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        await api.post(`/import/${personID}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      console.log("Person created/updated and file uploaded successfully");
      navigate("/");
    } catch (error) {
      console.error("Error saving person or uploading file:", error);
    }
  };

  const onDelete = async () => {
    try {
      await api.delete(`/persons/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Typography variant="h6">
        {id ? "Update Person" : "Add New Person"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={person.name}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={person.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload Excel File (Optional)
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {file && <Typography variant="body2">File: {file.name}</Typography>}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {id ? "Update" : "Add"}
          </Button>
          {id && (
            <Button
              variant="contained"
              color="secondary"
              onClick={onDelete}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonForm;
