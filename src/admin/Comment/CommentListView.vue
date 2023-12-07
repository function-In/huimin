<template>
    <div class="forumtype">
        <div style="padding: 10px;">
            <el-button type="primary" size="small" @click="getCommentType">刷新列表</el-button>
        </div>
        <el-table :data="CommentList" style="width: 80vw;height: 85vh;">
            <el-table-column prop="id" label="编号" width="150px" />
            <el-table-column prop="type" label="所属分类" width="100px">
                <template #default="item">
                    {{ item.row.type == 1 ? '资讯' : (item.row.type == 2 ? '讨论' : item.row.type == 3 ? '商品' : '未知分类') }}
                </template>
            </el-table-column>
            <el-table-column prop="typeid" label="指定编号" width="250px">
                <template #default="item">
                    <div v-if="item.row.typeid">
                        指向编号【 {{ item.row.typeid }} 】的
                        {{ item.row.type == 1 ? '资讯' : (item.row.type == 2 ? '讨论' : item.row.type == 3 ? '商品' : '未知分类') }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="userid" label="用户" width="200px" />
            <el-table-column prop="date" label="发布时间" width="200px" />
            <el-table-column prop="zan" label="点赞" width="80px" />
            <el-table-column prop="cai" label="被踩" width="80px" />
            <el-table-column prop="content" label="评论内容" width="800px" />
            <el-table-column fixed="right" label="操作" width="200px">
                <template #default="item">
                    <el-button v-if="item.row.type == 1" link type="primary" size="small"
                        @click="toRouter('AdminNewsInfo', { newsid: item.row.typeid })">
                        资讯
                    </el-button>
                    <el-button v-if="item.row.type == 2" link type="primary" size="small"
                        @click="toRouter('AdminForumInfo', { forumid: item.row.typeid })">
                        帖子
                    </el-button>
                    <el-button v-if="item.row.type == 3" link type="primary" size="small"
                        @click="toRouter('AdminShopInfo', { shopid: item.row.typeid })">
                        商品
                    </el-button>
                    <el-button link type="danger" size="small" @click="deleteForumType(item.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ElNotification, ElMessageBox } from "element-plus";
import Axios from '@/Axios';
import router from '@/router';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }

const CommentList = ref([]);

// 获取所有分类
const getCommentType = () => {
    CommentList.value = [{ id: "正在加载..." }];
    Axios.Post(undefined,
        [{ name: 'meta', value: 'comment_list_require' }],
        (result) => {
            CommentList.value = [];
            if (result.data.code == 200) {
                for (const item of result.data.data) CommentList.value.push(item);
            } else notify('info', result.data.code + '', result.data.info)
        },
        (err) => { notify('error', '失败', '获取评论列表失败！' + err); }
    );
}

// 删除
const deleteForumType = (item) => {
    ElMessageBox.confirm('确定删除评论吗？', '警告',
        { type: 'warning', cancelButtonText: '取消', confirmButtonText: '确定删除', })
        .then(() => {
            Axios.Post(undefined,
                [{ name: 'meta', value: 'comment_delete_require' }, { name: 'id', value: item.id }],
                (result) => {
                    if (result.data.code == 200) {
                        notify("success", "成功", "删除评论成功");
                        setTimeout(() => getCommentType(), 500);
                    } else notify('info', result.data.code + '', result.data.info)
                },
                (err) => { notify('error', '失败', '删除评论失败！' + err); }
            );
        }).catch(() => { });
}


onMounted(() => getCommentType());
// 路由跳转
const toRouter = (name, obj) => { router.push({ name: name, query: obj }); }
</script>

<style scoped></style>