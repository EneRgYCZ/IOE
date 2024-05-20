import React from "react";
import { useForm } from "@inertiajs/react";
import DesktopForm from "@/Components/forms/desktop-form";
import { DesktopPC, Employee } from "@/types";
import ErrorBox from "@/Components/ErrorBox";
import FormModal from "@/Components/forms/form-modal";

const AddDesktop = (props: { isOpen: boolean; handleClose: () => void; employees: Employee[] }) => {
    const initialValues: DesktopPC = {
        full_number_identifier: "",
        pc_number: "",
        location: "",
        side: "",
        double_pc: false,
        needs_dock: false,
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
        post(route("equipment.storeDesktop"), {
            onSuccess: () => {
                setData(initialValues);
                props.handleClose();
            }
        });
    };

    return (
        <FormModal open={props.isOpen} onClose={props.handleClose} title="Add Desktop">
            <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
            <DesktopForm data={data} setData={setData} onSubmit={submit} employees={props.employees} />
        </FormModal>
    );
};
export default AddDesktop;
