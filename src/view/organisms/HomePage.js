import { Box, CircularProgress } from "@mui/material";
import React, { Component } from "react";
import NameSelector from "./NameSelector";
import Name from "../../nonview/core/Name";
import DataMap from "../molecules/DataMap";

const DEFAULT_SELECTED_NAMES = ["perera", "fernando"];

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNameList: DEFAULT_SELECTED_NAMES,
      regionToCount: null,
      regionToNameToCount: null,
    };
  }

  async componentDidMount() {
    const regionToCount = await Name.regionToCount();
    const regionToNameToCount = await Name.regionToNameToCount();
    this.setState({ regionToCount, regionToNameToCount });
  }

  onChangeSelectedNameList(selectedNameList) {
    this.setState({
      selectedNameList,
    });
  }

  render() {
    const { selectedNameList, regionToCount, regionToNameToCount } = this.state;
    if (!regionToNameToCount) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <NameSelector
          selectedNameList={selectedNameList}
          onChangeSelectedNameList={this.onChangeSelectedNameList.bind(this)}
        />
        <DataMap
          selectedNameList={selectedNameList}
          regionToCount={regionToCount}
          regionToNameToCount={regionToNameToCount}
        />
      </Box>
    );
  }
}
