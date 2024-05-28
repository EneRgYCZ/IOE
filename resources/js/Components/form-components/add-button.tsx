import React from "react";
import {Box, Fab} from "@mui/material";

const AddButton = (props: {
    label: string;
    onClick: () => void;
}) => {
    const addButtonBox = {
        position: "fixed",
        width: "250px",
        pointerEvents: "none",
        bottom: 16,
        right: 16
    };

    const addButtonStyle = {
        display: "block",
        pointerEvents: "initial",
        marginTop: "16px",
        marginLeft: "auto"
    };

    return (
        <Box sx={addButtonBox}>
            <Fab
                variant="extended"
                color="primary"
                sx={addButtonStyle}
                onClick={props.onClick}
            >
                {props.label}
            </Fab>
        </Box>
    );
};

export default AddButton;
