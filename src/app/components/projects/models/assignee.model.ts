import { Role } from "./enums";
import { User } from "./user.model";

export interface Assignee {
  id?: number;
  email?: string;
  user: string;
  role: Role;
}

export function userToAssigneeAdapter(user: User): Assignee {
  return {
    user: user.name,
    email: user.email,
    id: user.id,
    role: Role.ANALYST,
  };
}
