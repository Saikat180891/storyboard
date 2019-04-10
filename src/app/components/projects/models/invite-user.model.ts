import { Role } from "./enums";

export interface InviteUserRequest {
  first_name: string;
  email: string;
  last_name: string;
  role: Role;
  sop: number;
}

export interface InviteUser {
  firstName: string;
  email: string;
  lastName: string;
  role: string;
}
