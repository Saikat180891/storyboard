export interface Epics {
  id?: number;
  name: string;
}

export interface ServerEpic {
  id: number;
  name: string;
}

export function getEpic(epic: ServerEpic): Epics {
  return {
    id: epic.id,
    name: epic.name,
  };
}
