import version from "./version";

export const environment = {
  production: true,
  apiUri: 'https://amsbooksbackend.onrender.com', 
  carregarImagemRemota: true,
  ...version
};
