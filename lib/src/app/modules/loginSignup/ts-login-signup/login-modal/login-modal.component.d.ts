import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TsLoginSignupComponent } from '../ts-login-signup.component';
export declare class LoginModalComponent implements OnInit {
    dialogRef: MatDialogRef<TsLoginSignupComponent>;
    data: any;
    header: any;
    subHeader: any;
    rdurl: any;
    showSocial: any;
    constructor(dialogRef: MatDialogRef<TsLoginSignupComponent>, data: any);
    ngOnInit(): void;
    close(): void;
}
