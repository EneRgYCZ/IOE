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
import { DesktopPC } from "@/types";

const DesktopForm = (props: { data: DesktopPC; setData: (data: DesktopPC) => void; onSubmit: () => void }) => {
    const fieldStyle = {
        margin: "5px 0",
        width: "100%"
    };

    const [errors, setErrors] = React.useState({
        full_number_identifier: false,
        pc_number: false,
        location: false,
        side: false,
        floor: false,
        island_number: false
    });

    const validation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors({
            full_number_identifier: props.data.full_number_identifier.trim() == "",
            pc_number: props.data.pc_number.trim() == "",
            location: props.data.location.trim() == "",
            side: props.data.side.trim() == "",
            floor: props.data.floor == undefined,
            island_number: props.data.island_number == undefined
        });

        if (
            props.data.full_number_identifier.trim() != "" &&
            props.data.pc_number.trim() != "" &&
            props.data.location.trim() != "" &&
            props.data.side.trim() != "" &&
            props.data.floor != undefined &&
            props.data.island_number != undefined
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
        <form onSubmit={validation}>
            <TextField
                id={"full_number_identifier"}
                value={props.data.full_number_identifier}
                onChange={handleChange}
                sx={fieldStyle}
                label="Full number*"
                variant="outlined"
                error={errors.full_number_identifier}
                helperText={errors.full_number_identifier ? "This field is mandatory" : ""}
            />
            <TextField
                id={"pc_number"}
                value={props.data.pc_number}
                onChange={handleChange}
                sx={fieldStyle}
                label="PC Number*"
                variant="outlined"
                error={errors.pc_number}
                helperText={errors.pc_number ? "This field is mandatory" : ""}
            />
            <FormControl sx={fieldStyle}>
                <InputLabel id="location_label" error={errors.location}>
                    Location*
                </InputLabel>
                <Select
                    labelId="location_label"
                    name="location"
                    label="Location*"
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
                <InputLabel id="side_label" error={errors.side}>
                    Side*
                </InputLabel>
                <Select
                    labelId="side_label"
                    name="side"
                    label="Side*"
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
            <FormControlLabel
                control={
                    <Switch defaultChecked checked={props.data.double_pc} id={"double_pc"} onChange={handleChange} />
                }
                sx={fieldStyle}
                label="Double PC"
            />
            <FormControlLabel
                control={
                    <Switch defaultChecked checked={props.data.needs_dock} id={"needs_dock"} onChange={handleChange} />
                }
                sx={fieldStyle}
                label="Needs dock"
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
                label="Floor*"
                variant="outlined"
                error={errors.floor}
                helperText={errors.floor ? "This field is mandatory" : ""}
            />
            <TextField
                id={"island_number"}
                value={props.data.island_number}
                onChange={handleChange}
                sx={fieldStyle}
                label="Island number*"
                variant="outlined"
                error={errors.island_number}
                helperText={errors.island_number ? "This field is mandatory" : ""}
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
                id={"remarks"}
                value={props.data.remarks}
                onChange={handleChange}
                sx={fieldStyle}
                label="Remarks"
                variant="outlined"
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

export default DesktopForm;