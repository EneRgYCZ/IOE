import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { DesktopPC } from "@/types";
import DesktopForm from "@/Components/Equipment/DesktopForm";

const EditDesktop = (props: { isOpen: boolean; handleClose: () => void; desktop: DesktopPC | null }) => {
    const { data, setData, patch } = useForm<DesktopPC>({
        serial_number: props.desktop ? props.desktop.serial_number : "",
        double_pc: props.desktop ? props.desktop.double_pc : false,
        needs_dock: props.desktop ? props.desktop.needs_dock : false,
        status: props.desktop ? props.desktop.status : "",
        floor: props.desktop ? props.desktop.floor : undefined,
        island_number: props.desktop ? props.desktop.island_number : undefined,
        workspace_type: props.desktop ? props.desktop.workspace_type : "",
        updated_in_q1: props.desktop ? props.desktop.updated_in_q1 : false,
        employee_id: props.desktop ? props.desktop.employee_id : undefined
    });

    React.useEffect(() => {
        if (props.desktop !== null) {
            setData(props.desktop);
        }
    }, [props.desktop]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.desktop) {
            patch(route("equipment.updateDesktop", props.desktop.id));
            props.handleClose();
        }
    };

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px"
    };

    return (
        <Modal open={props.isOpen} onClose={props.handleClose}>
            <Box sx={modalStyle}>
                <Typography variant="h5" gutterBottom>
                    Edit Desktop
                </Typography>
                <DesktopForm data={data} setData={setData} onSubmit={submit} />
            </Box>
        </Modal>
    );
};
export default EditDesktop;
