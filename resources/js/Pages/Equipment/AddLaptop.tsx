import React from "react";
import Modal from "@mui/material/Modal";
import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import { useForm } from "@inertiajs/react";
import { Employee } from "@/types";

const AddLaptop = (props: { isOpen: boolean; handleClose: () => void; employees: Employee[] }) => {
    const initialValues: {
        serial_number: string;
        status: string;
        floor: string;
        island_number: string;
        workspace_type: string;
        updated_in_q1: boolean;
        employee_id: string;
        employees: Employee[];
    } = {
        serial_number: "",
        status: "",
        floor: "",
        island_number: "",
        workspace_type: "",
        updated_in_q1: false,
        employee_id: "",
        employees: []
    };

    const { data, setData, post } = useForm(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.type === "text" ? e.target.value : e.target.checked;
        setData(data => ({
            ...data,
            [key]: value
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const key = e.target.name;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value
        }));
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("equipment.storeLaptop"));
        setData(initialValues);
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
                    Add Laptop
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
                    <FormControl sx={fieldStyle}>
                        <InputLabel id="status_label">Status</InputLabel>
                        <Select
                            labelId="status_label"
                            name="status"
                            label="Status"
                            value={data.status}
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
                        value={data.floor}
                        onChange={handleChange}
                        sx={fieldStyle}
                        label="Floor"
                        variant="outlined"
                    />
                    <TextField
                        id={"island_number"}
                        value={data.island_number}
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
                            value={data.workspace_type}
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
                                checked={data.updated_in_q1}
                                id={"updated_in_q1"}
                                onChange={handleChange}
                            />
                        }
                        sx={fieldStyle}
                        label="Updated in Q1"
                    />
                    <Autocomplete
                        multiple
                        id="employee_id"
                        options={props.employees}
                        getOptionLabel={(employee: Employee) =>
                            employee.first_name + " " + employee.last_name + " (ID: " + employee.id + ")"
                        }
                        defaultValue={[]}
                        value={data.employees}
                        onChange={(_event: React.SyntheticEvent, value: Employee[]) => {
                            setData({ ...data, employees: value });
                        }}
                        filterSelectedOptions
                        sx={fieldStyle}
                        renderInput={params => <TextField {...params} label="Employee" />}
                    />
                    <Button variant="contained" type={"submit"}>
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};
export default AddLaptop;
