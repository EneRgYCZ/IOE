import React from "react";
import { useForm } from "@inertiajs/react";
import MeetingRoomLaptopForm from "@/Components/forms/meeting-room-laptop-form";
import { MeetingRoomLaptop } from "@/types";
import FormModal from "@/Components/forms/form-modal";

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

    React.useEffect(() => {
        if (hasErrors) {
            alert("The request was not successful.\nErrors:\n" + JSON.stringify(errors));
            clearErrors();
        }
    }, [errors]);

    const submit = () => {
        post(route("equipment.storeMeetingRoomLaptop"));
        setData(initialValues);
        props.handleClose();
    };

    return (
        <FormModal open={props.isOpen} onClose={props.handleClose} title="Add Meeting Room Laptop">
            <MeetingRoomLaptopForm data={data} setData={setData} onSubmit={submit} />
        </FormModal>
    );
};
export default AddMeetingRoomLaptop;
