import { MatSnackBar } from '@angular/material';
export declare class NotificationService {
    private snackBar;
    constructor(snackBar: MatSnackBar);
    success(message: any, duration: any, action: any): void;
}
