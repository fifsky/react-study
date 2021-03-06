import {createApi} from "../util";

export const loginApi = data => createApi("/api/login", data);
export const listApi = data => createApi("/api/admin/list", data);
export const addApi = data => createApi("/api/admin/add", data);
export const deleteApi = data => createApi("/api/admin/delete", data);
export const userApi = () => createApi("/api/admin/user");
