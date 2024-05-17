import React from "react";
import { useForm } from "@inertiajs/react";
import { Employee, Laptop } from "@/types";
import LaptopForm from "@/Components/forms/LaptopForm";
import FormModal from "@/Components/forms/form-modal";

const EditLaptop = (props: {
    isOpen: boolean;
    handleClose: () => void;
    laptop: Laptop | null;
    employees: Employee[];
}) => {
    const { data, setData, patch, hasErrors, errors, clearErrors } = useForm<Laptop>({
        full_number_identifier: props.laptop ? props.laptop.full_number_identifier : "",
        laptop_number: props.laptop ? props.laptop.laptop_number : "",
        location: props.laptop ? props.laptop.location : "",
        side: props.laptop ? props.laptop.side : "",
        status: props.laptop ? props.laptop.status : "",
        floor: props.laptop ? props.laptop.floor : undefined,
        island_number: props.laptop ? props.laptop.island_number : undefined,
        workspace_type: props.laptop ? props.laptop.workspace_type : "",
        updated_in_q1: props.laptop ? props.laptop.updated_in_q1 : false,
        remarks: props.laptop ? props.laptop.remarks : "",
        employee_id: props.laptop ? props.laptop.employee_id : null
    });

    React.useEffect(() => {
        if (hasErrors) {
            alert("The request was not successful.\nErrors:\n" + JSON.stringify(errors));
            clearErrors();
        }
    }, [errors]);

    React.useEffect(() => {
        if (props.laptop !== null) {
            setData(props.laptop);
        }
    }, [props.laptop]);

    const submit = () => {
        if (props.laptop) {
            patch(route("equipment.updateLaptop", props.laptop.id));
            props.handleClose();
        }
    };

    return (
        <FormModal open={props.isOpen} onClose={props.handleClose} title="Edit Laptop">
            <LaptopForm data={data} setData={setData} onSubmit={submit} employees={props.employees} />
        </FormModal>
    );
};
export default EditLaptop;
