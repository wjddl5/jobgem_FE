"use client";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 4, height: "100%", width: "100%" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ========================
  const [loc_do, setLoc_do] = useState([]);
  const [loc_gusi, setLoc_gusi] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get("/api/category/loc").then((res) => {
      if (res.data) {
        setLoc_do(res.data);
        getGuSi(res.data.id[0]);
      }
    });
  }

  function getGuSi(id) {
    axios.get("/api/category/locGuSi", { params: { ldIdx: id } }).then((res) => {
      setLoc_gusi(res.data);
    });
  }

  // =========================

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: 500 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: 200 }}
      >
        {loc_do.map((row, index) => (
          <Tab label={row.name} {...a11yProps(index)} key={row.id} />
        ))}
      </Tabs>

      {loc_do.map((row, index) => (
        <TabPanel value={value} index={index} key={index}>
          {!loc_gusi.length ? <Typography>항목 없음</Typography> : loc_gusi.map((gusi, idx) => <Typography key={idx}>{gusi.lgName}</Typography>)}
        </TabPanel>
      ))}
    </Box>
  );
}
