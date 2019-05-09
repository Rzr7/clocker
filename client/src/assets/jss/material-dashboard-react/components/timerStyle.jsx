import tooltipStyle from "assets/jss/material-dashboard-react/tooltipStyle.jsx";
const timerStyle = {
    ...tooltipStyle,
    timerText: {
        fontSize: "21px",
        paddingLeft: "25px !important",
        paddingRight: "25px !important",
        lineHeight: "50px",
    },
    timerCategory: {
        fontSize: "16px",
        lineHeight: "50px",
    },
    timerWrapper: {
        height: "50px !important",
        marginTop: "15px",
        marginBottom: "15px",
        position: "relative" 
    },
    timerStartBtn: {
        position: "absolute !important",
        right: "7px",
        top: "1px",
    },
    timerTextWrapper: {
        display: "flex",
    },
    timerActive: {
        background: "rgba(116, 199, 116, 0.38)"
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
    timerEnd: {
        textAlign: "left",
        paddingLeft: "50px"
    },
    timerTimeHover: {
        "&:hover": {
            cursor: "pointer",
            color: "#f50056",
        }
    },
    timerPaper: {
        "&:hover": {
            background: "rgba(0, 0, 0, 0.05)"
        }
    },
    timerDay: {
        paddingRight: "25px"
    },
    hidden: {
        display: "none"
    },
    timerControls: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "rgba(134, 134, 134, 0.5)",
        paddingLeft: "25px",
        "& svg": {
            cursor: "pointer",
            marginLeft: "10px",
            marginRight: "10px"
        }
    },
    timerTime: {
        textAlign: "right",
        lineHeight: "50px",
        fontWeight: "600",
    },
    timerInput: {
        fontSize: "21px",
        marginTop: "0px !important"
    },
};
export default timerStyle;