import {Component, View, bootstrap} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';
import {EveApiService, Character} from 'services/eveapiService';

import {Home} from 'components/home/home';
import {CharacterInfos} from 'components/character/character';

@Component({
    selector: 'app',
    appInjector:[EveApiService]
})
@RouteConfig([
    { path: '/', component: Home, as: 'home' },
    { path: '/character', component: CharacterInfos, as: 'character' },
])
@View({
    templateUrl: 'app.html',
    directives: [RouterOutlet, RouterLink]
})
class App {
    eveApiService : EveApiService;
    characters: Array;

    constructor(eveApiService : EveApiService) {
        this.eveApiService = eveApiService
    }

    checkCharacters(){
        this.characters = this.eveApiService.characters;
        console.log("test");
    }

}

bootstrap(App, [routerInjectables]);