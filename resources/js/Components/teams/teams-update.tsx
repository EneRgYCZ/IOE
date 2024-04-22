import React from "react";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Modal, Typography } from '@mui/material';
import { Link, useForm } from "@inertiajs/react";
import { Team } from "@/types";


const TeamEditForm = ({ team }: { team: Team }) => {
    const [formOpen, setFormOpen] = React.useState(false);
    const handleFormOpen = () => setFormOpen(true);
    const handleFormClose = () => setFormOpen(false);

    const { data, setData, post } = useForm({
        team_name: team.team_name,
        description: team.description
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value
        }));
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("teams.update", team.id));
        setData ({
            team_name: "",
            description: ""
        });
        handleFormClose();
    };

    const formStyle = {
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        backgroundColor: "#fff",
        padding: "20px",
        border: '2px solid #009ddf',
    }

    const fieldStyle = {
        marginBottom: "10px",
        width: "100%"
    }

    return (
        <div>
          <Button variant="contained" sx={{margin: "0 10px"}} onClick={handleFormOpen}>EDIT</Button>
          <Modal
            open={formOpen}
            onClose={handleFormClose}
          >
            <Box sx={formStyle}>
                <Typography variant="h5" gutterBottom>
                    Update Team
                </Typography>
                <form onSubmit={submit}>
                    <FormLabel>Team Name</FormLabel>
                    <TextField 
                        id={"team_name"}
                        value={data.team_name}
                        onChange={handleChange}
                        sx={fieldStyle}
                        variant="outlined"
                    />
                    <FormLabel>Team Description</FormLabel>
                    <TextField 
                        id={"description"}
                        value={data.description}
                        onChange={handleChange}
                        sx={fieldStyle}
                        variant="outlined"
                    />
                    <Button variant="contained" type={"submit"}>Submit</Button>
                </form>
            </Box>
          </Modal>
        </div>
    );        
};

export default TeamEditForm;
