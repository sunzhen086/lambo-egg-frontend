import Env from './env';

let appContext = Env.isDevEnv ? "" : "/rest-manage";

let config = {
  env: Env,
  appContext:appContext,
  loginPage:appContext + "/#/login",
  homePage:appContext + "/#/rest-setting",
  serverContext:"rest-manage-server"
};
export default config;
