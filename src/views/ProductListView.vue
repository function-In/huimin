<template>
    <div class="product">
        <HeaderView title="shoplist"></HeaderView>

        <div class=" mx-auto" :style="'max-width: 1200px;margin-top:85px;'">

            <div class="d-md-none" style="position: sticky;z-index: 2;top:85px;">
                <ul class="nav nav-pills mobile-custom-tabs">
                    <li v-for="item, key in shopTypeList" :key="key" @click="selectShopType(item)"
                        :class="'item-tab ' + (selectedShopType != undefined && selectedShopType.id == item.id ? 'active' : '')">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
            <el-skeleton :loading="loading" animated>
                <template #template>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-3 d-none d-md-block">
                                <div class="list-group" style="position: sticky;top:85px;left: 0;">
                                    <el-skeleton-item v-for="index in 10" :key="index"
                                        style="width: 100%;height: 35px;margin-top: 10px;" />
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="row mt-2">
                                    <div v-for="index in 6" :key="index" class="col-md-4 mb-4">
                                        <div class="card h-100">
                                            <el-skeleton-item variant="image"
                                                style="width: 100%;height: 200px;max-height: 200px;min-height: 200px;" />
                                            <div class="card-body">
                                                <div>
                                                    <h5 class="card-title">
                                                        <el-skeleton-item style="width: 100%;" />
                                                    </h5>
                                                    <p class="card-text">
                                                        <el-skeleton-item style="width: 100%;" />
                                                    </p>
                                                </div>
                                                <p class="card-text">
                                                    <el-skeleton-item style="width: 100%;" />
                                                </p>
                                            </div>
                                            <div class="card-footer">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <el-skeleton-item style="width: 80px;" />
                                                    <el-skeleton-item variant="button" style="width: 30%;height: 30px;" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template #default>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-3 d-none d-md-block">
                                <div class="list-group" style="position: sticky;top:95px;left: 0;">
                                    <button v-for="item in shopTypeList" :key="item.id" @click="selectShopType(item)"
                                        class="list-group-item list-group-item-action"
                                        :class="{ active: selectedShopType === item }">
                                        {{ item.name }}
                                    </button>
                                </div>
                            </div>

                            <div class="col-md-9">
                                <el-skeleton :loading="loading2" animated>
                                    <template #template>
                                        <div class="row mt-2">
                                            <div v-for="index in 6" :key="index" class="col-md-4 mb-4">
                                                <div class="card h-100">
                                                    <el-skeleton-item variant="image"
                                                        style="width: 100%;height: 200px;max-height: 200px;min-height: 200px;" />
                                                    <div class="card-body">
                                                        <div>
                                                            <h5 class="card-title">
                                                                <el-skeleton-item style="width: 100%;" />
                                                            </h5>
                                                            <p class="card-text">
                                                                <el-skeleton-item style="width: 100%;" />
                                                            </p>
                                                        </div>
                                                        <p class="card-text">
                                                            <el-skeleton-item style="width: 100%;" />
                                                        </p>
                                                    </div>
                                                    <div class="card-footer">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <el-skeleton-item style="width: 80px;" />
                                                            <el-skeleton-item variant="button"
                                                                style="width: 30%;height: 30px;" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template #default>
                                        <div class="row mt-2">
                                            <el-empty v-if="shopList.length == 0" description="该分类暂时没有商品" />
                                            <div v-for="item in shopList" :key="item.id" class="col-md-4 mb-4">
                                                <div class="card h-100">
                                                    <el-image fit="cover"
                                                        style="width: 100%;height: 200px;max-height: 200px;min-height: 200px;"
                                                        :src="Axios.address + item.images[0].img" />
                                                    <div class="card-body">
                                                        <div class="">
                                                            <h5 class="card-title">{{ item.shop_name }}</h5>
                                                            <p class="card-text content">{{ item.shop_content }}</p>
                                                        </div>
                                                        <p class="card-text">库存{{ item.shop_count }}</p>
                                                    </div>
                                                    <div class="card-footer">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <strong style="color: red;">
                                                                价格: {{ item.shop_price }}元
                                                            </strong>
                                                            <router-link :to="{
                                                                name: 'shop',
                                                                query: {
                                                                    shop: encodeURIComponent(JSON.stringify(item))
                                                                }
                                                            }" class="btn warning">查看详情</router-link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            style="display: flex;justify-content: center;align-items: center;padding: 10px;">
                                            <el-button type="default" @click="loadMoreShopList">加载更多</el-button>
                                        </div>
                                    </template>
                                </el-skeleton>
                            </div>


                        </div>
                    </div>
                </template>
            </el-skeleton>

        </div>
        <FooterView></FooterView>
    </div>
