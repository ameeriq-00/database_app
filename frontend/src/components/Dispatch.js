import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import api from "../api";
import strings from "../strings";

const Dispatch = () => {
  const [dispatchData, setDispatchData] = useState([]);

  useEffect(() => {
    const fetchDispatchData = async () => {
      try {
        const response = await api.get("/dispatch");
        setDispatchData(response.data);
      } catch (error) {
        console.error("Error fetching dispatch data:", error);
      }
    };

    fetchDispatchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{strings.T}</TableCell>
            <TableCell>{strings.nameAccused}</TableCell>
            <TableCell>{strings.savedNumbers}</TableCell>
            <TableCell>{strings.savedName}</TableCell>
            <TableCell>{strings.savedInfo}</TableCell>
            <TableCell>{strings.city}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dispatchData.map((item) => (
            <TableRow key={item.T}>
              <TableCell>{item.T}</TableCell>
              <TableCell>{item.Name_accused}</TableCell>
              <TableCell>{item.saved_numbers}</TableCell>
              <TableCell>{item.saved_name}</TableCell>
              <TableCell>{item.saved_info}</TableCell>
              <TableCell>{item.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Dispatch;
