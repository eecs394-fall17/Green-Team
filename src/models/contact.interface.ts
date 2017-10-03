export interface Contact {
  username: string;
  name: string;
  phoneNumbers: {der, type}[];
  description: string;
  repeat: string;
  daytime: string;
  open: boolean;
}