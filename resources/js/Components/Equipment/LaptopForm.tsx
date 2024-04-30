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
import { Laptop } from "@/types";

const LaptopForm = (props: {
    data: Laptop;
    setData: (data: Laptop) => void;
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
                id={"serial_number"}
                value={props.data.serial_number}
                onChange={handleChange}
                sx={fieldStyle}
                label="Serial number"
                variant="outlined"
            />
            <FormControl sx={fieldStyle}>
                <InputLabel id="status_label">Status</InputLabel>
                <Select
                    labelId="status_label"
                    name="status"
                    label="Status"
                    value={props.data.status}
                    variant="outlined"
                    onChange={handleSelectChange}
                >
                    <MenuItem value="static">Static</MenuItem>
                    <MenuItem value="flex">Flex</MenuItem>
                    <MenuItem value="">Not set</MenuItem>
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
                id={"island_number"}
                value={props.data.island_number}
                onChange={handleChange}
                sx={fieldStyle}
                label="Island number"
                variant="outlined"
            />
            <FormControl sx={fieldStyle}>
                <InputLabel id="workspace_type_label">Workspace type</InputLabel>
                <Select
                    labelId="workspace_type_label"
                    name="workspace_type"
                    label="Workspace type"
                    value={props.data.workspace_type}
                    variant="outlined"
                    onChange={handleSelectChange}
                >
                    <MenuItem value="developer">Developer</MenuItem>
                    <MenuItem value="non-developer">Non-developer</MenuItem>
                </Select>
            </FormControl>
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
                id={"employee_id"}
                value={props.data.employee_id}
                onChange={handleChange}
                sx={fieldStyle}
                label="Employee ID"
                variant="outlined"
            />
            <Button variant="contained" type={"submit"}>
                Submit
            </Button>
        </form>
    );
};

export default LaptopForm;
