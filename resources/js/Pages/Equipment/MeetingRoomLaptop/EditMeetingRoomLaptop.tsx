import React from "react";
import { useForm } from "@inertiajs/react";
import { MeetingRoomLaptop } from "@/types";
import MeetingRoomLaptopForm from "@/Components/forms/meeting-room-laptop-form";
import FormModal from "@/Components/forms/form-modal";
import ErrorBox from "@/Components/error-box";

const EditMeetingRoomLaptop = (props: {
    isOpen: boolean;
    handleClose: () => void;
    meetingRoomLaptop: MeetingRoomLaptop | null;
}) => {
    const modalRef = React.useRef<HTMLDivElement>(null);

    const { data, setData, patch, hasErrors, errors, clearErrors } = useForm<MeetingRoomLaptop>({
        full_number_identifier: props.meetingRoomLaptop ? props.meetingRoomLaptop.full_number_identifier : "",
        laptop_number: props.meetingRoomLaptop ? props.meetingRoomLaptop.laptop_number : "",
        location: props.meetingRoomLaptop ? props.meetingRoomLaptop.location : "",
        side: props.meetingRoomLaptop ? props.meetingRoomLaptop.side : "",
        floor: props.meetingRoomLaptop ? props.meetingRoomLaptop.floor : undefined,
        room_number: props.meetingRoomLaptop ? props.meetingRoomLaptop.room_number : undefined,
        q1: props.meetingRoomLaptop ? props.meetingRoomLaptop.q1 : false,
        remarks: props.meetingRoomLaptop ? props.meetingRoomLaptop.remarks : ""
    });

    React.useEffect(() => {
        if (props.meetingRoomLaptop !== null) {
            setData(props.meetingRoomLaptop);
        }
    }, [props.meetingRoomLaptop]);

    const submit = () => {
        if (props.meetingRoomLaptop) {
            patch(route("equipment.updateMeetingRoomLaptop", props.meetingRoomLaptop.id), {
                onSuccess: () => {
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
        }
    };

    return (
        <FormModal
            open={props.isOpen}
            onClose={() => {
                props.handleClose();
                clearErrors();
            }}
            title="Edit Meeting Room Laptop"
        >
            <div ref={modalRef}></div>
            <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
            <MeetingRoomLaptopForm data={data} setData={setData} onSubmit={submit} />
        </FormModal>
    );
};
export default EditMeetingRoomLaptop;
