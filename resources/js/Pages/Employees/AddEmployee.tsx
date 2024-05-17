import React from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useForm, usePage } from "@inertiajs/react";
import { Team, DesktopPC, Laptop } from "@/types";
import FormModal from "@/Components/form/form-modal";

const AddEmployee = (props: {
    isOpen: boolean;
    handleClose: () => void;
    teams: Team[];
    equipment: (DesktopPC | Laptop)[];
}) => {
    const defaultValues: {
        first_name: string;
        last_name: string;
        team_members: Team[];
        equipment_identifiers: string[];
    } = {
        first_name: "",
        last_name: "",
        team_members: [],
        equipment_identifiers: []
    };

    const inputFieldStyle: React.CSSProperties = {
        width: "100%",
        padding: "5px",
        marginBottom: "5px",
        border: "1px solid #ccc",
        borderRadius: "2px",
        marginTop: "20px",
        backgroundColor: "#f8f8f8",
        boxSizing: "border-box"
    };

    const { data, setData, post } = useForm(defaultValues);
    const { errors } = usePage().props;
    const [firstNameError, setFirstNameError] = React.useState(false);
    const [lastNameError, setLastNameError] = React.useState(false);
    const [emptyFirstNameError, setEmptyFirstNameError] = React.useState(false);
    const [emptyLastNameError, setEmptyLastNameError] = React.useState(false);

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value
        }));
        if (e.target.validity.valid) setFirstNameError(false);
        else setFirstNameError(true);

        if (value == "") setEmptyFirstNameError(true);
        else setEmptyFirstNameError(false);
    };
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value
        }));
        if (e.target.validity.valid) setLastNameError(false);
        else setLastNameError(true);

        if (value == "") setEmptyLastNameError(true);
        else setEmptyLastNameError(false);
    };

    const handleTeamChange = (_event: React.SyntheticEvent, value: Team[]) => {
        setData(data => ({
            ...data,
            team_members: value
        }));
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("employees.store"));
        setData(defaultValues);
        props.handleClose();
    };

    React.useEffect(() => {
        if (errors.first_name) {
            alert("The first name could not be added. " + errors.first_name);
        } else if (errors.last_name) {
            alert("The last name could not be added. " + errors.last_name);
        }
    }, [errors]);

    return (
        <FormModal open={props.isOpen} onClose={props.handleClose} title="Add Employee">
            <form onSubmit={submit}>
                <TextField
                    id={"first_name"}
                    value={data.first_name}
                    required
                    onChange={handleFirstNameChange}
                    error={firstNameError || emptyFirstNameError}
                    helperText={
                        emptyFirstNameError
                            ? "Required Field"
                            : firstNameError
                              ? "Employee's first name should only contain letters"
                              : ""
                    }
                    inputProps={{
                        pattern: "[A-Z a-z]+"
                    }}
                    sx={inputFieldStyle}
                    label="First Name"
                    variant="outlined"
                />

                <TextField
                    id={"last_name"}
                    value={data.last_name}
                    required
                    onChange={handleLastNameChange}
                    error={lastNameError || emptyLastNameError}
                    helperText={
                        emptyLastNameError
                            ? "Required Field"
                            : lastNameError
                              ? "Employee's last name should only contain letters"
                              : ""
                    }
                    inputProps={{
                        pattern: "[A-Z a-z]+"
                    }}
                    sx={inputFieldStyle}
                    label="Last Name"
                    variant="outlined"
                />

                <Autocomplete
                    multiple
                    id={"team_members"}
                    options={props.teams}
                    getOptionLabel={(team: Team) => team.team_name}
                    value={data.team_members}
                    onChange={handleTeamChange}
                    sx={inputFieldStyle}
                    renderInput={params => <TextField {...params} label="Teams" />}
                />

                <Autocomplete
                    multiple
                    id="equipment_identifiers"
                    options={props.equipment}
                    getOptionLabel={(equipment: DesktopPC | Laptop) =>
                        ("pc_number" in equipment ? "Desktop " : "Laptop ") + equipment.full_number_identifier
                    }
                    onChange={(_event: React.SyntheticEvent, selectedEquipment: (DesktopPC | Laptop)[] | null) => {
                        setData({
                            ...data,
                            equipment_identifiers: selectedEquipment
                                ? selectedEquipment.map(e => e.full_number_identifier)
                                : []
                        });
                    }}
                    filterSelectedOptions
                    sx={inputFieldStyle}
                    renderInput={params => <TextField {...params} label="Equipment identifiers" />}
                />

                <Button variant="contained" sx={{ margin: "10px" }} type={"submit"}>
                    Submit
                </Button>
            </form>
        </FormModal>
    );
};

export default AddEmployee;
