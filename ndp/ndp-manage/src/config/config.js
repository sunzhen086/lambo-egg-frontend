import Env from './env';

let appContext = Env.isDevEnv ? "" : "/ndp-manage";

let config = {
  env: Env,
  appContext:appContext,
  loginPage:appContext + "/#/login",
  homePage:appContext + "/#/manage/table",
  serverContext:"ndp-manage-server",
  fileServerContext:"file-server"
};
export default config;
