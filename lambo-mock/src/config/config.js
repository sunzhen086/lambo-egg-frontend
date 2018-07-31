import Env from './env';

let appContext = Env.isDevEnv ? "" : "/mock-manage";

let config = {
  env: Env,
  appContext:appContext,
  loginPage:appContext + "/#/login",
  homePage:appContext + "/#/mock-setting",
  serverContext:"mock-manage-server"
};
export default config;
