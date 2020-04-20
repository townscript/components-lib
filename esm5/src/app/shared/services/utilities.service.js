import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { config } from './../../core/app-config';
var UtilityService = /** @class */ (function () {
    function UtilityService() {
        var _this = this;
        this.deprecatedVsNewTimeZones = {
            'Australia/ACT': 'Australia/Sydney',
            'Australia/LHI': 'Australia/Lord_Howe',
            'Australia/North': 'Australia/Darwin',
            'Australia/NSW': 'Australia/Sydney',
            'Australia/Queensland': 'Australia/Brisbane',
            'Australia/South': 'Australia/Adelaide',
            'Australia/Tasmania': 'Australia/Hobart',
            'Australia/Victoria': 'Australia/Melbourne',
            'Australia/West': 'Australia/Perth',
            'Brazil/Acre': 'America/Rio_Branco',
            'Brazil/DeNoronha': 'America/Noronha',
            'Brazil/East': 'America/Sao_Paulo',
            'Brazil/West': 'America/Manaus',
            'Canada/Atlantic': 'America/Halifax',
            'Canada/Central': 'America/Winnipeg',
            'Canada/Eastern': 'America/Toronto',
            'Canada/Mountain': 'America/Edmonton',
            'Canada/Newfoundland': 'America/St_Johns',
            'Canada/Pacific': 'America/Vancouver',
            'Canada/Saskatchewan': 'America/Regina',
            'Canada/Yukon': 'America/Whitehorse',
            'CET': 'Europe/Paris.',
            'Chile/Continental': 'America/Santiago',
            'Chile/EasterIsland': 'Pacific/Easter',
            'CST6CDT': 'America/Chicago.',
            'Cuba': 'America/Havana',
            'EET': 'Europe/Sofia.',
            'Egypt': 'Africa/Cairo',
            'Eire': 'Europe/Dublin',
            'EST': 'America/Cancun.',
            'EST5EDT': 'America/New_York.',
            'Etc/Greenwich': 'Etc/GMT',
            'Etc/Universal': 'Etc/UTC',
            'Etc/Zulu': 'Etc/UTC',
            'GB': 'Europe/London',
            'GB-Eire': 'Europe/London',
            'GMT+0': 'Etc/GMT',
            'GMT0': 'Etc/GMT',
            'GMT−0': 'Etc/GMT',
            'Greenwich': 'Etc/GMT',
            'Hongkong': 'Asia/Hong_Kong',
            'HST': 'Pacific/Honolulu.',
            'Iceland': 'Atlantic/Reykjavik',
            'Iran': 'Asia/Tehran',
            'Israel': 'Asia/Jerusalem',
            'Jamaica': 'America/Jamaica',
            'Japan': 'Asia/Tokyo',
            'Kwajalein': 'Pacific/Kwajalein',
            'Libya': 'Africa/Tripoli',
            'MET': 'Europe/Paris.',
            'Mexico/BajaNorte': 'America/Tijuana',
            'Mexico/BajaSur': 'America/Mazatlan',
            'Mexico/General': 'America/Mexico_City',
            'MST': 'America/Phoenix.',
            'MST7MDT': 'America/Denver.',
            'Navajo': 'America/Denver',
            'NZ': 'Pacific/Auckland',
            'NZ-CHAT': 'Pacific/Chatham',
            'Poland': 'Europe/Warsaw',
            'Portugal': 'Europe/Lisbon',
            'PRC': 'Asia/Shanghai',
            'PST8PDT': 'America/Los_Angeles.',
            'ROC': 'Asia/Taipei',
            'ROK': 'Asia/Seoul',
            'Singapore': 'Asia/Singapore',
            'Turkey': 'Europe/Istanbul',
            'UCT': 'Etc/UCT',
            'Universal': 'Etc/UTC',
            'US/Alaska': 'America/Anchorage',
            'US/Aleutian': 'America/Adak',
            'US/Arizona': 'America/Phoenix',
            'US/Central': 'America/Chicago',
            'US/Eastern': 'America/New_York',
            'US/East-Indiana': 'America/Indiana/Indianapolis',
            'US/Hawaii': 'Pacific/Honolulu',
            'US/Indiana-Starke': 'America/Indiana/Knox',
            'US/Michigan': 'America/Detroit',
            'US/Mountain': 'America/Denver',
            'US/Pacific': 'America/Los_Angeles',
            'US/Pacific-New': 'America/Los_Angeles',
            'US/Samoa': 'Pacific/Pago_Pago',
            'WET': 'Europe/Lisbon.',
            'W-SU': 'Europe/Moscow',
            'Zulu': 'Etc/UTC'
        };
        this.IsJsonString = function (str) {
            try {
                JSON.parse(str);
            }
            catch (e) {
                return false;
            }
            return true;
        };
        this.addFBSDK = function () {
            _this.FB_APP_ID = config.FB_APP_ID;
            var that = _this;
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js#version=v2.9&appId=" + that.FB_APP_ID + "&status=true&cookie=true&xfbml=true";
                if (fjs && fjs.parentNode) {
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, 'script', 'facebook-jssdk'));
        };
    }
    UtilityService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], UtilityService);
    return UtilityService;
}());
export { UtilityService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR2pEO0lBNEZJO1FBQUEsaUJBQ0M7UUF6RkQsNkJBQXdCLEdBQVM7WUFDakMsZUFBZSxFQUFDLGtCQUFrQjtZQUNsQyxlQUFlLEVBQUMscUJBQXFCO1lBQ3JDLGlCQUFpQixFQUFDLGtCQUFrQjtZQUNwQyxlQUFlLEVBQUMsa0JBQWtCO1lBQ2xDLHNCQUFzQixFQUFDLG9CQUFvQjtZQUMzQyxpQkFBaUIsRUFBQyxvQkFBb0I7WUFDdEMsb0JBQW9CLEVBQUMsa0JBQWtCO1lBQ3ZDLG9CQUFvQixFQUFDLHFCQUFxQjtZQUMxQyxnQkFBZ0IsRUFBQyxpQkFBaUI7WUFDbEMsYUFBYSxFQUFDLG9CQUFvQjtZQUNsQyxrQkFBa0IsRUFBQyxpQkFBaUI7WUFDcEMsYUFBYSxFQUFDLG1CQUFtQjtZQUNqQyxhQUFhLEVBQUMsZ0JBQWdCO1lBQzlCLGlCQUFpQixFQUFDLGlCQUFpQjtZQUNuQyxnQkFBZ0IsRUFBQyxrQkFBa0I7WUFDbkMsZ0JBQWdCLEVBQUMsaUJBQWlCO1lBQ2xDLGlCQUFpQixFQUFDLGtCQUFrQjtZQUNwQyxxQkFBcUIsRUFBQyxrQkFBa0I7WUFDeEMsZ0JBQWdCLEVBQUMsbUJBQW1CO1lBQ3BDLHFCQUFxQixFQUFDLGdCQUFnQjtZQUN0QyxjQUFjLEVBQUMsb0JBQW9CO1lBQ25DLEtBQUssRUFBQyxlQUFlO1lBQ3JCLG1CQUFtQixFQUFDLGtCQUFrQjtZQUN0QyxvQkFBb0IsRUFBQyxnQkFBZ0I7WUFDckMsU0FBUyxFQUFDLGtCQUFrQjtZ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QUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsK0RBQStELEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQ0FBcUMsQ0FBQztnQkFDbEksSUFBRyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBQztvQkFDdkIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUN0QztZQUNMLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUE7SUF2QkQsQ0FBQztJQTdGUSxjQUFjO1FBRDFCLFVBQVUsRUFBRTs7T0FDQSxjQUFjLENBcUgxQjtJQUFELHFCQUFDO0NBQUEsQUFySEQsSUFxSEM7U0FySFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFV0aWxpdHlTZXJ2aWNlIHtcblxuICAgIEZCX0FQUF9JRDogYW55O1xuXG4gICAgZGVwcmVjYXRlZFZzTmV3VGltZVpvbmVzIDogYW55ID0ge1xuICAgICdBdXN0cmFsaWEvQUNUJzonQXVzdHJhbGlhL1N5ZG5leScsXG4gICAgJ0F1c3RyYWxpYS9MSEknOidBdXN0cmFsaWEvTG9yZF9Ib3dlJyxcbiAgICAnQXVzdHJhbGlhL05vcnRoJzonQXVzdHJhbGlhL0RhcndpbicsXG4gICAgJ0F1c3RyYWxpYS9OU1cnOidBdXN0cmFsaWEvU3lkbmV5JyxcbiAgICAnQXVzdHJhbGlhL1F1ZWVuc2xhbmQnOidBdXN0cmFsaWEvQnJpc2JhbmUnLFxuICAgICdBdXN0cmFsaWEvU291dGgnOidBdXN0cmFsaWEvQWRlbGFpZGUnLFxuICAgICdBdXN0cmFsaWEvVGFzbWFuaWEnOidBdXN0cmFsaWEvSG9iYXJ0JyxcbiAgICAnQXVzdHJhbGlhL1ZpY3RvcmlhJzonQXVzdHJhbGlhL01lbGJvdXJuZScsXG4gICAgJ0F1c3RyYWxpYS9XZXN0JzonQXVzdHJhbGlhL1BlcnRoJyxcbiAgICAnQnJhemlsL0FjcmUnOidBbWVyaWNhL1Jpb19CcmFuY28nLFxuICAgICdCcmF6aWwvRGVOb3JvbmhhJzonQW1lcmljYS9Ob3JvbmhhJyxcbiAgICAnQnJhemlsL0Vhc3QnOidBbWVyaWNhL1Nhb19QYXVsbycsXG4gICAgJ0JyYXppbC9XZXN0JzonQW1lcmljYS9NYW5hdXMnLFxuICAgICdDYW5hZGEvQXRsYW50aWMnOidBbWVyaWNhL0hhbGlmYXgnLFxuICAgICdDYW5hZGEvQ2VudHJhbCc6J0FtZXJpY2EvV2lubmlwZWcnLFxuICAgICdDYW5hZGEvRWFzdGVybic6J0FtZXJpY2EvVG9yb250bycsXG4gICAgJ0NhbmFkYS9Nb3VudGFpbic6J0FtZXJpY2EvRWRtb250b24nLFxuICAgICdDYW5hZGEvTmV3Zm91bmRsYW5kJzonQW1lcmljYS9TdF9Kb2hucycsXG4gICAgJ0NhbmFkYS9QYWNpZmljJzonQW1lcmljYS9WYW5jb3V2ZXInLFxuICAgICdDYW5hZGEvU2Fza2F0Y2hld2FuJzonQW1lcmljYS9SZWdpbmEnLFxuICAgICdDYW5hZGEvWXVrb24nOidBbWVyaWNhL1doaXRlaG9yc2UnLFxuICAgICdDRVQnOidFdXJvcGUvUGFyaXMuJyxcbiAgICAnQ2hpbGUvQ29udGluZW50YWwnOidBbWVyaWNhL1NhbnRpYWdvJyxcbiAgICAnQ2hpbGUvRWFzdGVySXNsYW5kJzonUGFjaWZpYy9FYXN0ZXInLFxuICAgICdDU1Q2Q0RUJzonQW1lcmljYS9DaGljYWdvLicsXG4gICAgJ0N1YmEnOidBbWVyaWNhL0hhdmFuYScsXG4gICAgJ0VFVCc6J0V1cm9wZS9Tb2ZpYS4nLFxuICAgICdFZ3lwdCc6J0FmcmljYS9DYWlybycsXG4gICAgJ0VpcmUnOidFdXJvcGUvRHVibGluJyxcbiAgICAnRVNUJzonQW1lcmljYS9DYW5jdW4uJyxcbiAgICAnRVNUNUVEVCc6J0FtZXJpY2EvTmV3X1lvcmsuJyxcbiAgICAnRXRjL0dyZWVud2ljaCc6J0V0Yy9HTVQnLFxuICAgICdFdGMvVW5pdmVyc2FsJzonRXRjL1VUQycsXG4gICAgJ0V0Yy9adWx1JzonRXRjL1VUQycsXG4gICAgJ0dCJzonRXVyb3BlL0xvbmRvbicsXG4gICAgJ0dCLUVpcmUnOidFdXJvcGUvTG9uZG9uJyxcbiAgICAnR01UKzAnOidFdGMvR01UJyxcbiAgICAnR01UMCc6J0V0Yy9HTVQnLFxuICAgICdHTVTiiJIwJzonRXRjL0dNVCcsXG4gICAgJ0dyZWVud2ljaCc6J0V0Yy9HTVQnLFxuICAgICdIb25na29uZyc6J0FzaWEvSG9uZ19Lb25nJyxcbiAgICAnSFNUJzonUGFjaWZpYy9Ib25vbHVsdS4nLFxuICAgICdJY2VsYW5kJzonQXRsYW50aWMvUmV5a2phdmlrJyxcbiAgICAnSXJhbic6J0FzaWEvVGVocmFuJyxcbiAgICAnSXNyYWVsJzonQXNpYS9KZXJ1c2FsZW0nLFxuICAgICdKYW1haWNhJzonQW1lcmljYS9KYW1haWNhJyxcbiAgICAnSmFwYW4nOidBc2lhL1Rva3lvJyxcbiAgICAnS3dhamFsZWluJzonUGFjaWZpYy9Ld2FqYWxlaW4nLFxuICAgICdMaWJ5YSc6J0FmcmljYS9Ucmlwb2xpJyxcbiAgICAnTUVUJzonRXVyb3BlL1BhcmlzLicsXG4gICAgJ01leGljby9CYWphTm9ydGUnOidBbWVyaWNhL1RpanVhbmEnLFxuICAgICdNZXhpY28vQmFqYVN1cic6J0FtZXJpY2EvTWF6YXRsYW4nLFxuICAgICdNZXhpY28vR2VuZXJhbCc6J0FtZXJpY2EvTWV4aWNvX0NpdHknLFxuICAgICdNU1QnOidBbWVyaWNhL1Bob2VuaXguJyxcbiAgICAnTVNUN01EVCc6J0FtZXJpY2EvRGVudmVyLicsXG4gICAgJ05hdmFqbyc6J0FtZXJpY2EvRGVudmVyJyxcbiAgICAnTlonOidQYWNpZmljL0F1Y2tsYW5kJyxcbiAgICAnTlotQ0hBVCc6J1BhY2lmaWMvQ2hhdGhhbScsXG4gICAgJ1BvbGFuZCc6J0V1cm9wZS9XYXJzYXcnLFxuICAgICdQb3J0dWdhbCc6J0V1cm9wZS9MaXNib24nLFxuICAgICdQUkMnOidBc2lhL1NoYW5naGFpJyxcbiAgICAnUFNUOFBEVCc6J0FtZXJpY2EvTG9zX0FuZ2VsZXMuJyxcbiAgICAnUk9DJzonQXNpYS9UYWlwZWknLFxuICAgICdST0snOidBc2lhL1Nlb3VsJyxcbiAgICAnU2luZ2Fwb3JlJzonQXNpYS9TaW5nYXBvcmUnLFxuICAgICdUdXJrZXknOidFdXJvcGUvSXN0YW5idWwnLFxuICAgICdVQ1QnOidFdGMvVUNUJyxcbiAgICAnVW5pdmVyc2FsJzonRXRjL1VUQycsXG4gICAgJ1VTL0FsYXNrYSc6J0FtZXJpY2EvQW5jaG9yYWdlJyxcbiAgICAnVVMvQWxldXRpYW4nOidBbWVyaWNhL0FkYWsnLFxuICAgICdVUy9Bcml6b25hJzonQW1lcmljYS9QaG9lbml4JyxcbiAgICAnVVMvQ2VudHJhbCc6J0FtZXJpY2EvQ2hpY2FnbycsXG4gICAgJ1VTL0Vhc3Rlcm4nOidBbWVyaWNhL05ld19Zb3JrJyxcbiAgICAnVVMvRWFzdC1JbmRpYW5hJzonQW1lcmljYS9JbmRpYW5hL0luZGlhbmFwb2xpcycsXG4gICAgJ1VTL0hhd2FpaSc6J1BhY2lmaWMvSG9ub2x1bHUnLFxuICAgICdVUy9JbmRpYW5hLVN0YXJrZSc6J0FtZXJpY2EvSW5kaWFuYS9Lbm94JyxcbiAgICAnVVMvTWljaGlnYW4nOidBbWVyaWNhL0RldHJvaXQnLFxuICAgICdVUy9Nb3VudGFpbic6J0FtZXJpY2EvRGVudmVyJyxcbiAgICAnVVMvUGFjaWZpYyc6J0FtZXJpY2EvTG9zX0FuZ2VsZXMnLFxuICAgICdVUy9QYWNpZmljLU5ldyc6J0FtZXJpY2EvTG9zX0FuZ2VsZXMnLFxuICAgICdVUy9TYW1vYSc6J1BhY2lmaWMvUGFnb19QYWdvJyxcbiAgICAnV0VUJzonRXVyb3BlL0xpc2Jvbi4nLFxuICAgICdXLVNVJzonRXVyb3BlL01vc2NvdycsXG4gICAgJ1p1bHUnOidFdGMvVVRDJ1xuICAgIH07XG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIElzSnNvblN0cmluZyA9IChzdHIpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEpTT04ucGFyc2Uoc3RyKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGFkZEZCU0RLID0gKCkgPT4ge1xuICAgICAgICB0aGlzLkZCX0FQUF9JRCA9IGNvbmZpZy5GQl9BUFBfSUQ7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgKGZ1bmN0aW9uIChkLCBzLCBpZCkge1xuICAgICAgICAgICAgdmFyIGpzLCBmanMgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdO1xuICAgICAgICAgICAgaWYgKGQuZ2V0RWxlbWVudEJ5SWQoaWQpKSB7IHJldHVybjsgfVxuICAgICAgICAgICAganMgPSBkLmNyZWF0ZUVsZW1lbnQocyk7IGpzLmlkID0gaWQ7XG4gICAgICAgICAgICBqcy5zcmMgPSBcImh0dHBzOi8vY29ubmVjdC5mYWNlYm9vay5uZXQvZW5fVVMvc2RrLmpzI3ZlcnNpb249djIuOSZhcHBJZD1cIiArIHRoYXQuRkJfQVBQX0lEICsgXCImc3RhdHVzPXRydWUmY29va2llPXRydWUmeGZibWw9dHJ1ZVwiO1xuICAgICAgICAgICAgaWYoZmpzICYmIGZqcy5wYXJlbnROb2RlKXtcbiAgICAgICAgICAgICAgZmpzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzLCBmanMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KGRvY3VtZW50LCAnc2NyaXB0JywgJ2ZhY2Vib29rLWpzc2RrJykpO1xuICAgIH1cbn1cbiJdfQ==