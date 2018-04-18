import Env from './env';

let appContext = Env.isDevEnv ? "" : "/ndp";

let config = {
  env: Env,
  appContext:appContext,
  loginPage:appContext + "/#/login",
  homePage:appContext + "/#/home",
  framePage:appContext + "/#/manage/frame/table",
  serverContext:"ndp-show-server"
};
export default config;
