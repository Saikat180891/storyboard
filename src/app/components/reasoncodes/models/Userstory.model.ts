export interface ServerUserstory {
  created?: string;
  dev_hrs: number;
  ftes: number;
  id?: number;
  notes: string;
  planned_delivery: string;
  priority: string;
  productivity?: string;
  rc_id?: number;
  rc_name?: string;
  revised_delivery?: string;
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

export interface Userstory {
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
