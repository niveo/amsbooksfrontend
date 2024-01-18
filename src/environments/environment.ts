export const environment = {
  production: true,
  auth: {
    domain: 'config.domain',
    clientId: 'config.clientId',
    authorizationParams: {
      audience: 'config.authorizationParams.audience',
      redirect_uri: window.location.origin,
    },
    errorPath: 'config.errorPath',
  },
  apiUri: 'config.apiUri',
  httpInterceptor: {
    allowedList: [`${'config.apiUri'}/*`],
  },
  imageKitPublicKey: 'config.imageKitPublicKey',
  imageKitUrlEndPoint: 'config.imageKitUrlEndPoint',
  imageKitUrlEndPointLivros: 'config.imageKitUrlEndPointCatalogo'
};
