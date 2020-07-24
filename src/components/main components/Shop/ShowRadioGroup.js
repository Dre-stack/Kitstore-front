import React, { Component } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

export class ShowRadioGroup extends Component {
  state = {
    open: false,
    value: 0,
  };

  componentDidMount() {
    if (this.props.initstate) {
      this.setState({ open: this.props.initstate });
    }
  }

  handleAngleIcon = () =>
    this.state.open ? (
      <i className="fas fa-angle-up"></i>
    ) : (
      <i className="fas fa-angle-down"></i>
    );

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  handleChange = (event) => {
    this.props.handleFilters(event.target.value);
    this.setState({ value: event.target.value });
  };

  renderList = () => {
    if (this.props.list) {
      return this.props.list.map((item) => (
        <FormControlLabel
          key={item._id}
          label={item.name}
          control={<Radio color="primary" />}
          value={`${item._id}`}
        />
      ));
    }
  };

  render() {
    return (
      <div className="Shop-filters__filter">
        <List>
          <ListItem onClick={this.handleClick}>
            <ListItemText
              primary={this.props.title}
              className="Shop-filters__filter-title"
            />
            {this.handleAngleIcon()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <RadioGroup
              aria-label="prices"
              name="prices"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {' '}
              {this.renderList()}
            </RadioGroup>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default ShowRadioGroup;
