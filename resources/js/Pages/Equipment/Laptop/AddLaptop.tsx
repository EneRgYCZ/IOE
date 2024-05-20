import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import LaptopForm from "@/Components/Equipment/LaptopForm";
import { Employee, Laptop } from "@/types";
import ErrorBox from "@/Components/ErrorBox";

const AddLaptop = (props: { isOpen: boolean; handleClose: () => void; employees: Employee[] }) => {
    const initialValues: Laptop = {
        full_number_identifier: "",
        laptop_number: "",
        location: "",
        side: "",
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
        post(route("equipment.storeLaptop"), {
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
                    Add Laptop
                </Typography>
                <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
                <LaptopForm data={data} setData={setData} onSubmit={submit} employees={props.employees} />
            </Box>
        </Modal>
    );
};
export default AddLaptop;
