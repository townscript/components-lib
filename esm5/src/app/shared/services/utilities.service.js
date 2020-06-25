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
        Injectable()
    ], UtilityService);
    return UtilityService;
}());
export { UtilityService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR2pEO0lBNEZJO1FBQUEsaUJBQ0M7UUF6RkQsNkJBQXdCLEdBQVE7WUFDNUIsZUFBZSxFQUFFLGtCQUFrQjtZQUNuQyxlQUFlLEVBQUUscUJBQXFCO1lBQ3RDLGlCQUFpQixFQUFFLGtCQUFrQjtZQUNyQyxlQUFlLEVBQUUsa0JBQWtCO1lBQ25DLHNCQUFzQixFQUFFLG9CQUFvQjtZQUM1QyxpQkFBaUIsRUFBRSxvQkFBb0I7WUFDdkMsb0JBQW9CLEVBQUUsa0JBQWtCO1lBQ3hDLG9CQUFvQixFQUFFLHFCQUFxQjtZQUMzQyxnQkFBZ0IsRUFBRSxpQkFBaUI7WUFDbkMsYUFBYSxFQUFFLG9CQUFvQjtZQUNuQyxrQkFBa0IsRUFBRSxpQkFBaUI7WUFDckMsYUFBYSxFQUFFLG1CQUFtQjtZQUNsQyxhQUFhLEVBQUUsZ0JBQWdCO1lBQy9CLGlCQUFpQixFQUFFLGlCQUFpQjtZQUNwQyxnQkFBZ0IsRUFBRSxrQkFBa0I7WUFDcEMsZ0JBQWdCLEVBQUUsaUJBQWlCO1lBQ25DLGlCQUFpQixFQUFFLGtCQUFrQjtZQUNyQyxxQkFBcUIsRUFBRSxrQkFBa0I7WUFDekMsZ0JBQWdCLEVBQUUsbUJBQW1CO1lBQ3JDLHFCQUFxQixFQUFFLGdCQUFnQjtZQUN2QyxjQUFjLEVBQUUsb0JBQW9CO1lBQ3BDLEtBQUssRUFBRSxjQUFjO1lBQ3JCLG1CQUFtQixFQUFFLGtCQUFrQjtZQUN2QyxvQkFBb0IsRUFBRSxnQkFBZ0I7WUFDdEMsU0FBUyxFQUFFLGlCQUFpQjtZ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QUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsK0RBQStELEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQ0FBcUMsQ0FBQztnQkFDbEksSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRTtvQkFDdkIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QztZQUNMLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUE7SUF2QkQsQ0FBQztJQTdGUSxjQUFjO1FBRDFCLFVBQVUsRUFBRTtPQUNBLGNBQWMsQ0FxSDFCO0lBQUQscUJBQUM7Q0FBQSxBQXJIRCxJQXFIQztTQXJIWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXRpbGl0eVNlcnZpY2Uge1xuXG4gICAgRkJfQVBQX0lEOiBhbnk7XG5cbiAgICBkZXByZWNhdGVkVnNOZXdUaW1lWm9uZXM6IGFueSA9IHtcbiAgICAgICAgJ0F1c3RyYWxpYS9BQ1QnOiAnQXVzdHJhbGlhL1N5ZG5leScsXG4gICAgICAgICdBdXN0cmFsaWEvTEhJJzogJ0F1c3RyYWxpYS9Mb3JkX0hvd2UnLFxuICAgICAgICAnQXVzdHJhbGlhL05vcnRoJzogJ0F1c3RyYWxpYS9EYXJ3aW4nLFxuICAgICAgICAnQXVzdHJhbGlhL05TVyc6ICdBdXN0cmFsaWEvU3lkbmV5JyxcbiAgICAgICAgJ0F1c3RyYWxpYS9RdWVlbnNsYW5kJzogJ0F1c3RyYWxpYS9CcmlzYmFuZScsXG4gICAgICAgICdBdXN0cmFsaWEvU291dGgnOiAnQXVzdHJhbGlhL0FkZWxhaWRlJyxcbiAgICAgICAgJ0F1c3RyYWxpYS9UYXNtYW5pYSc6ICdBdXN0cmFsaWEvSG9iYXJ0JyxcbiAgICAgICAgJ0F1c3RyYWxpYS9WaWN0b3JpYSc6ICdBdXN0cmFsaWEvTWVsYm91cm5lJyxcbiAgICAgICAgJ0F1c3RyYWxpYS9XZXN0JzogJ0F1c3RyYWxpYS9QZXJ0aCcsXG4gICAgICAgICdCcmF6aWwvQWNyZSc6ICdBbWVyaWNhL1Jpb19CcmFuY28nLFxuICAgICAgICAnQnJhemlsL0RlTm9yb25oYSc6ICdBbWVyaWNhL05vcm9uaGEnLFxuICAgICAgICAnQnJhemlsL0Vhc3QnOiAnQW1lcmljYS9TYW9fUGF1bG8nLFxuICAgICAgICAnQnJhemlsL1dlc3QnOiAnQW1lcmljYS9NYW5hdXMnLFxuICAgICAgICAnQ2FuYWRhL0F0bGFudGljJzogJ0FtZXJpY2EvSGFsaWZheCcsXG4gICAgICAgICdDYW5hZGEvQ2VudHJhbCc6ICdBbWVyaWNhL1dpbm5pcGVnJyxcbiAgICAgICAgJ0NhbmFkYS9FYXN0ZXJuJzogJ0FtZXJpY2EvVG9yb250bycsXG4gICAgICAgICdDYW5hZGEvTW91bnRhaW4nOiAnQW1lcmljYS9FZG1vbnRvbicsXG4gICAgICAgICdDYW5hZGEvTmV3Zm91bmRsYW5kJzogJ0FtZXJpY2EvU3RfSm9obnMnLFxuICAgICAgICAnQ2FuYWRhL1BhY2lmaWMnOiAnQW1lcmljYS9WYW5jb3V2ZXInLFxuICAgICAgICAnQ2FuYWRhL1Nhc2thdGNoZXdhbic6ICdBbWVyaWNhL1JlZ2luYScsXG4gICAgICAgICdDYW5hZGEvWXVrb24nOiAnQW1lcmljYS9XaGl0ZWhvcnNlJyxcbiAgICAgICAgJ0NFVCc6ICdFdXJvcGUvUGFyaXMnLFxuICAgICAgICAnQ2hpbGUvQ29udGluZW50YWwnOiAnQW1lcmljYS9TYW50aWFnbycsXG4gICAgICAgICdDaGlsZS9FYXN0ZXJJc2xhbmQnOiAnUGFjaWZpYy9FYXN0ZXInLFxuICAgICAgICAnQ1NUNkNEVCc6ICdBbWVyaWNhL0NoaWNhZ28nLFxuICAgICAgICAnQ3ViYSc6ICdBbWVyaWNhL0hhdmFuYScsXG4gICAgICAgICdFRVQnOiAnRXVyb3BlL1NvZmlhJyxcbiAgICAgICAgJ0VneXB0JzogJ0FmcmljYS9DYWlybycsXG4gICAgICAgICdFaXJlJzogJ0V1cm9wZS9EdWJsaW4nLFxuICAgICAgICAnRVNUJzogJ0FtZXJpY2EvQ2FuY3VuJyxcbiAgICAgICAgJ0VTVDVFRFQnOiAnQW1lcmljYS9OZXdfWW9yaycsXG4gICAgICAgICdFdGMvR3JlZW53aWNoJzogJ0V0Yy9HTVQnLFxuICAgICAgICAnRXRjL1VuaXZlcnNhbCc6ICdFdGMvVVRDJyxcbiAgICAgICAgJ0V0Yy9adWx1JzogJ0V0Yy9VVEMnLFxuICAgICAgICAnR0InOiAnRXVyb3BlL0xvbmRvbicsXG4gICAgICAgICdHQi1FaXJlJzogJ0V1cm9wZS9Mb25kb24nLFxuICAgICAgICAnR01UKzAnOiAnRXRjL0dNVCcsXG4gICAgICAgICdHTVQwJzogJ0V0Yy9HTVQnLFxuICAgICAgICAnR01U4oiSMCc6ICdFdGMvR01UJyxcbiAgICAgICAgJ0dyZWVud2ljaCc6ICdFdGMvR01UJyxcbiAgICAgICAgJ0hvbmdrb25nJzogJ0FzaWEvSG9uZ19Lb25nJyxcbiAgICAgICAgJ0hTVCc6ICdQYWNpZmljL0hvbm9sdWx1JyxcbiAgICAgICAgJ0ljZWxhbmQnOiAnQXRsYW50aWMvUmV5a2phdmlrJyxcbiAgICAgICAgJ0lyYW4nOiAnQXNpYS9UZWhyYW4nLFxuICAgICAgICAnSXNyYWVsJzogJ0FzaWEvSmVydXNhbGVtJyxcbiAgICAgICAgJ0phbWFpY2EnOiAnQW1lcmljYS9KYW1haWNhJyxcbiAgICAgICAgJ0phcGFuJzogJ0FzaWEvVG9reW8nLFxuICAgICAgICAnS3dhamFsZWluJzogJ1BhY2lmaWMvS3dhamFsZWluJyxcbiAgICAgICAgJ0xpYnlhJzogJ0FmcmljYS9Ucmlwb2xpJyxcbiAgICAgICAgJ01FVCc6ICdFdXJvcGUvUGFyaXMnLFxuICAgICAgICAnTWV4aWNvL0JhamFOb3J0ZSc6ICdBbWVyaWNhL1RpanVhbmEnLFxuICAgICAgICAnTWV4aWNvL0JhamFTdXInOiAnQW1lcmljYS9NYXphdGxhbicsXG4gICAgICAgICdNZXhpY28vR2VuZXJhbCc6ICdBbWVyaWNhL01leGljb19DaXR5JyxcbiAgICAgICAgJ01TVCc6ICdBbWVyaWNhL1Bob2VuaXgnLFxuICAgICAgICAnTVNUN01EVCc6ICdBbWVyaWNhL0RlbnZlcicsXG4gICAgICAgICdOYXZham8nOiAnQW1lcmljYS9EZW52ZXInLFxuICAgICAgICAnTlonOiAnUGFjaWZpYy9BdWNrbGFuZCcsXG4gICAgICAgICdOWi1DSEFUJzogJ1BhY2lmaWMvQ2hhdGhhbScsXG4gICAgICAgICdQb2xhbmQnOiAnRXVyb3BlL1dhcnNhdycsXG4gICAgICAgICdQb3J0dWdhbCc6ICdFdXJvcGUvTGlzYm9uJyxcbiAgICAgICAgJ1BSQyc6ICdBc2lhL1NoYW5naGFpJyxcbiAgICAgICAgJ1BTVDhQRFQnOiAnQW1lcmljYS9Mb3NfQW5nZWxlcycsXG4gICAgICAgICdST0MnOiAnQXNpYS9UYWlwZWknLFxuICAgICAgICAnUk9LJzogJ0FzaWEvU2VvdWwnLFxuICAgICAgICAnU2luZ2Fwb3JlJzogJ0FzaWEvU2luZ2Fwb3JlJyxcbiAgICAgICAgJ1R1cmtleSc6ICdFdXJvcGUvSXN0YW5idWwnLFxuICAgICAgICAnVUNUJzogJ0V0Yy9VQ1QnLFxuICAgICAgICAnVW5pdmVyc2FsJzogJ0V0Yy9VVEMnLFxuICAgICAgICAnVVMvQWxhc2thJzogJ0FtZXJpY2EvQW5jaG9yYWdlJyxcbiAgICAgICAgJ1VTL0FsZXV0aWFuJzogJ0FtZXJpY2EvQWRhaycsXG4gICAgICAgICdVUy9Bcml6b25hJzogJ0FtZXJpY2EvUGhvZW5peCcsXG4gICAgICAgICdVUy9DZW50cmFsJzogJ0FtZXJpY2EvQ2hpY2FnbycsXG4gICAgICAgICdVUy9FYXN0ZXJuJzogJ0FtZXJpY2EvTmV3X1lvcmsnLFxuICAgICAgICAnVVMvRWFzdC1JbmRpYW5hJzogJ0FtZXJpY2EvSW5kaWFuYS9JbmRpYW5hcG9saXMnLFxuICAgICAgICAnVVMvSGF3YWlpJzogJ1BhY2lmaWMvSG9ub2x1bHUnLFxuICAgICAgICAnVVMvSW5kaWFuYS1TdGFya2UnOiAnQW1lcmljYS9JbmRpYW5hL0tub3gnLFxuICAgICAgICAnVVMvTWljaGlnYW4nOiAnQW1lcmljYS9EZXRyb2l0JyxcbiAgICAgICAgJ1VTL01vdW50YWluJzogJ0FtZXJpY2EvRGVudmVyJyxcbiAgICAgICAgJ1VTL1BhY2lmaWMnOiAnQW1lcmljYS9Mb3NfQW5nZWxlcycsXG4gICAgICAgICdVUy9QYWNpZmljLU5ldyc6ICdBbWVyaWNhL0xvc19BbmdlbGVzJyxcbiAgICAgICAgJ1VTL1NhbW9hJzogJ1BhY2lmaWMvUGFnb19QYWdvJyxcbiAgICAgICAgJ1dFVCc6ICdFdXJvcGUvTGlzYm9uJyxcbiAgICAgICAgJ1ctU1UnOiAnRXVyb3BlL01vc2NvdycsXG4gICAgICAgICdadWx1JzogJ0V0Yy9VVEMnXG4gICAgfTtcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgSXNKc29uU3RyaW5nID0gKHN0cikgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZShzdHIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYWRkRkJTREsgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuRkJfQVBQX0lEID0gY29uZmlnLkZCX0FQUF9JRDtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAoZnVuY3Rpb24gKGQsIHMsIGlkKSB7XG4gICAgICAgICAgICB2YXIganMsIGZqcyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF07XG4gICAgICAgICAgICBpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTsganMuaWQgPSBpZDtcbiAgICAgICAgICAgIGpzLnNyYyA9IFwiaHR0cHM6Ly9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9VUy9zZGsuanMjdmVyc2lvbj12Mi45JmFwcElkPVwiICsgdGhhdC5GQl9BUFBfSUQgKyBcIiZzdGF0dXM9dHJ1ZSZjb29raWU9dHJ1ZSZ4ZmJtbD10cnVlXCI7XG4gICAgICAgICAgICBpZiAoZmpzICYmIGZqcy5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgZmpzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzLCBmanMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KGRvY3VtZW50LCAnc2NyaXB0JywgJ2ZhY2Vib29rLWpzc2RrJykpO1xuICAgIH1cbn1cbiJdfQ==