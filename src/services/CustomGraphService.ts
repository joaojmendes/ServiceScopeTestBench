import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClientFactory, MSGraphClient } from '@microsoft/sp-http';

export interface ICustomGraphService {
    getMyDetails(): Promise<JSON>;
}

export class CustomGraphService implements ICustomGraphService {

    public static readonly serviceKey: ServiceKey<ICustomGraphService> =
        ServiceKey.create<ICustomGraphService>('my-custom-app:ICustomGraphService', CustomGraphService);

    private _msGraphClientFactory: MSGraphClientFactory;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
        });
    }

    public getMyDetails(): Promise<JSON> {
        return this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient) => {
            return _msGraphClient.api('/me').get((error, user: JSON, rawResponse?: any) => {
                // return new Promise<JSON>((resolve, reject) => {
                //     resolve(user);
                // });
                console.log(user);
            });
        });
    }
}