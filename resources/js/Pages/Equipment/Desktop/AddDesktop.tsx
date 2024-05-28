import React from "react";
import { useForm } from "@inertiajs/react";
import DesktopForm from "@/Components/forms/desktop-form";
import { DesktopPC, Employee } from "@/types";
import ErrorBox from "@/Components/error-box";
import FormModal from "@/Components/form-components/form-modal";

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
    const modalRef = React.useRef<HTMLDivElement>(null);

    const submit = () => {
        post(route("equipment.storeDesktop"), {
            onSuccess: () => {
                setData(initialValues);
                props.handleClose();
            },
            onError: () => {
                if (modalRef.current != null) {
                    modalRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
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
            title="Add Desktop"
        >
            <div ref={modalRef}></div>
            <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
            <DesktopForm data={data} setData={setData} onSubmit={submit} employees={props.employees} />
        </FormModal>
    );
};
export default AddDesktop;
