import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UtilityService } from './../../../../shared/services/utilities.service';
export declare class ShareEventModalComponent implements OnInit {
    dialogRef: MatDialogRef<ShareEventModalComponent>;
    data: any;
    private utilityService;
    event: any;
    eventURL: string;
    eventName: string;
    shareLink: any;
    baseUrl: string;
    copied: boolean;
    imageLink: string;
    constructor(dialogRef: MatDialogRef<ShareEventModalComponent>, data: any, utilityService: UtilityService);
    close: () => void;
    copyLink: () => void;
    shareOnFB: () => void;
    ngOnInit(): void;
}
