<template>
    <div class="shopCreate">
        <div class="user_header_back">
            <div>
                <el-button type="danger" @click="RouterBack()" style="margin-right: 10px;">返回</el-button>
                发布新商品
            </div>
            <div>
                <el-button type="primary" @click="CreateShop">保存</el-button>
            </div>
        </div>
        <div style="padding: 10px;"></div>
        <div class="product-details">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form>
                        <el-form-item label="商品名称">
                            <el-input v-model="product.shop_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <el-select v-model="product.shop_type" placeholder="请选择">
                                <el-option v-for="item in ShopType" :key="item" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品库存">
                            <el-input v-model="product.shop_count" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <el-input v-model="product.shop_price"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-form label-width="100px">
                        <el-form-item label="商品描述">
                            <el-input v-model="product.shop_content" type="textarea" :rows="8"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <h5 class="mt-4">商品图片修改</h5>
            <el-form-item>
                <div>
                    <el-upload class="avatar-uploader" action="#" list-type="picture-card" :auto-upload="false"
                        :on-remove="FileListChange" :on-change='FileListChange' :on-preview="handlePictureCardPreview">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                </div>
            </el-form-item>
            <el-dialog v-model="dialogVisible">
                <img style="width: 100%;" :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import Axios from '@/Axios';
import { onMounted, ref } from 'vue';
import { ElNotification, } from "element-plus";
import { Plus } from '@element-plus/icons-vue'

import router from '@/router';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }

// 预览图片路径
const dialogImageUrl = ref('');
// 控制预览面板
const dialogVisible = ref(false);
// 图片预览
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
}
// 文件列表
const FileList = ref([]);
// 文件添加删除改动
const FileListChange = (_, files) => {
    FileList.value = [];
    for (const file of files) if (file.raw) FileList.value.push(file.raw);
}

// 分类信息
const ShopType = ref([]);
// 商品信息
const product = ref({
    shop_name: '',
    shop_type: '',
    shop_count: 0,
    shop_price: 0,
    shop_content: ''
});

// 获取全部分类
const getShopType = () => {
    Axios.Post(undefined,
        [{ name: 'meta', value: 'shop_type_list_require' }],
        (result) => {
            if (result.data.code == 200) {
                ShopType.value = (result.data.data);
            } else notify('info', result.data.code + '', result.data.info);
        },
        (err) => { notify('error', '失败', '获取商品分类失败！' + err); }
    );
}

// 创建商品
const CreateShop = () => {
    let fd = [{ name: 'meta', value: 'shop_create_require' }];
    for (const key in product.value) fd.push({ name: key, value: product.value[key] });
    Axios.Post(FileList.value ? FileList.value : undefined, fd,
        (result) => {
            if (result.data.code == 200) {
                notify("success", "发布成功", '成功发布了一个商品！');
                // window.location.reload()
                setTimeout(() => RouterBack(), 1000);
            } else notify('info', result.data.code + '', result.data.info);
        },
        (err) => { notify('error', '失败', '获取商品分类失败！' + err); }
    );
}

onMounted(() => getShopType());
// 返回
const RouterBack = () => router.back();
</script>


<style scoped>
.user_header_back {
    padding: 20px;
    background-color: rgba(128, 128, 128, 0.271);
    display: flex;
    justify-content: space-between;
}

.product-details {
    /* max-width: 900px; */
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