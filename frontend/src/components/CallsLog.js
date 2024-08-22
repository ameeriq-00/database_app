import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
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

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const CallsLog = () => {
  const [value, setValue] = useState(0);
  const [aTempData, setATempData] = useState([]);
  const [zTempData, setZTempData] = useState([]);
  const [kTempData, setKTempData] = useState([]);

  useEffect(() => {
    const fetchATempData = async () => {
      try {
        const response = await api.get("/a_temp");
        setATempData(response.data);
      } catch (error) {
        console.error(
          "Error fetching a_temp data:",
          error.response || error.message
        );
      }
    };

    const fetchZTempData = async () => {
      try {
        const response = await api.get("/z_temp");
        setZTempData(response.data);
      } catch (error) {
        console.error(
          "Error fetching z_temp data:",
          error.response || error.message
        );
      }
    };

    const fetchKTempData = async () => {
      try {
        const response = await api.get("/k_temp");
        setKTempData(response.data);
      } catch (error) {
        console.error(
          "Error fetching k_temp data:",
          error.response || error.message
        );
      }
    };

    fetchATempData();
    fetchZTempData();
    fetchKTempData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="calls log templates"
      >
        <Tab label="Template A (a_temp)" />
        <Tab label="Template Z (z_temp)" />
        <Tab label="Template K (k_temp)" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{strings.eReport}</TableCell>
                <TableCell>{strings.callerNumber}</TableCell>
                <TableCell>{strings.calledNumber}</TableCell>
                <TableCell>{strings.thirdPartyNumber}</TableCell>
                <TableCell>{strings.callInitialTime}</TableCell>
                <TableCell>{strings.conversationDuration}</TableCell>
                <TableCell>{strings.city}</TableCell>
                <TableCell>{strings.siteName}</TableCell>
                <TableCell>{strings.chargedMobileUserIMEI}</TableCell>
                <TableCell>{strings.chargedMobileUserIMSI}</TableCell>
                <TableCell>{strings.lon}</TableCell>
                <TableCell>{strings.lat}</TableCell>
                <TableCell>{strings.siteID}</TableCell>
                <TableCell>{strings.cgi}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aTempData.length > 0 ? (
                aTempData.map((item) => (
                  <TableRow key={item.LogID}>
                    <TableCell>{item.E_REPORT}</TableCell>
                    <TableCell>{item.CALLER_NUMBER}</TableCell>
                    <TableCell>{item.CALLED_NUMBER}</TableCell>
                    <TableCell>{item.THIRD_PARTY_NUMBER}</TableCell>
                    <TableCell>{item.CALL_INITIAL_TIME}</TableCell>
                    <TableCell>{item.CONVERSATION_DURATION}</TableCell>
                    <TableCell>{item.CITY}</TableCell>
                    <TableCell>{item.SITE_NAME}</TableCell>
                    <TableCell>{item.CHARGED_MOBILE_USER_IMEI}</TableCell>
                    <TableCell>{item.CHARGED_MOBILE_USER_IMSI}</TableCell>
                    <TableCell>{item.LON}</TableCell>
                    <TableCell>{item.LAT}</TableCell>
                    <TableCell>{item.SITE_ID}</TableCell>
                    <TableCell>{item.CGI}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={14} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{strings.date}</TableCell>
                <TableCell>{strings.callType}</TableCell>
                <TableCell>{strings.duration}</TableCell>
                <TableCell>{strings.callingNumber}</TableCell>
                <TableCell>{strings.calledNumber}</TableCell>
                <TableCell>{strings.callLocation}</TableCell>
                <TableCell>{strings.siteID}</TableCell>
                <TableCell>{strings.split}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {zTempData.length > 0 ? (
                zTempData.map((item) => (
                  <TableRow key={item.LogID}>
                    <TableCell>{item.Date}</TableCell>
                    <TableCell>{item.CALL_TYPE}</TableCell>
                    <TableCell>{item.Duration}</TableCell>
                    <TableCell>{item.CallingNumber}</TableCell>
                    <TableCell>{item.CalledNumber}</TableCell>
                    <TableCell>{item.CallLocation}</TableCell>
                    <TableCell>{item.SiteID}</TableCell>
                    <TableCell>{item.Split}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{strings.datetime}</TableCell>
                <TableCell>{strings.callType}</TableCell>
                <TableCell>{strings.msisdn}</TableCell>
                <TableCell>{strings.imsi}</TableCell>
                <TableCell>{strings.bPartyMSISDN}</TableCell>
                <TableCell>{strings.duration}</TableCell>
                <TableCell>{strings.callingNumber}</TableCell>
                <TableCell>{strings.calledNumber}</TableCell>
                <TableCell>{strings.imei}</TableCell>
                <TableCell>{strings.callLocation}</TableCell>
                <TableCell>{strings.siteID}</TableCell>
                <TableCell>{strings.site}</TableCell>
                <TableCell>{strings.governorate}</TableCell>
                <TableCell>{strings.longitude}</TableCell>
                <TableCell>{strings.latitude}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kTempData.length > 0 ? (
                kTempData.map((item) => (
                  <TableRow key={item.LogID}>
                    <TableCell>{item.DATETIME}</TableCell>
                    <TableCell>{item.CALL_TYPE}</TableCell>
                    <TableCell>{item.MSISDN}</TableCell>
                    <TableCell>{item.IMSI}</TableCell>
                    <TableCell>{item.B_PARTY_MSISDN}</TableCell>
                    <TableCell>{item.DURATION}</TableCell>
                    <TableCell>{item.CALLINGNUMBER}</TableCell>
                    <TableCell>{item.CALLEDNUMBER}</TableCell>
                    <TableCell>{item.IMEI}</TableCell>
                    <TableCell>{item.CALLLOCATION}</TableCell>
                    <TableCell>{item.SITE_ID}</TableCell>
                    <TableCell>{item.SITE}</TableCell>
                    <TableCell>{item.GOVERNORATE}</TableCell>
                    <TableCell>{item.LONGITUDE}</TableCell>
                    <TableCell>{item.LATITUDE}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={15} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </div>
  );
};

export default CallsLog;
