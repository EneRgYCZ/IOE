import GuestLayout from "@/Layouts/GuestLayout";
import { DesktopPC, Employee, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, TableCell, Typography } from "@mui/material";
import { Table, CellRenderer, defaultCellRenderer } from "@/Components/table/table";
import EquipmentModal from "@/Components/equipment-modal";
import DeletionConfirmation from "@/Components/crud-forms/deletion-confirmation";
import { EditRounded, DeleteRounded } from "@mui/icons-material";
import AddButton from "@/Components/form-components/add-button";

const Equipment = ({
    desktops,
    employees
}: PageProps<{
    desktops: PaginatedResponse<DesktopPC>;
    employees: Employee[];
}>) => {
    const tableButtonMargins = {
        margin: "0 10px"
    };

    const [formOpen, setFormOpen] = React.useState({
        addDesktop: false,
        editDesktop: false,
        deleteDesktop: false
    });

    const [currentDesktop, setCurrentDesktop] = React.useState<DesktopPC | null>(null);
    const customCellRenderer: CellRenderer<any> = (row, col, cellKey, rowIdx) => {
        if (col.key === "needs_dock") {
            const value = row.needs_dock;
            return (
                <TableCell key={rowIdx} sx={{ pl: 2, textAlign: "center" }}>
                    { value == 1 ? (
                        <div>Yes</div>
                    ) : (
                        <div>No</div>
                    )}
                </TableCell>
            );
        }
        // if (col.key === "updated_in_q1") {
        //     const value = row.updated_in_q1;
        //     return (
        //         <TableCell key={rowIdx} sx={{ pl: 2, textAlign: "center" }}>
        //             { value == 1 ? (
        //                 <div>Yes</div>
        //             ) : (
        //                 <div>No</div>
        //             )}
        //         </TableCell>
        //     );
        // }
        return defaultCellRenderer(row, col, cellKey, rowIdx);
    };

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
                            cellRenderer={customCellRenderer}
                            
                            actionRenderer={desktop => (
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
                                                setCurrentDesktop(desktop);
                                                setFormOpen({ ...formOpen, editDesktop: true });
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
                                                setCurrentDesktop(desktop);
                                                setFormOpen({ ...formOpen, deleteDesktop: true });
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
