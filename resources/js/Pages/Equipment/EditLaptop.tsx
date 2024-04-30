import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import { Laptop } from "@/types";
import LaptopForm from "@/Components/Equipment/LaptopForm";

const EditLaptop = (props: { isOpen: boolean; handleClose: () => void; laptop: Laptop | null }) => {
    const { data, setData, patch } = useForm<Laptop>({
        serial_number: props.laptop ? props.laptop.serial_number : "",
        status: props.laptop ? props.laptop.status : "",
        floor: props.laptop ? props.laptop.floor : undefined,
        island_number: props.laptop ? props.laptop.island_number : undefined,
        workspace_type: props.laptop ? props.laptop.workspace_type : "",
        updated_in_q1: props.laptop ? props.laptop.updated_in_q1 : false,
        employee_id: props.laptop ? props.laptop.employee_id : undefined
    });

    React.useEffect(() => {
        if (props.laptop !== null) {
            setData(props.laptop);
        }
    }, [props.laptop]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.laptop) {
            patch(route("equipment.updateLaptop", props.laptop.id));
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
                    Edit Laptop
                </Typography>
                <LaptopForm data={data} setData={setData} onSubmit={submit} />
            </Box>
        </Modal>
    );
};
export default EditLaptop;
