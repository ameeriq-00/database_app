import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import api from "../api";
import strings from "../strings";

const PersonsList = () => {
  const [persons, setPersons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await api.get("/persons");
        setPersons(response.data);
      } catch (error) {
        console.error("Error fetching persons:", error);
      }
    };

    fetchPersons();
  }, []);

  const filteredPersons = persons.filter(
    (person) =>
      person.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.PhoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <TextField
        label={strings.search}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        component={Link}
        to="/add-person"
        variant="contained"
        color="primary"
        style={{ marginBottom: "1rem" }}
      >
        {strings.addPerson}
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{strings.name}</TableCell>
              <TableCell>{strings.phoneNumber}</TableCell>
              <TableCell>{strings.actions}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPersons.map((person) => (
              <TableRow key={person.PersonID}>
                <TableCell>{person.Name}</TableCell>
                <TableCell>{person.PhoneNumber}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/persons/${person.PersonID}`}
                    variant="contained"
                    color="primary"
                  >
                    {strings.view}
                  </Button>
                  <Button
                    component={Link}
                    to={`/edit-person/${person.PersonID}`}
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "1rem" }}
                  >
                    {strings.edit}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PersonsList;
