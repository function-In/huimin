<template>
    <div>
        <HeaderView title="shop"></HeaderView>
        <div class="headerBox" v-loading.fullscreen.lock="fullscreenLoading">
            <div class="minHeader">
                <el-button type="default" style="margin-left: 10px;margin-right: 10px;" @click="router.back()">
                    返回
                </el-button>
                <div class="text">订单结果</div>
            </div>
        </div>
        <div class="paymentinfo">
            <div class="box">
                <span>
                    订单支付完成，正在等待商家发货
                </span>
                <el-button @click="router.push({ name: 'home' })">返回主页</el-button>
            </div>
        </div>
        <FooterView></FooterView>
    </div>
</template>
<script setup>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
import router from '@/router';

</script>



<style scoped>
.minHeader {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
}

.headerBox .minHeader .Headertext {
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
    top: 86px;
    z-index: 3;
    box-shadow: 0 0 2px grey;
    background-color: white;
}

.paymentinfo {
    max-width: 1200px;
    margin-top: 90px;
    height: 100%;
    min-height: 60vh;
    margin: 90px auto 0 auto;
}

.box {
    padding: 10px;
    /* border: 1px solid grey; */
}
</style>