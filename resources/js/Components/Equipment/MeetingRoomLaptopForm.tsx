import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
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
    onSubmit: () => void;
}) => {
    const fieldStyle = {
        margin: "5px 0",
        width: "100%"
    };

    const [errors, setErrors] = React.useState({
        full_number_identifier: false,
        laptop_number: false,
        location: false,
        side: false,
        floor: false
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors({
            full_number_identifier: props.data.full_number_identifier.trim() == "",
            laptop_number: props.data.laptop_number.trim() == "",
            location: props.data.location.trim() == "",
            side: props.data.side.trim() == "",
            floor: props.data.floor == undefined
        });

        if (
            props.data.full_number_identifier.trim() != "" &&
            props.data.laptop_number.trim() != "" &&
            props.data.location.trim() != "" &&
            props.data.side.trim() != "" &&
            props.data.floor != undefined
        ) {
            props.onSubmit();
        }
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
        <form onSubmit={submit}>
            <TextField
                id={"full_number_identifier"}
                value={props.data.full_number_identifier}
                onChange={handleChange}
                sx={fieldStyle}
                label="Full number"
                required
                variant="outlined"
                error={errors.full_number_identifier}
                helperText={errors.full_number_identifier ? "This field is mandatory" : ""}
            />
            <TextField
                id={"laptop_number"}
                value={props.data.laptop_number}
                onChange={handleChange}
                sx={fieldStyle}
                label="Laptop Number"
                required
                variant="outlined"
                error={errors.laptop_number}
                helperText={errors.laptop_number ? "This field is mandatory" : ""}
            />
            <FormControl sx={fieldStyle} required>
                <InputLabel id="location_label" error={errors.location}>
                    Location
                </InputLabel>
                <Select
                    labelId="location_label"
                    name="location"
                    label="Location"
                    value={props.data.location}
                    variant="outlined"
                    onChange={handleSelectChange}
                    error={errors.location}
                >
                    <MenuItem value="ghh">GHH</MenuItem>
                    <MenuItem value="waagstraat">Waagstraat</MenuItem>
                </Select>
                <FormHelperText error>{errors.location ? "This field is mandatory" : ""}</FormHelperText>
            </FormControl>
            <FormControl sx={fieldStyle}>
                <InputLabel id="side_label" error={errors.side} required>
                    Side
                </InputLabel>
                <Select
                    labelId="side_label"
                    name="side"
                    label="Side"
                    value={props.data.side}
                    variant="outlined"
                    onChange={handleSelectChange}
                    error={errors.side}
                >
                    <MenuItem value="north">North</MenuItem>
                    <MenuItem value="south">South</MenuItem>
                </Select>
                <FormHelperText error>{errors.side ? "This field is mandatory" : ""}</FormHelperText>
            </FormControl>
            <TextField
                id={"floor"}
                value={props.data.floor}
                onChange={handleChange}
                sx={fieldStyle}
                label="Floor"
                required
                variant="outlined"
                error={errors.floor}
                helperText={errors.floor ? "This field is mandatory" : ""}
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
