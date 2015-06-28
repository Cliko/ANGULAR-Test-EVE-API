import {Component, View, bootstrap} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {Home} from 'components/home/home';
import {CharacterInfos} from 'components/character/character';

@Component({
    selector: 'app'
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

}

bootstrap(App, [routerInjectables]);