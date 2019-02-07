import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import productsStyle from "assets/jss/material-dashboard-pro-react/views/b2bshop/productsStyle.jsx";

import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  render() {
    const { classes } = this.props;
    const fillButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button color={prop.color} className={classes.actionButton} key={key}>
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    const simpleButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button
          color={prop.color}
          simple
          className={classes.actionButton}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    const roundButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button
          round
          color={prop.color}
          className={classes.actionButton + " " + classes.actionButtonRound}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardBody>
              <h3 className={classes.cardTitle}>ShoppingCart</h3>
              <Table
                tableHead={[
                  "",
                  "PRODUCT",
                  "PRICE",
                  "QTY",
                  "AMOUNT",
                  ""
                ]}
                tableData={[
                  [
                    <div className={classes.imgContainer}>
                      <img src={product1} alt="..." className={classes.img} />
                    </div>,
                    <span>
                      <a href="#jacket" className={classes.tdNameAnchor}>
                        Spring Jacket
                      </a>
                      <br />
                      <small className={classes.tdNameSmall}>
                        by Dolce&amp;Gabbana
                      </small>
                    </span>,
                    <span>
                      <small className={classes.tdNumberSmall}>€</small> 549
                    </span>,
                    <span>
                      1{` `}
                      <div className={classes.buttonGroup}>
                        <Button
                          color="info"
                          size="sm"
                          round
                          className={classes.firstButton}
                        >
                          <Remove className={classes.icon} />
                        </Button>
                        <Button
                          color="info"
                          size="sm"
                          round
                          className={classes.lastButton}
                        >
                          <Add className={classes.icon} />
                        </Button>
                      </div>
                    </span>,
                    <span>
                      <small className={classes.tdNumberSmall}>€</small> 549
                    </span>,
                    <Button
                      justIcon
                      round
                      color="danger"
                      size="sm"
                      className={classes.marginRight}
                    >
                      <Close className={classes.icons} />
                    </Button>
                  ],
                  [
                    <div className={classes.imgContainer}>
                      <img src={product2} alt="..." className={classes.img} />
                    </div>,
                    <span>
                      <a href="#jacket" className={classes.tdNameAnchor}>
                        Short Pants{" "}
                      </a>
                      <br />
                      <small className={classes.tdNameSmall}>by Pucci</small>
                    </span>,
                    <span>
                      <small className={classes.tdNumberSmall}>€</small> 499
                    </span>,
                    <span>
                      2{` `}
                      <div className={classes.buttonGroup}>
                        <Button
                          color="info"
                          size="sm"
                          round
                          className={classes.firstButton}
                        >
                          <Remove className={classes.icon} />
                        </Button>
                        <Button
                          color="info"
                          size="sm"
                          round
                          className={classes.lastButton}
                        >
                          <Add className={classes.icon} />
                        </Button>
                      </div>
                    </span>,
                    <span>
                      <small className={classes.tdNumberSmall}>€</small> 549
                    </span>,
                    <Button
                      justIcon
                      round
                      color="danger"
                      size="sm"
                      className={classes.marginRight}
                    >
                      <Close className={classes.icons} />
                    </Button>
                  ],
                  [
                    <div className={classes.imgContainer}>
                      <img src={product3} alt="..." className={classes.img} />
                    </div>,
                    <span>
                      <a href="#jacket" className={classes.tdNameAnchor}>
                        Pencil Skirt
                      </a>
                      <br />
                      <small className={classes.tdNameSmall}>
                        by Valentino
                      </small>
                    </span>,
                    <span>
                      <small className={classes.tdNumberSmall}>€</small> 799
                    </span>,
                    <span>
                      1{` `}
                      <div className={classes.buttonGroup}>
                        <Button
                          color="info"
                          size="sm"
                          round
                          className={classes.firstButton}
                        >
                          <Remove className={classes.icon} />
                        </Button>
                        <Button
                          color="info"
                          size="sm"
                          round
                          className={classes.lastButton}
                        >
                          <Add className={classes.icon} />
                        </Button>
                      </div>
                    </span>,
                    <span>
                      <small className={classes.tdNumberSmall}>€</small> 549
                    </span>,
                    <Button
                      justIcon
                      round
                      color="danger"
                      size="sm"
                      className={classes.marginRight}
                    >
                      <Close className={classes.icons} />
                    </Button>
                  ],
                  {
                    total: true,
                    colspan: "3",
                    amount: (
                      <span>
                        <small>€</small>2,346
                      </span>
                    )
                  },
                  {
                    purchase: true,
                    colspan: "3",
                    col: {
                      colspan: 3,
                      text: (
                        <Button color="info" round>
                          Complete Purchase{" "}
                          <KeyboardArrowRight className={classes.icon} />
                        </Button>
                      )
                    }
                  }
                ]}
                tableShopping
                customHeadCellClasses={[
                  classes.center,
                  classes.center,
                  classes.center,
                  classes.right
                ]}
                customHeadClassesForCells={[0, 2, 3, 4, 5]}
                customCellClasses={[
                  classes.tdName,
                  classes.tdNumber + " " + classes.center,
                  classes.tdNumber + " " + classes.tdNumberAndButtonGroup + " " + classes.center,
                  classes.tdNumber + " " + classes.right,
                ]}
                customClassesForCells={[1, 2, 3, 4]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(productsStyle)(ShoppingCart);