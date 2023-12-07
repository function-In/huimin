<template>
    <nav :class="'navbar navbar-expand-md navbar-light fixed-top ' +
        (showMenu == true ? 'showMenu ' : '') +
        (HeaderScroller.isScrollState == true ? 'isScrolled' : undefined)" ref="HeaderViewRef">
        <div class="container mx-auto" style="max-width: 1200px;" v-loading.fullscreen.lock="fullscreenLoading">
            <a class="navbar-brand logo" href="#">
                <img src="@/assets/logo.png" alt="Logo" height="60" style="border-radius: 50%;">惠民社区
            </a>
            <button @click="showMenu = !showMenu" class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div :class="{ 'collapse': !showMenu, 'collapsed': showMenu, 'navbar-collapse': true }" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <!-- <li :class="'nav-item ' + (props.title == 'search' ? 'active' : undefined)">
                        <router-link class="nav-link" :to="{ name: 'home' }">搜索</router-link>
                    </li> -->

                    <li :class="'nav-item ' + (props.title == 'home' ? 'active' : undefined)">
                        <router-link class="nav-link" :to="{ name: 'home' }">首页</router-link>
                    </li>

                    <!-- <li :class="'nav-item ' + (props.title == 'home' ? 'active' : undefined)">
                        <router-link class="nav-link" :to="{ name: 'home' }">资讯</router-link>
                    </li> -->

                    <li :class="'nav-item ' + (props.title == 'shoplist' ? 'active' : undefined)">
                        <router-link class="nav-link" :to="{ name: 'shoplist' }">商品</router-link>
                    </li>

                    <li :class="'nav-item ' + (props.title == 'cart' ? 'active' : undefined)">
                        <router-link class="nav-link" :to="{ name: 'cart' }">购物车</router-link>
                    </li>

                    <!-- <li :class="'nav-item ' + (props.title == 'home' ? 'active' : undefined)">
                        <router-link class="nav-link" :to="{ name: 'home' }">社区</router-link>
                    </li> -->
                    <li v-if="loginState" :class="'dropdown nav-item ' + (props.title == 'home' ? 'active' : undefined)">
                        <a class="nav-link  dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            我的
                        </a>
                        <ul class="dropdown-menu">
                            <!-- <li><router-link class="nav-link" :to="{ name: 'userinfo' }">个人中心</router-link></li> -->
                            <li><router-link class="nav-link" :to="{ name: 'money' }">我的钱包</router-link></li>
                            <!-- <li><router-link class="nav-link" :to="{ name: 'myshop' }">我的订单</router-link></li> -->
                            <!-- <li><router-link class="nav-link" :to="{ name: 'settings' }">设置</router-link></li> -->
                            <!-- <li><a class="dropdown-item" href="#">文章管理</a></li> -->
                            <!-- <li><a class="dropdown-item" href="#">地址管理</a></li> -->
                            <li @click="exitLogin"><a class="dropdown-item" href="#">退出登录</a></li>
                        </ul>
                    </li>
                    <li v-if="!loginState" :class="'nav-item ' + (props.title == 'login' ? 'active' : undefined)">
                        <router-link class="nav-link" :to="{ name: 'login' }">注册 / 登录</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup>
import { ref, defineProps, onMounted } from 'vue';
const showMenu = ref(false);
const props = defineProps({ title: String });
const fullscreenLoading = ref(false);

