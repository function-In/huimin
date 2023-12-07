<template>
    <div class="newslist mx-auto">
        <div style="padding: 10px;">
            <el-button type="primary" size="small" @click="getNewsList()">刷新列表</el-button>
            <el-button type="primary" size="small" @click="toRouter('AdminNewsCreate', undefined)">发布资讯</el-button>
        </div>
        <el-table :data="newsList" style="width: 80vw;height: 85vh;">
            <el-table-column prop="news_id" label="编号" />
            <el-table-column prop="news_author" label="新闻作者" />
            <el-table-column prop="news_userid" label="发布者" />
            <el-table-column prop="news_name" label="标题" width="300px">
                <template #default="item">
                    <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                        {{ item.row.news_name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="news_date" label="发布时间" width="200px" />
            <el-table-column prop="news_zan" label="点赞量" />
            <el-table-column prop="news_view" label="浏览量" />
            <el-table-column prop="news_status" label="资讯状态" />
            <el-table-column fixed="right" label="操作" width="150px">
                <template #default="item">
                    <el-button link type="warning" size="small"
                        @click="toRouter('AdminNewsInfo', item.row.news_id)">详情</el-button>
                    <el-button link type="primary" size="small"
                        @click="toRouter('AdminNewsEdit', item.row.news_id)">编辑</el-button>
                    <el-button link type="danger" size="small" @click="deleteNews(item.row.news_id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Axios from '@/Axios';
import { ElNotification, ElMessageBox } from 'element-plus';
import router from '@/router';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }

// 存储资讯列表
const newsList = ref([]);

// 请求资讯列表
const getNewsList = () => {
    newsList.value = [{ news_id: '正在加载...' }];
    Axios.Post(undefined,
        [{ name: 'meta', value: 'news_list_require' }],
        (result) => {
            newsList.value = [];
            if (result.data.code == 200) {
                for (const item of result.data.data) newsList.value.push(item);
            } else notify('info', result.data.code + '', result.data.info);
        },
        (err) => { notify('error', '失败', '获取资讯列表失败！' + err); }
    );
}

// 删除资讯
const deleteNews = (id) => {
    ElMessageBox.confirm('确定删除资讯吗？相关图片也会被删除！该操作将不可逆！请谨慎操作！', '警告',
        { type: 'warning', cancelButtonText: '取消', confirmButtonText: '确定删除', })
        .then(() => {
            Axios.Post(undefined,
                [{ name: 'meta', value: 'news_delete_require' }, { name: 'newsid', value: id }],
                (result) => {
                    if (result.data.code == 200) {
                        notify('success', '删除成功', '成功删除资讯！');
                        setTimeout(() => getNewsList(), 500);
                    } else notify('info', result.data.code + '', result.data.info);
                },
                (err) => { notify('error', '失败', '删除用户失败！' + err); }
            );
        }).catch(() => { });
}

// 路由跳转
const toRouter = (name, id) => { router.push({ name: name, query: { newsid: id } }); }
// 加载
onMounted(() => getNewsList());
</script>

<style scoped>
/* .userlist */
</style>