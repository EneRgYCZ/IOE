import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
import { HiMiniXMark } from "react-icons/hi2";

{
    /* Component to be used as basis modal for all forms or pop-up displays */
}
const FormModal = (props: { children: React.ReactNode; title?: string; open: boolean; onClose: () => void }) => {
    const modalStyle: React.CSSProperties = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        paddingBottom: "20px",
        overflowY: "auto",
        maxHeight: "80%",
        width: "600px",
        border: "1px solid #ccc",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    };

    const topBarStyle: React.CSSProperties = {
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 1000,
        padding: "15px"
    };

    const titleStyle: React.CSSProperties = {
        margin: "0px",
        textAlign: "center",
        paddingTop: "5px",
        fontSize: 18,
        fontWeight: 500
    };

    const closeButtonStyle: React.CSSProperties = {
        position: "absolute",
        right: "20px",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
        backgroundColor: "grey"
    };

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Box sx={modalStyle}>
                <Box style={topBarStyle}>
                    <Button sx={closeButtonStyle} onClick={props.onClose} variant="contained" color="error">
                        <HiMiniXMark />
                    </Button>
                    {props.title ? <h2 style={titleStyle}>{props.title}</h2> : ""}
                </Box>
                <Box style={{ padding: "20px" }}>{props.children}</Box>
            </Box>
        </Modal>
    );
};

export default FormModal;
