import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { Laptop } from "@/types";

const EditLaptop = (props: { isOpen: boolean; handleClose: () => void; laptop: Laptop | null }) => {
    const { data, setData, patch } = useForm({
        serial_number: "",
        status: "",
        floor: props.laptop?.floor,
        island_number: props.laptop?.island_number,
        workspace_type: props.laptop?.workspace_type,
        updated_in_q1: props.laptop?.updated_in_q1,
        employee_id: props.laptop?.employee_id
    });

    React.useEffect(() => {
        if (props.laptop !== null) {
            setData(props.laptop);
        }
    }, [props.laptop]);

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
        if (props.laptop) {
            patch(route("equipment.updateLaptop", props.laptop.id));
            props.handleClose();
        }
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
                    Edit Laptop
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
export default EditLaptop;
