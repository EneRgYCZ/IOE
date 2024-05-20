import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import MeetingRoomLaptopForm from "@/Components/Equipment/MeetingRoomLaptopForm";
import { MeetingRoomLaptop } from "@/types";
import ErrorBox from "@/Components/ErrorBox";

const AddMeetingRoomLaptop = (props: { isOpen: boolean; handleClose: () => void }) => {
    const initialValues: MeetingRoomLaptop = {
        full_number_identifier: "",
        laptop_number: "",
        location: "",
        side: "",
        floor: undefined,
        room_number: undefined,
        updated_in_q1: false,
        remarks: ""
    };
    const { data, setData, post, hasErrors, errors, clearErrors } = useForm(initialValues);

    const submit = () => {
        post(route("equipment.storeMeetingRoomLaptop"), {
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
                    Add Meeting Room Laptop
                </Typography>
                <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
                <MeetingRoomLaptopForm data={data} setData={setData} onSubmit={submit} />
            </Box>
        </Modal>
    );
};
export default AddMeetingRoomLaptop;
