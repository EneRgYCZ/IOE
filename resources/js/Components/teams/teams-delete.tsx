import React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Link } from "@inertiajs/react";
import { Team } from "@/types";
import FormModal from "@/Components/form/form-modal";

const TeamDeleteConfirmation = (props: { team: Team }) => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    return (
        <div>
            <Button variant="contained" onClick={handleModalOpen} color="error">
                DELETE
            </Button>
            <FormModal open={modalOpen} onClose={handleModalClose}>
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
            </FormModal>
        </div>
    );
};

export default TeamDeleteConfirmation;
