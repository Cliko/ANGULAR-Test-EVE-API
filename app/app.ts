import {Component, View, bootstrap} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {Home} from 'components/home/home';

@Component({
    selector: 'app'
})
@RouteConfig([
    { path: '/', component: Home, as: 'home' },
])
@View({
    templateUrl: 'app.html',
    directives: [RouterOutlet, RouterLink]
})
class App {

}

bootstrap(App, [routerInjectables]);