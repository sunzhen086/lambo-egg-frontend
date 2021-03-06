import Env from './env';

let appContext = Env.isDevEnv ? "" : "/demo";

let config = {
  env: Env,
  appContext:appContext,
  loginPage:appContext + "/#/login",
  homePage:appContext + "/#/frame/home",
  serverContext:"demo-sample-server"
};
export default config;
