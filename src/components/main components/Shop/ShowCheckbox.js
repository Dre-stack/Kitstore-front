import React from 'react';
import {
  Collapse,
  List,
  ListItemSecondaryAction,
  ListItem,
  ListItemText,
  Checkbox,
} from '@material-ui/core';

class ShowCheckbox extends React.Component {
  state = {
    open: false,
    checked: [],
  };

  componentDidMount() {
    if (this.props.initstate) {
      this.setState({ open: this.props.initstate });
    }
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  handleAngleIcon = () =>
    this.state.open ? (
      <i className="fas fa-angle-up"></i>
    ) : (
      <i className="fas fa-angle-down"></i>
    );

  handleToggle = (value) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked }, () =>
      this.props.handleFilters(newChecked)
    );
  };

  renderList = () => {
    if (this.props.list) {
      return this.props.list.map((item) => (
        <ListItem
          key={item._id}
          className="Shop-filters__filter-list"
        >
          <ListItemText primary={item.name} />
          <ListItemSecondaryAction>
            <Checkbox
              color="primary"
              onChange={this.handleToggle(item._id)}
              checked={this.state.checked.indexOf(item._id) !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
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
            <List>{this.renderList()}</List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default ShowCheckbox;
