import { Box } from "@mui/material";
import React, { Component } from "react";
import NameSelector from "./NameSelector";

const DEFAULT_SELECTED_NAMES = ["nuwan"];

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNameList: DEFAULT_SELECTED_NAMES,
    };
  }

  async componentDidMount() {}

  onChangeSelectedNameList(selectedNameList) {
    console.debug(selectedNameList);
    this.setState({
      selectedNameList,
    });
  }

  render() {
    const { selectedNameList } = this.state;
    return (
      <Box>
        <NameSelector
          selectedNameList={selectedNameList}
          onChangeSelectedNameList={this.onChangeSelectedNameList.bind(this)}
        />
        {selectedNameList}
      </Box>
    );
  }
}
