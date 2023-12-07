<template>
    <div class="productItem">
        <HeaderView title="shoplist"></HeaderView>
        <div class="headerBox">
            <div class="minHeader">
                <el-button type="default" style="margin-left: 10px;margin-right: 10px;" @click="router.back()">
                    返回
                </el-button>
                <div class="text">商品详情</div>
            </div>
        </div>
        <div class="limit1200px" style="height: 100%;min-height: 70vh;">
            <div class="container" style="margin: 100px auto;padding: 0;">
                <div class="row">
                    <!-- 左侧商品图 -->
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <!-- <img :src="ImageView" style="object-fit: cover;width: 100%;height: 400px;" alt=""> -->
                            <el-image fit="cover" style="width: 100%;height: 400px;" :src="ImageView"></el-image>
                        </div>
                        <ul class="SmallImageList">
                            <li v-for="item in shopInfo.images" :key="item">
                                <el-image fit="cover" style="width: 100%;height: 100%;" :src="Axios.address + item.img"
                                    @click="selectImage(item)" />
                            </li>
                        </ul>
                    </div>

                    <!-- 右侧商品信息 -->
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h2 class="card-title mb-3">{{ shopInfo.shop_name }}</h2>
                                <p class="card-text text-danger"><strong>价格:￥{{ shopInfo.shop_price }}</strong></p>
                                <p class="card-text mb-2">{{ shopInfo.shop_content }}</p>
                                <!-- <p class="card-text mb-2">产地：</p>
                                <p class="card-text mb-2">包装：</p> -->
                                <hr>
                                <p class="card-text mb-2">库存：{{ shopInfo.shop_count }}</p>
                                <p style="margin: 20px auto;">请选择您的收货地址：</p>
                                <el-select v-model="selectAddressId" :placeholder="address_text" style="width: 100%;">
                                    <el-option v-for="item in address_list" :key="item" :label="item.address"
                                        :value="item.id" />
                                </el-select>
                                <hr>
                                <div class="card-text mt-4 d-flex align-items-center justify-content-between">
                                    <span>选择数量：</span>
                                    <div class="input-group mb-3" style="display: inline-flex;width: 120px;">
                                        <el-input-number v-model="count" :min="1" :max="parseInt(shopInfo.shop_count)" />
                                    </div>
                                </div>
                                <hr>
                                <div style="display: flex;justify-content: space-between;align-items: center;">
                                    <div>
                                        <p class="card-text text-danger">
                                            <strong>￥{{ (shopInfo.shop_price * count).toFixed(2) }} </strong>
                                        </p>
                                    </div>
                                    <div>
                                        <button @click="onVerfilyListener(1)" class="btn btn-default"
                                            style="margin-right: 10px;border: 1px solid #1989FA;">
                                            加入购物车
                                        </button>
                                        <button v-loading.fullscreen.lock="fullscreenLoading" class="btn btn-primary"
                                            @click="onVerfilyListener(2)">立即购买</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="container comment">
                <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
                    <h5>相关评论(最近5条)</h5>
                    <el-button style="font-size: small;" @click="ViewMoreComment">查看更多</el-button>
                </div>

                <ul class="comment_list">
                    <li v-for="item in comment_list" :key="item" class="comment_item">
                        <div class="action" @click="toUser">
                            <el-avatar class="headerImg" shape="square" :src="Axios.address + item.userHeader" />
                            <div style="display: flex;flex-direction: column;">
                                <span class="name">{{ item.userName }}</span>
                                <span style="font-size: small;margin-top: 10px;">{{ item.userSign }}</span>
                            </div>
                        </div>
                        <span class="content">{{ item.content }}</span>
                        <div style="font-size: small;color: grey;">
                            <span>{{ item.date }}</span>
                            <span v-if="loginInfo.id == item.userid" style="margin: 0 15px;cursor: pointer;"
                                @click="removeComment(item)">删除</span>
                        </div>
                        <!-- <span style="font-size: smaller;color: grey;">{{ item.date }}</span> -->
                        <hr>
                    </li>
                    <li v-if="comment_list.length == 0"><el-empty :description="'暂无更多评论'" /></li>
                </ul>
                <div
                    style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;margin: 10px 0;">
                    只展示最近的 5 条评论
                    <el-button @click="ViewMoreComment">查看更多</el-button>
                </div>
                <textarea class="commentEdit" v-model="commentContent" cols="30" rows="10"
                    placeholder="善语结人心，恶语毁一生"></textarea>
                <el-button style="float: right;margin-bottom: 10px;" type="primary"
                    @click="onVerfilyListener(3)">立即发表</el-button>
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
import router from '@/router';
import Axios from '@/Axios';
import { ElNotification } from 'element-plus';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }
const wlg = (key) => window.localStorage.getItem(key);
const wls = (key, value) => window.localStorage.setItem(key, value);

