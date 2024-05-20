import React from "react";
import { useForm } from "@inertiajs/react";
import MeetingRoomLaptopForm from "@/Components/forms/meeting-room-laptop-form";
import { MeetingRoomLaptop } from "@/types";
import FormModal from "@/Components/forms/form-modal";
import ErrorBox from "@/Components/ErrorBox";

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

    const submit = () => {
        post(route("equipment.storeMeetingRoomLaptop"), {
            onSuccess: () => {
                setData(initialValues);
                props.handleClose();
            }
        });
    };

    return (
        <FormModal open={props.isOpen} onClose={props.handleClose} title="Add Meeting Room Laptop">
            <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
            <MeetingRoomLaptopForm data={data} setData={setData} onSubmit={submit} />
        </FormModal>
    );
};
export default AddMeetingRoomLaptop;
