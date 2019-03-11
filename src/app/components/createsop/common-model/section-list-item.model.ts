export interface SectionListItem {
  id?: number;
  user_story_id?: number;
  section_id?: number;
  insertion_id?: string | number;
  section_name: string;
  description?: string | null;
  steps_list: Array<any>;
}