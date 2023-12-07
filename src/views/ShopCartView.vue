<template>
    <div class="shopcart">
        <HeaderView title="cart" />
        <!-- :for="'shopItem' + key" -->
        <!-- :id="'shopItem' + key" -->
        <div class="container">
            <div class="row" style="height: 100%;min-height: 70vh;">
                <h2 class="pt-4 pb-2" v-if="shopCartList.length == 0">购物车</h2>
                <el-empty v-if="shopCartList.length == 0" description="您的购物车是空的" />
                <div class="col-md-8">
                    <h2 class="pt-4 pb-2" v-if="shopCartList.length > 0">购物车</h2>
                    <div class="card mb-3" style="flex-direction: row;" v-for="item in shopCartList" :key="item">
                        <el-image class="deskTop" :src="Axios.address + item.shop.images[0].img" fit="cover" />
                        <label class="form-check-label" style="flex: 1;">
                            <div class="card-body">
                                <!-- <el-image class="mobileTop" :src="'http://localhost' + item.shop.images[0].img"></el-image> -->
                                <h5 class="card-title">{{ item.shop.shop_name }}</h5>
                                <p class="card-text">单价：￥{{ item.shop.shop_price }}</p>
                                <div class="card-text mt-2 d-flex align-items-center justify-content-between">
                                    <span>选择数量：</span>
                                    <div class="input-group" style="display: inline-flex;width: 120px;">
                                        <el-input-number @click.stop="(null)" v-model="item.count" :min="1"
                                            :max="parseInt(item.shop.shop_count)" />
                                    </div>
                                </div>
                                <hr>
                                <p class="card-text">小计：￥{{ (item.count * item.shop.shop_price).toFixed(2) }}</p>
                                <div class="d-flex flex-direction-row justify-content-between">
                                    <input v-model="item['checked']" @change="changeCount(item)" class="form-check-input"
                                        type="checkbox" value="">
                                    <div>
                                        <button class="btn btn-danger" style="margin-left: 5px;"
                                            @click.stop="removeShop(item)">删除</button>
                                        <button class="btn btn-primary" style="margin-left: 5px;"
                                            @click.stop="router.push({ name: 'shop', query: { shop: encodeURIComponent(JSON.stringify(item.shop)) } })">详情</button>
                                        <!-- <button class="btn btn-primary" style="margin-left: 5px;">结算</button> -->
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <!-- 其他商品条目 -->
                </div>
                <div class="col-md-4 mt-4" v-if="shopCartList.length != 0">
                    <div class="card" style="position: sticky;top: 100px;">
                        <div class="card-body">
                            <h5 class="card-title">总计</h5>
                            <p class="card-text">购物车商品总数：{{ shopCartList.length }}</p>
                            <p class="card-text">总金额：￥{{ money.toFixed(2) }}</p>
                            <hr>
                            <p class="card-text">已选择：{{ select }}</p>
                            <p class="card-text">商品金额：￥{{ selectMoney.toFixed(2) }}</p>
                            <div class="buttonGroup">
                                <button class="btn btn-default" @click="switchItem(1)">全选</button>
                                <!-- <button class="btn btn-primary" @click="switchItem(2)">反选</button> -->
                                <button class="btn btn-default" @click="switchItem(3)">取消选中</button>
                                <button class="btn btn-default" @click="switchItem(4)">删除选中</button>
                            </div>
                            <div class="buttonGroup">
                                <button class="btn btn-primary" v-loading.fullscreen.lock="fullscreenLoading"
                                    @click="Submit(5)">结算</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterView />
    </div>
</template>

<script setup>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
import { onMounted, ref, watch } from 'vue';
import { ElNotification } from 'element-plus';
import router from '@/router';
import Axios from '@/Axios';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }

const wlg = (key) => window.localStorage.getItem(key);
const wls = (key, value) => window.localStorage.setItem(key, value);

const shopCartList = ref([]);
// 总金额
const money = ref(0);
// 已选择
const select = ref(0);
// 已选择金额
const selectMoney = ref(0);

watch(shopCartList, (newVal) => {
    if (newVal) {
        // 更新本地数据
        wls('list', JSON.stringify(newVal));
        // 统计金额
        money.value = 0;
        // 已选择
        select.value = 0;
        // 已选择金额
        selectMoney.value = 0;
        for (const item of newVal) {
            // 总金额
            money.value = money.value + parseInt(item.count) * parseFloat(item.shop.shop_price);
            // 已选择
            if (item.checked) {
                select.value++;
                selectMoney.value = selectMoney.value + parseInt(item.count) * parseFloat(item.shop.shop_price);
            }
        }
    }
}, { deep: true });

// 监听为零
const changeCount = (item) => {
    if (item.count < 1) {
        item.count = 1;
        notify('error', '失败', '不能为 0 ');
    } else if (item.count > item.shop.shop_count) {
        item.count = item.shop.shop_count;
        notify('error', '失败', '不能大于库存数量');
    }
}

// 全选
const switchItem = (state) => {
    if (state == 4) shopCartList.value = shopCartList.value.filter((i) => !i.checked);
    shopCartList.value.forEach(element => {
        switch (state) {
            case 1: element.checked = true; break;
            case 2: element.checked = !element.checked; break;
            case 3: element.checked = false; break;
        }
    });
}

// 删除商品
const removeShop = (item) => {
    fullscreenLoading.value = true;
    setTimeout(() => {
        shopCartList.value = shopCartList.value.filter((i) => i != item);
        notify("success", "成功", "成功删除一个商品");
        fullscreenLoading.value = false
    }, 2000);
}


// 结算
const fullscreenLoading = ref(true);
const Submit = () => {
    fullscreenLoading.value = true;
    let obj = [];
    for (const item of shopCartList.value) {
        if (item.checked) obj.push(item);
    }
    setTimeout(() => router.push({ name: 'myshopinfo', query: { shoplist: encodeURIComponent(JSON.stringify(obj)) } }), 1000);
}

onMounted(() => {
    if (JSON.parse(wlg('list'))) {
        shopCartList.value = (JSON.parse(wlg('list')));
    } else {
        shopCartList.value = '';
    }
    setTimeout(() => fullscreenLoading.value = false, 2000);
})
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 85px auto 0 auto;
}

.buttonGroup {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.buttonGroup button {
    margin-right: 10px;
    margin-bottom: 10px;
}

.mobileTop {

    display: none;
}

.deskTop {
    width: 200px;
    object-fit: cover;
}

@media (min-width: 0px) and (max-width: 767px) {
    .deskTop {
        /* display: none; */
    }

    .mobileTop {
        height: 250px;
        display: block;
    }
}
</style>

