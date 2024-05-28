import React from "react";
import TextField from "@mui/material/TextField";
import { FormLabel } from "@mui/material";
import { DesktopPC, Employee, Laptop, MeetingRoomLaptop, Team } from "@/types";

const FormField = <T extends Laptop | DesktopPC | MeetingRoomLaptop | Employee | Team>(props: {
    id: string;
    label: string;
    data: T;
    setData: (data: T) => void;
    error?: string;
    required?: boolean;
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.value;
        props.setData({
            ...props.data,
            [key]: value
        });

        setRequiredError(!e.target.validity.valid);
    };

    return (
        <>
            <FormLabel>{props.required ? props.label + "*" : props.label}</FormLabel>
            <TextField
                id={props.id}
                value={props.data[props.id]}
                inputProps={props.required ? { pattern: ".*[^ ].*" } : {}}
                onChange={handleChange}
                sx={fieldStyle}
                required={!!props.required}
                variant="outlined"
                error={requiredError || !!props.error}
                helperText={requiredError ? "This field is required" : props.error}
            />
        </>
    );
};

export default FormField;
