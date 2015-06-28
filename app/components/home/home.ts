import {Component, View, NgIf, NgFor} from 'angular2/angular2';
import {EveApiService, Character} from 'services/eveapiService';
import {Router, RootRouter} from 'angular2/router';


@Component({
    selector: 'eve-online-checker',
    appInjector:[EveApiService]
})

@View({
    templateUrl: 'components/home/home.html',
    directives: [NgIf,NgFor]
})

export class Home {
    apiKeyID: string;
    apiVerificationCode: string;
    eveApiService : EveApiService;
    characters: Array;

    constructor(eveApiService : EveApiService) {
        this.eveApiService = eveApiService;
    }

    storeApiCredentials(event, api_keyID, api_verifCode){
        event.preventDefault();

        this.apiKeyID = api_keyID;
        this.apiVerificationCode = api_verifCode;
        var test = this.eveApiService.addCharacter(api_keyID,api_verifCode);
        console.log(test);
        this.characters = this.eveApiService.getCharacters();
        console.log(this.characters);

    }
    showInfos(event,charId){
        event.preventDefault();

        this.eveApiService.choiceCharacter(charId);
        console.log(this.eveApiService.currentCharacter);
        this.eveApiService.addCharactersInfos(this.eveApiService.currentCharacter.keyId,this.eveApiService.currentCharacter.vCode,this.eveApiService.currentCharacter.characterID);
    }
}