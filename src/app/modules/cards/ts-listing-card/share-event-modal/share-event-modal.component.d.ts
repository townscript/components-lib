import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export declare class ShareEventModalComponent implements OnInit {
    dialogRef: MatDialogRef<ShareEventModalComponent>;
    data: any;
    event: any;
    eventURL: string;
    eventName: string;
    shareLink: any;
    baseUrl: string;
    copied: boolean;
    constructor(dialogRef: MatDialogRef<ShareEventModalComponent>, data: any);
    close: () => void;
    copyLink: () => void;
    ngOnInit(): void;
}
