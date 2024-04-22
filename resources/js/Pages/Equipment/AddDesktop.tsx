import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";

const AddDesktop = (props: { isOpen: boolean; handleClose: () => void }) => {
    const initialValues = {
        serial_number: "",
        double_pc: false,
        needs_dock: false,
        status: "",
        floor: "",
        island_number: "",
        workspace_type: "",
        updated_in_q1: false,
        employee_id: ""
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

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("equipment.storeDesktop"));
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
                    Add Desktop
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
                    <FormControlLabel
                        control={
                            <Switch defaultChecked checked={data.double_pc} id={"double_pc"} onChange={handleChange} />
                        }
                        sx={fieldStyle}
                        label="Double PC"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                defaultChecked
                                checked={data.needs_dock}
                                id={"needs_dock"}
                                onChange={handleChange}
                            />
                        }
                        sx={fieldStyle}
                        label="Needs dock"
                    />
                    <TextField
                        id={"status"}
                        value={data.status}
                        onChange={handleChange}
                        sx={fieldStyle}
                        label="Status"
                        variant="outlined"
                    />
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
                    <TextField
                        id={"workspace_type"}
                        value={data.workspace_type}
                        onChange={handleChange}
                        sx={fieldStyle}
                        label="Workspace type"
                        variant="outlined"
                    />
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
                    <TextField
                        id={"employee_id"}
                        value={data.employee_id}
                        onChange={handleChange}
                        sx={fieldStyle}
                        label="Employee ID"
                        variant="outlined"
                    />
                    <Button variant="contained" type={"submit"}>
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};
export default AddDesktop;
