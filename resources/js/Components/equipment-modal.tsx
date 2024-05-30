import React from "react";
import { useForm } from "@inertiajs/react";
import { DesktopPC, Employee, Laptop, MeetingRoomLaptop } from "@/types";
import EquipmentForm from "@/Components/crud-forms/equipment-form";
import FormModal from "@/Components/form-components/form-modal";
import ErrorBox from "@/Components/error-box";

const EquipmentModal = (props: {
    isOpen: boolean;
    handleClose: () => void;
    equipment?: DesktopPC | Laptop | MeetingRoomLaptop | null;
    employees?: Employee[];
    type: "DesktopPC" | "Laptop" | "MeetingRoomLaptop";
}) => {
    const initialValuesDesktop: DesktopPC = {
        full_number_identifier: props.equipment ? props.equipment.full_number_identifier : "",
        pc_number: props.equipment ? props.equipment.pc_number : "",
        location: props.equipment ? props.equipment.location : "",
        side: props.equipment ? props.equipment.side : "",
        double_pc: props.equipment ? props.equipment.double_pc : false,
        needs_dock: props.equipment ? props.equipment.needs_dock : false,
        status: props.equipment ? props.equipment.status : "",
        floor: props.equipment ? props.equipment.floor : undefined,
        island_number: props.equipment ? props.equipment.island_number : undefined,
        workspace_type: props.equipment ? props.equipment.workspace_type : "",
        q1: props.equipment ? props.equipment.q1 : false,
        remarks: props.equipment ? props.equipment.remarks : "",
        employee_id: props.equipment ? props.equipment.employee_id : null
    };

    const initialValuesLaptop: Laptop = {
        full_number_identifier: props.equipment ? props.equipment.full_number_identifier : "",
        laptop_number: props.equipment ? props.equipment.laptop_number : "",
        location: props.equipment ? props.equipment.location : "",
        side: props.equipment ? props.equipment.side : "",
        status: props.equipment ? props.equipment.status : "",
        floor: props.equipment ? props.equipment.floor : undefined,
        island_number: props.equipment ? props.equipment.island_number : undefined,
        workspace_type: props.equipment ? props.equipment.workspace_type : "",
        q1: props.equipment ? props.equipment.q1 : false,
        remarks: props.equipment ? props.equipment.remarks : "",
        employee_id: props.equipment ? props.equipment.employee_id : null
    };

    const initialValuesMeetingRoom: MeetingRoomLaptop = {
        full_number_identifier: props.equipment ? props.equipment.full_number_identifier : "",
        laptop_number: props.equipment ? props.equipment.laptop_number : "",
        location: props.equipment ? props.equipment.location : "",
        side: props.equipment ? props.equipment.side : "",
        floor: props.equipment ? props.equipment.floor : undefined,
        room_number: props.equipment ? props.equipment.room_number : undefined,
        q1: props.equipment ? props.equipment.q1 : false,
        remarks: props.equipment ? props.equipment.remarks : ""
    };

    let initialValues;
    let title;
    let determinedRoute;
    if (props.type == "DesktopPC") {
        initialValues = initialValuesDesktop;
        if (props.equipment) {
            title = "Edit Desktop";
            determinedRoute = "equipment.updateDesktop";
        } else {
            title = "Add Desktop";
            determinedRoute = "equipment.storeDesktop";
        }
    } else if (props.type == "Laptop") {
        initialValues = initialValuesLaptop;
        if (props.equipment) {
            title = "Edit Laptop";
            determinedRoute = "equipment.updateLaptop";
        } else {
            title = "Add Laptop";
            determinedRoute = "equipment.storeLaptop";
        }
    } else {
        initialValues = initialValuesMeetingRoom;
        if (props.equipment) {
            title = "Edit Meeting Room Laptop";
            determinedRoute = "equipment.updateMeetingRoomLaptop";
        } else {
            title = "Add Meeting Room Laptop";
            determinedRoute = "equipment.storeMeetingRoomLaptop";
        }
    }

    const { data, setData, patch, post, hasErrors, errors, clearErrors } = useForm<
        DesktopPC | Laptop | MeetingRoomLaptop
    >(initialValues);
    const modalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (props.equipment) {
            setData(props.equipment);
        }
    }, [props.equipment]);

    const submit = () => {
        if (props.equipment) {
            patch(route(determinedRoute, props.equipment.id), {
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
        } else {
            post(route(determinedRoute), {
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
        }
    };

    return (
        <FormModal
            open={props.isOpen}
            onClose={() => {
                props.handleClose();
                clearErrors();
            }}
            title={title}
        >
            <div ref={modalRef}></div>
            <ErrorBox hasErrors={hasErrors} errors={errors} clearErrors={clearErrors} />
            {(props.type == "DesktopPC" || props.type == "Laptop") && (
                <EquipmentForm
                    data={data}
                    setData={setData}
                    onSubmit={submit}
                    employees={props.employees}
                    type={props.type}
                />
            )}
            {props.type == "MeetingRoomLaptop" && (
                <EquipmentForm data={data} setData={setData} onSubmit={submit} type={props.type} />
            )}
        </FormModal>
    );
};
export default EquipmentModal;
