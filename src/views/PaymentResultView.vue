<template>
    <div class="paymentResult" v-loading.fullscreen.lock="fullscreenLoading">
        <HeaderView title="paymentresult"></HeaderView>
        <div class="content">
            <div style="display: flex;flex-direction: column;align-items: center;">
                <h1 class="title" :style="'background-color:' + color + ' ;'">{{ time }}</h1>
                <h3>{{ PaymentText }}</h3>

                <!-- {{ shopinfo }} -->
            </div>
        </div>
        <FooterView></FooterView>
    </div>
</template>

<script setup>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Axios from '@/Axios';
import router from '@/router';
const shopinfo = ref();
// 计时
const color = ref('#1989FA');
const time = ref('59');
const timer = ref();
const PaymentText = ref('正在等待支付结果');
// 用户信息
const userinfo = ref();

const getLoginInfo = () => {
    Axios.Post(undefined,
        [{ name: 'meta', value: 'login_state_require' }],
        (result) => {
            if (result.data.code == 200) {
                userinfo.value = result.data.data;
            } else {
                clearInterval(timer.value);
                time.value = '支付失败'
                color.value = 'red';
                PaymentText.value = '未登录或异常订单';
            }
        }
    );
}


onMounted(() => {
    timer.value = setInterval(() => {
        time.value = (parseInt(time.value)) - 1;
        if (time.value == 0) clearInterval(timer);
    }, 1000);
    // 获取登录信息
    getLoginInfo();
    // 处理订单
    shopinfo.value = JSON.parse(decodeURIComponent(useRoute().query.info));
    // 用户ID处理
    let timer2 = setInterval(() => {
        if (userinfo.value != undefined) {
            let a = '';
            if (a == '222') addShopDingdan();
            let price = 0;
            for (const item of shopinfo.value.shopList)
                price = price + parseFloat(item.shop.shop_price) + parseInt(item.count);
            price = price.toFixed(2);
            if (parseInt(userinfo.value.user_money).toFixed(2) < parseFloat(price)) {
                clearInterval(timer.value);
                time.value = '支付失败'
                color.value = 'red';
                console.log(userinfo.value);
                PaymentText.value = '您的余额不足！';
            } else { addShopDingdan(); }
            clearInterval(timer2);
        }
    }, 500);
})

const fullscreenLoading = ref(false);

const addShopDingdan = () => {
    Axios.Post(undefined,
        [
            { name: 'meta', value: 'shop_create_mylist_web' },
            { name: 'shop', value: JSON.stringify(shopinfo.value) }
        ],
        (result) => {
            if (result.data.code == 200) {
                fullscreenLoading.value = true;
                clearInterval(timer.value);
                time.value = '支付成功';
                color.value = 'green';
                PaymentText.value = '订单完成支付，正在跳转，请稍后';
                setTimeout(() => {
                    router.replace({ name: 'payinfo', query: { info: encodeURIComponent('支付成功') } });
                }, 1000);
            } else {
                clearInterval(timer.value);
                time.value = '支付失败'
                color.value = 'red';
                PaymentText.value = '未登录或异常订单';
            }
        }
    );
}
</script>


<style scoped>
.content {
    max-width: 1200px;
    height: 100%;
    min-height: 70vh;
    margin: 90px auto 0 auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content .title {
    width: 200px;
    height: 200px;
    /* background-color: #1989FA; */
    text-align: center;
    line-height: 200px;
    border-radius: 100%;
    margin: 50px 0;
    /* font-size: 60px; */
    color: white;
}
</style>