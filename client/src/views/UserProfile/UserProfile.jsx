import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Icon from '@material-ui/core/Icon';

import { uploadFile, modifyProfile } from 'util/APIUtils';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cardAvatarOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "none",
    justifyContent: "center",
    alignItems: "center"
  },
  iconHover: {
    color: "rgba(255, 255, 255, 1)",
    '&:hover': {
      color: "rgba(255, 255, 255, 1)",
    },
  },
};



function UserProfile(props) {
  const { classes } = props;

  function handleUploadFile(event) {
    event.preventDefault();
    const data = new FormData();
    //using File API to get chosen file
    let file = event.target.files[0];
    console.log("Uploading file", event.target.files[0]);
    data.append('file', event.target.files[0]);
    //calling async Promise and handling response or error situation
    uploadFile(data).then((response) => {
        console.log("File " + file.name + " is uploaded");
        document.getElementById("user_avatar").src = response.fileDownloadUri;
    }).catch(function (error) {
        console.log(error);
        if (error.response) {
            //HTTP error happened
            console.log("Upload error. HTTP error/status code=",error.response.status);
        } else {
            //some other error happened
           console.log("Upload error. HTTP error/status code=",error.message);
        }
    });
  };

  function upload(event) {
    event.preventDefault();
    document.getElementById("avatar_upload").click()
  }

  function handleHoverOnAvatar(mouseIn) {
    if (mouseIn) {
      document.getElementById("avatar_overlay").style.display = "flex";
    } else {
      document.getElementById("avatar_overlay").style.display = "none";
    }
  }

  function updateProfile(e) {
    e.preventDefault();
    
    var data = {
      email: document.getElementById("email").value,
      name: document.getElementById("name").value,
      new_password: document.getElementById("new_password").value,
      confirm_password: document.getElementById("confirm_password").value,
    };

    modifyProfile(data);
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <CardAvatar profile>
                  <input type="file" id="avatar_upload" style={{display: 'none'}} onChange={e => handleUploadFile(e)} />
                  <a href="#avatar" onMouseEnter={e => handleHoverOnAvatar(true)} onMouseLeave={e => handleHoverOnAvatar(false)} className={classes.iconHover} onClick={e => upload(e)}>
                    <img src={props.currentUser !== null ? props.currentUser.avatar : ''} id="user_avatar" alt="User Avatar" />
                    <div id="avatar_overlay" className={classes.cardAvatarOverlay}>
                    <Icon style={{ fontSize: 42 }}>
                      photo_camera
                    </Icon>
                    </div>
                  </a>
                </CardAvatar>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Email address"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: props.currentUser !== null ? props.currentUser.email : ''
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: props.currentUser !== null ? props.currentUser.name : ''
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="New Password"
                    id="new_password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Confirm Password"
                    id="confirm_password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password"
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={e => updateProfile(e)}>Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(UserProfile);
