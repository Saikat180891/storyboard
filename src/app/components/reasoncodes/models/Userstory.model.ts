export interface ServerUserstory {
  created?: string;
  dev_hrs: number;
  ftes: number;
  id?: number;
  notes: string;
  planned_delivery: string | Date;
  priority: string;
  productivity?: string | number;
  rc_id?: number;
  rc_name?: string;
  rules_approved: boolean;
  sprint_id?: number;
  sprint_name?: string;
  status: string;
  us_name: string;
  us_number: number;
  verified_test_cases: boolean;
  assignee_name?: string;
  assignee_id?: number;
  assignee_email?: string;
}

export interface ClientUserstory {
  id?: number;
  userstoryNumber: number;
  userstoryName: string;
  epic: number;
  sprint: number;
  priority: string;
  devHrs: number;
  benefits: number;
  productivity: string | number;
  rulesApproved: boolean;
  verifiedTestCases: boolean;
  status: string;
  description: string;
  plannedDelivery: Date;
}

export class Userstory {
  public static getUserstoryForClient(
    userstory: ServerUserstory
  ): ServerUserstory {
    return {
      created: userstory.created,
      dev_hrs: parseFloat(`${userstory.dev_hrs}`),
      ftes: parseFloat(`${userstory.ftes}`),
      id: userstory.id,
      notes: userstory.notes,
      planned_delivery: userstory.planned_delivery,
      priority: userstory.priority || null,
      productivity:
        parseFloat(`${userstory.dev_hrs}`) && parseFloat(`${userstory.ftes}`)
          ? Number(
              (
                parseFloat(`${userstory.ftes}`) /
                parseFloat(`${userstory.dev_hrs}`)
              ).toFixed(1)
            )
          : 0.0,
      rc_id: userstory.rc_id ? userstory.rc_id : null,
      rc_name: userstory.rc_name || null,
      rules_approved: userstory.rules_approved,
      sprint_id: userstory.sprint_id ? userstory.sprint_id : null,
      sprint_name: userstory.sprint_name || null,
      status: userstory.status,
      us_name: userstory.us_name,
      us_number: userstory.us_number,
      verified_test_cases: userstory.verified_test_cases,
      assignee_name: userstory.assignee_name,
      assignee_id: userstory.assignee_id,
      assignee_email: userstory.assignee_email,
    };
  }
}