</template>
<script setup>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
import { onMounted, ref } from 'vue';
import Axios from '@/Axios';
import { ElNotification } from 'element-plus';
import { useRoute } from 'vue-router';
const rou = useRoute();
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }
// 骨架屏
const loading = ref(true);
const loading2 = ref(true);
// 商品分类列表
const shopTypeList = ref([{ id: 0, name: '正在加载', products: [] }]);

// 已选中的分类
const selectedShopType = ref(null);

// 当前的分类商品列表
const shopList = ref([]);
// 当前分类商品加载条数
const shopCountLimit = ref({});


const wlg = (key) => window.localStorage.getItem(key);
const wls = (key, value) => window.localStorage.setItem(key, value);

// 请求商品分类
const getShopTypeList = () => {
    Axios.Post(undefined,
        [{ name: 'meta', value: 'shop_type_web' }],
        (result) => {
            if (result.data.code == 200) {
                shopTypeList.value = result.data.data;
                selectShopType(shopTypeList.value[parseInt(rou.query.typeid ? rou.query.typeid : 0)]);
                loading.value = false;
            } else notify('info', result.data.code + '', result.data.info);
        },
        (err) => { notify('error', '失败', '获取商品分类列表失败！' + err); }
    );
}

// 点击选择列表
const selectShopType = (item) => {
    loading2.value = true;
    // 当前选择分类
    selectedShopType.value = item;
    // 当前时间戳
    let time = parseInt(new Date().getTime() / 1000);
    // console.log(time);
    // 判断本地列表是否存在
    if (wlg('ShopList')) {
        // 验证时间 ( 判断是否小于当前时间 )
        if (JSON.parse(wlg('ShopList'))['time'] < time) {
            // 清空(刷新)列表
            wls("ShopList", JSON.stringify({ name: '商品专用列表', time: time + 180 }));
            // 刷新加载条数
            shopCountLimit.value = {};
        }
    } else {
        // name 名称 time 过期时间 默认3分钟内有效
        wls("ShopList", JSON.stringify({ name: '商品专用列表', time: time + 180 }));
    }
    LoadShopList(item);
};



// 加载商品列表
const LoadShopList = (item) => {
    if (wlg('ShopList') && JSON.parse(wlg('ShopList'))[item.id] != undefined) {
        // 从本地读取列表
        shopList.value = JSON.parse(wlg('ShopList'))[item.id];
        loading2.value = false;
    } else {
        // 设置加载条数
        if (!shopCountLimit.value[item.id]) { shopCountLimit.value[item.id] = [0, 9] }
        // 从云端读取列表
        Axios.Post(undefined,
            [
                { name: 'meta', value: 'shop_list_web' },
                { name: 'shop_type', value: item.id },
                { name: 'limit', value: JSON.stringify(shopCountLimit.value[item.id]) },
            ],
            (result) => {
                if (result.data.code == 200) {
                    let localList = JSON.parse(wlg('ShopList'));
                    localList[item.id] = result.data.data;
                    wls('ShopList', JSON.stringify(localList));
                    shopList.value = localList[item.id];
                    loading2.value = false;
                } else notify('info', result.data.code + '', result.data.info);
            },
            (err) => { notify('error', '失败', '获取商品列表失败！' + err); }
        );
    }
}


const loadMoreShopList = () => {
    // 根据当前选择的分类继续获取商品
    let min = JSON.parse(wlg('ShopList'))[selectedShopType.value.id].length;
    Axios.Post(undefined,
        [
            { name: 'meta', value: 'shop_list_web' },
            { name: 'shop_type', value: selectedShopType.value.id },
            { name: 'limit', value: JSON.stringify([min, min + 9]) },
        ],
        (result) => {
            if (result.data.code == 200) {
                let localList = JSON.parse(wlg('ShopList'));
                for (const item of result.data.data) {
                    localList[selectedShopType.value.id].push(item);
                }
                wls('ShopList', JSON.stringify(localList));
                shopList.value = localList[selectedShopType.value.id];
                loading2.value = false;
            } else if (result.data.code == 300) {
                notify('info', '提示', '没有更多内容了...')
            } else notify('info', result.data.code + '', result.data.info);
        },
        (err) => { notify('error', '失败', '获取商品列表失败！' + err); }
    );
}


onMounted(() => {
    window.scrollTo(0, 0);
    getShopTypeList();
})
</script>


<style scoped>
.content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /* white-space: nowrap; */
    line-clamp: 3;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
}

.product {}

.mobile-custom-tabs {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    background-color: white;
    margin-bottom: 10px;
    box-shadow: 0 0 4px grey;
}

.mobile-custom-tabs .item-tab {
    min-width: 80px;
    line-height: 45px;
    height: 45px;
    text-align: center;
    background-color: white;
    border-bottom: 2px solid transparent;
    font-size: small;
}

.mobile-custom-tabs .item-tab.active {
    border-bottom: 2px solid #1989FA;
    color: white;
    background-color: #1989FA;
}
</style>