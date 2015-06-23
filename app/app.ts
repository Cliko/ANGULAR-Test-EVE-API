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
        this.eveApiService.addCharacter(api_keyID,api_verifCode);
        var array = this.eveApiService.getCharacters();
        console.log(array);
    }
}

bootstrap(EVEOnlineChecker);
