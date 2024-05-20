import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { DesktopPC, Employee } from "@/types";
import DesktopForm from "@/Components/Equipment/DesktopForm";
import ErrorBox from "@/Components/ErrorBox";

const EditDesktop = (props: {
    isOpen: boolean;
    handleClose: () => void;
    desktop: DesktopPC | null;
    employees: Employee[];
}) => {
    const { data, setData, patch, hasErrors, errors, clearErrors } = useForm<DesktopPC>({
        full_number_identifier: props.desktop ? props.desktop.full_number_identifier : "",
        pc_number: props.desktop ? props.desktop.pc_number : "",
        location: props.desktop ? props.desktop.location : "",
        side: props.desktop ? props.desktop.side : "",
        double_pc: props.desktop ? props.desktop.double_pc : false,
        needs_dock: props.desktop ? props.desktop.needs_dock : false,
        status: props.desktop ? props.desktop.status : "",
        floor: props.desktop ? props.desktop.floor : undefined,
        island_number: props.desktop ? props.desktop.island_number : undefined,
        workspace_type: props.desktop ? props.desktop.workspace_type : "",
        updated_in_q1: props.desktop ? props.desktop.updated_in_q1 : false,
        remarks: props.desktop ? props.desktop.remarks : "",
        employee_id: props.desktop ? props.desktop.employee_id : null
    });

    React.useEffect(() => {
        if (props.desktop !== null) {
            setData(props.desktop);
        }
    }, [props.desktop]);

    const submit = () => {
        if (props.desktop) {
            patch(route("equipment.updateDesktop", props.desktop.id), {
                onSuccess: () => {
                    props.handleClose();
                }
            });
        }
    };

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflowY: "auto",
        maxHeight: "80%",
        backgroundColor: "white",
        padding: "20px"
    };

    return (
        <Modal open={props.isOpen} onClose={props.handleClose}>
            <Box sx={modalStyle}>
                <Typography variant="h5" gutterBottom>
                    Edit Desktop
                </Typography>
                <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
                <DesktopForm data={data} setData={setData} onSubmit={submit} employees={props.employees} />
            </Box>
        </Modal>
    );
};
export default EditDesktop;
