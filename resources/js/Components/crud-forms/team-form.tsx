import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete, FormLabel } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { Employee, Team } from "@/types";
import FormModal from "@/Components/form-components/form-modal";
import ErrorBox from "@/Components/error-box";
import FormField from "../form-components/form-field";

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

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.team) {
            patch(route("teams.update", props.team.id), {
                onSuccess: () => {
                    setData(initialValues);
                    props.handleClose();
                }
            });
        } else {
            post(route("teams.store"), {
                onSuccess: () => {
                    setData(initialValues);
                    props.handleClose();
                }
            });
        }
    };

    const initialValues: Team = {
        team_name: props.team ? props.team.team_name : "",
        description: props.team ? props.team.description : "",
        team_members: props.team ? props.teamMembers : []
    };

    const { data, setData, patch, post, hasErrors, errors, clearErrors } = useForm<Team>(initialValues);

    React.useEffect(() => {
        if (props.team) {
            setData(initialValues);
        }
    }, [props.team]);

    const handleEmployeeChange = (_event: React.SyntheticEvent, value: Employee[]) => {
        setData(data => ({
            ...data,
            team_members: value
        }));
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
            <ErrorBox hasErrors={hasErrors} errors={errors} />
            <form onSubmit={submit}>
                <FormField id="team_name" label={"Name"} data={data} setData={setData} required />

                <FormField id="description" label={"Description"} data={data} setData={setData} required />

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
                <div style={{ textAlign: "center", position: "sticky", bottom: 0 }}>
                    <Button
                        variant="contained"
                        type={"submit"}
                        sx={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;" }}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </FormModal>
    );
};

export default TeamForm;
