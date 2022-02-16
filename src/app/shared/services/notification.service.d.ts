import { MatSnackBar } from '@angular/material/snack-bar';
export declare class NotificationService {
    private snackBar;
    constructor(snackBar: MatSnackBar);
    success: (message: any, duration: any, action: any) => void;
}
