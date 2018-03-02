import Env from './env';

let appContext = Env.isDevEnv ? "" : "/upms";

let config = {
  env: Env,
  appContext:appContext,
  loginPage:appContext + "/#/login",
  homePage:appContext + "/#/index",
  serverContext:"upms-server"
};
export default config;
