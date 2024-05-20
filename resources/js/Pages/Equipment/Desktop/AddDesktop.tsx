import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import DesktopForm from "@/Components/Equipment/DesktopForm";
import { DesktopPC, Employee } from "@/types";
import ErrorBox from "@/Components/ErrorBox";

const AddDesktop = (props: { isOpen: boolean; handleClose: () => void; employees: Employee[] }) => {
    const initialValues: DesktopPC = {
        full_number_identifier: "",
        pc_number: "",
        location: "",
        side: "",
        double_pc: false,
        needs_dock: false,
        status: "",
        floor: undefined,
        island_number: undefined,
        workspace_type: "",
        updated_in_q1: false,
        remarks: "",
        employee_id: null
    };

    const { data, setData, post, hasErrors, errors, clearErrors } = useForm(initialValues);

    const submit = () => {
        post(route("equipment.storeDesktop"), {
            onSuccess: () => {
                setData(initialValues);
                props.handleClose();
            }
        });
    };

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflowY: "auto",
        maxHeight: "80%",
        backgroundColor: "white",
        padding: "20px"
    };

    return (
        <Modal open={props.isOpen} onClose={props.handleClose}>
            <Box sx={modalStyle}>
                <Typography variant="h5" gutterBottom>
                    Add Desktop
                </Typography>
                <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
                <DesktopForm data={data} setData={setData} onSubmit={submit} employees={props.employees} />
            </Box>
        </Modal>
    );
};
export default AddDesktop;
