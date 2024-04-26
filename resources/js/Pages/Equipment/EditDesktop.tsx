import React from "react";
import Modal from "@mui/material/Modal";
import {
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
import { DesktopPC } from "@/types";

const EditDesktop = (props: { isOpen: boolean; handleClose: () => void; desktop: DesktopPC | null }) => {
    const { data, setData, patch } = useForm({
        serial_number: props.desktop?.serial_number,
        double_pc: props.desktop?.double_pc,
        needs_dock: props.desktop?.needs_dock,
        status: props.desktop?.status,
        floor: props.desktop?.floor,
        island_number: props.desktop?.island_number,
        workspace_type: props.desktop?.workspace_type,
        updated_in_q1: props.desktop?.updated_in_q1,
        employee_id: props.desktop?.employee_id
    });

    React.useEffect(() => {
        if (props.desktop !== null) {
            setData(props.desktop);
        }
    }, [props.desktop]);

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
        if (props.desktop) {
            patch(route("equipment.updateDesktop", props.desktop.id));
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
                    Edit Desktop
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
export default EditDesktop;
