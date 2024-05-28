import React from "react";
import { useForm } from "@inertiajs/react";
import { Employee, Laptop } from "@/types";
import ErrorBox from "@/Components/error-box";
import FormModal from "@/Components/form-components/form-modal";
import EquipmentForm from "@/Components/crud-forms/equipment-form";

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
    const modalRef = React.useRef<HTMLDivElement>(null);

    const submit = () => {
        post(route("equipment.storeLaptop"), {
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
            title="Add Laptop"
        >
            <div ref={modalRef}></div>
            <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
            <EquipmentForm data={data} setData={setData} onSubmit={submit} employees={props.employees} type="laptop" />
        </FormModal>
    );
};
export default AddLaptop;
