import { Autocomplete, Button, FormLabel, MenuItem, TextField } from "@mui/material";
import React from "react";
import { Employee, Laptop } from "@/types";
import FormField from "@/Components/forms/form-field";
import FormSelect from "@/Components/form-components/form-select";
import FormSwitch from "@/Components/form-components/form-switch";

const LaptopForm = (props: {
    data: Laptop;
    setData: (data: Laptop) => void;
    onSubmit: () => void;
    employees: Employee[];
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

            <FormSelect id="status" label="Status" data={props.data} setData={props.setData}>
                <MenuItem value="static">Static</MenuItem>
                <MenuItem value="flex">Flex</MenuItem>
            </FormSelect>

            <FormField id="floor" label="Floor" data={props.data} setData={props.setData} required />

            <FormField id="island_number" label="Island Number" data={props.data} setData={props.setData} required />

            <FormSelect id="workspace_type" label="Workspace Type" data={props.data} setData={props.setData} required>
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="non-developer">Non-developer</MenuItem>
            </FormSelect>

            <FormSwitch id="updated_in_q1" label="Updated in Q1" data={props.data} setData={props.setData}></FormSwitch>

            <FormField id="remarks" label={"Remarks"} data={props.data} setData={props.setData} />

            <FormLabel>Employee</FormLabel>
            <Autocomplete
                id="employee_id"
                options={props.employees}
                getOptionLabel={(employee: Employee) => employee.first_name + " " + employee.last_name}
                value={props.data.employee_id ? props.employees.find(emp => emp.id == props.data.employee_id) : null}
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
            <div style={{ textAlign: "center" }}>
                <Button variant="contained" type={"submit"}>
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default LaptopForm;
