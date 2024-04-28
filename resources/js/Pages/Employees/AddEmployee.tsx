import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, TextField} from "@mui/material";
import { useForm } from "@inertiajs/react";

const AddEmployee = (props: {isOpen:boolean; handleClose:()=>void})=>{
    const defaultValues = {
        first_name:"",
        last_name:""
    };


    const modalStyle : React.CSSProperties = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        width: '400px', 
        height: '450px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
    };

    const inputFieldStyle: React.CSSProperties = {
        width: '100%',
        padding: '5px',
        marginBottom: '5px',
        border: '1px solid #ccc',
        borderRadius: '2px',
        marginTop: '20px',
        backgroundColor: '#f8f8f8',
        boxSizing: 'border-box',
    };

    const submitButtonStyle: React.CSSProperties = {
        width: '100%',
        padding: '8px',
        marginTop: '20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const closeButtonStyle: React.CSSProperties = {
        position: 'absolute',
        top: '5px',
        right: '4px',
        width: '10px !important',
        height: '30px',
        backgroundColor: 'red',
        border: 'none',
        borderRadius: '10%',
        color: 'white',
        fontSize: '18px',
        cursor: 'pointer',
    };

    const {data, setData, post} = useForm(defaultValues);
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {

        const key = e.target.id;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value
        }));
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("employees.store")); 
        setData({
            first_name:"",
            last_name:""
        })
        props.handleClose();
    }

    return (
        <Modal open={props.isOpen} onClose={props.handleClose}>
            <Box sx={modalStyle}>
                <h2 style={{ margin:'0px' }}>Add Employee</h2>
                <form onSubmit={submit}>

                <Button sx={closeButtonStyle} onClick={props.handleClose}>
                    X
                </Button>

                <TextField
                id={"first_name"}
                value={data.first_name}
                onChange={handleChange}
                sx={inputFieldStyle}
                label="First Name"
                variant="outlined"
                />

                <TextField
                id={"last_name"}
                value={data.last_name}
                onChange={handleChange}
                sx={inputFieldStyle}
                label="Last Name"
                variant="outlined"
                />

                <Button variant="contained" sx={submitButtonStyle} type={"submit"}>
                    Submit
                </Button>
                </form>
            </Box>
        </Modal>
    )
}

export default AddEmployee;