import GuestLayout from "@/Layouts/GuestLayout";
import { Employee, Laptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Card, TableCell, Typography } from "@mui/material";
import { CellRenderer, Table, defaultCellRenderer } from "@/Components/table/table";
import EquipmentModal from "@/Components/equipment-modal";
import DeletionConfirmation from "@/Components/crud-forms/deletion-confirmation";
import AddButton from "@/Components/form-components/add-button";
import dayjs from "dayjs";
import TableActions from "@/Components/table/table-actions";

const Equipment = ({
    laptops,
    employees
}: PageProps<{
    laptops: PaginatedResponse<Laptop>;
    employees: Employee[];
}>) => {
    const [formOpen, setFormOpen] = React.useState({
        addLaptop: false,
        editLaptop: false,
        deleteLaptop: false
    });

    const [currentLaptop, setCurrentLaptop] = React.useState<Laptop | null>(null);

    const customCellRenderer: CellRenderer<Laptop> = (row, col, cellKey, rowIdx) => {
        if (col.key === "updated_at" || col.key === "created_at") {
            return (
                <TableCell
                    key={cellKey}
                    sx={{ pl: 2, maxHeight: "50px", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                    {dayjs(row[col.key]).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
            );
        }

        return defaultCellRenderer(row, col, cellKey, rowIdx);
    };

    const actionButtons = (laptop: Laptop): React.ReactElement => {
        return (
            <TableActions
                current={laptop}
                setCurrent={setCurrentLaptop}
                setEditFormOpen={() => {
                    setFormOpen({ ...formOpen, editLaptop: true });
                }}
                setDeleteFormOpen={() => {
                    setFormOpen({ ...formOpen, deleteLaptop: true });
                }}
            />
        );
    };

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
                            cellRenderer={customCellRenderer}
                            actionRenderer={actionButtons}
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
