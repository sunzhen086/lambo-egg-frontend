import util from '@/libs/util.js';

const checkPermission = function(el, binding, vnode){
    var permissionValue = binding.value;
    var oldValue = binding.oldValue;
    if(permissionValue === oldValue){
        return;
    }
    util.ajax("/manage/permission/check",{
        params:{
            permissionValue:permissionValue
        }
    }).then(function(resp){
        var result = resp.data;

        if(Boolean(result) === true){
            el.style.display = "";
        }else{
            el.style.display = "none";
        }
    }).catch(function(error){
        el.style.display = "none";
        console.error("判断是否具有权限出错",error);
    })
};

export default {
    bind:checkPermission,
    update:checkPermission
}
