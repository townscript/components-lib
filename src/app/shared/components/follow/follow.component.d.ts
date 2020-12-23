import { OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FollowService } from '../../services/follow.service';
import { UserService } from '../../services/user-service';
export declare class FollowComponent implements OnInit, OnChanges, OnDestroy {
    private userService;
    private followService;
    private dialog;
    text: string;
    followedText: string;
    type: string;
    color: string;
    followTypeId: any;
    followType: any;
    typeName: any;
    isSleak: boolean;
    status: any;
    subHeader: string;
    textCopy: string;
    hovered: boolean;
    user: any;
    allFollowData: any;
    currentId: any;
    loggedIn: boolean;
    followed: boolean;
    subObject: any;
    constructor(userService: UserService, followService: FollowService, dialog: MatDialog);
    ngOnInit(): void;
    emitFollowStatus: () => void;
    checkFollowStatus: () => void;
    openLogin: ($event: any) => void;
    followedFn: ($event: any) => void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
