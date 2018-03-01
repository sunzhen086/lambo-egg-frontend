import Env from './env';

let config = {};

if(Env == "development"){
  config = {
    env: Env,
    server_context:'/demo-sample',
    login_page_url:"/#/login",
    sso_login_url:"/upms/sso/login",
    main_page_url:"/#/main",
    session_timeout:1800
  };
}

export default config;
