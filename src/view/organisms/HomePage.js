import { Box } from "@mui/material";
import React, { Component } from "react";
import NameSelector from "./NameSelector";

const DEFAULT_SELECTED_NAMES = ["nuwan"];

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNames: DEFAULT_SELECTED_NAMES,
    };
  }

  async componentDidMount() {}

  render() {
    return (
      <Box>
        <NameSelector />
      </Box>
    );
  }
}
