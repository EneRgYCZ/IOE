import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import MeetingRoomLaptopForm from "@/Components/Equipment/MeetingRoomLaptopForm";
import { MeetingRoomLaptop } from "@/types";

const AddMeetingRoomLaptop = (props: { isOpen: boolean; handleClose: () => void }) => {
    const initialValues: MeetingRoomLaptop = {
        serial_number: "",
        floor: undefined,
        room_number: undefined,
        updated_in_q1: false
    };
    const { data, setData, post } = useForm(initialValues);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("equipment.storeMeetingRoomLaptop"));
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
                    Add Meeting Room Laptop
                </Typography>
                <MeetingRoomLaptopForm data={data} setData={setData} onSubmit={submit} />
            </Box>
        </Modal>
    );
};
export default AddMeetingRoomLaptop;
