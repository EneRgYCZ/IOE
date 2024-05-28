import React from "react";
import { useForm } from "@inertiajs/react";
import MeetingRoomLaptopForm from "@/Components/crud-forms/meeting-room-laptop-form";
import { MeetingRoomLaptop } from "@/types";
import FormModal from "@/Components/form-components/form-modal";
import ErrorBox from "@/Components/error-box";

const AddMeetingRoomLaptop = (props: { isOpen: boolean; handleClose: () => void }) => {
    const initialValues: MeetingRoomLaptop = {
        full_number_identifier: "",
        laptop_number: "",
        location: "",
        side: "",
        floor: undefined,
        room_number: undefined,
        updated_in_q1: false,
        remarks: ""
    };
    const { data, setData, post, hasErrors, errors, clearErrors } = useForm(initialValues);
    const modalRef = React.useRef<HTMLDivElement>(null);

    const submit = () => {
        post(route("equipment.storeMeetingRoomLaptop"), {
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
            title="Add Meeting Room Laptop"
        >
            <div ref={modalRef}></div>
            <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
            <MeetingRoomLaptopForm data={data} setData={setData} onSubmit={submit} />
        </FormModal>
    );
};
export default AddMeetingRoomLaptop;
