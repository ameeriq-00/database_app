import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Button } from "@mui/material";
import api from "../api";

const PersonDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await api.get(`/persons/${id}`);
        setPerson(response.data);
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };

    fetchPerson();
  }, [id]);

  if (!person) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper style={{ padding: "1rem", marginTop: "2rem" }}>
      <Typography variant="h4">{person.Name}</Typography>
      <Typography variant="body1">
        Phone Number: {person.PhoneNumber}
      </Typography>
      <Typography variant="body1">
        Created Date: {new Date(person.CreatedDate).toLocaleString()}
      </Typography>
      <Button variant="contained" color="primary" style={{ marginTop: "1rem" }}>
        Edit Person
      </Button>
    </Paper>
  );
};

export default PersonDetails;
