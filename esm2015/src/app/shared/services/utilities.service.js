import { __decorate } from "tslib";
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
UtilityService = __decorate([
    Injectable()
], UtilityService);
export { UtilityService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR2pELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUE0RnZCO1FBeEZBLDZCQUF3QixHQUFRO1lBQzVCLGVBQWUsRUFBRSxrQkFBa0I7WUFDbkMsZUFBZSxFQUFFLHFCQUFxQjtZQUN0QyxpQkFBaUIsRUFBRSxrQkFBa0I7WUFDckMsZUFBZSxFQUFFLGtCQUFrQjtZQUNuQyxzQkFBc0IsRUFBRSxvQkFBb0I7WUFDNUMsaUJBQWlCLEVBQUUsb0JBQW9CO1lBQ3ZDLG9CQUFvQixFQUFFLGtCQUFrQjtZQUN4QyxvQkFBb0IsRUFBRSxxQkFBcUI7WUFDM0MsZ0JBQWdCLEVBQUUsaUJBQWlCO1lBQ25DLGFBQWEsRUFBRSxvQkFBb0I7WUFDbkMsa0JBQWtCLEVBQUUsaUJBQWlCO1lBQ3JDLGFBQWEsRUFBRSxtQkFBbUI7WUFDbEMsYUFBYSxFQUFFLGdCQUFnQjtZQUMvQixpQkFBaUIsRUFBRSxpQkFBaUI7WUFDcEMsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLGdCQUFnQixFQUFFLGlCQUFpQjtZQUNuQyxpQkFBaUIsRUFBRSxrQkFBa0I7WUFDckMscUJBQXFCLEVBQUUsa0JBQWtCO1lBQ3pDLGdCQUFnQixFQUFFLG1CQUFtQjtZQUNyQyxxQkFBcUIsRUFBRSxnQkFBZ0I7WUFDdkMsY0FBYyxFQUFFLG9CQUFvQjtZQUNwQyxLQUFLLEVBQUUsY0FBYztZQUNyQixtQkFBbUIsRUFBRSxrQkFBa0I7WUFDdkMsb0JBQW9CLEVBQUUsZ0JBQWdCO1lBQ3RDLFNB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QU87aUJBQUU7Z0JBQ3JDLEVBQUUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNwQyxFQUFFLENBQUMsR0FBRyxHQUFHLCtEQUErRCxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcscUNBQXFDLENBQUM7Z0JBQ2xJLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7b0JBQ3ZCLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDeEM7WUFDTCxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFBO0lBdkJELENBQUM7Q0F3QkosQ0FBQTtBQXJIWSxjQUFjO0lBRDFCLFVBQVUsRUFBRTtHQUNBLGNBQWMsQ0FxSDFCO1NBckhZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVdGlsaXR5U2VydmljZSB7XG5cbiAgICBGQl9BUFBfSUQ6IGFueTtcblxuICAgIGRlcHJlY2F0ZWRWc05ld1RpbWVab25lczogYW55ID0ge1xuICAgICAgICAnQXVzdHJhbGlhL0FDVCc6ICdBdXN0cmFsaWEvU3lkbmV5JyxcbiAgICAgICAgJ0F1c3RyYWxpYS9MSEknOiAnQXVzdHJhbGlhL0xvcmRfSG93ZScsXG4gICAgICAgICdBdXN0cmFsaWEvTm9ydGgnOiAnQXVzdHJhbGlhL0RhcndpbicsXG4gICAgICAgICdBdXN0cmFsaWEvTlNXJzogJ0F1c3RyYWxpYS9TeWRuZXknLFxuICAgICAgICAnQXVzdHJhbGlhL1F1ZWVuc2xhbmQnOiAnQXVzdHJhbGlhL0JyaXNiYW5lJyxcbiAgICAgICAgJ0F1c3RyYWxpYS9Tb3V0aCc6ICdBdXN0cmFsaWEvQWRlbGFpZGUnLFxuICAgICAgICAnQXVzdHJhbGlhL1Rhc21hbmlhJzogJ0F1c3RyYWxpYS9Ib2JhcnQnLFxuICAgICAgICAnQXVzdHJhbGlhL1ZpY3RvcmlhJzogJ0F1c3RyYWxpYS9NZWxib3VybmUnLFxuICAgICAgICAnQXVzdHJhbGlhL1dlc3QnOiAnQXVzdHJhbGlhL1BlcnRoJyxcbiAgICAgICAgJ0JyYXppbC9BY3JlJzogJ0FtZXJpY2EvUmlvX0JyYW5jbycsXG4gICAgICAgICdCcmF6aWwvRGVOb3JvbmhhJzogJ0FtZXJpY2EvTm9yb25oYScsXG4gICAgICAgICdCcmF6aWwvRWFzdCc6ICdBbWVyaWNhL1Nhb19QYXVsbycsXG4gICAgICAgICdCcmF6aWwvV2VzdCc6ICdBbWVyaWNhL01hbmF1cycsXG4gICAgICAgICdDYW5hZGEvQXRsYW50aWMnOiAnQW1lcmljYS9IYWxpZmF4JyxcbiAgICAgICAgJ0NhbmFkYS9DZW50cmFsJzogJ0FtZXJpY2EvV2lubmlwZWcnLFxuICAgICAgICAnQ2FuYWRhL0Vhc3Rlcm4nOiAnQW1lcmljYS9Ub3JvbnRvJyxcbiAgICAgICAgJ0NhbmFkYS9Nb3VudGFpbic6ICdBbWVyaWNhL0VkbW9udG9uJyxcbiAgICAgICAgJ0NhbmFkYS9OZXdmb3VuZGxhbmQnOiAnQW1lcmljYS9TdF9Kb2hucycsXG4gICAgICAgICdDYW5hZGEvUGFjaWZpYyc6ICdBbWVyaWNhL1ZhbmNvdXZlcicsXG4gICAgICAgICdDYW5hZGEvU2Fza2F0Y2hld2FuJzogJ0FtZXJpY2EvUmVnaW5hJyxcbiAgICAgICAgJ0NhbmFkYS9ZdWtvbic6ICdBbWVyaWNhL1doaXRlaG9yc2UnLFxuICAgICAgICAnQ0VUJzogJ0V1cm9wZS9QYXJpcycsXG4gICAgICAgICdDaGlsZS9Db250aW5lbnRhbCc6ICdBbWVyaWNhL1NhbnRpYWdvJyxcbiAgICAgICAgJ0NoaWxlL0Vhc3RlcklzbGFuZCc6ICdQYWNpZmljL0Vhc3RlcicsXG4gICAgICAgICdDU1Q2Q0RUJzogJ0FtZXJpY2EvQ2hpY2FnbycsXG4gICAgICAgICdDdWJhJzogJ0FtZXJpY2EvSGF2YW5hJyxcbiAgICAgICAgJ0VFVCc6ICdFdXJvcGUvU29maWEnLFxuICAgICAgICAnRWd5cHQnOiAnQWZyaWNhL0NhaXJvJyxcbiAgICAgICAgJ0VpcmUnOiAnRXVyb3BlL0R1YmxpbicsXG4gICAgICAgICdFU1QnOiAnQW1lcmljYS9DYW5jdW4nLFxuICAgICAgICAnRVNUNUVEVCc6ICdBbWVyaWNhL05ld19Zb3JrJyxcbiAgICAgICAgJ0V0Yy9HcmVlbndpY2gnOiAnRXRjL0dNVCcsXG4gICAgICAgICdFdGMvVW5pdmVyc2FsJzogJ0V0Yy9VVEMnLFxuICAgICAgICAnRXRjL1p1bHUnOiAnRXRjL1VUQycsXG4gICAgICAgICdHQic6ICdFdXJvcGUvTG9uZG9uJyxcbiAgICAgICAgJ0dCLUVpcmUnOiAnRXVyb3BlL0xvbmRvbicsXG4gICAgICAgICdHTVQrMCc6ICdFdGMvR01UJyxcbiAgICAgICAgJ0dNVDAnOiAnRXRjL0dNVCcsXG4gICAgICAgICdHTVTiiJIwJzogJ0V0Yy9HTVQnLFxuICAgICAgICAnR3JlZW53aWNoJzogJ0V0Yy9HTVQnLFxuICAgICAgICAnSG9uZ2tvbmcnOiAnQXNpYS9Ib25nX0tvbmcnLFxuICAgICAgICAnSFNUJzogJ1BhY2lmaWMvSG9ub2x1bHUnLFxuICAgICAgICAnSWNlbGFuZCc6ICdBdGxhbnRpYy9SZXlramF2aWsnLFxuICAgICAgICAnSXJhbic6ICdBc2lhL1RlaHJhbicsXG4gICAgICAgICdJc3JhZWwnOiAnQXNpYS9KZXJ1c2FsZW0nLFxuICAgICAgICAnSmFtYWljYSc6ICdBbWVyaWNhL0phbWFpY2EnLFxuICAgICAgICAnSmFwYW4nOiAnQXNpYS9Ub2t5bycsXG4gICAgICAgICdLd2FqYWxlaW4nOiAnUGFjaWZpYy9Ld2FqYWxlaW4nLFxuICAgICAgICAnTGlieWEnOiAnQWZyaWNhL1RyaXBvbGknLFxuICAgICAgICAnTUVUJzogJ0V1cm9wZS9QYXJpcycsXG4gICAgICAgICdNZXhpY28vQmFqYU5vcnRlJzogJ0FtZXJpY2EvVGlqdWFuYScsXG4gICAgICAgICdNZXhpY28vQmFqYVN1cic6ICdBbWVyaWNhL01hemF0bGFuJyxcbiAgICAgICAgJ01leGljby9HZW5lcmFsJzogJ0FtZXJpY2EvTWV4aWNvX0NpdHknLFxuICAgICAgICAnTVNUJzogJ0FtZXJpY2EvUGhvZW5peCcsXG4gICAgICAgICdNU1Q3TURUJzogJ0FtZXJpY2EvRGVudmVyJyxcbiAgICAgICAgJ05hdmFqbyc6ICdBbWVyaWNhL0RlbnZlcicsXG4gICAgICAgICdOWic6ICdQYWNpZmljL0F1Y2tsYW5kJyxcbiAgICAgICAgJ05aLUNIQVQnOiAnUGFjaWZpYy9DaGF0aGFtJyxcbiAgICAgICAgJ1BvbGFuZCc6ICdFdXJvcGUvV2Fyc2F3JyxcbiAgICAgICAgJ1BvcnR1Z2FsJzogJ0V1cm9wZS9MaXNib24nLFxuICAgICAgICAnUFJDJzogJ0FzaWEvU2hhbmdoYWknLFxuICAgICAgICAnUFNUOFBEVCc6ICdBbWVyaWNhL0xvc19BbmdlbGVzJyxcbiAgICAgICAgJ1JPQyc6ICdBc2lhL1RhaXBlaScsXG4gICAgICAgICdST0snOiAnQXNpYS9TZW91bCcsXG4gICAgICAgICdTaW5nYXBvcmUnOiAnQXNpYS9TaW5nYXBvcmUnLFxuICAgICAgICAnVHVya2V5JzogJ0V1cm9wZS9Jc3RhbmJ1bCcsXG4gICAgICAgICdVQ1QnOiAnRXRjL1VDVCcsXG4gICAgICAgICdVbml2ZXJzYWwnOiAnRXRjL1VUQycsXG4gICAgICAgICdVUy9BbGFza2EnOiAnQW1lcmljYS9BbmNob3JhZ2UnLFxuICAgICAgICAnVVMvQWxldXRpYW4nOiAnQW1lcmljYS9BZGFrJyxcbiAgICAgICAgJ1VTL0FyaXpvbmEnOiAnQW1lcmljYS9QaG9lbml4JyxcbiAgICAgICAgJ1VTL0NlbnRyYWwnOiAnQW1lcmljYS9DaGljYWdvJyxcbiAgICAgICAgJ1VTL0Vhc3Rlcm4nOiAnQW1lcmljYS9OZXdfWW9yaycsXG4gICAgICAgICdVUy9FYXN0LUluZGlhbmEnOiAnQW1lcmljYS9JbmRpYW5hL0luZGlhbmFwb2xpcycsXG4gICAgICAgICdVUy9IYXdhaWknOiAnUGFjaWZpYy9Ib25vbHVsdScsXG4gICAgICAgICdVUy9JbmRpYW5hLVN0YXJrZSc6ICdBbWVyaWNhL0luZGlhbmEvS25veCcsXG4gICAgICAgICdVUy9NaWNoaWdhbic6ICdBbWVyaWNhL0RldHJvaXQnLFxuICAgICAgICAnVVMvTW91bnRhaW4nOiAnQW1lcmljYS9EZW52ZXInLFxuICAgICAgICAnVVMvUGFjaWZpYyc6ICdBbWVyaWNhL0xvc19BbmdlbGVzJyxcbiAgICAgICAgJ1VTL1BhY2lmaWMtTmV3JzogJ0FtZXJpY2EvTG9zX0FuZ2VsZXMnLFxuICAgICAgICAnVVMvU2Ftb2EnOiAnUGFjaWZpYy9QYWdvX1BhZ28nLFxuICAgICAgICAnV0VUJzogJ0V1cm9wZS9MaXNib24nLFxuICAgICAgICAnVy1TVSc6ICdFdXJvcGUvTW9zY293JyxcbiAgICAgICAgJ1p1bHUnOiAnRXRjL1VUQydcbiAgICB9O1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBJc0pzb25TdHJpbmcgPSAoc3RyKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKHN0cik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBhZGRGQlNESyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5GQl9BUFBfSUQgPSBjb25maWcuRkJfQVBQX0lEO1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIChmdW5jdGlvbiAoZCwgcywgaWQpIHtcbiAgICAgICAgICAgIHZhciBqcywgZmpzID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXTtcbiAgICAgICAgICAgIGlmIChkLmdldEVsZW1lbnRCeUlkKGlkKSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIGpzID0gZC5jcmVhdGVFbGVtZW50KHMpOyBqcy5pZCA9IGlkO1xuICAgICAgICAgICAganMuc3JjID0gXCJodHRwczovL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX1VTL3Nkay5qcyN2ZXJzaW9uPXYyLjkmYXBwSWQ9XCIgKyB0aGF0LkZCX0FQUF9JRCArIFwiJnN0YXR1cz10cnVlJmNvb2tpZT10cnVlJnhmYm1sPXRydWVcIjtcbiAgICAgICAgICAgIGlmIChmanMgJiYgZmpzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oZG9jdW1lbnQsICdzY3JpcHQnLCAnZmFjZWJvb2stanNzZGsnKSk7XG4gICAgfVxufVxuIl19