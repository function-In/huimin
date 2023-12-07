<template>
    <div class="shoplist">
        <div style="padding: 10px;">
            <el-button type="primary" size="small" @click="getShopList">刷新商品</el-button>
            <el-button type="primary" size="small" @click="toRouter('AdminShopCreate', undefined)">添加商品</el-button>
        </div>
        <el-table :data="shoplist" style="width: 80vw;height: 85vh;">
            <el-table-column prop="id" label="编号" width="100px" />
            <el-table-column prop="shop_name" label="商品名称" width="250px" />
            <el-table-column prop="shop_type" label="分类名称" width="120px" />
            <el-table-column prop="shop_price" label="商品价格" width="100px" />
            <el-table-column prop="shop_count" label="商品库存" width="100px" />
            <el-table-column prop="shop_content" label="商品描述" width="500px" />
            <el-table-column fixed="right" label="操作" width="200px">
                <template #default="item">
                    <el-button link type="primary" size="small" @click="toRouter('AdminShopInfo', item.row.id)">
                        查看</el-button>
                    <el-button link type="primary" size="small" @click="toRouter('AdminShopEdit', item.row.id)">
                        编辑</el-button>
                    <el-button link type="danger" size="small" @click="deleteShop(item.row.id)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import Axios from '@/Axios';
import { onMounted, ref } from 'vue';
import { ElNotification, ElMessageBox } from "element-plus";
import router from '@/router';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }

const shoplist = ref([]);

// 请求商品列表
const getShopList = () => {
    shoplist.value = [{ id: "正在加载..." }]
    Axios.Post(undefined,
        [{ name: 'meta', value: 'shop_list_require' }],
        (result) => {
            shoplist.value = [];
            if (result.data.code == 200) {
                shoplist.value = result.data.data;
            } else notify('info', result.data.code + '', result.data.info);
        },
        (err) => { notify('error', '失败', '获取商品列表失败！' + err); }
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
                        setTimeout(() => getShopList(), 500);
                    } else notify('info', result.data.code + '', result.data.info);
                },
                (err) => { notify('error', '失败', '删除商品失败！' + err); }
            );
        }).catch(() => { });
}

// 跳转
const toRouter = (name, id) => router.push({ name: name, query: { shopid: id } });
onMounted(() => getShopList());
</script>

<style scoped></style>

