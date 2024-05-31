import GuestLayout from "@/Layouts/GuestLayout";
import { DesktopPC, Employee, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { Table } from "@/Components/table/table";
import EquipmentModal from "@/Components/equipment-modal";
import DeletionConfirmation from "@/Components/crud-forms/deletion-confirmation";
import AddButton from "@/Components/form-components/add-button";
import TableActions from "@/Components/table/table-actions";

const Equipment = ({
    desktops,
    employees
}: PageProps<{
    desktops: PaginatedResponse<DesktopPC>;
    employees: Employee[];
}>) => {
    const [formOpen, setFormOpen] = React.useState({
        addDesktop: false,
        editDesktop: false,
        deleteDesktop: false
    });

    const [currentDesktop, setCurrentDesktop] = React.useState<DesktopPC | null>(null);

    return (
        <GuestLayout>
            {/* Table display */}
            <Card variant="outlined" sx={{ width: "70%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h4" sx={{ m: 2 }}>
                        Desktops
                    </Typography>
                </Box>
                <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Box sx={{ width: "100%", alignItems: "center" }}>
                        <Table<DesktopPC>
                            data={desktops}
                            actionRenderer={desktop => (
                                <TableActions
                                    current={desktop}
                                    setCurrent={setCurrentDesktop}
                                    setEditFormOpen={() => {
                                        setFormOpen({ ...formOpen, editDesktop: true });
                                    }}
                                    setDeleteFormOpen={() => {
                                        setFormOpen({ ...formOpen, deleteDesktop: true });
                                    }}
                                />
                            )}
                        />
                    </Box>
                </Box>
            </Card>

            {/* Button for Add */}
            <AddButton label="Add desktop" onClick={() => setFormOpen({ ...formOpen, addDesktop: true })} />

            {/* Forms for Adding, Editing and Deleting */}
            <EquipmentModal
                isOpen={formOpen.addDesktop}
                handleClose={() => setFormOpen({ ...formOpen, addDesktop: false })}
                employees={employees}
                type="DesktopPC"
            ></EquipmentModal>
            <EquipmentModal
                isOpen={formOpen.editDesktop}
                handleClose={() => setFormOpen({ ...formOpen, editDesktop: false })}
                equipment={currentDesktop}
                employees={employees}
                type="DesktopPC"
            ></EquipmentModal>
            {currentDesktop && (
                <DeletionConfirmation
                    isOpen={formOpen.deleteDesktop}
                    handleClose={() => setFormOpen({ ...formOpen, deleteDesktop: false })}
                    deleteObject={currentDesktop}
                    type="DesktopPC"
                />
            )}
        </GuestLayout>
    );
};
export default Equipment;
