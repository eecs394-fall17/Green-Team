export interface Contact {
  username: string;
  displayName: string;
  phoneNumbers: Array<{value: string}>;
  description: string;
  repeat: string;
  daytime: string;
  open: boolean;
}