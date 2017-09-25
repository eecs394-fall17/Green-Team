import { repeat } from 'rxjs/operator/repeat';
export class myContact{
    id: number;
    displayName: string;
    phoneNumbers: Array<{value: string}>;
    description: string;
    repeat: string;
    daytime: Date;
    open: boolean;
    satisfied: boolean;
}