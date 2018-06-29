import Env from './env';

let appContext = Env.isDevEnv ? "" : "/code";

let config = {
  env: Env,
  appContext:appContext,
  loginPage:appContext + "/#/login",
  homePage:appContext + "/#/frame/home",
  serverContext:"code-server"
};
export default config;
