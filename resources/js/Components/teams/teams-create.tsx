import React from "react";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { Link } from "@inertiajs/react";

const TeamCreationForm = () => {
    return (
        <Box sx={{ width: "100%", backgroundColor: "#009ddf" }}>
            <FormControl>
                <FormLabel>Team Name</FormLabel>
                <TextField></TextField>
                <Button>Submit</Button>
            </FormControl>
        </Box>
        
    );
};

export default TeamCreationForm;
