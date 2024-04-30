import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import LaptopForm from "@/Components/Equipment/LaptopForm";
import { Laptop } from "@/types";

const AddLaptop = (props: { isOpen: boolean; handleClose: () => void }) => {
    const initialValues: Laptop = {
        serial_number: "",
        status: "",
        floor: undefined,
        island_number: undefined,
        workspace_type: "",
        updated_in_q1: false,
        employee_id: undefined
    };

    const { data, setData, post } = useForm(initialValues);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("equipment.storeLaptop"));
        setData(initialValues);
    };

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px"
    };

    return (
        <Modal open={props.isOpen} onClose={props.handleClose}>
            <Box sx={modalStyle}>
                <Typography variant="h5" gutterBottom>
                    Add Laptop
                </Typography>
                <LaptopForm data={data} setData={setData} onSubmit={submit} />
            </Box>
        </Modal>
    );
};
export default AddLaptop;
