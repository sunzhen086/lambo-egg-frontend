import Login from './components/login';
import Frame from './components/frame';
import Table from './components/table';

const version = '1.0.0';
const install = function(Vue, config) {
    if (install.installed) return;
    if(!config){
        config = {};
    }

    Vue.component("LamboLogin", Login);
    Vue.component("LamboFrame", Frame);
    Vue.component("LamboTable", Table);

};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

export default {
    install,
    Login,
    Frame,
    Table
};
