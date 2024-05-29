import React from "react";
import { Autocomplete, Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { DesktopPC, Employee, Team, Laptop } from "@/types";

import FormModal from "@/Components/form-components/form-modal";
import ErrorBox from "@/Components/error-box";
import FormField from "@/Components/form-components/form-field";

const EmployeeForm = (props: {
    isOpen: boolean;
    handleClose: () => void;
    employee: Employee | null;
    teams: Team[];
    teamMembers: Team[];
    equipment: (DesktopPC | Laptop)[];
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
    
    const boxShadowing = "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"

    const initialValues: Employee = {
        first_name: props.employee ? props.employee.first_name : "",
        last_name: props.employee ? props.employee.last_name : "",
        team_members: props.employee ? props.teamMembers : [],
        equipment_identifiers: props.employee
            ? props.equipment
                  .filter(equipment => equipment.employee_id == props.employee?.id)
                  .map(equipment => equipment.full_number_identifier)
            : []
    };

    const { data, setData, patch, post, errors, hasErrors, clearErrors } = useForm<Employee>(initialValues);

    React.useEffect(() => {
        if (props.employee) {
            setData(initialValues);
        }
    }, [props.employee, props.equipment]);

    const handleTeamChange = (_event: React.SyntheticEvent, value: Team[]) => {
        setData(data => ({
            ...data,
            team_members: value
        }));
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.employee) {
            patch(route("employees.update", props.employee.id), {
                onSuccess: () => {
                    setData(initialValues);
                    props.handleClose();
                }
            });
        } else {
            post(route("employees.store"), {
                onSuccess: () => {
                    setData(initialValues);
                    props.handleClose();
                }
            });
        }
    };

    return (
        <FormModal
            open={props.isOpen}
            onClose={() => {
                props.handleClose();
                clearErrors();
            }}
            title={props.title}
        >
            <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
            <form onSubmit={submit}>
                <FormField
                    id="first_name"
                    label={"First Name"}
                    data={data}
                    setData={setData}
                    patternMismatchError={"Employee's first name should only contain letters"}
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\- ]+"
                    required
                />

                <FormField
                    id="last_name"
                    label={"Last Name"}
                    data={data}
                    setData={setData}
                    patternMismatchError={"Employee's last name should only contain letters"}
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\- ]+"
                    required
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

            <div style={{ textAlign: "center", position: "sticky", bottom: 0}}>
                <Button variant="contained" type={"submit"} sx={{ boxShadow: boxShadowing, marginLeft: "10px" }}>
                    Submit
                </Button>
            </div>
            </form>
        </FormModal>
    );
};

export default EmployeeForm;
