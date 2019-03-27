import { Role } from "./enums";

export enum ServerPermission {
  ADD_ASSIGNEE = "Can add assignee",
  CHANGE_ASSIGNEE = "Can change assignee",
  DELETE_ASSIGNEE = "Can delete assignee",
  VIEW_ASSIGNEE = "Can view assignee",
  ADD_SOP = "Can add sop",
  CHANGE_SOP = "Can change sop",
  DELETE_SOP = "Can delete sop",
  VIEw_SOP = "Can view sop",
}

// TODO these aren't currently used - all templates use the above permissions.
export enum Permission {
  ADD_ASSIGNEE = "canAddAssignee",
  CHANGE_ASSIGNEE = "canChangeAssignee",
  DELETE_ASSIGNEE = "canDeleteAssignee",
  VIEW_ASSIGNEE = "canViewAssignee",
  ADD_SOP = "canAddSop",
  CHANGE_SOP = "canChangeSop",
  DELETE_SOP = "canDeleteSop",
  VIEw_SOP = "canViewSop",
}

export function permissionsAdapter(
  permissions: Map<ServerPermission, boolean>
): Map<Permission, boolean> {
  const ret = {} as Map<Permission, boolean>;
  for (const key in permissions) {
    const permissionValue = permissions[key];
    const newKey = Permission[ServerPermission[key]];
    ret[newKey] = permissionValue;
  }
  return ret;
}

export interface ServerProjectPermissions {
  proj_id: string;
  name: Role;
  permissions: Map<ServerPermission, boolean>;
}

export interface ProjectPermissions {
  projectId: number;
  role: Role;
  permissions: Map<ServerPermission, boolean>;
}

export function projectPermissionsAdapter(
  permissions: ServerProjectPermissions
): ProjectPermissions {
  return {
    projectId: parseInt(permissions.proj_id),
    role: permissions.name,
    permissions: permissions.permissions,
  };
}
