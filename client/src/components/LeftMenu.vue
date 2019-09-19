<template>
    <el-row class="menu_page">
        <el-col>
            <el-menu
                    mode="vertical"
                    background-color="#324057"
                    text-color="#fff"
                    active-text-color="#409eff"
                    class="el-menu-vertical-demo">

                <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>

<<<<<<< HEAD
                <template v-for="item in items">
=======
                <template  v-for="item in items" >
>>>>>>> refs/remotes/origin/master

                    <el-submenu v-if="item.children" :index="item.path" :key="item.path">

                        <template slot="title">
                            <i :class="'fa fa-margin '+item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>

                        <router-link v-for="(citem,cindex) in item.children"
                                     :to="citem.path" :key="cindex">
                            <el-menu-item
                                    :index='citem.path'>
                                <span slot="title">{{citem.name}}</span>
                            </el-menu-item>
                        </router-link>

                    </el-submenu>

                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        name: "leftmenu",
        data() {
            return {
                items: [
                    {
                        icon: "fa-money",
                        name: "系统管理",
                        path: "fund",
                        children: [
<<<<<<< HEAD
                            {
                                path: "userlist", name: "用户管理"
                            }
                        ]
=======
                            { path: "userlist", name: "用户管理" },

                            ]
>>>>>>> refs/remotes/origin/master
                    },
                    {
                        icon: "fa-money",
                        name: "公众号管理",
                        path: "fund",
                        children: [
<<<<<<< HEAD
                            {path: "MediaManage", name: "媒介管理"},
                            {path: "RepresentManage", name: "代理管理"},
                            {path: "PlatManage", name: "平台管理"},
                            {path: "StationManage", name: "站点号"},
                            {path: "OAManage", name: "公众号"},
                            {path: "InRecordManage", name: "充值记录"},
                            {path: "", name: "收入记录"},
                            {path: "", name: "代理账号"},
                            {path: "", name: "推广链接"},
=======
                            { path: "MediaManage", name: "媒介管理" },
                            { path: "RepresentManage", name: "代理管理" },
                            { path: "PlatManage", name: "平台管理" },
                            { path: "StationManage", name: "站点号" },
                            { path: "OAManage", name: "公众号" },
                            { path: "InRecordManage", name: "充值记录" },
                            { path: "MediaManage", name: "收入记录" },
                            { path: "MediaManage", name: "代理账号" },
                            { path: "MediaManage", name: "推广链接" },
>>>>>>> refs/remotes/origin/master

                        ]
                    },
                    {
                        icon: "fa-asterisk",
                        name: "信息管理",
                        path: "info",
                        children: [
<<<<<<< HEAD
                            {path: "infoshow", name: "个人信息"},

                        ]
=======
                            { path: "infoshow", name: "个人信息" },

                            ]
>>>>>>> refs/remotes/origin/master
                    }
                ]
            };
        }
    };
</script>
<style scoped>
    .menu_page {
        position: fixed;
        top: 71px;
        left: 0;
        min-height: 100%;
        background-color: #324057;
        z-index: 99;
    }
<<<<<<< HEAD

    .el-menu {
        border: none;
    }

    .fa-margin {
        margin-right: 5px;
    }

=======
    .el-menu {
        border: none;
    }
    .fa-margin {
        margin-right: 5px;
    }
>>>>>>> refs/remotes/origin/master
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        min-height: 400px;
    }
<<<<<<< HEAD

    .el-menu-vertical-demo {
        width: 35px;
    }

=======
    .el-menu-vertical-demo {
        width: 35px;
    }
>>>>>>> refs/remotes/origin/master
    .el-submenu .el-menu-item {
        min-width: 180px;
    }

    .hiddenDropdown,
    .hiddenDropname {
        display: none;
    }
<<<<<<< HEAD

=======
>>>>>>> refs/remotes/origin/master
    a {
        text-decoration: none;
    }
</style>
