<template>
    <div class="shopinfo">
        <HeaderView title="shopinfo"></HeaderView>
        <div class="headerBox">
            <div class="minHeader">
                <el-button type="default" style="margin-left: 10px;margin-right: 10px;" @click="router.back()">
                    返回
                </el-button>
                <div class="Headertext">{{ SubmitText == 'submit' ? '订单详情' : '取消支付' }}</div>
            </div>
        </div>
        <div class="xtx-pay-checkout-page">
            <div class="container">


                <div class="wrapper">

                    <div v-if="SubmitText == 'submit'">
                        <div style="display: flex;align-items: center;padding: 10px 0;border-bottom: 1px solid #f5f5f5;">
                            <span style="margin: 0 10px 0 10px;">收货地址</span>
                            <div class="edit" @click="showDialog = true">修改</div>
                        </div>
                    </div>
                    <div class="box-body">
                        <div class="address">
                            <div class="text">
                                收货人：{{ selectAddress.name }}<br>
                                联系号码：{{ selectAddress.phone }}<br>
                                联系地址：{{ selectAddress.address }}
                            </div>
                        </div>
                    </div>

                    <!-- 商品信息 -->
                    <h3 class="box-title">商品信息【 {{ shopList.length }}件 】(显示不全可向左滑动展示)</h3>
                    <div class="box-body">
                        <el-table :data="shopList" style="width: 100%">
                            <el-table-column prop="shop.shop_name" label="名称" />
                            <el-table-column prop="shop.shop_price" label="单价（元）" />
                            <el-table-column prop="count" label="数量" />
                            <el-table-column label="小计">
                                <template #default="item">
                                    {{ (parseInt(item.row.count) * parseFloat(item.row.shop.shop_price)).toFixed(2) }}元
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <div v-if="SubmitText == 'submit'">
                        <!-- 支付方式 -->
                        <h3 class="box-title">支付方式</h3>
                        <div class="box-body">
                            <a :class="'my-btn ' + (selectPayment == 'online' ? 'active' : undefined)"
                                @click="selectPayment = 'online'" href="javascript:;">
                                在线支付
                            </a>
                            <a :class="'my-btn ' + (selectPayment == 'unonline' ? 'active' : undefined)"
                                @click="selectPayment = 'unonline'" href="javascript:;">
                                货到付款
                            </a>
                            <span style="color:#999" class="col-md-6">货到付款需付 2 元手续费</span>
                        </div>
                    </div>

                    <!-- 金额明细 -->
                    <h3 class="box-title" style="font-weight: bold;">金额明细</h3>
                    <div class="box-body">
                        <div class="total">
                            <dl>
                                <dt>商品件数：</dt>
                                <dd>{{ shopList.length }} 件</dd>
                            </dl>
                            <dl>
                                <dt>商品总价：</dt>
                                <dd>¥ {{ jiage.toFixed(2) }}</dd>
                            </dl>
                            <dl>
                                <dt>运<i></i>费：</dt>
                                <dd>¥ {{ selectPayment == 'unonline' ? 2 : 0 }}</dd>
                            </dl>
                            <dl>
                                <dt>应付总额：</dt>
                                <dd class="price">¥ {{ (jiage + (selectPayment == 'unonline' ? 2 : 0)).toFixed(2) }}</dd>
                            </dl>
                        </div>
                    </div>

                    <!-- 提交订单 -->
                    <div class="submit">
                        <span v-if="SubmitText == 'submit'">请检查您的订单信息是否准确无误</span>
                        <span style="color: red;font-size: larger;">
                            {{
                                SubmitText == 'payment' ?
                                '您需要支付' + (jiage + (selectPayment == 'unonline' ? 2 : 0)).toFixed(2) + '元'
                                : ''
                            }}
                        </span>
                        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" size="large"
                            @click="nextSubmit">
                            {{ SubmitText == 'submit' ? '提交订单' : SubmitText == 'payment' ? '立即支付' : '操作出错！' }}
                        </el-button>
                    </div>
                </div>
            </div>

            <!-- :class="{ active: activeAddress.id === item.id }" -->
            <!-- v-model="showDialog" -->
            <!-- 切换地址 -->
            <el-dialog v-model="showDialog" title="修改收货地址" width="80%" center>
                <div class="addressWrapper">
                    请选择修改地址
                    <select v-model="selectAddress2" style="width: 100%;height: 40px;margin-top: 10px;">
                        <option v-for="item in address_list" :key="item.id" :value="item">{{ item.address }}
                        </option>
                    </select>
                    <!-- <el-select v-model="selectAddress2" placeholder="请选择地址" style="width: 100%;margin-top: 10px;">
                        <el-option v-for="item in address_list" :key="item" :label="item.address" :value="item" />
                    </el-select> -->
                    <div style="margin-top: 10px;">
                        <div style="display: flex;justify-content: space-between;align-items: center;">
                            <span>您选择的地址：</span>
                            <!-- <el-switch v-model="defaultAddress" active-text="设为默认" /> -->
                        </div>
                        <div class="address" style="margin: 10px 0;">
                            <div class="text">
                                收货人：{{ selectAddress2.name }}<br>
                                联系号码：{{ selectAddress2.phone }}<br>
                                联系地址：{{ selectAddress2.address }}<br>
                                是否默认：{{ selectAddress2.isdefault == 0 ? "否" : '是' }}
                            </div>
                        </div>
                        <span style="font-size: small;cursor: pointer;color: #1989FA;">
                            去管理我的地址>>
                        </span>
                    </div>
                </div>
                <template #footer>
                    <div class="dialog-footer" style="display: flex;justify-content: flex-end;">
                        <el-button @click="showDialog = false">取消</el-button>
                        <el-button @click="AddressSelectFunction" type="primary">确定</el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- 添加地址 -->
        </div>
        <FooterView></FooterView>
    </div>
