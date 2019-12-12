import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';
export declare class FollowService {
    private http;
    private userService;
    private router;
    baseUrl: String;
    apiServerUrl: String;
    listingsUrl: String;
    user: any;
    private followData$;
    followData: import("rxjs").Observable<Object>;
    constructor(http: HttpClient, userService: UserService, router: Router);
    createFollowData: (type: any, typeId: any, userId: any) => import("rxjs").Observable<Object>;
    getFollowData: (id: any) => void;
    unfollow: (followDataId: any) => import("rxjs").Observable<Object>;
    updateFollowData: (data: any) => void;
}
