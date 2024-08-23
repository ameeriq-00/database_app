import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import CallsLog from "./CallsLog"; // Reuse the CallsLog component with its internal tabs

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

  if (!person) return <div>Loading...</div>;

  return (
    <div>
      <h2>
        {person.Name} ({person.PhoneNumber})
      </h2>

      {/* CallsLog component already contains the tabs, so just include it here */}
      <CallsLog personID={id} />
    </div>
  );
};

export default PersonDetails;
