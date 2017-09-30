export interface Contact {
  id: number;
  displayName: string;
  phoneNumbers: Array<{any}>;
  description: string;
  repeat: string;
  daytime: string;
  open: boolean;
}