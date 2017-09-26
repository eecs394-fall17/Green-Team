import { repeat } from 'rxjs/operator/repeat';
export interface Contact {
  id: number;
  displayName: string;
  phoneNumbers: Array<{value: string}>;
  description: string;
  repeat: string;
  daytime: string;
  open: boolean;
}