<template>
    <div class="forumlist mx-auto">
        <div style="padding: 10px;">
            <el-button type="primary" size="small" @click="getForumList()">刷新列表</el-button>
            <el-button type="primary" size="small" @click="toRouter('AdminForumCreate', undefined)">发布帖子</el-button>
        </div>
        <el-table :data="forumList" style="width: 80vw;height: 85vh;">
            <el-table-column prop="id" label="编号" width="100px" />
            <el-table-column prop="typeid" label="分类" />
            <el-table-column prop="userid" label="发布者" width="120px" />
            <el-table-column prop="title" label="标题" width="200px">
                <template #default="item">
                    <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                        {{ item.row.title }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="contennt" label="内容" width="300px">
                <template #default="item">
                    <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                        {{ item.row.content }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="发布时间" width="180px" />
            <el-table-column prop="zan" label="点赞量" />
            <el-table-column prop="view" label="浏览量" />
            <el-table-column prop="status" label="帖子状态" />
            <el-table-column fixed="right" label="操作" width="150px">
                <template #default="item">
                    <el-button link type="warning" size="small"
                        @click="toRouter('AdminForumInfo', item.row.id)">详情</el-button>
                    <el-button link type="primary" size="small"
                        @click="toRouter('AdminForumEdit', item.row.id)">编辑</el-button>
                    <el-button link type="danger" size="small" @click="deleteForum(item.row.id)">删除</el-button>
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

// 存储讨论列表
const forumList = ref([]);

// 请求讨论列表
const getForumList = () => {
    forumList.value = [{ id: '正在加载...' }];
    Axios.Post(undefined,
        [{ name: 'meta', value: 'forum_list_require' }],
        (result) => {
            forumList.value = [];
            // console.log(result.data);
            if (result.data.code == 200) {
                for (const item of result.data.data) forumList.value.push(item);
                // console.log(forumList.value);
            } else notify('info', result.data.code + '', result.data.info);
        },
        (err) => { notify('error', '失败', '获取讨论帖列表失败！' + err); }
    );
}

// 删除讨论
const deleteForum = (id) => {
    ElMessageBox.confirm('确定删除帖子吗？相关图片也会被删除！该操作将不可逆！请谨慎操作！', '警告',
        { type: 'warning', cancelButtonText: '取消', confirmButtonText: '确定删除', })
        .then(() =>
            Axios.Post(undefined,
                [{ name: 'meta', value: 'forum_delete_require' }, { name: 'id', value: id }],
                (result) => {
                    if (result.data.code == 200) {
                        notify('success', '删除成功', '成功删除讨论帖！');
                        setTimeout(() => getForumList(), 500);
                    } else notify('info', result.data.code + '', result.data.info);
                },
                (err) => { notify('error', '失败', '删除讨论失败！' + err); }
            )
        ).catch(() => { });
}

// 路由跳转
const toRouter = (name, id) => { router.push({ name: name, query: { forumid: id } }); }
// 加载
onMounted(() => getForumList());
</script>

<style scoped></style>