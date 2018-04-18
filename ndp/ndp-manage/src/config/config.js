import Env from './env';

let appContext = Env.isDevEnv ? "" : "/ndp";

let config = {
  env: Env,
  appContext:appContext,
  loginPage:appContext + "/#/login",
  homePage:appContext + "/#/manage/table",
  serverContext:"ndp-manage-server"
};
export default config;
