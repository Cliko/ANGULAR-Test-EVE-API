/// <reference path="../typings/tsd.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {EveApiService, Character} from 'services/eveapiService';

@Component({
    selector: 'eve-online-checker',
    appInjector:[EveApiService]
})
@View({
    templateUrl: 'templates/EVEOnlineChecker.html',
})
class EVEOnlineChecker {
    apiKeyID: string;
    apiVerificationCode: string;
    eveApiService : EveApiService;

    constructor(eveApiService : EveApiService) {
        this.eveApiService = eveApiService;
    }

    storeApiCredentials(event, api_keyID, api_verifCode,){
        event.preventDefault();

        this.apiKeyID = api_keyID;
        this.apiVerificationCode = api_verifCode;
        console.log('Key ID : '+ this.apiKeyID);
        console.log('Verification code : '+ this.apiVerificationCode);
        var characters = this.eveApiService.requestHttp(api_keyID,api_verifCode);
        console.log(characters);
    }
}

bootstrap(EVEOnlineChecker);
