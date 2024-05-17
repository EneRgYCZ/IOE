import { DesktopPC, Employee, Laptop, MeetingRoomLaptop, Team } from "@/types";
import { Link } from "@inertiajs/react";
import { Button } from "@mui/material";
import React from "react";
import FormModal from "./form/form-modal";

const DeletionConfirmation = (props: {
    isOpen: boolean;
    handleClose: () => void;
    deleteObject: Employee | MeetingRoomLaptop | Laptop | DesktopPC | Team;
    type: string;
}) => {
    const determineRoute = () => {
        switch (props.type) {
            case "Employee":
                return "employees.destroy";
            case "MeetingRoomLaptop":
                return "equipment.destroyMeetingRoomLaptop";
            case "Laptop":
                return "equipment.destroyLaptop";
            case "DesktopPC":
                return "equipment.destroyDesktop";
            case "Team":
                return "teams.destroy";
            default:
                return "";
        }
    };

    return (
        <FormModal open={props.isOpen} onClose={props.handleClose}>
            <h2 style={{ margin: "0px", padding: "35px" }}>
                Are you sure you want to delete this {props.type} entity?
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" color="error" onClick={() => props.handleClose()}>
                    <Link href={route(determineRoute(), props.deleteObject.id)} method="delete">
                        DELETE
                    </Link>
                </Button>
            </div>
        </FormModal>
    );
};

export default DeletionConfirmation;
