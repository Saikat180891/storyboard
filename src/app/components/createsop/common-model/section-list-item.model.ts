import { Step } from "./step-type.model";

export interface SectionListItem {
  id?: number;
  user_story_id?: number;
  section_id?: number;
  insertion_id?: number;
  section_name: string;
  description?: string | null;
  steps_list: Array<Step>;
  section_link?: boolean;
  copy_list?: Array<any>;
  linked_userstory_name?: Array<string>;
}
