import { PermissionList } from './permission-list';

export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    permission: PermissionList;
};
