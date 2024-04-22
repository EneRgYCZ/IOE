import React from "react";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Fab, FormControl, FormLabel, Modal } from '@mui/material';
import { Link } from "@inertiajs/react";
import { Team } from "@/types";


const TeamCreateForm = () => {
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
        <Modal
            open={formOpen}
            onClose={handleFormClose}
        >
            <Box sx={formStyle}>
                <FormControl>
                    <FormLabel>Team Name</FormLabel>
                    <TextField sx={fieldStyle}></TextField>
                    <FormLabel>Team Description</FormLabel>
                    <TextField sx={fieldStyle}></TextField>
                    <Button variant="contained" onClick={handleFormClose}>Submit</Button>
                </FormControl>
            </Box>
        </Modal>
        </div>
    );        
};

export default TeamCreateForm;
