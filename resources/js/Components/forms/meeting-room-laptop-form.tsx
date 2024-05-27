import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
    TextField
} from "@mui/material";
import React from "react";
import { MeetingRoomLaptop } from "@/types";

{
    /* Component to be used for creating or editing meeting room laptops */
}
const MeetingRoomLaptopForm = (props: {
    data: MeetingRoomLaptop;
    setData: (data: MeetingRoomLaptop) => void;
    onSubmit: () => void;
}) => {
    const fieldStyle = {
        width: "100%",
        padding: "5px",
        marginBottom: "20px",
        marginLeft: 0,
        border: "1px solid #ccc",
        borderRadius: "2px",
        backgroundColor: "#f8f8f8",
        boxSizing: "border-box"
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
        <form onSubmit={submit} style={{ marginTop: "10px" }}>
            <FormLabel>Full number*</FormLabel>
            <TextField
                id={"full_number_identifier"}
                value={props.data.full_number_identifier}
                onChange={handleChange}
                sx={fieldStyle}
                required
                variant="outlined"
                error={errors.full_number_identifier}
                helperText={errors.full_number_identifier ? "This field is mandatory" : ""}
            />

            <FormLabel>Laptop number*</FormLabel>
            <TextField
                id={"laptop_number"}
                value={props.data.laptop_number}
                onChange={handleChange}
                sx={fieldStyle}
                required
                variant="outlined"
                error={errors.laptop_number}
                helperText={errors.laptop_number ? "This field is mandatory" : ""}
            />

            <FormLabel>Location*</FormLabel>
            <FormControl sx={fieldStyle} required>
                <Select
                    name="location"
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

            <FormLabel>Side</FormLabel>
            <FormControl sx={fieldStyle}>
                <Select
                    name="side"
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

            <FormLabel>Floor*</FormLabel>
            <TextField
                id={"floor"}
                value={props.data.floor}
                onChange={handleChange}
                sx={fieldStyle}
                required
                variant="outlined"
                error={errors.floor}
                helperText={errors.floor ? "This field is mandatory" : ""}
            />

            <FormLabel>Room number</FormLabel>
            <TextField
                id={"room_number"}
                value={props.data.room_number}
                onChange={handleChange}
                sx={fieldStyle}
                variant="outlined"
            />

            <FormControlLabel
                control={<Switch checked={props.data.updated_in_q1} id={"updated_in_q1"} onChange={handleChange} />}
                sx={fieldStyle}
                label="Updated in Q1"
            />

            <FormLabel>Remarks</FormLabel>
            <TextField
                id={"remarks"}
                value={props.data.remarks}
                onChange={handleChange}
                sx={fieldStyle}
                variant="outlined"
            />

            <div style={{ textAlign: "center" }}>
                <Button variant="contained" type={"submit"}>
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default MeetingRoomLaptopForm;