// 获取商品信息
const shop = JSON.parse(decodeURIComponent(useRoute().query.shop));
const shopInfo = ref({});



// 图片相关操作
const ImageView = ref('');
const selectImage = (item) => ImageView.value = Axios.address + item.img;
// 数量
const count = ref(1);
// 监听数量值改变

// 获取到的地址
const address_list = ref([]);
// 获取地址状态
const address_text = ref('请选择您的收货地址');
// 已选择的地址
const selectAddressId = ref();

// 请求收货地址
const getAddressList = () => {
    Axios.Post(undefined,
        [{ name: 'meta', value: 'address_list_web' },],
        (result) => {
            if (result.data.code == 200) {
                address_list.value = result.data.data;
                for (const item of address_list.value)
                    if (item.isdefault == 1) { selectAddressId.value = item.id }
            } else {
                address_text.value = '未登录或不存在收货地址';
            }
        }
    );
}


// 请求评论列表
const comment_list = ref([]);
const getCommentList = () => {
    Axios.Post(undefined,
        [
            { name: 'meta', value: 'comment_list_web' },
            { name: 'type', value: 3 },
            { name: 'typeid', value: shopInfo.value.id },
            { name: 'limit', value: JSON.stringify([0, 5]) }
        ],
        (result) => { comment_list.value = []; if (result.data.code == 200) comment_list.value = result.data.data; }
    );
}


// 登录验证
const loginInfo = ref({});
const onVerfilyListener = (state) => {
    Axios.Post(undefined,
        [{ name: 'meta', value: 'login_state_require' }],
        (result) => {
            if (result.data.code == 200) {
                loginInfo.value = result.data.data;
                switch (state) {
                    case 1: joinShopCart(); break;
                    case 2: byShop(result.data.data); break;
                    case 3: insertComment(result.data.data); break;
                    default:
                        break;
                }
            } else {
                if (state != 0) {
                    router.push({ name: 'login', query: { back: true } });
                    notify('info', '提示', '你需要先登录！');
                }
            }
        }
    );
}


// 加入购物车
const joinShopCart = () => {
    fullscreenLoading.value = true;
    // let wl = window.localStorage;
    // 判断列表是否存在,不存在则创建
    if (wlg('list') == undefined) wls('list', JSON.stringify([]))
    if (count.value != null) {
        // 定义新的订单
        let obj = {
            checked: true,
            count: count.value,
            price: shopInfo.value.shop_price,
            shop: shopInfo.value,
            address: address_list.value.find((ele) => { if (ele['id'] == selectAddressId.value) return ele; }),
        }
        // 获取购物车本地数据列表并转 JSON
        let list = JSON.parse(wlg('list'));
        // 加入列表
        list.push(obj);
        // 存入本地
        wls('list', JSON.stringify(list));
        // log
        setTimeout(() => {
            notify('success', '成功', '该商品已加入您的购物车！');
            fullscreenLoading.value = false
        }, 2000);
        count.value = 1;
    } else {
        notify('error', '错误', '商品购买数量不能为空');
    }
}
// 立即购买
const fullscreenLoading = ref(true);
const byShop = () => {
    fullscreenLoading.value = true;
    if (count.value != null) {
        // 定义新的订单
        let obj = [
            {
                checked: true,
                count: count.value,
                price: shopInfo.value.shop_price,
                shop: shopInfo.value,
                address: address_list.value.find((ele) => { if (ele['id'] == selectAddressId.value) return ele; }),
            },
        ]
        setTimeout(() => router.push({ name: 'myshopinfo', query: { shoplist: encodeURIComponent(JSON.stringify(obj)) } }), 1000);
    } else {
        notify('error', '错误', '商品购买数量不能为空');
    }
    setTimeout(() => fullscreenLoading.value = false, 2000);
}

