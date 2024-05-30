import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { List, ListItem, ListItemText, Modal, Typography } from "@mui/material";
import { Employee, Team } from "@/types";

const TeamView = (props: { team: Team; teamMembers: Employee[] }) => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        overflowY: "auto",
        maxHeight: "80%",
        padding: "20px",
        border: "2px solid #009ddf"
    };

    return (
        <div>
            <Button variant="contained" onClick={handleModalOpen}>
                VIEW
            </Button>
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h4" gutterBottom>
                        {"Team: " + props.team.team_name}
                    </Typography>
                    <List>
                        {props.teamMembers.map(member => (
                            <ListItem key={member.id}>
                                <ListItemText primary={member.first_name + " " + member.last_name} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
        </div>
    );
};

export default TeamView;
