import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { config } from './../../core/app-config';
let UtilityService = class UtilityService {
    constructor() {
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
        this.IsJsonString = (str) => {
            try {
                JSON.parse(str);
            }
            catch (e) {
                return false;
            }
            return true;
        };
        this.addFBSDK = () => {
            this.FB_APP_ID = config.FB_APP_ID;
            var that = this;
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
};
UtilityService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], UtilityService);
export { UtilityService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR2pELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUE0RnZCO1FBeEZBLDZCQUF3QixHQUFTO1lBQ2pDLGVBQWUsRUFBQyxrQkFBa0I7WUFDbEMsZUFBZSxFQUFDLHFCQUFxQjtZQUNyQyxpQkFBaUIsRUFBQyxrQkFBa0I7WUFDcEMsZUFBZSxFQUFDLGtCQUFrQjtZQUNsQyxzQkFBc0IsRUFBQyxvQkFBb0I7WUFDM0MsaUJBQWlCLEVBQUMsb0JBQW9CO1lBQ3RDLG9CQUFvQixFQUFDLGtCQUFrQjtZQUN2QyxvQkFBb0IsRUFBQyxxQkFBcUI7WUFDMUMsZ0JBQWdCLEVBQUMsaUJBQWlCO1lBQ2xDLGFBQWEsRUFBQyxvQkFBb0I7WUFDbEMsa0JBQWtCLEVBQUMsaUJBQWlCO1lBQ3BDLGFBQWEsRUFBQyxtQkFBbUI7WUFDakMsYUFBYSxFQUFDLGdCQUFnQjtZQUM5QixpQkFBaUIsRUFBQyxpQkFBaUI7WUFDbkMsZ0JBQWdCLEVBQUMsa0JBQWtCO1lBQ25DLGdCQUFnQixFQUFDLGlCQUFpQjtZQUNsQyxpQkFBaUIsRUFBQyxrQkFBa0I7WUFDcEMscUJBQXFCLEVBQUMsa0JBQWtCO1lBQ3hDLGdCQUFnQixFQUFDLG1CQUFtQjtZQUNwQyxxQkFBcUIsRUFBQyxnQkFBZ0I7WUFDdEMsY0FBYyxFQUFDLG9CQUFvQjtZQUNuQyxLQUFLLEVBQUMsZUFBZTtZQUNyQixtQkFBbUIsRUFBQyxrQkFBa0I7WUFDdEMsb0JBQW9CLEVBQUMsZ0JBQWdCO1lBQ3JDLFNB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QU87aUJBQUU7Z0JBQ3JDLEVBQUUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNwQyxFQUFFLENBQUMsR0FBRyxHQUFHLCtEQUErRCxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcscUNBQXFDLENBQUM7Z0JBQ2xJLElBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUM7b0JBQ3ZCLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDdEM7WUFDTCxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFBO0lBdkJELENBQUM7Q0F3QkosQ0FBQTtBQXJIWSxjQUFjO0lBRDFCLFVBQVUsRUFBRTs7R0FDQSxjQUFjLENBcUgxQjtTQXJIWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXRpbGl0eVNlcnZpY2Uge1xuXG4gICAgRkJfQVBQX0lEOiBhbnk7XG5cbiAgICBkZXByZWNhdGVkVnNOZXdUaW1lWm9uZXMgOiBhbnkgPSB7XG4gICAgJ0F1c3RyYWxpYS9BQ1QnOidBdXN0cmFsaWEvU3lkbmV5JyxcbiAgICAnQXVzdHJhbGlhL0xISSc6J0F1c3RyYWxpYS9Mb3JkX0hvd2UnLFxuICAgICdBdXN0cmFsaWEvTm9ydGgnOidBdXN0cmFsaWEvRGFyd2luJyxcbiAgICAnQXVzdHJhbGlhL05TVyc6J0F1c3RyYWxpYS9TeWRuZXknLFxuICAgICdBdXN0cmFsaWEvUXVlZW5zbGFuZCc6J0F1c3RyYWxpYS9CcmlzYmFuZScsXG4gICAgJ0F1c3RyYWxpYS9Tb3V0aCc6J0F1c3RyYWxpYS9BZGVsYWlkZScsXG4gICAgJ0F1c3RyYWxpYS9UYXNtYW5pYSc6J0F1c3RyYWxpYS9Ib2JhcnQnLFxuICAgICdBdXN0cmFsaWEvVmljdG9yaWEnOidBdXN0cmFsaWEvTWVsYm91cm5lJyxcbiAgICAnQXVzdHJhbGlhL1dlc3QnOidBdXN0cmFsaWEvUGVydGgnLFxuICAgICdCcmF6aWwvQWNyZSc6J0FtZXJpY2EvUmlvX0JyYW5jbycsXG4gICAgJ0JyYXppbC9EZU5vcm9uaGEnOidBbWVyaWNhL05vcm9uaGEnLFxuICAgICdCcmF6aWwvRWFzdCc6J0FtZXJpY2EvU2FvX1BhdWxvJyxcbiAgICAnQnJhemlsL1dlc3QnOidBbWVyaWNhL01hbmF1cycsXG4gICAgJ0NhbmFkYS9BdGxhbnRpYyc6J0FtZXJpY2EvSGFsaWZheCcsXG4gICAgJ0NhbmFkYS9DZW50cmFsJzonQW1lcmljYS9XaW5uaXBlZycsXG4gICAgJ0NhbmFkYS9FYXN0ZXJuJzonQW1lcmljYS9Ub3JvbnRvJyxcbiAgICAnQ2FuYWRhL01vdW50YWluJzonQW1lcmljYS9FZG1vbnRvbicsXG4gICAgJ0NhbmFkYS9OZXdmb3VuZGxhbmQnOidBbWVyaWNhL1N0X0pvaG5zJyxcbiAgICAnQ2FuYWRhL1BhY2lmaWMnOidBbWVyaWNhL1ZhbmNvdXZlcicsXG4gICAgJ0NhbmFkYS9TYXNrYXRjaGV3YW4nOidBbWVyaWNhL1JlZ2luYScsXG4gICAgJ0NhbmFkYS9ZdWtvbic6J0FtZXJpY2EvV2hpdGVob3JzZScsXG4gICAgJ0NFVCc6J0V1cm9wZS9QYXJpcy4nLFxuICAgICdDaGlsZS9Db250aW5lbnRhbCc6J0FtZXJpY2EvU2FudGlhZ28nLFxuICAgICdDaGlsZS9FYXN0ZXJJc2xhbmQnOidQYWNpZmljL0Vhc3RlcicsXG4gICAgJ0NTVDZDRFQnOidBbWVyaWNhL0NoaWNhZ28uJyxcbiAgICAnQ3ViYSc6J0FtZXJpY2EvSGF2YW5hJyxcbiAgICAnRUVUJzonRXVyb3BlL1NvZmlhLicsXG4gICAgJ0VneXB0JzonQWZyaWNhL0NhaXJvJyxcbiAgICAnRWlyZSc6J0V1cm9wZS9EdWJsaW4nLFxuICAgICdFU1QnOidBbWVyaWNhL0NhbmN1bi4nLFxuICAgICdFU1Q1RURUJzonQW1lcmljYS9OZXdfWW9yay4nLFxuICAgICdFdGMvR3JlZW53aWNoJzonRXRjL0dNVCcsXG4gICAgJ0V0Yy9Vbml2ZXJzYWwnOidFdGMvVVRDJyxcbiAgICAnRXRjL1p1bHUnOidFdGMvVVRDJyxcbiAgICAnR0InOidFdXJvcGUvTG9uZG9uJyxcbiAgICAnR0ItRWlyZSc6J0V1cm9wZS9Mb25kb24nLFxuICAgICdHTVQrMCc6J0V0Yy9HTVQnLFxuICAgICdHTVQwJzonRXRjL0dNVCcsXG4gICAgJ0dNVOKIkjAnOidFdGMvR01UJyxcbiAgICAnR3JlZW53aWNoJzonRXRjL0dNVCcsXG4gICAgJ0hvbmdrb25nJzonQXNpYS9Ib25nX0tvbmcnLFxuICAgICdIU1QnOidQYWNpZmljL0hvbm9sdWx1LicsXG4gICAgJ0ljZWxhbmQnOidBdGxhbnRpYy9SZXlramF2aWsnLFxuICAgICdJcmFuJzonQXNpYS9UZWhyYW4nLFxuICAgICdJc3JhZWwnOidBc2lhL0plcnVzYWxlbScsXG4gICAgJ0phbWFpY2EnOidBbWVyaWNhL0phbWFpY2EnLFxuICAgICdKYXBhbic6J0FzaWEvVG9reW8nLFxuICAgICdLd2FqYWxlaW4nOidQYWNpZmljL0t3YWphbGVpbicsXG4gICAgJ0xpYnlhJzonQWZyaWNhL1RyaXBvbGknLFxuICAgICdNRVQnOidFdXJvcGUvUGFyaXMuJyxcbiAgICAnTWV4aWNvL0JhamFOb3J0ZSc6J0FtZXJpY2EvVGlqdWFuYScsXG4gICAgJ01leGljby9CYWphU3VyJzonQW1lcmljYS9NYXphdGxhbicsXG4gICAgJ01leGljby9HZW5lcmFsJzonQW1lcmljYS9NZXhpY29fQ2l0eScsXG4gICAgJ01TVCc6J0FtZXJpY2EvUGhvZW5peC4nLFxuICAgICdNU1Q3TURUJzonQW1lcmljYS9EZW52ZXIuJyxcbiAgICAnTmF2YWpvJzonQW1lcmljYS9EZW52ZXInLFxuICAgICdOWic6J1BhY2lmaWMvQXVja2xhbmQnLFxuICAgICdOWi1DSEFUJzonUGFjaWZpYy9DaGF0aGFtJyxcbiAgICAnUG9sYW5kJzonRXVyb3BlL1dhcnNhdycsXG4gICAgJ1BvcnR1Z2FsJzonRXVyb3BlL0xpc2JvbicsXG4gICAgJ1BSQyc6J0FzaWEvU2hhbmdoYWknLFxuICAgICdQU1Q4UERUJzonQW1lcmljYS9Mb3NfQW5nZWxlcy4nLFxuICAgICdST0MnOidBc2lhL1RhaXBlaScsXG4gICAgJ1JPSyc6J0FzaWEvU2VvdWwnLFxuICAgICdTaW5nYXBvcmUnOidBc2lhL1NpbmdhcG9yZScsXG4gICAgJ1R1cmtleSc6J0V1cm9wZS9Jc3RhbmJ1bCcsXG4gICAgJ1VDVCc6J0V0Yy9VQ1QnLFxuICAgICdVbml2ZXJzYWwnOidFdGMvVVRDJyxcbiAgICAnVVMvQWxhc2thJzonQW1lcmljYS9BbmNob3JhZ2UnLFxuICAgICdVUy9BbGV1dGlhbic6J0FtZXJpY2EvQWRhaycsXG4gICAgJ1VTL0FyaXpvbmEnOidBbWVyaWNhL1Bob2VuaXgnLFxuICAgICdVUy9DZW50cmFsJzonQW1lcmljYS9DaGljYWdvJyxcbiAgICAnVVMvRWFzdGVybic6J0FtZXJpY2EvTmV3X1lvcmsnLFxuICAgICdVUy9FYXN0LUluZGlhbmEnOidBbWVyaWNhL0luZGlhbmEvSW5kaWFuYXBvbGlzJyxcbiAgICAnVVMvSGF3YWlpJzonUGFjaWZpYy9Ib25vbHVsdScsXG4gICAgJ1VTL0luZGlhbmEtU3RhcmtlJzonQW1lcmljYS9JbmRpYW5hL0tub3gnLFxuICAgICdVUy9NaWNoaWdhbic6J0FtZXJpY2EvRGV0cm9pdCcsXG4gICAgJ1VTL01vdW50YWluJzonQW1lcmljYS9EZW52ZXInLFxuICAgICdVUy9QYWNpZmljJzonQW1lcmljYS9Mb3NfQW5nZWxlcycsXG4gICAgJ1VTL1BhY2lmaWMtTmV3JzonQW1lcmljYS9Mb3NfQW5nZWxlcycsXG4gICAgJ1VTL1NhbW9hJzonUGFjaWZpYy9QYWdvX1BhZ28nLFxuICAgICdXRVQnOidFdXJvcGUvTGlzYm9uLicsXG4gICAgJ1ctU1UnOidFdXJvcGUvTW9zY293JyxcbiAgICAnWnVsdSc6J0V0Yy9VVEMnXG4gICAgfTtcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgSXNKc29uU3RyaW5nID0gKHN0cikgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZShzdHIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYWRkRkJTREsgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuRkJfQVBQX0lEID0gY29uZmlnLkZCX0FQUF9JRDtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAoZnVuY3Rpb24gKGQsIHMsIGlkKSB7XG4gICAgICAgICAgICB2YXIganMsIGZqcyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF07XG4gICAgICAgICAgICBpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTsganMuaWQgPSBpZDtcbiAgICAgICAgICAgIGpzLnNyYyA9IFwiaHR0cHM6Ly9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9VUy9zZGsuanMjdmVyc2lvbj12Mi45JmFwcElkPVwiICsgdGhhdC5GQl9BUFBfSUQgKyBcIiZzdGF0dXM9dHJ1ZSZjb29raWU9dHJ1ZSZ4ZmJtbD10cnVlXCI7XG4gICAgICAgICAgICBpZihmanMgJiYgZmpzLnBhcmVudE5vZGUpe1xuICAgICAgICAgICAgICBmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oZG9jdW1lbnQsICdzY3JpcHQnLCAnZmFjZWJvb2stanNzZGsnKSk7XG4gICAgfVxufVxuIl19