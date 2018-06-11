import Env from './env';

let appContext = Env.isDevEnv ? "" : "/test";

let config = {
  env: Env,
  appContext:appContext,
  loginPage:appContext + "/#/login",
  homePage:appContext + "/#/frame/home",
  serverContext:"test-server"
};
export default config;
