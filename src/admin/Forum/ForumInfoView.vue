<template>
    <div class="foruminfo">
        <div class="user_header_back">
            <el-button type="default" @click="RouterBack()" style="margin-right: 10px;">返回</el-button>资讯详情信息
        </div>
        <div style="padding: 10px;">
            <el-button type="warning" @click="NewsEdit(forum.id)">编辑资讯</el-button>
            <el-button type="danger" @click="deleteForum(forum.id)">删除资讯</el-button>
        </div>
        <div class="news-detail">
            <h2>{{ forum.title }}</h2>
            <div class="info">
                <span>发布者：{{ forum.userid }}</span>
                <span>发布时间：{{ forum.date }}</span>
                <span>点赞：{{ forum.zan }} </span>
                <span>浏览：{{ forum.view }}</span>
            </div>

            <div class="content">
                {{ (forum.content) }}

                <div class="images">
                    <img v-for="item in forum.images" :key="item" :src="Axios.address + item.img"
                        @click="handlePictureCardPreview(item.img)" />
                </div>
            </div>
        </div>

        <el-dialog v-model="dialogVisible">
            <img style="width: 100%;" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>
<script setup>
import Axios from '@/Axios';
import router from '@/router';
import { ElNotification, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
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



const forum = ref({
    title: '获取不到数据',
    typeid: '获取不到数据',
    userid: '获取不到数据',
    date: '获取不到数据',
    zan: 0,
    view: 0,
    content: '获取不到数据'
});

// 取得资讯信息
Axios.Post(undefined,
    [{ name: 'meta', value: 'forum_info_require' }, { name: 'forumid', value: useRoute().query.forumid }],
    (result) => {
        if (result.data.code == 200) {
            forum.value = result.data.data[0];
        } else notify('info', result.data.code + '', result.data.info);
    },
    (err) => { notify('error', '失败', '获取信息失败！' + err); }
);



// 删除
const deleteForum = (id) => {
    ElMessageBox.confirm('确定删除帖子吗？相关图片也会被删除！该操作将不可逆！请谨慎操作！', '警告',
        { type: 'warning', cancelButtonText: '取消', confirmButtonText: '确定删除', })
        .then(() => {
            Axios.Post(undefined,
                [{ name: 'meta', value: 'forum_delete_require' }, { name: 'id', value: id }],
                (result) => {
                    if (result.data.code == 200) {
                        notify('success', '删除成功', '成功删除！');
                        setTimeout(() => router.back(), 1000);
                    } else notify('info', result.data.code + '', result.data.info);
                },
                (err) => notify('error', '失败', '删除失败！' + err)
            );
        }).catch(() => { });
}

const NewsEdit = (id) => router.push({ name: 'AdminForumEdit', query: { forumid: id } });
// 返回
const RouterBack = () => router.back();
</script>

<style scoped>
.user_header_back {
    padding: 20px;
    background-color: rgba(128, 128, 128, 0.271);
}

.news-detail {
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
}

.info {
    margin-top: 10px;
    color: #666;
    font-size: 14px;
}

.info span {
    margin-right: 10px;
}

.content {
    margin-top: 20px;
    line-height: 1.8;
    max-width: 80%;
    margin-bottom: 100px;
}

.content .images img {
    width: 200px;
    height: 300px;
    margin-right: 10px;
    object-fit: cover;
    background-color: rgba(128, 128, 128, 0.177);
    margin-bottom: 10px;
}
</style>