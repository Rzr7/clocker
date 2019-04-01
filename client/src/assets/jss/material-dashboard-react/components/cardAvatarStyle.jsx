import { hexToRgb, blackColor } from "assets/jss/material-dashboard-react.jsx";

const cardAvatarStyle = {
  cardAvatar: {
    "&$cardAvatarProfile img": {
      width: "100%",
      height: "auto",
      position: "relative",
      minWidth: "130px",
      minHeight: "130px"
    },
    "&$cardAvatarProfile a": {
      width: "130px",
      height: "130px",
      position: "relative",
      display: "block"
    }
  },
  cardAvatarProfile: {
    maxWidth: "130px",
    maxHeight: "130px",
    margin: "20px auto 0",
    borderRadius: "50%",
    overflow: "hidden",
    padding: "0",
    boxShadow:
      "0 16px 38px -12px rgba(" +
      hexToRgb(blackColor) +
      ", 0.56), 0 4px 25px 0px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 8px 10px -5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)",
    "&$cardAvatarPlain": {
      marginTop: "0"
    },
    cardAvatarOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
    }
  },
  cardAvatarPlain: {}
};

export default cardAvatarStyle;
