import { Autocomplete, Button, FormLabel, MenuItem, TextField } from "@mui/material";
import React from "react";
import { DesktopPC, Employee, Laptop, MeetingRoomLaptop } from "@/types";
import FormField from "@/Components/form-components/form-field";
import FormSelect from "@/Components/form-components/form-select";
import FormSwitch from "@/Components/form-components/form-switch";
import ErrorBox from "@/Components/error-box";

const EquipmentForm = <T extends DesktopPC | Laptop | MeetingRoomLaptop>(props: {
    data: T;
    setData: (data: T) => void;
    onSubmit: () => void;
    employees?: Employee[];
    type: "DesktopPC" | "Laptop" | "MeetingRoomLaptop";
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    errors: Partial<Record<keyof any, string>>;
    hasErrors: boolean;
}) => {
    const fieldStyle = {
        width: "100%",
        padding: "5px",
        marginBottom: "20px",
        marginLeft: 0,
        border: "1px solid #ccc",
        borderRadius: "2px",
        backgroundColor: "#f8f8f8",
        boxSizing: "border-box"
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit();
    };

    return (
        <form onSubmit={submit}>
            <FormField
                id="full_number_identifier"
                label={"Full Number"}
                data={props.data}
                setData={props.setData}
                required
            />
            <ErrorBox field="full_number_identifier" hasErrors={props.hasErrors} errors={props.errors} />

            {props.type == "DesktopPC" && (
                <>
                    <FormField id="pc_number" label={"PC number"} data={props.data} setData={props.setData} required />
                    <ErrorBox field="full_number_identifier" hasErrors={props.hasErrors} errors={props.errors} />
                </>
            )}

            {(props.type == "Laptop" || props.type == "MeetingRoomLaptop") && (
                <>
                    <FormField
                        id="laptop_number"
                        label={"Laptop number"}
                        data={props.data}
                        setData={props.setData}
                        required
                    />
                    <ErrorBox field="laptop_number" hasErrors={props.hasErrors} errors={props.errors} />
                </>
            )}

            <FormSelect id="location" label="Location" data={props.data} setData={props.setData} required>
                <MenuItem value="GHH">GHH</MenuItem>
                <MenuItem value="Waagstraat">Waagstraat</MenuItem>
            </FormSelect>
            <ErrorBox field="location" hasErrors={props.hasErrors} errors={props.errors} />

            <FormSelect id="side" label="Side" data={props.data} setData={props.setData} required>
                <MenuItem value="North">North</MenuItem>
                <MenuItem value="South">South</MenuItem>
            </FormSelect>
            <ErrorBox field="side" hasErrors={props.hasErrors} errors={props.errors} />

            {props.type == "DesktopPC" && (
                <>
                    <FormSwitch id="double_pc" label="Double PC" data={props.data} setData={props.setData}></FormSwitch>
                    <ErrorBox field="double_pc" hasErrors={props.hasErrors} errors={props.errors} />
                </>
            )}

            {props.type == "DesktopPC" && (
                <>
                    <FormSwitch
                        id="needs_dock"
                        label="Needs dock"
                        data={props.data}
                        setData={props.setData}
                    ></FormSwitch>
                    <ErrorBox field="needs_dock" hasErrors={props.hasErrors} errors={props.errors} />
                </>
            )}

            {(props.type == "DesktopPC" || props.type == "Laptop") && (
                <>
                    <FormSelect id="status" label="Status" data={props.data} setData={props.setData}>
                        <MenuItem value="static">Static</MenuItem>
                        <MenuItem value="flex">Flex</MenuItem>
                    </FormSelect>
                    <ErrorBox field="status" hasErrors={props.hasErrors} errors={props.errors} />
                </>
            )}

            <FormField id="floor" label="Floor" data={props.data} setData={props.setData} required />
            <ErrorBox field="floor" hasErrors={props.hasErrors} errors={props.errors} />

            {(props.type == "DesktopPC" || props.type == "Laptop") && (
                <>
                    <FormField
                        id="island_number"
                        label="Island Number"
                        data={props.data}
                        setData={props.setData}
                        required
                    />
                    <ErrorBox field="island_number" hasErrors={props.hasErrors} errors={props.errors} />
                </>
            )}

            {props.type == "MeetingRoomLaptop" && (
                <>
                    <FormField id="room_number" label={"Room number"} data={props.data} setData={props.setData} />
                    <ErrorBox field="room_number" hasErrors={props.hasErrors} errors={props.errors} />
                </>
            )}

            {(props.type == "DesktopPC" || props.type == "Laptop") && (
                <>
                    <FormSelect
                        id="workspace_type"
                        label="Workspace Type"
                        data={props.data}
                        setData={props.setData}
                        required
                    >
                        <MenuItem value="Developer">Developer</MenuItem>
                        <MenuItem value="Non-developer">Non-Developer</MenuItem>
                    </FormSelect>
                    <ErrorBox field="workspace_type" hasErrors={props.hasErrors} errors={props.errors} />
                </>
            )}

            <FormSwitch id="q1" label="Updated in Q1" data={props.data} setData={props.setData}></FormSwitch>
            <ErrorBox field="q1" hasErrors={props.hasErrors} errors={props.errors} />

            <FormField id="remarks" label={"Remarks"} data={props.data} setData={props.setData} />

            {(props.type == "DesktopPC" || props.type == "Laptop") && props.employees && (
                <>
                    <FormLabel>Employee</FormLabel>
                    <Autocomplete
                        id="employee_id"
                        options={props.employees}
                        getOptionLabel={(employee: Employee) => employee.first_name + " " + employee.last_name}
                        value={
                            props.data.employee_id
                                ? props.employees.find(emp => emp.id == props.data.employee_id)
                                : null
                        }
                        onChange={(_event: React.SyntheticEvent, selectedEmployee: Employee | null) => {
                            props.setData({
                                ...props.data,
                                employee_id: selectedEmployee ? selectedEmployee.id : null
                            });
                        }}
                        filterSelectedOptions
                        sx={fieldStyle}
                        renderInput={params => <TextField {...params} />}
                    />
                </>
            )}
            <div style={{ textAlign: "center", position: "sticky", bottom: 0 }}>
                <Button
                    variant="contained"
                    type={"submit"}
                    sx={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;" }}
                >
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default EquipmentForm;
