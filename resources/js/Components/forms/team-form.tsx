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
        padding: "20px",
        overflowY: "auto",
        maxHeight: "80%",
        width: "500px",
        border: "1px solid #ccc",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    };

    const closeButtonStyle: React.CSSProperties = {
        position: "absolute",
        top: "5px",
        right: "4px",
        border: "none",
        fontSize: "20px",
        cursor: "pointer"
    };

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Box sx={modalStyle}>
                <Button sx={closeButtonStyle} onClick={props.onClose} variant="contained" color="error">
                    <HiMiniXMark />
                </Button>
                {props.title ? <h2 style={{ margin: "0px", textAlign: "center" }}>{props.title}</h2> : ""}
                {props.children}
            </Box>
        </Modal>
    );
};

export default FormModal;
