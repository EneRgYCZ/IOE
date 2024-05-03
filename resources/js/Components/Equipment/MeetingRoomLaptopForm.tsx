import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
    TextField
} from "@mui/material";
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

    const handleSelectChange = (e: SelectChangeEvent) => {
        const key = e.target.name;
        const value = e.target.value;
        props.setData({
            ...props.data,
            [key]: value
        });
    };

    return (
        <form onSubmit={props.onSubmit}>
            <TextField
                id={"full_number_identifier"}
                value={props.data.full_number_identifier}
                onChange={handleChange}
                sx={fieldStyle}
                label="Full number"
                variant="outlined"
            />
            <TextField
                id={"laptop_number"}
                value={props.data.laptop_number}
                onChange={handleChange}
                sx={fieldStyle}
                label="Laptop Number"
                variant="outlined"
            />
            <FormControl sx={fieldStyle}>
                <InputLabel id="location_label">Location</InputLabel>
                <Select
                    labelId="location_label"
                    name="location"
                    label="Location"
                    value={props.data.location}
                    variant="outlined"
                    onChange={handleSelectChange}
                >
                    <MenuItem value="ghh">GHH</MenuItem>
                    <MenuItem value="waagstraat">Waagstraat</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={fieldStyle}>
                <InputLabel id="side_label">Side</InputLabel>
                <Select
                    labelId="side_label"
                    name="side"
                    label="side"
                    value={props.data.side}
                    variant="outlined"
                    onChange={handleSelectChange}
                >
                    <MenuItem value="north">North</MenuItem>
                    <MenuItem value="south">South</MenuItem>
                </Select>
            </FormControl>
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
            <TextField
                id={"remarks"}
                value={props.data.remarks}
                onChange={handleChange}
                sx={fieldStyle}
                label="Remarks"
                variant="outlined"
            />
            <Button variant="contained" type={"submit"}>
                Submit
            </Button>
        </form>
    );
};

export default MeetingRoomLaptopForm;
