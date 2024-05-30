import React from "react";
import { useForm } from "@inertiajs/react";
import { DesktopPC, Employee, Laptop, MeetingRoomLaptop } from "@/types";
import EquipmentForm from "@/Components/crud-forms/equipment-form";
import FormModal from "@/Components/form-components/form-modal";

const EquipmentModal = (props: {
    isOpen: boolean;
    handleClose: () => void;
    equipment?: DesktopPC | Laptop | MeetingRoomLaptop | null;
    employees?: Employee[];
    type: "DesktopPC" | "Laptop" | "MeetingRoomLaptop";
}) => {
    const initialValuesDesktop: DesktopPC = props.equipment
        ? {
              full_number_identifier: props.equipment.full_number_identifier,
              pc_number: props.equipment.pc_number,
              location: props.equipment.location,
              side: props.equipment.side,
              double_pc: props.equipment.double_pc,
              needs_dock: props.equipment.needs_dock,
              status: props.equipment.status,
              floor: props.equipment.floor,
              island_number: props.equipment.island_number,
              workspace_type: props.equipment.workspace_type,
              updated_in_q1: props.equipment.updated_in_q1,
              remarks: props.equipment.remarks,
              employee_id: props.equipment.employee_id
          }
        : {
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

    const initialValuesLaptop: Laptop = props.equipment
        ? {
              full_number_identifier: props.equipment.full_number_identifier,
              laptop_number: props.equipment.laptop_number,
              location: props.equipment.location,
              side: props.equipment.side,
              status: props.equipment.status,
              floor: props.equipment.floor,
              island_number: props.equipment.island_number,
              workspace_type: props.equipment.workspace_type,
              updated_in_q1: props.equipment.updated_in_q1,
              remarks: props.equipment.remarks,
              employee_id: props.equipment.employee_id
          }
        : {
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

    const initialValuesMeetingRoom: MeetingRoomLaptop = props.equipment
        ? {
              full_number_identifier: props.equipment.full_number_identifier,
              laptop_number: props.equipment.laptop_number,
              location: props.equipment.location,
              side: props.equipment.side,
              floor: props.equipment.floor,
              room_number: props.equipment.room_number,
              updated_in_q1: props.equipment.updated_in_q1,
              remarks: props.equipment.remarks
          }
        : {
              full_number_identifier: "",
              laptop_number: "",
              location: "",
              side: "",
              floor: undefined,
              room_number: undefined,
              updated_in_q1: false,
              remarks: ""
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
            {(props.type == "DesktopPC" || props.type == "Laptop") && (
                <EquipmentForm
                    data={data}
                    setData={setData}
                    onSubmit={submit}
                    employees={props.employees}
                    type={props.type}
                    errors={errors}
                    hasErrors={hasErrors}
                />
            )}
            {props.type == "MeetingRoomLaptop" && (
                <EquipmentForm
                    data={data}
                    setData={setData}
                    onSubmit={submit}
                    type={props.type}
                    errors={errors}
                    hasErrors={hasErrors}
                />
            )}
        </FormModal>
    );
};
export default EquipmentModal;
