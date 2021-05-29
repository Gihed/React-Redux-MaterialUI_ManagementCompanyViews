import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'
//import { TextField} from 'redux-form-material-ui';
import { connect } from 'react-redux';
import {addCompany} from '../actions/company'
import { compose } from "redux";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
 
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  '& > *': {
    margin: "20",
    width: '25ch',
  },
  button: {
    margin: theme.spacing.unit,
  },
});
 
class ProjectInfo extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      name:'',
      address:'',
      zipCode:'',
      country:''
    }
  }


 
  handleSubmit(){
    
    console.log("name : ",this.state.name)
    console.log("address : ",this.state.address)
    console.log("zipcode : ",this.state.zipCode)
    console.log("country : ",this.state.country)
    let data = {
      name: this.state.name,
      address: this.state.address,
      zipCode: this.state.zipCode,
      country: this.state.country,
    }
    console.log("data",data)
    this.props.addCompany(data);
    this.props.onCancel();
  }
 
  render() {
    const { classes } = this.props;
    
    const {  onCancel } = this.props
    return (
      <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" margin="dense" value={this.state.name} onChange={e => this.setState({name: e.target.value}) } label="Company name" variant="outlined" />
      <TextField id="outlined-basic" margin="dense" value={this.state.address} onChange={e => this.setState({address: e.target.value}) } label="address" variant="outlined" />
      <TextField id="outlined-basic" margin="dense" value={this.state.zipCode} onChange={e => this.setState({zipCode: e.target.value}) } label="Zip Code" variant="outlined" />
      <TextField id="outlined-basic" margin="dense" value={this.state.country} onChange={e => this.setState({country: e.target.value}) } label="Country" variant="outlined" />
      <Button  type="submit" color="primary" className={classes.button} onClick={() => this.handleSubmit()}>
            Save
      </Button>
          <Button variant="contained" color="secondary" className={classes.button} onClick={onCancel}>
            Cancel
      </Button>
    </form>
    );
  }
}
 
ProjectInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
const mapStateToProps = state => {
  console.log("state : ",state);
  return {
    companies: state.companies.companies
  };
};
 
const mapDispatchToProps = dispatch => {
  return {
    addCompany: (data) => dispatch(addCompany(data))
  };
};
 
export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProjectInfo);