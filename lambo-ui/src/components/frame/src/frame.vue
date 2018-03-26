<style lang="less">
    @import "../styles/css/frame.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': hideMenuText}">
        <div class="sidebar-menu-con" :style="{width: hideMenuText?'60px':'200px', overflow: hideMenuText ? 'visible' : 'auto', background: menuTheme === 'dark'?'#495060':'white'}">
            <div class="logo-con">
                <img v-show="!hideMenuText"  :src="logoImg ? logoImg : defaultLogo" key="max-logo" />
                <img v-show="hideMenuText" :src="minLogoImg ? minLogoImg : defaultMinLogo" key="min-logo" />
            </div>
            <sidebar-menu v-if="!hideMenuText"
              :menuList="menuList" :menuTheme="menuTheme"
              :iconSize="14" @currentPath = "changeCurrentPath"
              @pageOpenedList = "changePageOpenedList" @currentPageName = "changeCurrentPageName"
              @hasOpenChild = "openChild" @oldCurrentPageName = "changeOldCurrentPageName"
            />
            <sidebar-menu-shrink v-else
                :icon-color="menuIconColor" :menuTheme="menuTheme"
                :menuList="menuList" @currentPath = "changeCurrentPath"
                @pageOpenedList = "changePageOpenedList" @currentPageName = "changeCurrentPageName"
                @hasOpenChild = "openChild" @oldCurrentPageName = "changeOldCurrentPageName"
            />
        </div>
        <div class="main-header-con" :style="{paddingLeft: hideMenuText?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (hideMenuText ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem v-for="item in dropItem" :name="item.id" :key="item.id">{{item.name}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatarPath ? avatarPath : defaultImg" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageOpenedList="pageOpenedList" :currentPageName="currentPageName" :hasOpenChild="hasOpenChild" :oldCurrentPageName="oldCurrentPageName"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: hideMenuText?'60px':'200px'}">
            <div class="single-page">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    import sidebarMenu from './main_components/sidebarMenu.vue';
    import tagsPageOpened from './main_components/tagsPageOpened.vue';
    import breadcrumbNav from './main_components/breadcrumbNav.vue';
    import themeDropdownMenu from './main_components/themeDropdownMenu.vue';
    import sidebarMenuShrink from './main_components/sidebarMenuShrink.vue';
    import avatarImg from '../styles/images/avatar.jpg';
    import defaultLogo from '../styles/images/logo.png';
    import defaultMinLogo from '../styles/images/logo-min.jpg';

    export default {
        components: {
            sidebarMenu,
            tagsPageOpened,
            breadcrumbNav,
            themeDropdownMenu,
            sidebarMenuShrink
        },
        props:{
            menuList : Array,
            logoImg:String,
            minLogoImg:String,

            avatarPath : String,
            userId: String,
            userName: String,
            dropItem:Array,
        },
        data () {
            return {
                menuListWithPath:this.menuList,
                spanLeft: 4,
                spanRight: 20,
                currentPageName: 0,
                hideMenuText: false,
                showFullScreenBtn: window.navigator.userAgent.indexOf('MSIE') < 0,
                lockScreenSize: 0,
                defaultImg:avatarImg,
                defaultLogo:defaultLogo,
                defaultMinLogo:defaultMinLogo,
                isFullScreen:false,
                currentPath:[],
                pageOpenedList:[],
                tagsList:[],
                hasOpenChild:0,
                oldCurrentPageName:""
            };
        },
        computed: {
            menuTheme(){
                return localStorage.menuTheme ? localStorage.menuTheme : 'dark';
            },
            menuIconColor(){
                return localStorage.menuTheme === 'dark' ? '#495060' : 'white';
            }
        },
        methods: {
            init () {
                //初始化变量
                this.currentPath = localStorage.currentPath ? JSON.parse(localStorage.currentPath) : [];
                this.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [];
                this.currentPageName = localStorage.currentPageName ? localStorage.currentPageName : '';
                this.hasOpenChild = localStorage.hasOpenChild ? localStorage.hasOpenChild : 0;
                this.oldCurrentPageName = localStorage.oldCurrentPageName ? localStorage.oldCurrentPageName : '';
            },
            toggleClick () {
                this.hideMenuText = !this.hideMenuText;
            },
            changeCurrentPath(data){
                this.currentPath = data;
            },
            changePageOpenedList(data){
                this.pageOpenedList = data;
            },
            changeCurrentPageName(data){
                this.currentPageName = data;
            },
            handleClickUserDropdown(name){
                this.$emit("dropAction",name);
            },
            setTagsList(menuList){
                for(var i=0;i<menuList.length;i++){
                    if(menuList[i].children){
                        this.setTagsList(menuList[i].children);
                    }else{
                        this.tagsList.push(menuList[i]);
                    }
                }
            },
            openChild(data){
                this.hasOpenChild = data;
            },
            changeOldCurrentPageName(data){
                this.oldCurrentPageName = data;
            }
        },
        watch: {
            menuList(data){
                if(data){
                    localStorage.menuList = JSON.stringify(data);
                    console.log("tagsList=="+localStorage.menuList);
                    this.setTagsList(data);
                    localStorage.tagsList = JSON.stringify(this.tagsList);
                }
            }
        },
        mounted () {
            this.init();
        }
    };
</script>
