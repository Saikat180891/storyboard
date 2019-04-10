export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
  ENTER = 13,
}

export enum Role {
  SUPER_ADMIN = "SuperAdmin",
  MANAGER = "Manager",
  ANALYST = "Analyst",
}

export const allRoles: Role[] = [Role.SUPER_ADMIN, Role.MANAGER, Role.ANALYST];
