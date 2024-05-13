import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Modal, Typography } from "@mui/material";
import { Link } from "@inertiajs/react";
import { Team } from "@/types";

const TeamDeleteConfirmation = (props: { team: Team }) => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        border: "2px solid #009ddf"
    };

    return (
        <div>
            <Button variant="contained" onClick={handleModalOpen} color="error">
                DELETE
            </Button>
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h4" gutterBottom>
                        Are you sure you want to delete this team?
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button variant="contained" onClick={handleModalClose}>
                            CANCEL
                        </Button>
                        <Link href={route("teams.destroy", props.team.id)} method="delete">
                            <Button variant="contained" color="error" onClick={handleModalClose}>
                                DELETE
                            </Button>
                        </Link>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default TeamDeleteConfirmation;
