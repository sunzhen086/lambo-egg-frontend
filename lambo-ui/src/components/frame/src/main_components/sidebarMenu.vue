<style lang="less">
    @import '../../styles/css/menu.less';
</style>

<template>
    <Menu ref="sideMenu" :active-name="activeName" :open-names="openedSubmenuArr"
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
                activeName:'',
                currentPageName:0,
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
                localStorage.activeName = active;
                util.openNewPage(active);
                this.$router.push({
                    name: active
                });
                //改变打开子菜单数组
                localStorage.openedSubmenuArr = JSON.stringify(this.openedSubmenuArr);
            },
        },
        watch: {
            '$route' (to) {
                //改变当前页的名称
                let currentPageName = this.currentPageName = to.name;
                let menuList = JSON.parse(localStorage.tagsList) || [];
                let pathstr = "", currentPath = [];
                for(let menu of menuList){
                    if(menu.name === currentPageName){
                        pathstr = menu.path;
                        break;
                    }
                }
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


                //改变currentPath



                this.$emit("currentPath",currentPath);
                localStorage.currentPath = JSON.stringify(currentPath);
                //改变pageTagsList
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
            this.activeName = localStorage.activeName;
            this.openedSubmenuArr = JSON.parse(localStorage.openedSubmenuArr);
        }

    };
</script>
