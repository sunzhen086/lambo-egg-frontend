import Env from './env';

let appContext = Env.isDevEnv ? "" : "/ndp";

let config = {
  env: Env,
  appContext:appContext,
  loginPage:appContext + "/#/login",
  homePage:appContext + "/#/mainpage",
  framePage:appContext + "/#/frame/table",
  serverContext:"ndp-server"
};
export default config;
