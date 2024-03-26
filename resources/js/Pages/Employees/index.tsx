import GuestLayout from "@/Layouts/GuestLayout";
import { Employee, PageProps, PaginatedResponse } from "@/types";
import React from "react";

const Employees = ({ employees }: PageProps<{ employees: PaginatedResponse<Employee> }>) => {

    console.log(employees);

    return (
        <GuestLayout>
            <h1>Employees</h1>
        </GuestLayout>
    );
};

export default Employees;
