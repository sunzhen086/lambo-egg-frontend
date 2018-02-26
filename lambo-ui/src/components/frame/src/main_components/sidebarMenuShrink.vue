<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <Dropdown transfer placement="right-start" :key="index" @on-click="changeMenu">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
                    </Button>
                    <sidebarMenuShrink v-if="item.children.children" :menuList = "item.children" :iconColor="iconColor"></sidebarMenuShrink>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem :name="child.name" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ child.title }}</span></DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script>
    import util from '../../../../libs/util';
    import sidebarMenuShrink from './sidebarMenuShrink.vue';
    export default {
        name: 'sidebarMenuShrink',
        props: {
            menuList: {
                type: Array
            },
            iconColor: {
                type: String,
                default: 'white'
            }
        },
        data () {
            return {
                currentPageName: 0,
                openedSubmenuArr: []
            };
        },
        components: {
            sidebarMenuShrink
        },
        computed: {

        },
        methods: {
            changeMenu (active) {
                localStorage.activeName = active;
                util.openNewPage(active);
                this.$router.push({
                    name: active
                });
            },
        },
        watch: {
            '$route' (to) {
                this.currentPageName = to.name;
                //改变currentPath
                var path = {
                    title:to.meta.title,
                    path:to.path,
                    name:to.name
                }
                var currentPath = [];
                currentPath.push(path);
                this.$emit("currentPath",currentPath);
                localStorage.currentPath = JSON.stringify(currentPath);
                //改变pageTagsList
                this.$emit("pageOpenedList",JSON.parse(localStorage.pageOpenedList));
                this.$emit("currentPageName",this.currentPageName);
            }
        },
        create(){
            this.currentPageName = localStorage.currentPageName;
            this.openedSubmenuArr = JSON.parse(localStorage.openedSubmenuArr);
        }
    };
</script>
