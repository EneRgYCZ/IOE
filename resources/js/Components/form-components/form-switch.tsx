import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { DesktopPC, Employee, Laptop, MeetingRoomLaptop, Team } from "@/types";

const FormSwitch = <T extends Laptop | DesktopPC | MeetingRoomLaptop | Employee | Team>(props: {
    id: string;
    label: string;
    data: T;
    setData: (data: T) => void;
}) => {
    const fieldStyle = {
        width: "100%",
        padding: "5px",
        marginBottom: "20px",
        marginLeft: 0,
        border: "1px solid #ccc",
        borderRadius: "2px",
        backgroundColor: "#f8f8f8"
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const isChecked = e.target.checked;
        props.setData({
            ...props.data,
            [key]: isChecked
        });
    };

    return (
        <FormControlLabel
            control={<Switch checked={props.data[props.id]} id={props.id} onChange={handleChange} />}
            sx={fieldStyle}
            label={props.label}
        />
    );
};

export default FormSwitch;
