import Login from './components/login';
import Frame from './components/frame';
import Table from './components/table';
import EditTable from './components/edit-table';
import HelpBox from './components/helpbox';
import TreeTable from './components/tree-table';
import Permission from './directives/permission'

const version = '1.0.0';
const install = function(Vue, config) {
    if (install.installed) return;
    if(!config){
        config = {};
    }

    Vue.component("LamboLogin", Login);
    Vue.component("LamboFrame", Frame);
    Vue.component("LamboTable", Table);
    Vue.component("LamboEditTable", EditTable);
    Vue.component("LamboHelpBox", HelpBox);
    Vue.component("LamboTreeTable", TreeTable);

    Vue.directive('permission',Permission);

};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

export default {
    install,
    Login,
    Frame,
    Table,
    EditTable,
    HelpBox,
    TreeTable,
    Permission
};
