<template>
    <div class="shopinfo">
        <div class="user_header_back">
            <el-button type="default" @click="RouterBack()" style="margin-right: 10px;">返回</el-button>
            商品信息详情
        </div>
        <div style="padding: 10px;">
            <el-button type="warning" @click="toRouter('AdminShopEdit', product.id)">修改商品</el-button>
            <el-button type="danger" @click="deleteShop(product.id)">删除商品</el-button>
        </div>
        <div class="product-details">
            <h4 class="mb-4">{{ product.shop_name }}</h4>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form>
                        <el-form-item label="商品分类">
                            {{ product.shop_type }}
                            <!-- <el-input v-model="product.shop_type" disabled></el-input> -->
                        </el-form-item>
                        <el-form-item label="商品库存">
                            {{ product.shop_count }}
                            <!-- <el-input v-model="product.shop_count" disabled></el-input> -->
                        </el-form-item>
                        <el-form-item label="商品价格">
                            {{ product.shop_price }}
                            <!-- <el-input v-model="product.shop_price" disabled></el-input> -->
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

            <el-col >
                <el-form >
                    <el-form-item label="商品描述">
                        {{ product.shop_content }}
                    </el-form-item>
                </el-form>
            </el-col>

            <h5 class="mt-4 mb-4">商品图片列表</h5>

            <div class="images">
                <img v-for="(item, index) in product.images" :key="index" :src="Axios.address + item.img"
                    @click="handlePictureCardPreview(item.img)" />
            </div>
        </div>

        <el-dialog v-model="dialogVisible">
            <img style="width: 100%;" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>

    </div>
</template>

<script setup>
import Axios from '@/Axios';
import { onMounted, ref } from 'vue';
import { ElNotification, ElMessageBox } from "element-plus";
import { useRoute } from 'vue-router';
import router from '@/router';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }
// 预览图片
const dialogImageUrl = ref('');
// 控制预览面板
const dialogVisible = ref(false);
// 预览方法
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = Axios.address + file;
    dialogVisible.value = true;
}


const product = ref({});
// 获取商品
const getShopInfo = () => {
    Axios.Post(undefined,
        [{ name: 'meta', value: 'shop_info_require' }, { name: 'shopid', value: useRoute().query.shopid }],
        (result) => {
            if (result.data.code == 200) {
                product.value = result.data.data[0];
            } else notify('info', result.data.code + '', result.data.info);
        },
        (err) => { notify('error', '失败', '获取商品分类失败！' + err); }
    );
}

// 删除商品
const deleteShop = (id) => {
    ElMessageBox.confirm('确定删除商品吗？该操作将不可逆！请谨慎操作！', '警告',
        { type: 'warning', cancelButtonText: '取消', confirmButtonText: '确定删除', })
        .then(() => {
            Axios.Post(undefined,
                [{ name: 'meta', value: 'shop_delete_require' }, { name: 'id', value: id }],
                (result) => {
                    if (result.data.code == 200) {
                        notify('success', '成功', '成功删除该商品！');
                        setTimeout(() => RouterBack(), 500);
                    } else notify('info', result.data.code + '', result.data.info);
                },
                (err) => { notify('error', '失败', '删除商品失败！' + err); }
            );
        }).catch(() => { });
}


onMounted(() => getShopInfo());
// 返回
const RouterBack = () => router.back();
const toRouter = (name, id) => router.push({ name: name, query: { shopid: id } });
</script>


<style scoped>
.user_header_back {
    padding: 20px;
    background-color: rgba(128, 128, 128, 0.271);
}

.product-details {
    max-width: 900px;
    padding: 20px;
    margin-top: 10px;
}


.images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 100px;
}

.images img {
    width: 200px;
    margin-left: 10px;
    margin-bottom: 10px;
    background-color: rgba(191, 191, 191, 0.281);
}
</style>