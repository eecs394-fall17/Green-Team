export interface Contact {
  id: number;
  name: string;
  phoneNumbers: {der, type}[];
  description: string;
  repeat: string;
  daytime: string;
  open: boolean;
}