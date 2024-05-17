import React from "react";
import { useForm } from "@inertiajs/react";
import DesktopForm from "@/Components/Equipment/DesktopForm";
import { DesktopPC, Employee } from "@/types";
import FormModal from "@/Components/form/form-modal";

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

    React.useEffect(() => {
        if (hasErrors) {
            alert("The request was not successful.\nErrors:\n" + JSON.stringify(errors));
            clearErrors();
        }
    }, [errors]);

    const submit = () => {
        post(route("equipment.storeDesktop"));
        setData(initialValues);
        props.handleClose();
    };

    return (
        <FormModal open={props.isOpen} onClose={props.handleClose} title="Add Desktop">
            <DesktopForm data={data} setData={setData} onSubmit={submit} employees={props.employees} />
        </FormModal>
    );
};
export default AddDesktop;
