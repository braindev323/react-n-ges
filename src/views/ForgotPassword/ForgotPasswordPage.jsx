/**
 * Description: Login Page
 * Date: 12/24/2018
 */

import React from "react";
import PropTypes from "prop-types";

import {Link} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import VpnKey from "@material-ui/icons/VpnKey";
import Warning from "@material-ui/icons/Warning";
import AddAlert from "@material-ui/icons/AddAlert";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import Loader from 'react-loader-spinner';

import * as Validator from "./../../validator";

import forgotPasswordPageStyle from "assets/jss/material-dashboard-pro-react/views/forgotPasswordPageStyle";

import logo from "assets/img/logo.png";

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
      email: "",
      emailState: "",
      alert: false,
      message: "",
      loading: false
    }
    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props: ', nextProps)
    this.setState({
      loading: false
    })
    if(nextProps.status) {
      this.setState({
        alert: true,
        message: "Please check your email. Then you can set your password."
      });
      setTimeout(() => {
        this.setState({
          alert: false
        })
      }, 3000);
    }
    if(nextProps.errorMsg) {
      this.setState({
        alert: true,
        message: nextProps.errorMsg
      })
      setTimeout(() => {
        this.setState({
          alert: false
        })
      }, 3000);
    }
  }

  change(event, stateName, type) {
    switch (type) {
      case "email":
        this.setState({
          email: event.target.value
        })
        if (Validator.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else if(Validator.verifyEmail(event.target.value) === "") {
          this.setState({ [stateName + "State"]: "" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
  }

  canSubmit() {
    if(this.state.emailState === "success") {
      return false
    } else {
      return true
    }
  }

  submit() {
    this.setState({
      loading: true
    });
    this.props.forgotPassword({
      email: this.state.email
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={6} lg={5}>
            <Card className={classes.cardSignin}>
              <CardHeader className={classes.center}>
                <img src={logo} height={54} alt="logo" />
              </CardHeader>
              <CardBody className={classes.pb_0}>
                <form className={classes.form}>
                  <CustomInput
                    success={this.state.emailState === "success"}
                    error={this.state.emailState === "error"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}
                        >
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      endAdornment:
                        this.state.emailState === "error" ? (
                          <InputAdornment position="end">
                            <Warning className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                      ),
                      type: "email",
                      placeholder: "Email*",
                      onChange: event =>
                        this.change(event, "email", "email"),
                      value: this.state.email
                    }}
                  />
                  <div className={classes.center}>
                    <Button color="info" className={classes.w_100_p} onClick={this.submit} disabled={this.canSubmit()}>
                      Send
                    </Button>   
                    <div className={classes.pt_15}>
                      <Link className={classes.link} to="/login">Sign In</Link>
                    </div>
                  </div>
                </form>
                {
                  this.state.loading? (
                    <div className={classes.spinner_container}>                    
                      <Loader 
                        type="Oval"
                        color="#00acc1"
                        height="40"	
                        width="40"
                      />
                    </div> 
                  ) : undefined
                }
                <Snackbar
                  place="tc"
                  color="info"
                  icon={AddAlert}
                  message={this.state.message}
                  open={this.state.alert}
                  closeNotification={() => this.setState({ alert: false })}
                  close
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    status: state.auth.status,
    errorMsg: state.auth.errorMsg
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      forgotPassword: Actions.forgotPassword
    }, dispatch);
}

export default withStyles(forgotPasswordPageStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage)));