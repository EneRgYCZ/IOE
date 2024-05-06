import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete, FormLabel, Modal, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { Employee, Team } from "@/types";

const TeamEditForm = (props: { 
        team: Team | null; 
        employees: Employee[];
    }) => {
    const [formOpen, setFormOpen] = React.useState(false);
    const handleFormOpen = () => setFormOpen(true);
    const handleFormClose = () => setFormOpen(false);

    const { data, setData, patch } = useForm({
        team_name: props.team?.team_name,
        description: props.team?.description,
        employees: props.team?.employees
    });

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
            employees: value 
        }));
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.team){
            patch(route("teams.update", props.team.id));
            handleFormClose();
        }  
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

    React.useEffect(() => {
        if (props.team) {
            setData({
                team_name: props.team.team_name || "",
                description: props.team.description || "",
                employees: props.team.employees || []
            });
        }
    }, [props.team]);

    return (
        <div>
            <Button variant="contained" sx={{ margin: "0 10px" }} onClick={handleFormOpen}>
                EDIT
            </Button>
            <Modal open={formOpen} onClose={handleFormClose}>
                <Box sx={formStyle}>
                    <Typography variant="h5" gutterBottom>
                        Update Team
                    </Typography>
                    <form onSubmit={submit}>
                        <FormLabel>Name</FormLabel>
                        <TextField
                            id={"team_name"}
                            value={data.team_name}
                            onChange={handleChange}
                            sx={fieldStyle}
                            variant="outlined"
                        />
                        <FormLabel>Description</FormLabel>
                        <TextField
                            id={"description"}
                            value={data.description}
                            onChange={handleChange}
                            sx={fieldStyle}
                            variant="outlined"
                        />
                        <FormLabel>Employees</FormLabel>
                        <Autocomplete
                            multiple
                            id={"employees"}
                            options={props.employees}
                            getOptionLabel={(employee: Employee) =>
                                employee.first_name + " " + employee.last_name
                            }
                            defaultValue={props.team ? props.team.employees : []}
                            value={data.employees}
                            onChange={handleEmployeeChange}
                            sx={fieldStyle}
                            renderInput={params => <TextField {...params}/>}
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

export default TeamEditForm;
