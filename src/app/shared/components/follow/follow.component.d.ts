import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FollowService } from '../../services/follow.service';
import { UserService } from '../../services/user-service';
export declare class FollowComponent implements OnInit {
    private userService;
    private followService;
    private dialog;
    text: string;
    followedText: string;
    type: string;
    color: string;
    followTypeId: any;
    followType: any;
    textCopy: string;
    hovered: boolean;
    user: any;
    allFollowData: any;
    currentId: any;
    loggedIn: boolean;
    followed: boolean;
    constructor(userService: UserService, followService: FollowService, dialog: MatDialog);
    ngOnInit(): void;
    checkFollowStatus: () => void;
    openLogin: () => void;
    followedFn: ($event: any) => void;
}
