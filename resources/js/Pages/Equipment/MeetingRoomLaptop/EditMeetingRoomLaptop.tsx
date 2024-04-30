import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { MeetingRoomLaptop } from "@/types";

const EditMeetingRoomLaptop = (props: {
    isOpen: boolean;
    handleClose: () => void;
    meetingRoomLaptop: MeetingRoomLaptop | null;
}) => {
    const { data, setData, patch } = useForm({
        serial_number: props.meetingRoomLaptop?.serial_number,
        floor: props.meetingRoomLaptop?.floor,
        room_number: props.meetingRoomLaptop?.room_number,
        updated_in_q1: props.meetingRoomLaptop?.updated_in_q1
    });

    React.useEffect(() => {
        if (props.meetingRoomLaptop !== null) {
            setData(props.meetingRoomLaptop);
        }
    }, [props.meetingRoomLaptop]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.type === "text" ? e.target.value : e.target.checked;
        setData(data => ({
            ...data,
            [key]: value
        }));
    };

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
        backgroundColor: "white",
        padding: "20px"
    };

    const fieldStyle = {
        margin: "5px 0",
        width: "100%"
    };

    return (
        <Modal open={props.isOpen} onClose={props.handleClose}>
            <Box sx={modalStyle}>
                <Typography variant="h5" gutterBottom>
                    Edit Meeting Room Laptop
                </Typography>
                <form onSubmit={submit}>
                    <TextField
                        id={"serial_number"}
                        value={data.serial_number}
                        onChange={handleChange}
                        sx={fieldStyle}
                        label="Serial number"
                        variant="outlined"
                    />
                    <TextField
                        id={"floor"}
                        value={data.floor}
                        onChange={handleChange}
                        sx={fieldStyle}
                        label="Floor"
                        variant="outlined"
                    />
                    <TextField
                        id={"room_number"}
                        value={data.room_number}
                        onChange={handleChange}
                        sx={fieldStyle}
                        label="Room number"
                        variant="outlined"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                defaultChecked
                                checked={data.updated_in_q1}
                                id={"updated_in_q1"}
                                onChange={handleChange}
                            />
                        }
                        sx={fieldStyle}
                        label="Updated in Q1"
                    />
                    <Button variant="contained" type={"submit"}>
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};
export default EditMeetingRoomLaptop;
