import { Assignee } from "./assignee.model";

export interface Project {
  id: number;
  clientName: string;
  title: string;
  chargeCode: string;
  due_date: string;
  logo: any;
  rCodes: any;
  assignee: Assignee[];
}
