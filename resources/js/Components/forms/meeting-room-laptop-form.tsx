import { Button, MenuItem } from "@mui/material";
import React from "react";
import { MeetingRoomLaptop } from "@/types";
import FormField from "@/Components/forms/form-field";
import FormSelect from "@/Components/forms/form-select";
import FormSwitch from "@/Components/forms/form-switch";

const MeetingRoomLaptopForm = (props: {
    data: MeetingRoomLaptop;
    setData: (data: MeetingRoomLaptop) => void;
    onSubmit: () => void;
}) => {
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        props.onSubmit();
    };

    return (
        <form onSubmit={submit} style={{ marginTop: "10px" }}>
            <FormField
                id="full_number_identifier"
                label={"Full Number"}
                data={props.data}
                setData={props.setData}
                required
            />

            <FormField id="laptop_number" label={"Laptop number"} data={props.data} setData={props.setData} required />

            <FormSelect id="location" label="Location" data={props.data} setData={props.setData} required>
                <MenuItem value="ghh">GHH</MenuItem>
                <MenuItem value="waagstraat">Waagstraat</MenuItem>
            </FormSelect>

            <FormSelect id="side" label="Side" data={props.data} setData={props.setData} required>
                <MenuItem value="north">North</MenuItem>
                <MenuItem value="south">South</MenuItem>
            </FormSelect>

            <FormField id="floor" label={"Floor"} data={props.data} setData={props.setData} required />

            <FormField id="room_number" label={"Room number"} data={props.data} setData={props.setData} />

            <FormSwitch id="updated_in_q1" label="Updated in Q1" data={props.data} setData={props.setData}></FormSwitch>

            <FormField id="remarks" label={"Remarks"} data={props.data} setData={props.setData} />

            <div style={{ textAlign: "center" }}>
                <Button variant="contained" type={"submit"}>
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default MeetingRoomLaptopForm;
