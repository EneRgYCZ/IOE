import React from "react";
import { Button } from "@mui/material";
import { Link } from "@inertiajs/react";
import { Employee } from "@/types";
import FormModal from "@/Components/form/form-modal";

const DeleteEmployee = (props: { isOpen: boolean; handleClose: () => void; employee: Employee }) => {
    return (
        <FormModal open={props.isOpen} onClose={props.handleClose}>
            <h2 style={{ margin: "0px", padding: "35px" }}>Are you sure you would like to delete this entry?</h2>

            <Button variant="contained" color="error" onClick={() => props.handleClose()}>
                <Link href={route("employees.destroy", props.employee.id)} method="delete">
                    DELETE
                </Link>
            </Button>
        </FormModal>
    );
};

export default DeleteEmployee;
