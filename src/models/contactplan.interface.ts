/*
  To be added when we abstract out this info from the contact
  
  Useful so that contact info isn't repeated if you want to
  make two plans for the same person
*/
export interface ContactPlan {
  contact_id: number;
  displayName: string;
  description: string;
  repeat: string;
  daytime: Date;
  nextdaytime: Date;
  open: boolean;
}
