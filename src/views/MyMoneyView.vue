<template>
    <div class="mymoney" v-loading.fullscreen.lock="fullscreenLoading">
        <HeaderView title="mymoney"></HeaderView>
        <div class="headerBox">
            <div class="minHeader">
                <el-button type="default" style="margin-left: 10px;margin-right: 10px;" @click="router.back()">
                    返回
                </el-button>
            </div>
        </div>
        <div class="mymoneyView">
            <h1>￥{{ userInfo.user_money }}</h1>
            <span style="font-size: medium;">您的钱包余额</span>
            <div style="width: 100%;display: flex;justify-content: center;margin-top: 100px;">
                <el-button class="addmoney" @click="AddMoney">充值</el-button>
                <el-button class="tixian" @click="removeMoney">提现</el-button>
            </div>
        </div>
        <FooterView></FooterView>
    </div>
</template>
<script setup>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
import router from '@/router';
import Axios from '@/Axios';
import { onMounted, ref } from 'vue';
import { ElNotification } from 'element-plus';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }
const fullscreenLoading = ref(true);
const userInfo = ref(0);

// 请求信息
const money_require = () => {
    fullscreenLoading.value = true;
    Axios.Post(undefined,
        [{ name: 'meta', value: 'money_require' }],
        (result) => {
            setTimeout(() => {
                if (result.data.code == 200) {
                    userInfo.value = result.data.data;
                } else {
                    notify('error', '警告!', '您未登录!');
                    setTimeout(() => router.push({ name: "login", query: { back: true } }), 1000);
                }
                fullscreenLoading.value = false;
            }, 2000);
        }
    );
}

// 充值
const AddMoney = () => {
    fullscreenLoading.value = true;
    Axios.Post(undefined,
        [
            { name: 'meta', value: 'money_add_require' },
            { name: 'userid', value: userInfo.value.id },
            { name: 'money', value: userInfo.value.user_money }
        ],
        (result) => {
            setTimeout(() => {
                if (result.data.code == 200) {
                    notify('success', '成功', '充值完成!');
                    money_require();
                } else {
                    notify('error', '警告!', '您未登录!');
                    setTimeout(() => router.push({ name: "login", query: { back: true } }), 1000);
                }
                fullscreenLoading.value = false;
            }, 2000);
        }
    );
}
const removeMoney = () => {
    fullscreenLoading.value = true;
    Axios.Post(undefined,
        [
            { name: 'meta', value: 'money_del_require' },
            { name: 'userid', value: userInfo.value.id },
            { name: 'money', value: userInfo.value.user_money }
        ],
        (result) => {
            setTimeout(() => {
                if (result.data.code == 200) {
                    notify('success', '成功', '提现完成!您已提现1000元');
                    money_require();
                } else {
                    notify('error', '警告!', '您未登录!');
                    setTimeout(() => router.push({ name: "login", query: { back: true } }), 1000);
                }
                fullscreenLoading.value = false;
            }, 2000);
        }
    );
}

onMounted(() => {
    money_require();
    // setTimeout(() => fullscreenLoading.value = false, 2000);
})

</script>

<style scoped>
.mymoneyView {
    max-width: 1200px;
    margin: 70px auto 0 auto;
    height: 100%;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.mymoneyView h1 {
    font-weight: bold;
    text-align: center;
}

.addmoney {
    width: 30%;
    height: 50px;
    color: white;
    background-color: green;
}

.tixian {
    width: 30%;
    height: 50px;
    color: grey;
    border-color: green;
}

.minHeader {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
}

.headerBox .minHeader .text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /* white-space: nowrap; */
    line-clamp: 1;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
}

.headerBox {
    position: sticky;
    top: 85px;
    z-index: 3;
    box-shadow: 0 0 2px grey;
    background-color: white;
}
</style>