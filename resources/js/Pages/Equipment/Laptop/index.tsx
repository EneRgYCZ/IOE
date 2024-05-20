import GuestLayout from "@/Layouts/GuestLayout";
import { Employee, Laptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell, Typography } from "@mui/material";
import { Table } from "@/Components/table/table";
import AddLaptop from "@/Pages/Equipment/Laptop/AddLaptop";
import EditLaptop from "@/Pages/Equipment/Laptop/EditLaptop";
import DeletionConfirmation from "@/Components/forms/deletion-confirmation";
import { EditRounded, DeleteRounded } from "@mui/icons-material";

const Equipment = ({
    laptops,
    employees
}: PageProps<{
    laptops: PaginatedResponse<Laptop>;
    employees: Employee[];
}>) => {
    const tableButtonMargins = {
        margin: "0 10px"
    };

    const addButtonBox = {
        position: "fixed",
        width: "250px",
        pointerEvents: "none",
        bottom: 16,
        right: 16
    };

    const addButtonStyle = {
        display: "block",
        pointerEvents: "initial",
        marginTop: "16px",
        marginLeft: "auto"
    };

    const [formOpen, setFormOpen] = React.useState({
        addLaptop: false,
        editLaptop: false,
        deleteLaptop: false
    });

    const [currentLaptop, setCurrentLaptop] = React.useState<Laptop | null>(null);

    return (
        <GuestLayout>
            {/* Table display */}
            <Card variant="outlined" sx={{ width: "70%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h4" sx={{ m: 2 }}>
                        Laptops
                    </Typography>
                </Box>
                <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Box sx={{ width: "100%", alignItems: "center", marginBottom: "30px" }}>
                        <Table<Laptop>
                            name="laptops"
                            data={laptops}
                            actionRenderer={laptop => (
                                <TableCell align="center">
                                    {/* Button for Edit */}
                                    <Button
                                        variant="outlined"
                                        sx={tableButtonMargins}
                                        onClick={() => {
                                            setCurrentLaptop(laptop);
                                            setFormOpen({ ...formOpen, editLaptop: true });
                                        }}
                                    >
                                        EDIT
                                        <EditRounded sx={{ marginLeft: "10px" }} />
                                    </Button>

                                    {/* Button for Delete */}
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        sx={tableButtonMargins}
                                        onClick={() => {
                                            setCurrentLaptop(laptop);
                                            setFormOpen({ ...formOpen, deleteLaptop: true });
                                        }}
                                    >
                                        <DeleteRounded />
                                    </Button>
                                </TableCell>
                            )}
                        />
                    </Box>
                </Box>
            </Card>

            {/* Button for Add */}
            <Box sx={addButtonBox}>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={addButtonStyle}
                    onClick={() => setFormOpen({ ...formOpen, addLaptop: true })}
                >
                    Add laptop
                </Fab>
            </Box>

            {/* Forms for Adding, Editing and Deleting */}
            <AddLaptop
                isOpen={formOpen.addLaptop}
                handleClose={() => setFormOpen({ ...formOpen, addLaptop: false })}
                employees={employees}
            ></AddLaptop>
            <EditLaptop
                isOpen={formOpen.editLaptop}
                handleClose={() => setFormOpen({ ...formOpen, editLaptop: false })}
                laptop={currentLaptop}
                employees={employees}
            ></EditLaptop>
            {currentLaptop && (
                <DeletionConfirmation
                    isOpen={formOpen.deleteLaptop}
                    handleClose={() => setFormOpen({ ...formOpen, deleteLaptop: false })}
                    deleteObject={currentLaptop}
                    type="Laptop"
                />
            )}
        </GuestLayout>
    );
};
export default Equipment;
