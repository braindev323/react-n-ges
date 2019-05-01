/**
 * Descirption: Edit check in/out modal
 * Date: 5/1/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
import moment from 'moment';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";
import * as Validator from "utils/validator";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class EditCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkInEditableDate : "",
            checkInEditableTime : "",
            checkOutEditableDate: "",
            checkOutEditableTime: "",
            editComment         : "",
            editCommentState    : ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data) {
            console.log('data: ', nextProps.data);
            this.setState({
                checkInEditableDate: nextProps.data.checkInEditable? moment(nextProps.data.checkInEditable).format("YYYY-MM-DD") : "",
                checkInEditableTime: nextProps.data.checkInEditable? moment(nextProps.data.checkInEditable).format("HH:mm") : "",
                checkOutEditableDate: nextProps.data.checkOutEditable? moment(nextProps.data.checkOutEditable).format("YYYY-MM-DD HH:mm") : "",
                checkOutEditableTime: nextProps.data.checkOutEditable? moment(nextProps.data.checkOutEditable).format("HH:mm") : "",
                editComment: nextProps.data.editComment? nextProps.data.editComment : ""
            })
        }
    }

    initState() {
        this.setState({
            checkInEditableDate : "",
            checkInEditableTime : "",
            checkOutEditableDate: "",
            checkOutEditableTime: "",
            editComment         : "",
            editCommentState    : ""
        })
    }

    handleClose() {
        this.initState();
        this.props.onClose();
    }

    save() {
        this.props.updateCheckInOut({
            workingForId: this.props.workingForId,
            personnelListId: this.props.data.personnelListId,
            checkInEditable: this.state.checkInEditableDate + " " + this.state.checkInEditableTime + ":00",
            checkOutEditable: this.state.checkOutEditableDate + " " + this.state.checkOutEditableTime + ":00",
            editComment: this.state.editComment                  
        })
        this.handleClose();
    }

    changeForm(event, stateName, type, length) {
        switch (type) {
            case "checkInEditableDate":
            case "checkOutEditableDate":
                if(!moment(event._d).isSame(moment())) {
                    this.setState({ [stateName]: moment(event._d).format("YYYY-MM-DD"), [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName]: "", [stateName + "State"]: "error" });
                }
                break;
            case "checkInEditableTime":
            case "checkOutEditableTime":
                if(!moment(event._d).isSame(moment())) {
                    this.setState({ [stateName]: moment(event._d).format("HH:mm"), [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName]: "", [stateName + "State"]: "error" });
                }
                break;
            case "editComment":
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, length)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    canSave() {
        return false;
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                classes={{
                    root: classes.center + " " + classes.modalRoot,
                    paper: classes.modal
                }}
                open={this.props.onOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => this.handleClose()}
                aria-labelledby="check-in-out-edit-modal-title"
                aria-describedby="check-in-out-edit-modal-description"
                >
                <DialogTitle
                    id="check-in-out-edit-modal-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}>CheckIn/Out Edit</h3>
                </DialogTitle>
                <DialogContent
                    id="check-in-out-edit-modal-description"
                    className={classes.modalBody}
                >
                    <form> 
                        <GridContainer>
                            <GridItem xs={7}>        
                                <FormControl fullWidth style={{paddingTop: '27px', marginBottom: '17px',}}>
                                    <Datetime
                                        dateFormat={"DD/MM/YYYY"}
                                        timeFormat={false}
                                        inputProps={{ placeholder: "CheckInDate" }}
                                        value={this.state.checkInEditableDate}
                                        onChange={event => this.changeForm(event, "checkInEditableDate", "checkInEditableDate")}
                                    />
                                </FormControl> 
                            </GridItem>
                            <GridItem xs={5}>        
                                <FormControl fullWidth style={{paddingTop: '27px', marginBottom: '17px',}}>
                                    <Datetime
                                        dateFormat={false}
                                        timeFormat={"HH:mm"}
                                        inputProps={{ placeholder: "CheckInTime" }}
                                        value={this.state.checkInEditableTime}
                                        onChange={event => this.changeForm(event, "checkInEditableTime", "checkInEditableTime")}
                                    />
                                </FormControl> 
                            </GridItem><GridItem xs={7}>        
                                <FormControl fullWidth style={{paddingTop: '27px', marginBottom: '17px',}}>
                                    <Datetime
                                        dateFormat={"DD/MM/YYYY"}
                                        timeFormat={false}
                                        inputProps={{ placeholder: "CheckOutDate" }}
                                        value={this.state.checkOutEditableDate}
                                        onChange={event => this.changeForm(event, "checkOutEditableDate", "checkOutEditableDate")}
                                    />
                                </FormControl> 
                            </GridItem>
                            <GridItem xs={5}>        
                                <FormControl fullWidth style={{paddingTop: '27px', marginBottom: '17px',}}>
                                    <Datetime
                                        dateFormat={false}
                                        timeFormat={"HH:mm"}
                                        inputProps={{ placeholder: "CheckOutTime" }}
                                        value={this.state.checkOutEditableTime}
                                        onChange={event => this.changeForm(event, "checkOutEditableTime", "checkOutEditableTime")}
                                    />
                                </FormControl> 
                            </GridItem>
                        </GridContainer>       
                        <CustomInput
                            success={this.state.nameState === "success"}
                            error={this.state.nameState === "error"}
                            labelText="Comment"
                            id="comment"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                endAdornment:
                                    this.state.nameState === "error" ? (
                                    <InputAdornment position="end">
                                        <Warning className={classes.danger} />
                                    </InputAdornment>
                                    ) : (
                                    undefined
                                ),
                                onChange: event =>
                                    this.changeForm(event, "editComment", "editComment", 1),
                                type: "text",
                                value: this.state.editComment
                            }}
                        />                           
                </form>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                    <Button 
                        color="danger"
                        size="sm"
                        onClick={() => this.handleClose()}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => this.save()}
                        color="info"
                        size="sm"
                        disabled={this.canSave()}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

EditCheck.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId: state.auth.workingForId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateCheckInOut: Actions.updateCheckInOut
    }, dispatch);
}

export default withStyles(modalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCheck)));
