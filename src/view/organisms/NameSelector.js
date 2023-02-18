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

  onChangeSelectedNameList(event, selectedOptions) {
    const selectedNameList = selectedOptions.map((option) => option.title);
    this.props.onChangeSelectedNameList(selectedNameList);
  }

  render() {
    const { nameList } = this.state;
    const { selectedNameList } = this.props;

    if (nameList === undefined) {
      return <CircularProgress />;
    }

    const options = nameList.map((name) => Object({ title: name }));
    const label = "Input one or more names";
    const selectedOptions = selectedNameList.map((name) =>
      Object({ title: name })
    );

    return (
      <Box sx={STYLE}>
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option) => option.title}
          value={selectedOptions}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          renderInput={(params) => (
            <TextField {...params} label={label} placeholder={label} />
          )}
          onChange={this.onChangeSelectedNameList.bind(this)}
        />
      </Box>
    );
  }
}
