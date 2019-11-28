import {Microfronts} from './node_modules/microfronts/dist/index.js';

const appContext = Microfronts().getAppContext();
const router = Microfronts().getRouter();

appContext.provide('random.service', () => {
    const randomNumber = Math.random()
    appContext.set('last.random', randomNumber);
    appContext.require('subject').then((subject) => {
        subject.next(randomNumber);
    });
    return randomNumber;
});

router.markDOM();
router.watchRoot();

const configMode = __NODE_ENV__;

const REACT = {
    appId: 'react',
    baseUrl: (configMode === 'DEVELOPMENT' ? 'http://localhost:3000' : '/apps/react/'),
    staticData: {
        static: 'data'
    }
}

const ANGULAR = {
    appId: 'angular',
    baseUrl: (configMode === 'DEVELOPMENT' ? 'http://localhost:4200' : '/apps/angular/'),
    staticData: {
        static: 'data'
    }
}

router.registerRoute('*', {
    active: []
});
router.registerRoute('side-by-side', {
    active: [REACT, ANGULAR]
});
router.registerRoute('home', {
    active: [REACT]
});
router.registerRoute('settings', {
    active: [REACT]
});

router.subscribe(routeInfo => {
    if (routeInfo.base === '') {
        router.navigate('/home');
    }
});

router.init();