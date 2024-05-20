import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete, Fab, FormLabel, Modal, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { Employee } from "@/types";
import ErrorBox from "@/Components/ErrorBox";

const TeamCreateForm = (props: { employees: Employee[] }) => {
    const [formOpen, setFormOpen] = React.useState(false);
    const [teamNameError, setTeamNameError] = React.useState(false);
    const handleFormOpen = () => setFormOpen(true);
    const handleFormClose = () => setFormOpen(false);

    const initialValues: {
        team_name: string;
        description: string;
        team_members: Employee[];
    } = {
        team_name: "",
        description: "",
        team_members: []
    };

    const { data, setData, post, hasErrors, errors, clearErrors } = useForm(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value
        }));
    };

    const handleEmployeeChange = (_event: React.SyntheticEvent, value: Employee[]) => {
        setData(data => ({
            ...data,
            team_members: value
        }));
    };

    const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(data => ({
            ...data,
            [e.target.id]: e.target.value
        }));
        if (e.target.validity.valid) {
            setTeamNameError(false);
        } else {
            setTeamNameError(true);
        }
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("teams.store"), {
            onSuccess: () => {
                setData(initialValues);
                handleFormClose();
            }
        });
    };

    const formStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        border: "2px solid #009ddf"
    };

    const fieldStyle = {
        marginBottom: "10px",
        width: "100%"
    };

    const addButtonStyle = {
        position: "fixed",
        bottom: 16,
        right: 16
    };

    return (
        <div>
            <Fab variant="extended" color="primary" sx={addButtonStyle} onClick={handleFormOpen}>
                Add team
            </Fab>
            <Modal open={formOpen} onClose={handleFormClose}>
                <Box sx={formStyle}>
                    <Typography variant="h5" gutterBottom>
                        Create Team
                    </Typography>
                    <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
                    <form onSubmit={submit}>
                        <FormLabel>Name</FormLabel>
                        <TextField
                            id={"team_name"}
                            value={data.team_name}
                            required
                            onChange={handleTeamNameChange}
                            sx={fieldStyle}
                            variant="outlined"
                            error={teamNameError}
                            helperText={teamNameError ? "Your team name may only contain letters" : ""}
                            inputProps={{
                                pattern: "[A-Za-z ]+"
                            }}
                        />
                        <FormLabel>Description</FormLabel>
                        <TextField
                            id={"description"}
                            value={data.description}
                            required
                            onChange={handleChange}
                            sx={fieldStyle}
                            variant="outlined"
                        />
                        <FormLabel>Employees</FormLabel>
                        <Autocomplete
                            multiple
                            id={"employees"}
                            options={props.employees}
                            getOptionLabel={(employee: Employee) => employee.first_name + " " + employee.last_name}
                            value={data.team_members}
                            onChange={handleEmployeeChange}
                            sx={fieldStyle}
                            renderInput={params => <TextField {...params} />}
                        />
                        <Button variant="contained" type={"submit"}>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default TeamCreateForm;
