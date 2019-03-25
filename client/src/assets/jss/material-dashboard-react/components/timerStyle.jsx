import tooltipStyle from "assets/jss/material-dashboard-react/tooltipStyle.jsx";
const timerStyle = {
    ...tooltipStyle,
    timerText: {
        fontSize: "21px",
        paddingLeft: "25px !important",
        paddingRight: "25px !important",
        lineHeight: "50px",
    },
    timerWrapper: {
        height: "50px !important"
    },
    timerStartBtn: {
        position: "absolute !important",
        right: "7px",
        top: "13px",
    },
    timerTextWrapper: {
        display: "flex",
    },
    timerTitle: {
        fontWeight: "500",
    },
    timerDate: {
        textAlign: "right",
        lineHeight: "50px",
        fontWeight: "600",
        color: "#a0a0a0"
    },
    timerDay: {
        paddingRight: "25px"
    },
    timerTime: {
        textAlign: "right",
        lineHeight: "50px",
        fontWeight: "600",
    },
};
export default timerStyle;