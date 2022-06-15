// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Capacitor } from "@capacitor/core";
import config from "capacitor.config";

const native = Capacitor.isNativePlatform()

export const auth0RedirectUri = (path: string) => {
  return native ? `${config.appId}://tigoapps.us.auth0.com/capacitor/${config.appId}/${path}` : `http://localhost:8100`
}

export const environment = {
  production: false,
  auth: {
    domain: 'tigoapps.us.auth0.com',
    clientId: 'd7NO1Jis6DPpDyqaoNzVOT4W5Iez1b1Y',
    redirectUri: native ? auth0RedirectUri('callback') : 'http://localhost:8100',
    audience: 'https://tigoapps.us.auth0.com/api/v2/'
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
