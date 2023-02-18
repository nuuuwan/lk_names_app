import React, { Component } from "react";
import Name from "../../nonview/core/Name";
import { CircularProgress, Box, Autocomplete, TextField } from "@mui/material";

const STYLE = {
  padding: 1,
  margin: 1,
  maxWidth: 500,
};

export default class NameSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { nameList: undefined };
  }
  async componentDidMount() {
    const nameList = await Name.listAll();
    this.setState({
      nameList,
    });
  }
  render() {
    const nameList = this.state.nameList;
    if (nameList === undefined) {
      return <CircularProgress />;
    }

    const options = nameList.map((name) => Object({ title: name }));
    const label = "Input one or more names";
    return (
      <Box sx={STYLE}>
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option) => option.title}
          defaultValue={[]}
          renderInput={(params) => (
            <TextField {...params} label={label} placeholder={label} />
          )}
        />
      </Box>
    );
  }
}
