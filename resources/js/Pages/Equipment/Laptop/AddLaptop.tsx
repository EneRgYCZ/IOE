import React from "react";
import { useForm } from "@inertiajs/react";
import LaptopForm from "@/Components/forms/laptop-form";
import { Employee, Laptop } from "@/types";
import ErrorBox from "@/Components/ErrorBox";
import FormModal from "@/Components/forms/form-modal";

const AddLaptop = (props: { isOpen: boolean; handleClose: () => void; employees: Employee[] }) => {
    const initialValues: Laptop = {
        full_number_identifier: "",
        laptop_number: "",
        location: "",
        side: "",
        status: "",
        floor: undefined,
        island_number: undefined,
        workspace_type: "",
        updated_in_q1: false,
        remarks: "",
        employee_id: null
    };

    const { data, setData, post, hasErrors, errors, clearErrors } = useForm(initialValues);

    const submit = () => {
        post(route("equipment.storeLaptop"), {
            onSuccess: () => {
                setData(initialValues);
                props.handleClose();
            }
        });
    };

    return (
        <FormModal
            open={props.isOpen}
            onClose={() => {
                props.handleClose();
                clearErrors();
            }}
            title="Add Laptop"
        >
            <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
            <LaptopForm data={data} setData={setData} onSubmit={submit} employees={props.employees} />
        </FormModal>
    );
};
export default AddLaptop;
