import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete, FormLabel } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { Employee, Team } from "@/types";
import FormModal from "@/Components/forms/form-modal";

const TeamForm = (props: {
    isOpen: boolean;
    handleClose: () => void;
    team: Team | null;
    employees: Employee[];
    teamMembers: Employee[];
    title: string;
}) => {
    const fieldStyle = {
        width: "100%",
        padding: "5px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "2px",
        backgroundColor: "#f8f8f8",
        boxSizing: "border-box"
    };

    const initialValues: {
        team_name: string;
        description: string;
        team_members: Employee[];
    } = {
        team_name: props.team ? props.team.team_name : "",
        description: props.team ? props.team.description : "",
        team_members: props.team ? props.teamMembers : []
    };

    const { data, setData, patch, post, hasErrors, errors, clearErrors } = useForm(initialValues);
    const [teamNameError, setTeamNameError] = React.useState(false);

    React.useEffect(() => {
        if (props.team) {
            setData(initialValues);
        }
        if (hasErrors) {
            alert("The request was not successful.\nErrors:\n" + JSON.stringify(errors));
            clearErrors();
        }
    }, [props.team, errors]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value
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

    const handleEmployeeChange = (_event: React.SyntheticEvent, value: Employee[]) => {
        setData(data => ({
            ...data,
            team_members: value
        }));
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.team) {
            patch(route("teams.update", props.team.id));
        } else {
            post(route("teams.store"));
        }
        setData(initialValues);
        props.handleClose();
    };

    return (
        <FormModal open={props.isOpen} onClose={props.handleClose} title={props.title}>
            <form onSubmit={submit} style={{ marginTop: "10px" }}>
                <FormLabel>Name*</FormLabel>
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
                <FormLabel>Description*</FormLabel>
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
                    filterSelectedOptions
                    options={props.employees}
                    getOptionLabel={(employee: Employee) => employee.first_name + " " + employee.last_name}
                    value={data.team_members}
                    onChange={handleEmployeeChange}
                    sx={fieldStyle}
                    renderInput={params => <TextField {...params} />}
                />
                <Button variant="contained" type={"submit"} sx={{ margin: "10px" }}>
                    Submit
                </Button>
            </form>
        </FormModal>
    );
};

export default TeamForm;
