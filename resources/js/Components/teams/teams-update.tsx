import React from "react";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Modal } from '@mui/material';
import { Link } from "@inertiajs/react";
import { Team } from "@/types";


const TeamEditForm = ({ team }: { team: Team }) => {
    const [formOpen, setFormOpen] = React.useState(false);
    const handleFormOpen = () => setFormOpen(true);
    const handleFormClose = () => setFormOpen(false);

    const formStyle = {
        position: 'absolute' as 'absolute', 
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
                <FormControl>
                    <FormLabel>Team Name</FormLabel>
                    <TextField sx={fieldStyle} defaultValue={team.team_name}></TextField>
                    <FormLabel>Team Description</FormLabel>
                    <TextField sx={fieldStyle} defaultValue={team.description}></TextField>
                    <Link href={route('teams.update', team.id)} method="patch">
                        <Button variant="contained" onClick={handleFormClose}>Submit</Button>
                    </Link>
                </FormControl>
            </Box>
          </Modal>
        </div>
    );        
};

export default TeamEditForm;
