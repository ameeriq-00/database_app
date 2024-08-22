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

const Archive = () => {
  const [archiveData, setArchiveData] = useState([]);

  useEffect(() => {
    const fetchArchiveData = async () => {
      try {
        const response = await api.get("/archive");
        setArchiveData(response.data);
      } catch (error) {
        console.error("Error fetching archive data:", error);
      }
    };

    fetchArchiveData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{strings.T}</TableCell>
            <TableCell>{strings.phoneNumber}</TableCell>
            <TableCell>{strings.nameInfo}</TableCell>
            <TableCell>{strings.bookId}</TableCell>
            <TableCell>{strings.appBookDate}</TableCell>
            <TableCell>{strings.receivedFrom}</TableCell>
            <TableCell>{strings.accusedChar}</TableCell>
            <TableCell>{strings.appForm}</TableCell>
            <TableCell>{strings.appDate}</TableCell>
            <TableCell>{strings.periodFromTo}</TableCell>
            <TableCell>{strings.techName}</TableCell>
            <TableCell>{strings.appKind}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {archiveData.map((item) => (
            <TableRow key={item.T}>
              <TableCell>{item.T}</TableCell>
              <TableCell>{item.phone_number}</TableCell>
              <TableCell>{item.name_info}</TableCell>
              <TableCell>{item.bookid}</TableCell>
              <TableCell>{item.app_book_date}</TableCell>
              <TableCell>{item.recived_from}</TableCell>
              <TableCell>{item.accused_char}</TableCell>
              <TableCell>{item.app_form}</TableCell>
              <TableCell>{item.app_date}</TableCell>
              <TableCell>{item.period_fromto}</TableCell>
              <TableCell>{item.tech_name}</TableCell>
              <TableCell>{item.app_kind}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Archive;
