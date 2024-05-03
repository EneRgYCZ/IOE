import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { MeetingRoomLaptop } from "@/types";
import MeetingRoomLaptopForm from "@/Components/Equipment/MeetingRoomLaptopForm";

const EditMeetingRoomLaptop = (props: {
    isOpen: boolean;
    handleClose: () => void;
    meetingRoomLaptop: MeetingRoomLaptop | null;
}) => {
    const { data, setData, patch } = useForm<MeetingRoomLaptop>({
        full_number_identifier: props.meetingRoomLaptop ? props.meetingRoomLaptop.full_number_identifier : "",
        laptop_number: props.meetingRoomLaptop ? props.meetingRoomLaptop.laptop_number : "",
        location: props.meetingRoomLaptop ? props.meetingRoomLaptop.location : "",
        side: props.meetingRoomLaptop ? props.meetingRoomLaptop.side : "",
        floor: props.meetingRoomLaptop ? props.meetingRoomLaptop.floor : undefined,
        room_number: props.meetingRoomLaptop ? props.meetingRoomLaptop.room_number : undefined,
        updated_in_q1: props.meetingRoomLaptop ? props.meetingRoomLaptop.updated_in_q1 : false,
        remarks: props.meetingRoomLaptop ? props.meetingRoomLaptop.remarks : ""
    });

    React.useEffect(() => {
        if (props.meetingRoomLaptop !== null) {
            setData(props.meetingRoomLaptop);
        }
    }, [props.meetingRoomLaptop]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.meetingRoomLaptop) {
            patch(route("equipment.updateMeetingRoomLaptop", props.meetingRoomLaptop.id));
            props.handleClose();
        }
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
                    Edit Meeting Room Laptop
                </Typography>
                <MeetingRoomLaptopForm data={data} setData={setData} onSubmit={submit} />
            </Box>
        </Modal>
    );
};
export default EditMeetingRoomLaptop;
