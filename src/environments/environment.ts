import version from "./version";

export const environment = {
  production: true,
  apiUri: 'https://amsbooksbackend.vercel.app', 
  carregarImagemRemota: true,
  ...version
};