</template>
  
  
<script setup>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { ElNotification } from 'element-plus';
import Axios from '@/Axios';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }

// 解析地址商品
const shopList = ref([]);
// 修改地址面板开关
const showDialog = ref(false);
// 获取到的地址
const address_list = ref([]);
// 面板选择的地址
const selectAddress2 = ref({});
// 当前地址
const selectAddress = ref({});
// 选择地址函数
const AddressSelectFunction = () => {
    showDialog.value = false;
    selectAddress.value = selectAddress2.value;
}
// 获取地址状态
// const address_text = ref('请选择您的收货地址');
// 请求收货地址
const getAddressList = () => {
    Axios.Post(undefined,
        [{ name: 'meta', value: 'address_list_web' },],
        (result) => {
            if (result.data.code == 200) {
                address_list.value = result.data.data;
                for (const item of address_list.value)
                    if (item.isdefault == 1) {
                        selectAddress.value = selectAddress2.value = (item);
                    }
            } else {
                // address_text.value = '未登录或不存在收货地址';
            }
        }
    );
}

// 付款操作
const selectPayment = ref('online');
// 计算价格
const jiage = ref(0);
const CompountedPrice = () => {
    jiage.value = 0;
    shopList.value.forEach(ele => {
        jiage.value = jiage.value + parseInt(ele.count) * parseFloat(ele.shop.shop_price);
    });
}
// 提交订单操作
const fullscreenLoading = ref(false);
const SubmitText = ref('submit');
const nextSubmit = () => {
    fullscreenLoading.value = true;
    window.scrollTo(0, 0);
    if (SubmitText.value == 'payment') {
        // 处理订单信息
        let obj = {
            // 收货地址s
            address: selectAddress.value,
            // 运费
            yunfei: selectPayment.value == 'unonline' ? 2 : 0,
            // 商品信息
            shopList: [],
            // 支付金额
        }
        for (const item of shopList.value) obj.shopList.push(item);
        setTimeout(() => router.replace({ name: 'payment', query: { info: encodeURIComponent(JSON.stringify(obj)) } }), 1000);
    }

    SubmitText.value = 'payment';
    setTimeout(() => fullscreenLoading.value = false, 2000);
}
onMounted(() => {
    // 请求地址
    getAddressList();
    // 解析地址
    shopList.value = JSON.parse(decodeURIComponent(useRoute().query.shoplist));
    if (shopList.value == undefined || shopList.value.length < 1) {
        notify("error", "非法操作", "没有任何商品信息！");
        router.back();
    }
    CompountedPrice();
})
</script>
  
  
  
<style scoped lang="scss">
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

.xtx-pay-checkout-page {
    max-width: 1200px;
    margin: 90px auto;

    .wrapper {
        background: #fff;
        padding: 0 20px;

        .edit {
            // height: 100%;
            color: #1989FA;
            cursor: pointer;
        }

        .box-title {
            font-size: 16px;
            font-weight: normal;
            padding-left: 10px;
            line-height: 50px;
            border-bottom: 1px solid #f5f5f5;
        }

        .box-body {
            padding: 10px 0;
        }
    }
}

.address {
    // border: 4px dashed #f5f5f5;
    border: 4px dashed #1989fa38;
    display: flex;
    align-items: end;

    .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;
        padding: 0 10px;
    }



    .edit:hover {
        height: 100%;
        padding: 10px;
        color: blue;
    }
}

.my-btn {
    padding: 10px 20px;
    margin: 0 20px 0 0;
    text-decoration: none;
    color: #666666;
    border: 1px solid #e4e4e4;
    text-align: center;
    display: inline-block;
}

.my-btn.active {
    border: 1px solid #1989FA;
    color: #1989FA;
    background-color: #1989fa12;
}

.total {
    dl {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // padding: 10px;
        margin-left: 10px;

        dt {
            i {
                display: inline-block;
                width: 2em;
            }
        }

        dd {
            &.price {
                color: red;
                font-size: 20px;
                // color: $priceColor;
            }
        }
    }
}

.submit {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f5f5f5;
}

.addressWrapper {
    overflow-y: auto;
}

.text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.item {
        border: 1px solid #f5f5f5;
        margin-bottom: 10px;
        cursor: pointer;

        >ul {
            padding: 10px;
            font-size: 14px;
            line-height: 30px;
        }
    }
}


@media (min-width: 0px) and (max-width: 767px) {}
</style>