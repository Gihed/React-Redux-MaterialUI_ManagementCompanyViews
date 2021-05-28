import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Notification from '../common/Notification';
import Button from '@material-ui/core/Button';
import ConfirmDelete from '../common/ConfirmDelete';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add'
import format from 'string-format';
import PageBase from './PageBase';
import {getCompanies} from '../actions';
import { compose } from "redux";
//import {getContacts} from '../actions'



import { COMPANY_EDIT } from '../actions/actionTypes';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  button: {
    margin: theme.spacing.unit,
  }
});

const projectdata = [
  {
    SrNo: 1, ProjectName: "ABC", Subject: "Computer Programming", Date: "12/12/2018", Type: "Difficult normal easy"
  },
  {
    SrNo: 2, ProjectName: "XYZ", Subject: "Digital Systems", Date: "12/13/2018", Type: "Normal"
  },
  {
    SrNo: 3, ProjectName: "QWE", Subject: "Data Structures", Date: "12/14/2018", Type: "Easy"
  },
  {
    SrNo: 4, ProjectName: "ASD", Subject: "Software Engineering", Date: "12/15/2018", Type: "Difficult"
  },
  {
    SrNo: 5, ProjectName: "ZXC", Subject: "Java Technologies", Date: "12/16/2018", Type: "Normal"
  }
]


export class ProjectInfiList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, deleteRecord: false, id: '', pgNo: 1, pageSize: 10, notify: false, message: '', error: false }
    this.deleteProjectInfo = this.deleteProjectInfo.bind(this);
    this.deleteAfterConfirmation = this.deleteAfterConfirmation.bind(this);
    this.editProjectInfo = this.editProjectInfo.bind(this);
    this.addProjectInfo = this.addProjectInfo.bind(this);
  }

//function start 'init' the project
componentDidMount(){      
  this.props.getCompanies();
  // this.props.getContacts();

}

/***********/

  deleteProjectInfo(id) {
    this.setState({ deleteRecord: true, id: id });
  }
  editProjectInfo(id) {
    this.props.history.push(`/ProjectInfo/` + id);
  }
  deleteAfterConfirmation(deleteConfirmed) {
    this.setState({ deleteRecord: false });
    if (deleteConfirmed) {
      /* let selectedid =  this.state.id
        Create and call deleteProjectInfo action */
        this.showNotification("Deleted!! Create and call deleteProjectInfo action");
    }
    this.setState({ id: '' });
  }
  showNotification = (msg, err) => {
    if (err)
      this.setState({ notify: true, message: msg, error: true });
    else
      this.setState({ notify: true, message: msg, error: false });
  };

  handleNotificationClosed = () => {
    this.setState({
      notify: false
    });
  };

  addProjectInfo() {
    this.props.history.push(`/ProjectInfo`);
  }
  render() {
    const { classes } = this.props;
    const { notify, message, error } = this.state;
    console.log("props.companies: ",this.props.companies);

    return (
      <PageBase title="List of Project" navigation="Project / Project List">
        <Button variant="fab" mini color="primary" aria-label="addd" className={classes.button} onClick={this.addProjectInfo}>
          <AddIcon />
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>name</CustomTableCell>
              <CustomTableCell>address</CustomTableCell>
              <CustomTableCell>country</CustomTableCell>
              <CustomTableCell>zipcode</CustomTableCell>
              <CustomTableCell>Type</CustomTableCell>
              <CustomTableCell>Edit</CustomTableCell>
              <CustomTableCell>Delete</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.companies && this.props.companies.map(cmp => {
              return (
                <TableRow className={classes.row} key={cmp.id}>
                  <CustomTableCell>{cmp.name}</CustomTableCell>
                  <CustomTableCell>{cmp.address}</CustomTableCell>
                  <CustomTableCell>{cmp.country}</CustomTableCell>
                  <CustomTableCell>{cmp.zipcode}</CustomTableCell>
                  <CustomTableCell>
                    <Button variant="fab" mini aria-label="edit" className={classes.button} onClick={() => this.editProjectInfo(cmp.id)}>
                      <EditIcon />
                    </Button>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Button variant="fab" mini color="secondary" aria-label="delete" className={classes.button} onClick={() => this.deleteProjectInfo(cmp.id)} >
                      <DeleteIcon />
                    </Button>
                  </CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ConfirmDelete resourceHeader="Delete Project Information ?" resourceSubject={format("Do you want to delete project information '{}'?", this.state.id)} onModalClose={this.deleteAfterConfirmation}
          openDeleteDialog={this.state.deleteRecord} />

        <Notification
          notify={notify}
          message={message}
          error={error}
          closed={this.handleNotificationClosed}
        />
      </PageBase>
    );
  }
}

ProjectInfiList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  console.log("state: ", state);
  return{
  companies: state.companies.companies  //props
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCompanies: () => dispatch(getCompanies())
    //deleteCompany : (id) => dispatch(deleteCompany(id)),
  };
};
export default compose(
  withStyles(styles),
  connect(
    mapStateToProps, // bring result from reducer
    mapDispatchToProps //function that dispatch the action from the view
  )
)(ProjectInfiList);