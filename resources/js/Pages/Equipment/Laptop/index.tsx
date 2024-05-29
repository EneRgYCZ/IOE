import GuestLayout from "@/Layouts/GuestLayout";
import { Employee, Laptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, TableCell, Typography } from "@mui/material";
import { Table } from "@/Components/table/table";
import EquipmentModal from "@/Components/equipment-modal";
import DeletionConfirmation from "@/Components/crud-forms/deletion-confirmation";
import { EditRounded, DeleteRounded } from "@mui/icons-material";
import AddButton from "@/Components/form-components/add-button";

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
                    <Box sx={{ width: "100%", alignItems: "center" }}>
                        <Table<Laptop>
                            data={laptops}
                            actionRenderer={laptop => (
                                <TableCell
                                    align="center"
                                    style={{ position: "sticky", right: 0, backgroundColor: "#fff" }}
                                >
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        {/* Button for Edit */}
                                        <Button
                                            variant="outlined"
                                            sx={tableButtonMargins}
                                            onClick={() => {
                                                setCurrentLaptop(laptop);
                                                setFormOpen({ ...formOpen, editLaptop: true });
                                            }}
                                        >
                                            VIEW & EDIT
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
                                    </Box>
                                </TableCell>
                            )}
                        />
                    </Box>
                </Box>
            </Card>

            {/* Button for Add */}
            <AddButton label="Add laptop" onClick={() => setFormOpen({ ...formOpen, addLaptop: true })} />

            {/* Forms for Adding, Editing and Deleting */}
            <EquipmentModal
                isOpen={formOpen.addLaptop}
                handleClose={() => setFormOpen({ ...formOpen, addLaptop: false })}
                employees={employees}
                type="Laptop"
            ></EquipmentModal>
            <EquipmentModal
                isOpen={formOpen.editLaptop}
                handleClose={() => setFormOpen({ ...formOpen, editLaptop: false })}
                equipment={currentLaptop}
                employees={employees}
                type="Laptop"
            ></EquipmentModal>
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