// 发表评论
const commentContent = ref('');
const insertComment = (resultInfo) => {
    if (commentContent.value.length < 1 || commentContent.value == ' ') {
        notify('error', '错误', '评论字数不能低于 1 字!');
    } else if (commentContent.value.length > 500) {
        notify('error', '错误', '评论字数不能超过 500 字!');
    } else {
        Axios.Post(undefined,
            [
                { name: 'meta', value: 'comment_create_web' },
                { name: 'type', value: 3 },
                { name: 'typeid', value: shopInfo.value.id },
                { name: 'userid', value: resultInfo.id },
                { name: 'content', value: commentContent.value },
            ],
            (result) => {
                if (result.data.code == 200) {
                    commentContent.value = '';
                    notify('success', '成功', '评论发布成功!');
                    getCommentList();
                } else notify('error', result.data.code, result.data.info);
            }
        );
    }
}

// 查看评论列表
const ViewMoreComment = () => {
    window.scrollTo(0, 0);
    router.push({
        name: 'comment', query: {
            info: encodeURIComponent(JSON.stringify({ _type: 3, _typeid: shop.id }))
        }
    })
}

// 删除评论
const removeComment = (item) => {
    fullscreenLoading.value = true;
    Axios.Post(undefined,
        [{ name: 'meta', value: 'comment_remove_web' }, { name: 'commentid', value: item.id },],
        (result) => {
            fullscreenLoading.value = false;
            if (result.data.code == 200) {
                notify('success', '成功', '评论删除成功！');
                setTimeout(() => getCommentList(), 500);
            } else {
                notify('error', result.data.code, result.data.info);
            }
        }
    );
}


onMounted(() => {
    fullscreenLoading.value = true;
    if (shop == undefined) {
        alert('参数错误!');
        router.back();
    }
    shopInfo.value = shop;
    if (shop.images != undefined) ImageView.value = Axios.address + shop.images[0].img;
    getAddressList();
    getCommentList();
    onVerfilyListener(0);
    setTimeout(() => fullscreenLoading.value = false, 2000);
})
</script>

<style scoped>
.productItem {}

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
    top: 86px;
    z-index: 3;
    box-shadow: 0 0 2px grey;
    background-color: white;
}

.limit1200px {
    max-width: 1200px;
    margin: 0 auto;
}

.SmallImageList {
    list-style: none;
    padding: 0;
    /* margin: 10px auto; */
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
    margin-top: 10px;

}

.SmallImageList li {
    min-width: 120px;
    height: 120px;
    margin-right: 10px;
}

.SmallImageList li:hover {
    transform: scale(1.05);
}

.SmallImageList li img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
}

/* 图片圆角效果 */
.card img {
    height: 100%;
    min-height: 350px;
    object-fit: cover;
}



/* 评论区 */


.comment {}

.comment .comment_list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.comment .comment_list .comment_item {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    margin-top: 30px;
    /* border-bottom: 1px solid grey; */
}

.comment .comment_list .comment_item .action {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-indent: 10px;
    font-size: medium;
}

.comment .comment_list .comment_item .action .name {
    font-size: medium;
    font-weight: bold;
}

.comment .comment_list .comment_item .action .headerImg {
    width: 60px;
    height: 60px;
}

.comment .comment_list .comment_item .content {
    margin: 10px 0;
    text-wrap: wrap;
    flex-wrap: wrap;
    word-wrap: break-word;
}

/* 评论框 */
textarea.commentEdit {
    width: 100%;
    height: 150px;
    line-height: 25px;
    border-color: rgba(128, 128, 128, 0.466);
    margin-bottom: 10px;
    color: grey;
    border-color: #409eff;
    padding: 5px;
}
</style>