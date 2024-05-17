import React from "react";
import { useForm } from "@inertiajs/react";
import { MeetingRoomLaptop } from "@/types";
import MeetingRoomLaptopForm from "@/Components/Equipment/MeetingRoomLaptopForm";
import FormModal from "@/Components/form/form-modal";

const EditMeetingRoomLaptop = (props: {
    isOpen: boolean;
    handleClose: () => void;
    meetingRoomLaptop: MeetingRoomLaptop | null;
}) => {
    const { data, setData, patch, hasErrors, errors, clearErrors } = useForm<MeetingRoomLaptop>({
        full_number_identifier: props.meetingRoomLaptop ? props.meetingRoomLaptop.full_number_identifier : "",
        laptop_number: props.meetingRoomLaptop ? props.meetingRoomLaptop.laptop_number : "",
        location: props.meetingRoomLaptop ? props.meetingRoomLaptop.location : "",
        side: props.meetingRoomLaptop ? props.meetingRoomLaptop.side : "",
        floor: props.meetingRoomLaptop ? props.meetingRoomLaptop.floor : undefined,
        room_number: props.meetingRoomLaptop ? props.meetingRoomLaptop.room_number : undefined,
        updated_in_q1: props.meetingRoomLaptop ? props.meetingRoomLaptop.updated_in_q1 : false,
        remarks: props.meetingRoomLaptop ? props.meetingRoomLaptop.remarks : ""
    });

    React.useEffect(() => {
        if (hasErrors) {
            alert("The request was not successful.\nErrors:\n" + JSON.stringify(errors));
            clearErrors();
        }
    }, [errors]);

    React.useEffect(() => {
        if (props.meetingRoomLaptop !== null) {
            setData(props.meetingRoomLaptop);
        }
    }, [props.meetingRoomLaptop]);

    const submit = () => {
        if (props.meetingRoomLaptop) {
            patch(route("equipment.updateMeetingRoomLaptop", props.meetingRoomLaptop.id));
            props.handleClose();
        }
    };

    return (
        <FormModal open={props.isOpen} onClose={props.handleClose} title="Edit Meeting Room Laptop">
            <MeetingRoomLaptopForm data={data} setData={setData} onSubmit={submit} />
        </FormModal>
    );
};
export default EditMeetingRoomLaptop;
