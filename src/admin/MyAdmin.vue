<template>
    <div class="admin">
        <div v-if="isShowPancel == true">
            <div class="d-flex justify-content-center align-items-center vh-100 text-center"
                style="font-size: x-large;font-weight: bold;" v-if="ScreenWidth < 900">
                很抱歉! <br>你只能在桌面设备上进行访问管理页面
            </div>
            <div v-else>
                <nav class="navbar bg-dark text-white ">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center text-white">
                            <a class="navbar-brand text-white" href="/"
                                style="display: flex;align-items: center;font-size: medium;">
                                <img src="@/assets/logo.png" alt="Logo" width="40" height="40"
                                    class="d-inline-block align-text-top">
                                惠民社区网后台管理系统
                            </a>
                        </div>
                        <div style="margin-right: 15px;">
                            <!-- <img style="width: 40px;height: 40px;background-color:rgba(255, 255, 255, 0.192);border-radius: 100%;"
                            src="@/assets/logo.png" alt=""> -->
                            <span style="margin-left: 10px;">
                                {{ userName }}
                            </span>
                        </div>
                    </div>
                </nav>
                <div>
                    <div class="container-fluid d-flex" style="padding: 0;">
                        <el-scrollbar class="menu-nav">
                            <el-menu>
                                <el-menu-item v-for="item, key in MenuPancel" :key="key"
                                    @click="RouterButonClickListener(key)"
                                    :class="'menu-item ' + (MenuKey == key ? 'active' : undefined)">
                                    <router-link class="nav-link" :to="{ name: item.name }">
                                        {{ item.title }}
                                    </router-link>
                                </el-menu-item>
                            </el-menu>  
                            <div style="display: flex;align-items: center;border-right: 1px solid #dcdfe6;">
                                <hr style="width: 100%;margin-right: 10px;">
                                <span
                                    style="width: 50%;text-align: center;font-size: small;color: rgba(128, 128, 128, 0.495);">传送门</span>
                                <hr style="width: 100%;margin-left: 10px;">
                            </div>
                            <el-menu>
                                <el-menu-item v-for="item, key in MainShow" :key="key"
                                    @click="RouterButonClickListener(key)" class="menu-item">
                                    <router-link class="nav-link" :to="{ name: item.name }">
                                        {{ item.title }}
                                    </router-link>
                                </el-menu-item>

                            </el-menu>
                        </el-scrollbar>

                        <main class="rightPancel">
                            <router-view></router-view>
                        </main>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="d-flex justify-content-center align-items-center vh-100 text-center"
                style="font-size: x-large;font-weight: bold;">
                {{ TextView }}
                <br>
                {{ sec == 0 ? '' : sec }}
            </div>
        </div>
    </div>
</template>

<script setup>
import Axios from '@/Axios';
// import router from '@/router';
import { onMounted, ref } from 'vue';
// import { ElNotification } from 'element-plus';
import router from '@/router';

// 通知组件
// const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }

// 监听浏览器宽度
const ScreenWidth = ref(0);

const RouterButonClickListener = (key) => window.localStorage.setItem('adminTab', MenuKey.value = key);

onMounted(() => {
    ScreenWidth.value = window.innerWidth;
    let tabkey = window.localStorage.getItem('adminTab');
    if (tabkey != undefined) MenuKey.value = tabkey;
    window.addEventListener('resize', () => ScreenWidth.value = window.innerWidth);
});

const MenuKey = ref(0);
const MenuPancel = [
    { title: '新闻管理', name: 'AdminNewsList' },
    { title: '用户管理', name: 'AdminUserList' },
    { title: '商品分类', name: 'AdminShopType' },
    { title: '商品管理', name: 'AdminShopList' },
    { title: '讨论分类', name: 'AdminForumType' },
    { title: '讨论管理', name: 'AdminForumList' },
    { title: '评论管理', name: 'AdminCommentList' },
]
const MainShow = [
    { title: '首页', name: 'home' },
    // { title: '商品页面', name: 'shoplist' },
    { title: '个人中心', name: 'userinfo' },
    // { title: '我的订单管理', name: 'myshop' },
]
// 登录判断
const TextView = ref('请稍等...');
const sec = ref(0);
const isShowPancel = ref(false);
const userName = ref('未登录');
Axios.Post(undefined,
    [{ name: 'meta', value: 'login_state_require' }],
    (result) => {
        if (result.data.code == 200) {
            if (result.data.data.user_permission == 1) {
                isShowPancel.value = true;
                userName.value = result.data.data.user_name
            } else {
                TextView.value = '权限不足，非法访问';
                sec.value = 3;
                setInterval(() => {
                    if (sec.value == 0) { router.replace({ name: 'home' }); }
                    sec.value--;
                }, 1000);
            }
        } else {
            TextView.value = '请先登录！';
            sec.value = 3;
            setInterval(() => {
                if (sec.value == 0) { router.push({ name: 'login' }); }
                sec.value--;
            }, 1000);
        }
    }
);


</script>

<style scoped>
.navbar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 0 4px black;
    min-height: 70px;
    max-height: 70px;
    z-index: 4;
}

.menu-nav {
    width: 300px;
    position: fixed;
    margin-top: 70px;
    padding-bottom: 100px;
    z-index: 4;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.rightPancel {
    margin-top: 70px;
    margin-left: 300px;
    flex: 1;
}

.menu-nav .menu-item {
    width: 100%;
    padding: 0;
    margin: 0;
    text-align: center;
    border-right: 4px solid transparent;
    position: relative;
}

.menu-nav .menu-item .nav-link {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    line-height: 50px;
}

.menu-nav .menu-item:hover {
    background-color: rgba(0, 0, 0, 0.2);
}

.menu-nav .menu-item.active {
    width: 100%;
    background-color: #00000099;
    color: white;
    border-right: 4px solid #00000066;
}
</style>