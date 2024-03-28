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
    queryBuilder: Record<string, QueryBuilderProps>;
};
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
    id: number;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
}

export interface Team {
    id: number;
    team_name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface DesktopPC {
    id: number;
    serial_number: string;
    doublePC: boolean;
    needsDock: boolean;
    location: string;
    staus: string;
    floor: number;
    islandNumber: number;
    workspaceType: string;
    updatedInQ1: boolean;
    eployee_id: number;
    created_at: string;
    updated_at: string;
}

export interface Laptop {
    id: number;
    serial_number: string;
    location: string;
    staus: string;
    floor: number;
    islandNumber: number;
    workspaceType: string;
    updatedInQ1: boolean;
    eployee_id: number;
    created_at: string;
    updated_at: string;
}

export interface MeetingRoomLaptop {
    id: number;
    serial_number: string;
    floor: number;
    roomNumber: number;
    updatedInQ1: boolean;
    created_at: string;
    updated_at: string;
}

export interface Logs {
    id: number;
    model: string;
    action: string;
    description: string;
    created_at: string;
    updated_at: string;
}