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

/** @type import('microfronts/dist').AppDescriptor */
const REACT = {
    appId: 'react',
    baseUrl: 'http://localhost:3000',
    staticData: {
        static: 'data'
    }
}

/** @type import('microfronts/dist').AppDescriptor */
const ANGULAR = {
    appId: 'angular',
    baseUrl: 'http://localhost:4200',
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