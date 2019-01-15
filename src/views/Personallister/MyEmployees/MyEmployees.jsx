/**
 * Description: My Employess
 * Date: 25/12/2018
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Table from "components/Table/Table.jsx";

import myEmployeesStyle from "assets/jss/material-dashboard-pro-react/views/myEmployees/myEmployeesStyle.jsx";
import NewOrUpdateModal from "./NewOrUpdateModal";
import DeleteModal from "./DeleteModal";
import DefaultAvatar from "assets/img/default-avatar.png";
import * as Utils from 'utils';

class MyEmployees extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      deleteModal: false,
      newOrUpdateModal: false,
      modalTitle: '',
      modalData: null
    }
    this.employees = [];
    this.getEmployees = this.getEmployees.bind(this);
  }

  componentWillMount() {
      this.props.getUserData();
      setTimeout(() => {
          this.getEmployees();
      }, 100);
  }

  getEmployees() {
    this.props.getEmployees({
      workingForId: this.props.workingForId
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.employees)
      this.employees = nextProps.employees;
  }

  searchHandler(name, event) {
    this.setState({ [name]: event.target.value });
    this.search(event.target.value.toLowerCase());
  };
  
  search(value) {
    let temp = this.props.employees.filter( employee => {
      return employee.name.toLowerCase().indexOf(value) !== -1
    });

    this.employees = temp;
  }

  // Open and close Delete modal
  onCloseDeleteModal() {
    this.setState({
      deleteModal: false
    })
  }
  onOpenDeleteModal(data) {
    this.setState({
      deleteModal: true,            
      modalData: data
    })
  }

  // Open and close NewOrUpdate modal
  onCloseNewOrUpdateModal() {
    this.setState({
      newOrUpdateModal: false
    })
  }
  onOpenNewOrUpdateModal(title, data=null) {
    console.log('data: ', data);
    this.setState({
      newOrUpdateModal: true,
      modalTitle: title,
      modalData: data
    })
  }

  render() {
    const { classes } = this.props;

    const buttons = data => {
      return (
          <div>
              <Button color="info" className={classes.actionButton} onClick={() => this.onOpenNewOrUpdateModal("Update Employee", data)}>
                  <Edit className={classes.icon} />
              </Button>                
              <Button color="danger" className={classes.actionButton} onClick={() => this.onOpenDeleteModal(data)}>
                  <Close className={classes.icon} />
              </Button>
          </div>                
      )
    }

    const avatar = src => {
      return (
        <div className={classes.picture}>
          <img
            src={'http://18.195.182.166/api/v1' + src}
            className={classes.picture_src}
            alt="..."
          />
        </div>
      )
    }

    let employees = [];
    this.employees.map(employee => {
      let temp = [];
      
      temp.push(employee.name);
      temp.push(employee.EmployeeInformation.position);
      temp.push(employee.EmployeeInformation.mobile);
      temp.push(employee.SSN);
      temp.push(avatar(employee.EmployeeInformation.picturePath));
      temp.push(employee.EmployeeInformation.licenseValidated? "Yes" : "No");
      temp.push(buttons(employee));

      employees.push(temp);
    })

    return (
      <Card>
        <CardHeader className={classes.pb_0}>
          <div className={classes.cardHeader}>
            <GridContainer>
                <GridItem xs={12} sm={6}>
                    <h3 className={classes.cardTitle}>My Employees</h3>
                </GridItem>
                <GridItem xs={12} sm={6} className={classes.text_right}>
                    <Button 
                        color="info" 
                        size="sm"
                        onClick={() => this.onOpenNewOrUpdateModal('New Employee')}
                    >                            
                        <Add /> Add Employee
                    </Button>
                </GridItem>
            </GridContainer>
          </div>
        </CardHeader>
        <CardBody className={classes.pt_0}>
          <GridContainer>
            <GridItem xs={3} sm={1} md={2} lg={1}>
              <FormLabel className={classes.labelHorizontal}>
                Search
              </FormLabel>
            </GridItem>
            <GridItem xs={9} sm={3} md={3} lg={2}>
              <CustomInput
                id="search"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "search",
                  onChange: event =>
                    this.searchHandler("search", event),
                  value: this.state.search               
                }}
              />
            </GridItem>
          </GridContainer>

          <Table
            tableHead={[
              "Name",
              "Position",
              "Phone Number",
              "Personalnr",
              "Avatar",
              "Verified",
              "Actions"
            ]}
            tableData={employees}
            customCellClasses={[
              classes.center,
              classes.center,
              classes.center,
              classes.center,
              classes.center,
              classes.center,
            ]}
            customClassesForCells={[0, 1, 2, 3, 4, 5]}
            customHeadCellClasses={[
              classes.center,
              classes.center,
              classes.center,
              classes.center,
              classes.center,
              classes.center,
            ]}
            customHeadClassesForCells={[0, 1, 2, 3, 4, 5]}
          />

          <DeleteModal 
            onOpen={this.state.deleteModal}
            onClose={this.onCloseDeleteModal.bind(this)}
            id={this.state.modalData? this.state.modalData.employeeId : null}
          />
           
          <NewOrUpdateModal 
            onOpen={this.state.newOrUpdateModal}
            onClose={this.onCloseNewOrUpdateModal.bind(this)}
            modalTitle={this.state.modalTitle}
            data={this.state.modalData}
          />

        </CardBody>
      </Card>
    );
  }
}

MyEmployees.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    workingForId  : state.user.workingForId,
    employees     : state.employees.employees
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserData : Actions.getUserData,
    getEmployees: Actions.getEmployees
  }, dispatch);
}

export default withStyles(myEmployeesStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(MyEmployees)));

