import React, { FormEvent } from "react";
import Modal from "@mui/material/Modal";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { DesktopPC, Employee, Team, Laptop } from "@/types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { InertiaFormProps } from "@inertiajs/react/types/useForm";

const EditEmployee = (props: {
    isOpen: boolean;
    handleClose: () => void;
    employee: Employee | null;
    equipment: (DesktopPC | Laptop)[];
    onSubmit: (e: FormEvent, form: InertiaFormProps) => void;
    teams: Team[];
    teamMembers: Team[];
}) => {
    const modalStyle: React.CSSProperties = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        width: "400px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
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

    const closeButtonStyle: React.CSSProperties = {
        position: "absolute",
        top: "5px",
        right: "4px",
        width: "10px !important",
        height: "30px",
        backgroundColor: "red",
        border: "none",
        borderRadius: "10%",
        color: "white",
        fontSize: "18px",
        cursor: "pointer"
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
        <Modal open={props.isOpen} onClose={props.handleClose}>
            <Box sx={modalStyle}>
                <h2 style={{ margin: "0px" }}>Edit Employee</h2>
                <form onSubmit={e => props.onSubmit(e, form)}>
                    <Button sx={closeButtonStyle} onClick={props.handleClose}>
                        X
                    </Button>

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
                        sx={inputFieldStyle}
                        label="Last Name"
                        variant="outlined"
                    />

                    <Autocomplete
                        multiple
                        id={"teams"}
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
                        value={props.equipment.filter(equipment =>
                            data.equipment_identifiers.includes(equipment.full_number_identifier)
                        )}
                        onChange={(_event: React.SyntheticEvent, selectedEquipment: (DesktopPC | Laptop)[]) => {
                            setData({
                                ...data,
                                equipment_identifiers: selectedEquipment.map(e => e.full_number_identifier)
                            });
                        }}
                        filterSelectedOptions
                        sx={inputFieldStyle}
                        renderInput={params => <TextField {...params} label="Equipment identifiers" />}
                    />

                    <Button variant="contained" type={"submit"} sx={{ margin: "10px" }}>
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default EditEmployee;
