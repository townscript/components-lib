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
            'CET': 'Europe/Paris',
            'Chile/Continental': 'America/Santiago',
            'Chile/EasterIsland': 'Pacific/Easter',
            'CST6CDT': 'America/Chicago',
            'Cuba': 'America/Havana',
            'EET': 'Europe/Sofia',
            'Egypt': 'Africa/Cairo',
            'Eire': 'Europe/Dublin',
            'EST': 'America/Cancun',
            'EST5EDT': 'America/New_York',
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
            'HST': 'Pacific/Honolulu',
            'Iceland': 'Atlantic/Reykjavik',
            'Iran': 'Asia/Tehran',
            'Israel': 'Asia/Jerusalem',
            'Jamaica': 'America/Jamaica',
            'Japan': 'Asia/Tokyo',
            'Kwajalein': 'Pacific/Kwajalein',
            'Libya': 'Africa/Tripoli',
            'MET': 'Europe/Paris',
            'Mexico/BajaNorte': 'America/Tijuana',
            'Mexico/BajaSur': 'America/Mazatlan',
            'Mexico/General': 'America/Mexico_City',
            'MST': 'America/Phoenix',
            'MST7MDT': 'America/Denver',
            'Navajo': 'America/Denver',
            'NZ': 'Pacific/Auckland',
            'NZ-CHAT': 'Pacific/Chatham',
            'Poland': 'Europe/Warsaw',
            'Portugal': 'Europe/Lisbon',
            'PRC': 'Asia/Shanghai',
            'PST8PDT': 'America/Los_Angeles',
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
            'WET': 'Europe/Lisbon',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR2pEO0lBNEZJO1FBQUEsaUJBQ0M7UUF6RkQsNkJBQXdCLEdBQVE7WUFDNUIsZUFBZSxFQUFFLGtCQUFrQjtZQUNuQyxlQUFlLEVBQUUscUJBQXFCO1lBQ3RDLGlCQUFpQixFQUFFLGtCQUFrQjtZQUNyQyxlQUFlLEVBQUUsa0JBQWtCO1lBQ25DLHNCQUFzQixFQUFFLG9CQUFvQjtZQUM1QyxpQkFBaUIsRUFBRSxvQkFBb0I7WUFDdkMsb0JBQW9CLEVBQUUsa0JBQWtCO1lBQ3hDLG9CQUFvQixFQUFFLHFCQUFxQjtZQUMzQyxnQkFBZ0IsRUFBRSxpQkFBaUI7WUFDbkMsYUFBYSxFQUFFLG9CQUFvQjtZQUNuQyxrQkFBa0IsRUFBRSxpQkFBaUI7WUFDckMsYUFBYSxFQUFFLG1CQUFtQjtZQUNsQyxhQUFhLEVBQUUsZ0JBQWdCO1lBQy9CLGlCQUFpQixFQUFFLGlCQUFpQjtZQUNwQyxnQkFBZ0IsRUFBRSxrQkFBa0I7WUFDcEMsZ0JBQWdCLEVBQUUsaUJBQWlCO1lBQ25DLGlCQUFpQixFQUFFLGtCQUFrQjtZQUNyQyxxQkFBcUIsRUFBRSxrQkFBa0I7WUFDekMsZ0JBQWdCLEVBQUUsbUJBQW1CO1lBQ3JDLHFCQUFxQixFQUFFLGdCQUFnQjtZQUN2QyxjQUFjLEVBQUUsb0JBQW9CO1lBQ3BDLEtBQUssRUFBRSxjQUFjO1lBQ3JCLG1CQUFtQixFQUFFLGtCQUFrQjtZQUN2QyxvQkFBb0IsRUFBRSxnQkFBZ0I7WUFDdEMsU0FBUyxFQUFFLGlCQUFpQjtZ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QUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsK0RBQStELEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQ0FBcUMsQ0FBQztnQkFDbEksSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRTtvQkFDdkIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QztZQUNMLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUE7SUF2QkQsQ0FBQztJQTdGUSxjQUFjO1FBRDFCLFVBQVUsRUFBRTs7T0FDQSxjQUFjLENBcUgxQjtJQUFELHFCQUFDO0NBQUEsQUFySEQsSUFxSEM7U0FySFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFV0aWxpdHlTZXJ2aWNlIHtcblxuICAgIEZCX0FQUF9JRDogYW55O1xuXG4gICAgZGVwcmVjYXRlZFZzTmV3VGltZVpvbmVzOiBhbnkgPSB7XG4gICAgICAgICdBdXN0cmFsaWEvQUNUJzogJ0F1c3RyYWxpYS9TeWRuZXknLFxuICAgICAgICAnQXVzdHJhbGlhL0xISSc6ICdBdXN0cmFsaWEvTG9yZF9Ib3dlJyxcbiAgICAgICAgJ0F1c3RyYWxpYS9Ob3J0aCc6ICdBdXN0cmFsaWEvRGFyd2luJyxcbiAgICAgICAgJ0F1c3RyYWxpYS9OU1cnOiAnQXVzdHJhbGlhL1N5ZG5leScsXG4gICAgICAgICdBdXN0cmFsaWEvUXVlZW5zbGFuZCc6ICdBdXN0cmFsaWEvQnJpc2JhbmUnLFxuICAgICAgICAnQXVzdHJhbGlhL1NvdXRoJzogJ0F1c3RyYWxpYS9BZGVsYWlkZScsXG4gICAgICAgICdBdXN0cmFsaWEvVGFzbWFuaWEnOiAnQXVzdHJhbGlhL0hvYmFydCcsXG4gICAgICAgICdBdXN0cmFsaWEvVmljdG9yaWEnOiAnQXVzdHJhbGlhL01lbGJvdXJuZScsXG4gICAgICAgICdBdXN0cmFsaWEvV2VzdCc6ICdBdXN0cmFsaWEvUGVydGgnLFxuICAgICAgICAnQnJhemlsL0FjcmUnOiAnQW1lcmljYS9SaW9fQnJhbmNvJyxcbiAgICAgICAgJ0JyYXppbC9EZU5vcm9uaGEnOiAnQW1lcmljYS9Ob3JvbmhhJyxcbiAgICAgICAgJ0JyYXppbC9FYXN0JzogJ0FtZXJpY2EvU2FvX1BhdWxvJyxcbiAgICAgICAgJ0JyYXppbC9XZXN0JzogJ0FtZXJpY2EvTWFuYXVzJyxcbiAgICAgICAgJ0NhbmFkYS9BdGxhbnRpYyc6ICdBbWVyaWNhL0hhbGlmYXgnLFxuICAgICAgICAnQ2FuYWRhL0NlbnRyYWwnOiAnQW1lcmljYS9XaW5uaXBlZycsXG4gICAgICAgICdDYW5hZGEvRWFzdGVybic6ICdBbWVyaWNhL1Rvcm9udG8nLFxuICAgICAgICAnQ2FuYWRhL01vdW50YWluJzogJ0FtZXJpY2EvRWRtb250b24nLFxuICAgICAgICAnQ2FuYWRhL05ld2ZvdW5kbGFuZCc6ICdBbWVyaWNhL1N0X0pvaG5zJyxcbiAgICAgICAgJ0NhbmFkYS9QYWNpZmljJzogJ0FtZXJpY2EvVmFuY291dmVyJyxcbiAgICAgICAgJ0NhbmFkYS9TYXNrYXRjaGV3YW4nOiAnQW1lcmljYS9SZWdpbmEnLFxuICAgICAgICAnQ2FuYWRhL1l1a29uJzogJ0FtZXJpY2EvV2hpdGVob3JzZScsXG4gICAgICAgICdDRVQnOiAnRXVyb3BlL1BhcmlzJyxcbiAgICAgICAgJ0NoaWxlL0NvbnRpbmVudGFsJzogJ0FtZXJpY2EvU2FudGlhZ28nLFxuICAgICAgICAnQ2hpbGUvRWFzdGVySXNsYW5kJzogJ1BhY2lmaWMvRWFzdGVyJyxcbiAgICAgICAgJ0NTVDZDRFQnOiAnQW1lcmljYS9DaGljYWdvJyxcbiAgICAgICAgJ0N1YmEnOiAnQW1lcmljYS9IYXZhbmEnLFxuICAgICAgICAnRUVUJzogJ0V1cm9wZS9Tb2ZpYScsXG4gICAgICAgICdFZ3lwdCc6ICdBZnJpY2EvQ2Fpcm8nLFxuICAgICAgICAnRWlyZSc6ICdFdXJvcGUvRHVibGluJyxcbiAgICAgICAgJ0VTVCc6ICdBbWVyaWNhL0NhbmN1bicsXG4gICAgICAgICdFU1Q1RURUJzogJ0FtZXJpY2EvTmV3X1lvcmsnLFxuICAgICAgICAnRXRjL0dyZWVud2ljaCc6ICdFdGMvR01UJyxcbiAgICAgICAgJ0V0Yy9Vbml2ZXJzYWwnOiAnRXRjL1VUQycsXG4gICAgICAgICdFdGMvWnVsdSc6ICdFdGMvVVRDJyxcbiAgICAgICAgJ0dCJzogJ0V1cm9wZS9Mb25kb24nLFxuICAgICAgICAnR0ItRWlyZSc6ICdFdXJvcGUvTG9uZG9uJyxcbiAgICAgICAgJ0dNVCswJzogJ0V0Yy9HTVQnLFxuICAgICAgICAnR01UMCc6ICdFdGMvR01UJyxcbiAgICAgICAgJ0dNVOKIkjAnOiAnRXRjL0dNVCcsXG4gICAgICAgICdHcmVlbndpY2gnOiAnRXRjL0dNVCcsXG4gICAgICAgICdIb25na29uZyc6ICdBc2lhL0hvbmdfS29uZycsXG4gICAgICAgICdIU1QnOiAnUGFjaWZpYy9Ib25vbHVsdScsXG4gICAgICAgICdJY2VsYW5kJzogJ0F0bGFudGljL1JleWtqYXZpaycsXG4gICAgICAgICdJcmFuJzogJ0FzaWEvVGVocmFuJyxcbiAgICAgICAgJ0lzcmFlbCc6ICdBc2lhL0plcnVzYWxlbScsXG4gICAgICAgICdKYW1haWNhJzogJ0FtZXJpY2EvSmFtYWljYScsXG4gICAgICAgICdKYXBhbic6ICdBc2lhL1Rva3lvJyxcbiAgICAgICAgJ0t3YWphbGVpbic6ICdQYWNpZmljL0t3YWphbGVpbicsXG4gICAgICAgICdMaWJ5YSc6ICdBZnJpY2EvVHJpcG9saScsXG4gICAgICAgICdNRVQnOiAnRXVyb3BlL1BhcmlzJyxcbiAgICAgICAgJ01leGljby9CYWphTm9ydGUnOiAnQW1lcmljYS9UaWp1YW5hJyxcbiAgICAgICAgJ01leGljby9CYWphU3VyJzogJ0FtZXJpY2EvTWF6YXRsYW4nLFxuICAgICAgICAnTWV4aWNvL0dlbmVyYWwnOiAnQW1lcmljYS9NZXhpY29fQ2l0eScsXG4gICAgICAgICdNU1QnOiAnQW1lcmljYS9QaG9lbml4JyxcbiAgICAgICAgJ01TVDdNRFQnOiAnQW1lcmljYS9EZW52ZXInLFxuICAgICAgICAnTmF2YWpvJzogJ0FtZXJpY2EvRGVudmVyJyxcbiAgICAgICAgJ05aJzogJ1BhY2lmaWMvQXVja2xhbmQnLFxuICAgICAgICAnTlotQ0hBVCc6ICdQYWNpZmljL0NoYXRoYW0nLFxuICAgICAgICAnUG9sYW5kJzogJ0V1cm9wZS9XYXJzYXcnLFxuICAgICAgICAnUG9ydHVnYWwnOiAnRXVyb3BlL0xpc2JvbicsXG4gICAgICAgICdQUkMnOiAnQXNpYS9TaGFuZ2hhaScsXG4gICAgICAgICdQU1Q4UERUJzogJ0FtZXJpY2EvTG9zX0FuZ2VsZXMnLFxuICAgICAgICAnUk9DJzogJ0FzaWEvVGFpcGVpJyxcbiAgICAgICAgJ1JPSyc6ICdBc2lhL1Nlb3VsJyxcbiAgICAgICAgJ1NpbmdhcG9yZSc6ICdBc2lhL1NpbmdhcG9yZScsXG4gICAgICAgICdUdXJrZXknOiAnRXVyb3BlL0lzdGFuYnVsJyxcbiAgICAgICAgJ1VDVCc6ICdFdGMvVUNUJyxcbiAgICAgICAgJ1VuaXZlcnNhbCc6ICdFdGMvVVRDJyxcbiAgICAgICAgJ1VTL0FsYXNrYSc6ICdBbWVyaWNhL0FuY2hvcmFnZScsXG4gICAgICAgICdVUy9BbGV1dGlhbic6ICdBbWVyaWNhL0FkYWsnLFxuICAgICAgICAnVVMvQXJpem9uYSc6ICdBbWVyaWNhL1Bob2VuaXgnLFxuICAgICAgICAnVVMvQ2VudHJhbCc6ICdBbWVyaWNhL0NoaWNhZ28nLFxuICAgICAgICAnVVMvRWFzdGVybic6ICdBbWVyaWNhL05ld19Zb3JrJyxcbiAgICAgICAgJ1VTL0Vhc3QtSW5kaWFuYSc6ICdBbWVyaWNhL0luZGlhbmEvSW5kaWFuYXBvbGlzJyxcbiAgICAgICAgJ1VTL0hhd2FpaSc6ICdQYWNpZmljL0hvbm9sdWx1JyxcbiAgICAgICAgJ1VTL0luZGlhbmEtU3RhcmtlJzogJ0FtZXJpY2EvSW5kaWFuYS9Lbm94JyxcbiAgICAgICAgJ1VTL01pY2hpZ2FuJzogJ0FtZXJpY2EvRGV0cm9pdCcsXG4gICAgICAgICdVUy9Nb3VudGFpbic6ICdBbWVyaWNhL0RlbnZlcicsXG4gICAgICAgICdVUy9QYWNpZmljJzogJ0FtZXJpY2EvTG9zX0FuZ2VsZXMnLFxuICAgICAgICAnVVMvUGFjaWZpYy1OZXcnOiAnQW1lcmljYS9Mb3NfQW5nZWxlcycsXG4gICAgICAgICdVUy9TYW1vYSc6ICdQYWNpZmljL1BhZ29fUGFnbycsXG4gICAgICAgICdXRVQnOiAnRXVyb3BlL0xpc2JvbicsXG4gICAgICAgICdXLVNVJzogJ0V1cm9wZS9Nb3Njb3cnLFxuICAgICAgICAnWnVsdSc6ICdFdGMvVVRDJ1xuICAgIH07XG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIElzSnNvblN0cmluZyA9IChzdHIpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEpTT04ucGFyc2Uoc3RyKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGFkZEZCU0RLID0gKCkgPT4ge1xuICAgICAgICB0aGlzLkZCX0FQUF9JRCA9IGNvbmZpZy5GQl9BUFBfSUQ7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgKGZ1bmN0aW9uIChkLCBzLCBpZCkge1xuICAgICAgICAgICAgdmFyIGpzLCBmanMgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdO1xuICAgICAgICAgICAgaWYgKGQuZ2V0RWxlbWVudEJ5SWQoaWQpKSB7IHJldHVybjsgfVxuICAgICAgICAgICAganMgPSBkLmNyZWF0ZUVsZW1lbnQocyk7IGpzLmlkID0gaWQ7XG4gICAgICAgICAgICBqcy5zcmMgPSBcImh0dHBzOi8vY29ubmVjdC5mYWNlYm9vay5uZXQvZW5fVVMvc2RrLmpzI3ZlcnNpb249djIuOSZhcHBJZD1cIiArIHRoYXQuRkJfQVBQX0lEICsgXCImc3RhdHVzPXRydWUmY29va2llPXRydWUmeGZibWw9dHJ1ZVwiO1xuICAgICAgICAgICAgaWYgKGZqcyAmJiBmanMucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIGZqcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfShkb2N1bWVudCwgJ3NjcmlwdCcsICdmYWNlYm9vay1qc3NkaycpKTtcbiAgICB9XG59XG4iXX0=