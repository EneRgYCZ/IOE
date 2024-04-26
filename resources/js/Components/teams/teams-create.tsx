import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Fab, FormLabel, Modal, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";

const TeamCreateForm = () => {
    const [formOpen, setFormOpen] = React.useState(false);
    const handleFormOpen = () => setFormOpen(true);
    const handleFormClose = () => setFormOpen(false);

    const { data, setData, post } = useForm({
        team_name: "",
        description: ""
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
        post(route("teams.store"));
        setData({
            team_name: "",
            description: ""
        });
        handleFormClose();
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
            <Modal open={formOpen} onClose={handleFormClose}>
                <Box sx={formStyle}>
                    <Typography variant="h5" gutterBottom>
                        Create Team
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
                        <Button variant="contained" type={"submit"}>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default TeamCreateForm;