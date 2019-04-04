import { DateUtils } from "../../shared/date-utils";
import { Assignee } from "./assignee.model";
import { ProjectPermissions, ServerPermission } from "./permissions.model";

export interface ServerProject {
  id: number;
  clientName: string;
  title: string;
  chargeCode: string;
  due_date: string;
  logo_url: string;
  number_epics: number;
  assignee: Assignee[];
  owner: string;
}

export interface Project {
  id: number;
  clientName: string;
  title: string;
  chargeCode: string;
  due_date: string;
  logo: string;
  numberEpics: number;
  assignee: Assignee[];
}

// TODO: refactor out currentUserPermission - it is exactly permissions.permission
export interface ProjectDisplay extends Project {
  themeColor?: string;
  permissions?: ProjectPermissions;
  currentUserPermission?: Map<ServerPermission, boolean>;
}

export function projectAdapter(project: ServerProject): Project {
  return {
    id: project.id,
    clientName: project.clientName,
    title: project.title,
    chargeCode: project.chargeCode,
    due_date: DateUtils.formatDateToUS(project.due_date),
    logo: project.logo_url,
    numberEpics: project.number_epics,
    assignee: project.assignee,
  };
}
