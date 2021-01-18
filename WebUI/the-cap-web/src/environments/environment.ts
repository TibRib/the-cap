// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  googlecloud: {
    apiKey : "",
    authDomain : "",
    databaseURL : "",
    projectId: "",
    storageBucket : "",
    messagingSenderId: ""
  },
  firebase: {
    apiKey: 'AIzaSyCcZUS5H4_3iNcTFCPNlD1OQTUFdW2X7zQ',
    authDomain: 'the-cap-gcp.firebaseapp.com',
    projectId: 'the-cap-gcp',
    storageBucket: 'the-cap-gcp.appspot.com',
    messagingSenderId: '417708806511',
    appId: '1:417708806511:web:a2560f5c93daa6abcc189a'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
