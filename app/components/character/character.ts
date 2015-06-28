import {Component, View, NgIf, NgFor} from 'angular2/angular2';
import {EveApiService, Character} from 'services/eveapiService';

@Component({
    selector: 'character',
    appInjector:[EveApiService]
})

@View({
    templateUrl: 'components/character/character.html',
    directives: [NgIf,NgFor]
})

export class CharacterInfos {
    apiKeyID: string;
    apiVerificationCode: string;
    eveApiService : EveApiService;
    characters: Array;

    constructor(eveApiService : EveApiService) {
        this.eveApiService = eveApiService;
        console.log(this.eveApiService.currentCharacter);
    }

}