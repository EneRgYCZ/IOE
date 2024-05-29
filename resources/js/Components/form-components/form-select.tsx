import React from "react";
import { FormControl, FormHelperText, FormLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DesktopPC, Employee, Laptop, MeetingRoomLaptop, Team } from "@/types";

const FormSelect = <T extends Laptop | DesktopPC | MeetingRoomLaptop | Employee | Team>(props: {
    id: string;
    label: string;
    data: T;
    setData: (data: T) => void;
    required?: boolean;
    children: React.ReactNode;
}) => {
    const fieldStyle = {
        width: "100%",
        padding: "5px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "2px",
        backgroundColor: "#f8f8f8"
    };

    const [requiredError, setRequiredError] = React.useState(false);

    const handleChange = (e: SelectChangeEvent) => {
        const key = e.target.name;
        const value = e.target.value;
        props.setData({
            ...props.data,
            [key]: value
        });

        if (props.required) setRequiredError(!e.target.value);
    };

    return (
        <>
            <FormLabel>{props.required ? props.label + "*" : props.label}</FormLabel>
            <FormControl sx={fieldStyle} required={props.required}>
                <Select
                    name={props.id}
                    value={props.data[props.id]}
                    variant="outlined"
                    onChange={handleChange}
                    error={requiredError}
                >
                    {props.children}
                    {props.required ? "" : <MenuItem value="">Not set</MenuItem>}
                </Select>
                <FormHelperText error>{requiredError ? "This field is required" : ""}</FormHelperText>
            </FormControl>
        </>
    );
};

export default FormSelect;
