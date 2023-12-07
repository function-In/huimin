<!-- 登录页 -->
<template>
    <div class="login">
        <div class="background-container">
            <img class="background-image" src="@/assets/login_background.jpg" alt="background">
        </div>
        <div class="container pt-5">
            <div class="row justify-content-end"
                style="display: flex;flex-direction: row;align-items: center;margin-top: 10%;">

                <div class="col-lg-4 left-content" v-loading.fullscreen.lock="fullscreenLoading">
                    <h1>欢迎登录</h1>
                    <br>
                    <p>您正在进行登录账号，惠民社区网感谢您的使用，如在您使用的过程中遇到问题，您可以及时反馈给我们</p>
                </div>

                <div class="col-lg-6 smaller-panel ">
                    <div class="card shadow-lg border-0 rounded-lg mt-5 custom-card">
                        <div class="card-header">
                            <h3 class="text-center font-weight-light my-4">登录</h3>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label style="margin-left: 10px;" class="small mb-2" for="username">用户名（登录ID、手机）</label>
                                <input class="form-control py-2 custom-input" id="username" type="text" placeholder="请输入用户名"
                                    v-model="table.username">
                            </div>
                            <div class="form-group mt-2">
                                <label style="margin-left: 10px;" class="small mb-2" for="password">用户密码</label>
                                <input class="form-control py-2 custom-input" id="password" type="password"
                                    placeholder="请输入密码" v-model="table.password">
                            </div>
                            <div class="form-group mt-3" style="display: flex;">
                                <div class="custom-control custom-checkbox custom-div">
                                    <input class="custom-control-input" id="rememberPasswordCheck" type="checkbox">
                                    <label class="custom-control-label" for="rememberPasswordCheck"
                                        style="margin-left: 2px;">记住密码</label>
                                </div>
                                <div class="custom-control custom-checkbox custom-div" style="margin-left: 10px;">
                                    <input class="custom-control-input" id="rememberServiceCheck" type="checkbox"
                                        v-model="table.checked">
                                    <label class="custom-control-label" for="rememberServiceCheck"
                                        style="margin-left: 2px;">同意《社区网用户协议》</label>
                                </div>
                            </div>
                            <div class="form-group d-flex align-items-center justify-content-between mt-3">
                                <a class="small" href="#">忘记密码?</a>
                                <button type="submit" class="btn btn-primary" @click="submit()">立即登录</button>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="small">
                                <router-link v-if="!useRoutes.query.back" :to="{ name: 'home' }">返回首页</router-link>
                                <router-link v-if="useRoutes.query.back" to="" @click="router.back()">返回上一页</router-link>
                                <router-link :to="{ name: 'register' }">没有账号？去注册</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Axios from '@/Axios';
import { ref } from 'vue';
import { ElNotification } from 'element-plus';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }
const fullscreenLoading = ref(false);

import { useRoute } from 'vue-router';
const useRoutes = useRoute();
if (useRoutes.query.info != undefined) {
    alert(decodeURIComponent(useRoutes.query.info))
}

import { UserInfoStore } from '@/stores/UserInfoStore';
import router from '@/router';
const userInfo = UserInfoStore();
userInfo.getLoginState();

const table = ref({
    username: '',
    password: '',
    checked: true
});

const submit = () => {
    fullscreenLoading.value = true;
    setTimeout(() => {
        if (table.value.username == '') {
            alert('用户名不能为空！');
        } else if (table.value.password == '') {
            alert('用户密码不能为空！')
        } else if (!table.value.checked) {
            alert('您需要同意协议！');
        } else {
            let fd = [{ name: 'meta', value: 'login_require' }];
            for (const key in table.value) fd.push({ name: key, value: table.value[key] });
            Axios.Post(undefined, fd,
                (result) => {
                    if (result.data.code == 200) {
                        notify('success', '成功', '登录成功，正在跳转...');
                        setTimeout(() => {
                            fullscreenLoading.value = true;
                            setTimeout(() => {
                                if (useRoutes.query.back) {
                                    router.back();
                                } else {
                                    router.push({ name: 'home' });
                                }
                                fullscreenLoading.value = false;
                            }, 2000);
                        }, 1000);
                    } else { notify('info', result.data.code + '', result.data.info); }
                },
                (err) => {
                    notify('error', '错误', '在登录的时候发生了错误' + err);
                })
        }
        fullscreenLoading.value = false
    }, 2000);

}

</script>


<style scoped>
a {
    text-decoration: none;
}

.background-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    padding: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.786);
}

.background-image {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    object-fit: cover;
    animation: animateBackground 4s infinite linear;
}


@keyframes animateBackground {
    0% {
        filter: blur(0px);
    }

    50% {
        filter: blur(5px);
    }

    100% {
        filter: blur(0px);
    }
}

.login {
    width: 100%;
    min-height: 100vh;
    background-size: cover;
}

.left-content {
    text-align: center;
    margin-bottom: 20px;
}

.vertical-center {
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.smaller-panel {
    max-width: 400px;
    margin: auto;
}

.custom-card {
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
}

.custom-input {
    background-color: transparent;
    font-size: small;
}

.custom-div {
    font-size: small;
    display: flex;
    align-items: center;
    /* margin-left: 5px; */
}

.card-footer .small {
    display: flex;
    justify-content: space-between;
}

@media (min-width: 1200px) {
    .smaller-panel {
        max-width: 400px;
        margin-right: 10%;
        /* 调整宽度为 400 像素或你需要的尺寸 */
        /* margin: auto; */
    }
}
</style>