/**
 * Description: Modal to add salon
 * Date: 1/29/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import { FormattedMessage } from 'react-intl';

import commonModalStyle from "assets/jss/material-dashboard-pro-react/views/commonModalStyle.jsx";

import * as Validator from "utils/validator";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class AddSalonModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameState: "",
            email: "",
            emailState: "",
            telephone: "",
            telephoneState: "",
            website: "",
            websiteState: "",
            description: "",
            descriptionState: "",
            address: "",
            addressState: "",
            zip: "",
            zipState: "",
            city: "",
            cityState: "",
            country: "Sweden",
            countryState: "success",
            hasPark: false
        }
        this.save = this.save.bind(this);
    }

    initState() {
        this.setState({
            name: "",
            nameState: "",
            email: "",
            emailState: "",
            telephone: "",
            telephoneState: "",
            website: "",
            websiteState: "",
            description: "",
            descriptionState: "",
            address: "",
            addressState: "",
            zip: "",
            zipState: "",
            city: "",
            cityState: "",
            country: "Sweden",
            countryState: "success",
            hasPark: false
        })
    }

    handleClose() {
        this.initState();
        this.props.onClose();
    }

    save() {
        this.props.addSalon({
            workingForId: this.props.workingForId,
            email: this.state.email,
            name: this.state.name,
            telephone: this.state.telephone,
            description: this.state.description,
            parking: this.state.hasPark,
            accessibility: this.state.access,
            website: this.state.website,
            address: this.state.address,
            post: this.state.zip,
            city: this.state.city,
            country: this.state.country
        })
        this.initState();
        this.props.onClose();
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "name":
            case "description":
            case "address":
            case "city":
            case "zip":
            case "country":
                console.log('test: ', event.target.value)
                this.setState({
                    [stateName]: event.target.value
                })
                if (Validator.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "email":
                this.setState({
                    email: event.target.value
                })
                if (Validator.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "" });
                }
                break;
            case "telephone":
                this.setState({
                    telephone: event.target.value
                })
                if (Validator.verifyPhone(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "" });
                }
                break;
            case "website":
                this.setState({
                    website: event.target.value
                })
                if (Validator.verifyUrl(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "" });
                }
                break;
            default:
                break;
        }
    }
    toggleCheck(event, stateName) {
        this.setState({ [stateName]: event.target.checked });
    }

    canSave() {
        if(this.state.nameState === "success" && 
            this.state.descriptionState === "success" && 
            this.state.addressState === "success" && 
            this.state.zipState === "success" && 
            this.state.cityState === "success" && 
            this.state.countryState === "success"
            ) {
            return false;
        } else {
            return true;
        }
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
                aria-labelledby="add-salon-modal-title"
                aria-describedby="add-salon-modal-description"
            >
                <DialogTitle
                    id="add-salon-modal-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <h3 className={classes.modalTitle}><FormattedMessage id="salons.add_salon_btn" defaultMessage="Lägg till salong" /></h3>
                </DialogTitle>
                <DialogContent
                    id="add-salon-modal-description"
                    className={classes.modalBody}
                >
                    <form>
                        <CustomInput
                            success={this.state.nameState === "success"}
                            error={this.state.nameState === "error"}
                            labelText=
                                {
                                    <div>
                                        <FormattedMessage id="common.name" defaultMessage="Namn" /> *
                                    </div>
                                }
                            id="name"
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
                                    this.change(event, "name", "name", 1),
                                type: "text",
                                value: this.state.name
                            }}
                        />
                        <CustomInput
                            success={this.state.emailState === "success"}
                            error={this.state.emailState === "error"}
                            labelText=
                                {
                                    <FormattedMessage id="common.email" defaultMessage="e-post" />
                                }
                            id="email"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: event =>
                                    this.change(event, "email", "email", 1),
                                type: "text",
                                value: this.state.email
                            }}
                        />
                        <CustomInput
                            success={this.state.telephoneState === "success"}
                            error={this.state.telephoneState === "error"}
                            labelText=
                                {
                                    <FormattedMessage id="common.tel" defaultMessage="Telefonnummer" />
                                }
                            id="telephone"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: event =>
                                    this.change(event, "telephone", "telephone", 1),
                                type: "text",
                                value: this.state.telephone
                            }}
                        />
                        <CustomInput
                            success={this.state.websiteState === "success"}
                            error={this.state.websiteState === "error"}
                            labelText=
                                {
                                    <FormattedMessage id="info.website" defaultMessage="Hemsida" />
                                }
                            id="web-site"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: event =>
                                    this.change(event, "website", "website", 1),
                                type: "text",
                                value: this.state.website
                            }}
                        />
                        <CustomInput
                            success={this.state.descriptionState === "success"}
                            error={this.state.descriptionState === "error"}
                            labelText=
                                {
                                    <div>
                                        <FormattedMessage id="info.about" defaultMessage="Salongsbeskrivning" /> *
                                    </div>
                                }
                            id="description"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 3,
                                endAdornment:
                                    this.state.descriptionState === "error" ? (
                                    <InputAdornment position="end">
                                        <Warning className={classes.danger} />
                                    </InputAdornment>
                                    ) : (
                                    undefined
                                ),
                                onChange: event =>
                                    this.change(event, "description", "description", 1),
                                type: "text",
                                value: this.state.description
                            }}
                        />
                        <GridContainer>
                            <GridItem xs={12} sm={7}>
                                <CustomInput
                                    success={this.state.addressState === "success"}
                                    error={this.state.addressState === "error"}
                                    labelText=
                                        {
                                            <div>
                                                <FormattedMessage id="common.address" defaultMessage="Adress" /> *
                                            </div>    
                                        }
                                    id="address"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        endAdornment:
                                            this.state.addressState === "error" ? (
                                            <InputAdornment position="end">
                                                <Warning className={classes.danger} />
                                            </InputAdornment>
                                            ) : (
                                            undefined
                                        ),
                                        onChange: event =>
                                            this.change(event, "address", "address", 1),
                                        type: "text",
                                        value: this.state.address
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={5}>
                                <CustomInput
                                    success={this.state.zipState === "success"}
                                    error={this.state.zipState === "error"}
                                    labelText=
                                        {
                                            <div>
                                                <FormattedMessage id="common.zip" defaultMessage="Postnr." /> *
                                            </div>    
                                        }
                                    id="zip"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        endAdornment:
                                            this.state.zipState === "error" ? (
                                            <InputAdornment position="end">
                                                <Warning className={classes.danger} />
                                            </InputAdornment>
                                            ) : (
                                            undefined
                                        ),
                                        onChange: event =>
                                            this.change(event, "zip", "zip", 1),
                                        type: "number",
                                        value: this.state.zip
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <CustomInput
                            success={this.state.cityState === "success"}
                            error={this.state.cityState === "error"}
                            labelText=
                                {
                                    <div>
                                        <FormattedMessage id="common.city" defaultMessage="Postort" /> *
                                    </div>    
                                }
                            id="city"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                endAdornment:
                                    this.state.cityState === "error" ? (
                                    <InputAdornment position="end">
                                        <Warning className={classes.danger} />
                                    </InputAdornment>
                                    ) : (
                                    undefined
                                ),
                                onChange: event =>
                                    this.change(event, "city", "city", 1),
                                type: "text",
                                value: this.state.city
                            }}
                        />
                        <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                        >
                            <InputLabel
                                htmlFor="country-select"
                                className={this.state.country? classes.selectLabel + " " + classes.success : classes.selectLabel}
                            >
                                <FormattedMessage id="common.country" defaultMessage="Land" /> *
                            </InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                classes={{
                                    select: classes.select + " " + classes.left
                                }}
                                value={this.state.country}
                                onChange={event =>
                                    this.change(event, "country", "country", 1)}
                                inputProps={{
                                    name: "countrySelect",
                                    id: "country-select"
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem
                                    }}
                                >
                                    <FormattedMessage id="common.country" defaultMessage="Land" />
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value="Sweden"
                                >
                                    Sverige
                                </MenuItem>
                        </Select>
                    </FormControl>
                    <GridContainer>
                        <GridItem xs={12} className={classes.left}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onClick={event =>
                                            this.toggleCheck(event, "hasPark")
                                        }
                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                        icon={<Check className={classes.uncheckedIcon} />}
                                        classes={{
                                            checked: classes.checked,
                                            root: classes.checkRoot
                                        }}
                                        checked={this.state.hasPark}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label={
                                    <div>
                                        <FormattedMessage id="info.parking" defaultMessage="Har salongen Parkering" />?
                                    </div>
                                }
                            />
                        </GridItem>
                        <GridItem xs={12} className={classes.left}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onClick={event =>
                                            this.toggleCheck(event, "access")
                                        }
                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                        icon={<Check className={classes.uncheckedIcon} />}
                                        classes={{
                                            checked: classes.checked,
                                            root: classes.checkRoot
                                        }}
                                        checked={this.state.access}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label={
                                    <div>
                                        <FormattedMessage id="info.accessiblity" defaultMessage="Tillgänglighetsanpassat" />?
                                    </div>
                                }
                            />
                        </GridItem>
                    </GridContainer>
                </form>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                    <Button 
                        color="danger"
                        size="sm"
                        onClick={() => this.handleClose()}
                    >
                        <FormattedMessage id="common.cancel" defaultMessage="Avbryt" />
                    </Button>
                    <Button
                        onClick={() => this.save()}
                        color="info"
                        size="sm"
                        disabled={this.canSave()}
                    >
                        <FormattedMessage id="common.save" defaultMessage="Spara" />
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AddSalonModal.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId    : state.auth.workingForId
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addSalon:   Actions.addSalon,
    }, dispatch);
}

export default withStyles(commonModalStyle)(withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSalonModal)));