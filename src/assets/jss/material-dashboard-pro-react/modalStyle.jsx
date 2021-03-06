/**
 * Description: Modal Style
 * Date: 4/24/2019
 */

import {
  infoColor,
  dangerColor
} from "assets/jss/material-dashboard-pro-react.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const modalStyle = theme => ({
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,

  modalRoot: {
    overflow: "auto",
    alignItems: "unset",
    justifyContent: "unset"
  },
  modal: {
    [theme.breakpoints.up("sm")]: {
      width: "450px",
      margin: "1.75rem auto"
    },
    marginHorizontal: 'auto',
    borderRadius: "6px",
    marginTop: "130px !important",
    overflow: "visible",
    maxHeight: "unset",
    position: "relative",
    height: "fit-content"
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px"
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.42857143",
    color: infoColor,
    fontWeight: '500'
  },
  modalBody: {
    paddingTop: "16px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
    overflow: "visible"
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0"
  },
  between: {
    justifyContent: 'space-between !important'
  },
  left: {
    textAlign: 'left'
  },
  center: {
    textAlign: 'center'
  },
  right: {
    textAlign: 'right'
  },  
  warning_icon: {
    fontSize: '72px',
    color: dangerColor + " !important"
  },
  mt_0: {
    marginTop: '0px',
  },
  switchIconChecked: {
    borderColor: infoColor,
    transform: "translateX(0px)!important"
  },
  switchChecked: {
    "& + $switchBar": {
      backgroundColor: infoColor + " !important"
    }
  },

  modalCloseButton: {
    color: "#999999",
    marginTop: "-12px",
    WebkitAppearance: "none",
    padding: "0",
    cursor: "pointer",
    background: "0 0",
    border: "0",
    fontSize: "inherit",
    opacity: ".9",
    textShadow: "none",
    fontWeight: "700",
    lineHeight: "1",
    float: "right"
  },
  modalClose: {
    width: "16px",
    height: "16px"
  },
  modalFooterCenter: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  instructionNoticeModal: {
    marginBottom: "25px"
  },
  imageNoticeModal: {
    maxWidth: "150px"
  },
  modalSmall: {
    width: "300px"
  },
  modalSmallBody: {
    paddingTop: "0"
  },
  modalSmallFooterFirstButton: {
    margin: "0",
    paddingLeft: "16px",
    paddingRight: "16px",
    width: "auto"
  },
  modalSmallFooterSecondButton: {
    marginBottom: "0",
    marginLeft: "5px"
  },
  
  actionButton: {
    margin: "0 0 0 5px",
    padding: "5px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0px"
    }
  },

  datePickerLabel: {
    top: '-7px',
    color: 'rgba(0, 0, 0, 0.54) !important',
    fontSize: '11px',
    fontWeight: '400'
  },
  danger: {
    color: dangerColor
  },
  key: {
    textAlign: 'right',
    [theme.breakpoints.down("sm")]: {      
      textAlign: 'left',
    }
  },
  externalSite: {
    padding: '0',
    margin: '0',
    color: '#000',
    textTransform: 'lowercase',    
    "&:hover": {
      color: '#000',
    }
  },
  bookingLink: {
    borderBottom: '1px solid ' + infoColor,
    marginTop: '0'
  },

  loadingContainer: {
    padding: '30px 0',
  },
  loading: {
    color: infoColor
  }
});

export default modalStyle;
