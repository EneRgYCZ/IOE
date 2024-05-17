import React from "react";
import { useForm } from "@inertiajs/react";
import { DesktopPC, Employee } from "@/types";
import DesktopForm from "@/Components/forms/DesktopForm";
import FormModal from "@/Components/forms/form-modal";

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
        if (hasErrors) {
            alert("The request was not successful.\nErrors:\n" + JSON.stringify(errors));
            clearErrors();
        }
    }, [errors]);

    React.useEffect(() => {
        if (props.desktop !== null) {
            setData(props.desktop);
        }
    }, [props.desktop]);

    const submit = () => {
        if (props.desktop) {
            patch(route("equipment.updateDesktop", props.desktop.id));
            props.handleClose();
        }
    };

    return (
        <FormModal open={props.isOpen} onClose={props.handleClose} title="Edit Desktop">
            <DesktopForm data={data} setData={setData} onSubmit={submit} employees={props.employees} />
        </FormModal>
    );
};
export default EditDesktop;
