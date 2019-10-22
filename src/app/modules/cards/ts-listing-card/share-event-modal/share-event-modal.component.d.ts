import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export declare class ShareEventModalComponent implements OnInit {
    dialogRef: MatDialogRef<ShareEventModalComponent>;
    data: any;
    event: any;
    eventURL: any;
    eventName: any;
    shareLink: any;
    baseUrl: any;
    copied: any;
    constructor(dialogRef: MatDialogRef<ShareEventModalComponent>, data: any);
    close: () => void;
    ngAfterViewInit(): void;
    copyLink: () => void;
    ngOnInit(): void;
}
