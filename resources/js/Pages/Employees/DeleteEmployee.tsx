import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, TextField } from "@mui/material";
import { useForm, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { Employee } from "../../types/index";

const DeleteEmployee = (props: { isOpen: boolean; handleClose: () => void; employee: Employee}) => {

    const modalStyle: React.CSSProperties = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        width: "400px",
        height: "200px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
    };

    const closeButtonStyle: React.CSSProperties = {
        position: "absolute",
        top: "5px",
        right: "4px",
        width: "10px !important",
        height: "30px",
        backgroundColor: "red",
        border: "none",
        borderRadius: "10%",
        color: "white",
        fontSize: "18px",
        cursor: "pointer"
    };

    return (
        <Modal open={props.isOpen} onClose={props.handleClose}>
            <Box sx={modalStyle}>
                    <Button sx={closeButtonStyle} onClick={props.handleClose}>
                        X
                    </Button>

                    <h2 style={{ margin: "0px" , padding:"35px"}}>Are you sure you would like to delete this entry?</h2>
                
                    <Button variant="contained" color="error" onClick={()=>props.handleClose()}>
                        <Link href={route("employees.destroy",props.employee.id)} method="delete">
                           DELETE
                        </Link>
                    </Button>
            </Box>
        </Modal>
    );
};

export default DeleteEmployee;
