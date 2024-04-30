import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React from "react";
import { MeetingRoomLaptop } from "@/types";

const MeetingRoomLaptopForm = (props: {
    data: MeetingRoomLaptop;
    setData: (data: MeetingRoomLaptop) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
    const fieldStyle = {
        margin: "5px 0",
        width: "100%"
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.type === "text" ? e.target.value : e.target.checked;
        props.setData({
            ...props.data,
            [key]: value
        });
    };

    return (
        <form onSubmit={props.onSubmit}>
            <TextField
                id={"serial_number"}
                value={props.data.serial_number}
                onChange={handleChange}
                sx={fieldStyle}
                label="Serial number"
                variant="outlined"
            />
            <TextField
                id={"floor"}
                value={props.data.floor}
                onChange={handleChange}
                sx={fieldStyle}
                label="Floor"
                variant="outlined"
            />
            <TextField
                id={"room_number"}
                value={props.data.room_number}
                onChange={handleChange}
                sx={fieldStyle}
                label="Room number"
                variant="outlined"
            />
            <FormControlLabel
                control={
                    <Switch
                        defaultChecked
                        checked={props.data.updated_in_q1}
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
    );
};

export default MeetingRoomLaptopForm;
