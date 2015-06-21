/// <reference path="../typings/tsd.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'eve-online-checker'
})
@View({
    templateUrl: 'templates/EVEOnlineChecker.html',
})
class EVEOnlineChecker {
    apiKeyID: string;
    apiVerificationCode: string;

    storeApiCredentials(event, api_keyID, api_verifCode){
        event.preventDefault();

        this.apiKeyID = api_keyID;
        this.apiVerificationCode = api_verifCode;
        console.log('Key ID : '+ this.apiKeyID);
        console.log('Verification code : '+ this.apiVerificationCode);
    }
}

bootstrap(EVEOnlineChecker);
