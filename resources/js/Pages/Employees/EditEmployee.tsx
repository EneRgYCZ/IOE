import React, { FormEvent } from "react";
import { Autocomplete, Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { DesktopPC, Employee, Team, Laptop } from "@/types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { InertiaFormProps } from "@inertiajs/react/types/useForm";
import FormModal from "@/Components/forms/form-modal";

const EditEmployee = (props: {
    isOpen: boolean;
    handleClose: () => void;
    employee: Employee | null;
    equipment: (DesktopPC | Laptop)[];
    onSubmit: (e: FormEvent, form: InertiaFormProps) => void;
    teams: Team[];
    teamMembers: Team[];
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

    const form = useForm({
        first_name: props.employee?.first_name,
        last_name: props.employee?.last_name,
        team_members: props.teamMembers,
        equipment_identifiers: props.equipment
            .filter(equipment => equipment.employee_id == props.employee?.id)
            .map(equipment => equipment.full_number_identifier)
    });

    const { data, setData } = form;
    const [firstNameError, setFirstNameError] = React.useState(false);
    const [lastNameError, setLastNameError] = React.useState(false);
    const [emptyFirstNameError, setEmptyFirstNameError] = React.useState(false);
    const [emptyLastNameError, setEmptyLastNameError] = React.useState(false);

    React.useEffect(() => {
        if (props.employee !== null) {
            setData({
                ...props.employee,
                team_members: props.teamMembers,
                equipment_identifiers: props.equipment
                    .filter(equipment => equipment.employee_id == props.employee?.id)
                    .map(equipment => equipment.full_number_identifier)
            });
        }
    }, [props.employee, props.equipment]);

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

    return (
        <FormModal open={props.isOpen} onClose={props.handleClose} title="Edit Employee">
            <form onSubmit={e => props.onSubmit(e, form)} style={{ marginTop: "10px" }}>
                <FormLabel>First Name*</FormLabel>
                <TextField
                    id={"first_name"}
                    sx={fieldStyle}
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
                    variant="outlined"
                />

                <FormLabel>Last Name*</FormLabel>
                <TextField
                    id={"last_name"}
                    sx={fieldStyle}
                    value={data.last_name}
                    required
                    onChange={handleLastNameChange}
                    error={lastNameError}
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
                    variant="outlined"
                />

                <FormLabel>Teams</FormLabel>
                <Autocomplete
                    id={"team_members"}
                    sx={fieldStyle}
                    filterSelectedOptions
                    options={props.teams}
                    getOptionLabel={(team: Team) => team.team_name}
                    multiple
                    value={data.team_members}
                    onChange={handleTeamChange}
                    renderInput={params => <TextField {...params} />}
                />

                <FormLabel>Equipment Identifiers</FormLabel>
                <Autocomplete
                    id="equipment_identifiers"
                    sx={fieldStyle}
                    filterSelectedOptions
                    options={props.equipment}
                    getOptionLabel={(equipment: DesktopPC | Laptop) =>
                        ("pc_number" in equipment ? "Desktop " : "Laptop ") + equipment.full_number_identifier
                    }
                    multiple
                    value={props.equipment.filter(equipment =>
                        data.equipment_identifiers.includes(equipment.full_number_identifier)
                    )}
                    onChange={(_event: React.SyntheticEvent, selectedEquipment: (DesktopPC | Laptop)[]) => {
                        setData({
                            ...data,
                            equipment_identifiers: selectedEquipment.map(e => e.full_number_identifier)
                        });
                    }}
                    renderInput={params => <TextField {...params} />}
                />

                <Button variant="contained" type={"submit"} sx={{ margin: "10px" }}>
                    Submit
                </Button>
            </form>
        </FormModal>
    );
};

export default EditEmployee;
