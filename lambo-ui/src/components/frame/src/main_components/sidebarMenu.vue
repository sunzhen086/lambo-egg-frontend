<style lang="less">
    @import '../../styles/css/menu.less';
</style>

<template>
    <Menu ref="sideMenu" :active-name="currentPageName" :open-names="openedSubmenuArr"
          :theme="menuTheme" width="auto" @on-select="changeMenu">
        <sidebarSubMenu :menuList = "menuList"></sidebarSubMenu>
    </Menu>
</template>

<script>
    import util from '../../../../libs/util';
    import sidebarSubMenu from './sidebarSubMenu.vue';
    export default {
        data () {
            return {
                openedSubmenuArr:[],
                currentPageName:0,
                hasOpenChild:0,
                oldCurrentPageName:'',
            };
        },
        name: 'sidebarMenu',
        props: {
            slotTopClass: String,
            menuList: Array,
            menuTheme: String,
            iconSize: Number,
        },
        components: {
            sidebarSubMenu
        },
        computed: {
            userId(){
                return localStorage.userId;
            },
        },
        methods: {
            changeMenu (active) {
                util.openNewPage(active);
                this.$router.push({
                    name: active
                });
                //改变打开子菜单数组
                localStorage.openedSubmenuArr = JSON.stringify(this.openedSubmenuArr);
            },
        },
        watch: {
            '$route' (to,from) {
                //改变当前页的名称
                this.oldCurrentPageName = localStorage.oldCurrentPageName = from.name;
                let currentPageName = this.currentPageName = to.name;
                let menuList = JSON.parse(localStorage.tagsList) || [];
                let pathstr = "", currentPath = [];
                for(let menu of menuList){
                    if(menu.name === currentPageName){
                        pathstr = menu.path;
                        break;
                    }
                }
                if(pathstr == ""){
                    currentPath = JSON.parse(localStorage.currentPath);
                    currentPath.push({
                        title:currentPageName,
                        name:currentPageName
                    });
                    this.hasOpenChild = localStorage.hasOpenChild = 1;
                    this.currentPageName = from.name;
                }else{
                    let pathNams = pathstr.split("#");
                    for(let name of pathNams){
                        if(name){
                            let path = {
                                title:name,
                                name:name
                            };
                            currentPath.push(path);
                        }
                    }
                    this.hasOpenChild = localStorage.hasOpenChild = 0;
                }
                this.$emit("currentPath",currentPath);
                localStorage.currentPath = JSON.stringify(currentPath);
                //改变pageTagsList
                this.$emit("hasOpenChild",this.hasOpenChild);
                this.$emit("oldCurrentPageName",this.oldCurrentPageName);
                this.$emit("pageOpenedList",JSON.parse(localStorage.pageOpenedList));
                this.$emit("currentPageName",this.currentPageName);
            },
            openedSubmenuArr(){
                //改变打开子菜单数组
                localStorage.openedSubmenuArr = JSON.stringify(this.openedSubmenuArr);
            },
            currentPageName () {
                var self = this;
                this.$nextTick(() => {
                    this.$refs.sideMenu.updateOpened();
                    this.$refs.sideMenu.updateActiveName();
                });
            }
        },
        updated () {
            var self = this;
            this.$nextTick(() => {
                self.$refs.sideMenu.updateOpened();
                self.$refs.sideMenu.updateActiveName();
            });
        },
        created(){
            if(localStorage.hasOpenChild && localStorage.hasOpenChild == "1"){
                this.currentPageName = localStorage.oldCurrentPageName;
            }else{
                this.currentPageName = localStorage.currentPageName;
            }
            this.openedSubmenuArr = JSON.parse(localStorage.openedSubmenuArr);
        }

    };
</script>
