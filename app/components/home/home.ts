import {Component, View} from 'angular2/angular2';
import {EveApiService, Character} from 'services/eveapiService';

@Component({
    selector: 'eve-online-checker',
    appInjector:[EveApiService]
})

@View({
    templateUrl: 'templates/EVEOnlineChecker.html',
})

export class Home {
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
        var test = this.eveApiService.addCharacter(api_keyID,api_verifCode);
        console.log(test);
        var array = this.eveApiService.getCharacters();
        console.log(array);
        this.eveApiService.choiceCharacter('95021131');
        console.log(this.eveApiService.currentCharacter);
        this.eveApiService.addCharactersInfos(this.eveApiService.currentCharacter.keyId,this.eveApiService.currentCharacter.vCode,this.eveApiService.currentCharacter.characterID);
    }
}