export interface Contact {
  id: number;
  displayName: string;
  phoneNumbers: Array<{value: string}>;
  description: string;
  repeat: string;
  daytime: string;
  open: boolean;
}