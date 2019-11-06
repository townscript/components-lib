import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TsLoginSignupComponent } from '../ts-login-signup.component';
export declare class LoginModalComponent implements OnInit {
    dialogRef: MatDialogRef<TsLoginSignupComponent>;
    data: any;
    header: string;
    subHeader: string;
    rdurl: string;
    showSocial: boolean;
    constructor(dialogRef: MatDialogRef<TsLoginSignupComponent>, data: any);
    ngOnInit(): void;
    close: () => void;
}
