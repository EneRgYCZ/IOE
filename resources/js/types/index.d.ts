/* eslint-disable  @typescript-eslint/no-explicit-any */

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    notificationCount: number;
    toast?: Toast;
    queryBuilder: Record<string, QueryBuilderProps>;
};

export interface Toast {
    title: string;
    description: string;
    timeout: number;
    action: null | {
        label: string;
        redirect: string;
    };
    type: "success" | "danger" | "info" | "warning";
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: Array<T>;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: null | string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
}

export interface QueryBuilderColumn {
    key: string;
    label: string;
    can_be_hidden: boolean;
    hidden: boolean;
    sortable: boolean;
    sorted: boolean | string;
    sort_number: number | null;
}

export interface QueryBuilderSearchInput {
    key: string;
    label: string;
    value: null | string;
    shown: boolean;
}

export interface QueryBuilderProps {
    columns: Array<QueryBuilderColumn>;

    searchInputs: Array<QueryBuilderSearchInput>;

    sort: null | string;
    defaultSort: string;

    cursor: null | string;
    page: number;
    pageName: string;
    perPageOptions: Array<number>;
    perPage: number;
}

export interface Employee {
    [key: string]: any;
    id?: number;
    first_name: string;
    last_name: string;
    teams?: Team[];
    created_at?: string;
    updated_at?: string;
}

export interface Team {
    [key: string]: any;
    id?: number;
    team_name: string;
    description: string;
    team_member?: Employee[];
    created_at?: string;
    updated_at?: string;
}

export interface TeamMember {
    id: number;
    team_id: number;
    team: Team | null;
    employee_id: number;
    employee: Employee | null;
    created_at: string;
    updated_at: string;
}

export interface DesktopPC {
    [key: string]: any;
    id?: number;
    full_number_identifier: string;
    pc_number: string;
    location: string;
    side: string;
    double_pc: boolean;
    needs_dock: boolean;
    status: string;
    floor?: number;
    island_number?: number;
    workspace_type: string;
    updated_in_q1: boolean;
    remarks?: string;
    employee_id: number | null;
    created_at?: string;
    updated_at?: string;
}

export interface Laptop {
    [key: string]: any;
    id?: number;
    full_number_identifier: string;
    laptop_number: string;
    location: string;
    side: string;
    status: string;
    floor?: number;
    island_number?: number;
    workspace_type: string;
    updated_in_q1: boolean;
    remarks?: string;
    employee_id: number | null;
    created_at?: string;
    updated_at?: string;
}

export interface MeetingRoomLaptop {
    [key: string]: any;
    id?: number;
    full_number_identifier: string;
    laptop_number: string;
    location: string;
    side: string;
    floor?: number;
    room_number?: number;
    updated_in_q1: boolean;
    remarks?: string;
    created_at?: string;
    updated_at?: string;
}

export type ActivityLog = BaseActivityLog | UpdateActivityLog | DeleteActivityLog;

export type BaseActivityLog = {
    id: number;
    log_name: string;
    description: string;
    subject_type: string;
    subject: Employee | Team | DesktopPC | Laptop | MeetingRoomLaptop | TeamMember | null;
    event: string;
    subject_id: number;
    causer_type: string;
    causer_id: number;
    causer: User | null;
    properties: {
        attributes: Record<string, unknown> | Employee | Team | DesktopPC | Laptop | MeetingRoomLaptop | TeamMember;
    };
    batch_uuid: string;
    created_at: string;
    updated_at: string;
};

export type DeleteActivityLog = {
    id: number;
    log_name: string;
    description: string;
    subject_type: string;
    subject: Employee | Team | DesktopPC | Laptop | MeetingRoomLaptop | TeamMember | null;
    event: string;
    subject_id: number;
    causer_type: string;
    causer_id: number;
    causer: User | null;
    properties: {
        old: Employee | Team | DesktopPC | Laptop | MeetingRoomLaptop | TeamMember;
    };
    batch_uuid: string;
    created_at: string;
    updated_at: string;
};

export type UpdateActivityLog = {
    id: number;
    log_name: string;
    description: string;
    subject_type: string;
    event: "updated";
    subject: string;
    subject_id: number;
    causer_type: string;
    causer_id: number;
    causer: User | null;
    properties: {
        attributes: Record<string, unknown>;
        old: Record<string, unknown>;
    };
    batch_uuid: string;
    created_at: string;
    updated_at: string;
};