import { HeaderScrollerStore } from '@/stores/HeaderScrollerStore';
import Axios from '@/Axios';
const HeaderScroller = HeaderScrollerStore();
const HeaderViewRef = ref(null);
// 判断滑动处理
const handleScroll = () => {
    // 设置高度
    if (HeaderViewRef.value) HeaderScroller.setHeaderViewHeight(HeaderViewRef.value.clientHeight);
    // 设置主页滚动切换导航栏样式
    if (props.title == 'home' && HeaderViewRef.value) {
        const isScrolled = window.scrollY > (window.innerHeight - HeaderViewRef.value.clientHeight);
        if (!isScrolled) { showMenu.value = false; }
        HeaderScroller.setScrollState(isScrolled);
    } else {
        HeaderScroller.setScrollState(true);
    }
}
// 滚动事件监听
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    // 设置高度
    if (HeaderViewRef.value) HeaderScroller.setHeaderViewHeight(HeaderViewRef.value.clientHeight);
    // 设置主页滚动切换导航栏样式
    if (props.title == 'home' && HeaderViewRef.value) {
        const isScrolled = window.scrollY > (window.innerHeight - HeaderViewRef.value.clientHeight);
        if (!isScrolled) { showMenu.value = false; }
        HeaderScroller.setScrollState(isScrolled);
    } else {
        HeaderScroller.setScrollState(true);
    }
})
const loginState = ref(false);

// 请求状态
Axios.Post(undefined,
    [{ name: 'meta', value: 'login_state_require' }],
    (result) => { if (result.data.code == 200) loginState.value = true; }
);

// 退出登录
const exitLogin = () => {
    fullscreenLoading.value = true;
    Axios.Post(undefined,
        [{ name: 'meta', value: 'login_exit_require' }],
        (result) => {
            setTimeout(() => {
                if (result.data.code == 200)
                    loginState.value = false;
                fullscreenLoading.value = false
            }, 2000);
        }
    );
    setTimeout(() => fullscreenLoading.value = false, 4000);
}
</script>
<style scoped>
/* 导航栏默认透明 */
/* 滚动之后 */
.navbar.isScrolled {
    background-color: white;
    box-shadow: 0 0 4px grey;
}

/* 展开菜单 */
.navbar.showMenu {
    background-color: white;
    box-shadow: 0 0 4px grey;
}

/* logo */
.logo {
    color: white;
    /* font-size: medium; */
}

/* 滚动之后 */
.navbar.isScrolled .logo {
    color: black;
}

/* 展开菜单 */
.navbar.showMenu .logo {
    color: black;
}

.logo:hover,
.logo:active {
    color: #1989FA;
}


/* logo-image */
.logo img {
    filter: brightness(0) invert(1);
}

/* 滚动之后 */
.navbar.isScrolled .logo img {
    filter: hue-rotate(0);
}

/* 展开菜单 */
.navbar.showMenu .logo img {
    filter: hue-rotate(0);
}

.logo:hover img,
.logo:active img {
    filter: hue-rotate(0);
}

.navbar-toggler {
    filter: brightness(0) invert(1);
}

/* 滚动之后 */
.navbar.isScrolled .navbar-toggler {
    filter: hue-rotate(0);
}

/* 展开菜单 */
.navbar.showMenu .navbar-toggler {
    filter: hue-rotate(0);
}

.navbar-collapse {
    transition: all 0.3s ease !important;
    justify-content: flex-end;
}


.navbar-nav .nav-item {
    margin-left: 10px;
}

.navbar-nav .nav-item a {
    color: white;
    /* border-bottom: 2px solid transparent; */
}

/* 滚动之后 */
.navbar.isScrolled .navbar-nav .nav-item a {
    color: black;
}

/* 展开菜单 */
.navbar.showMenu .navbar-nav .nav-item a {
    color: black;
}

.navbar-nav .nav-item a:hover,
.navbar-nav .nav-item a:active {
    color: #1989FA;
}

.navbar-nav .nav-item a:hover,
.navbar-nav .nav-item a:active,
.navbar-nav .nav-item.active a {
    /* color: white; */
    color: #1989FA;
}

/* 滚动之后 */
.navbar.isScrolled .navbar-nav .nav-item a:hover,
.navbar.isScrolled .navbar-nav .nav-item a:active,
.navbar.isScrolled .navbar-nav .nav-item.active a {
    color: #1989FA;
}

/* 展开菜单 */
.navbar.showMenu .navbar-nav .nav-item a:hover,
.navbar.showMenu .navbar-nav .nav-item a:active,
.navbar.showMenu .navbar-nav .nav-item.active a {
    color: #1989FA;
}
</style>