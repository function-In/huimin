<template>
    <div class="commentlist">
        <HeaderView title="comment" />
        <div class="headerBox">
            <div class="minHeader">
                <el-button type="default" style="margin-left: 10px;margin-right: 10px;" @click="router.back()">
                    返回
                </el-button>
                <div class="text">该{{ CommentType }}的相关评论</div>
            </div>
        </div>
        <div class="container comment">
            <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
                <h5>相关评论</h5>
            </div>
            <ul class="comment_list">
                <el-skeleton :loading="ISLOADING" animated>
                    <template #template>
                        <li v-for="item in 5" :key="item" class="comment_item">
                            <div class="action" @click="toUser">
                                <el-skeleton-item variant="image" class="headerImg" />
                                <div style="display: flex;flex-direction: column;">
                                    <span class="name">
                                        <el-skeleton-item style="width: 150px;" />
                                    </span>
                                    <span style="font-size: small;margin-top: 10px;">
                                        <el-skeleton-item style="width: 200px;" />
                                    </span>
                                </div>
                            </div>
                            <span class="content">
                                <el-skeleton-item style="width: 100%;" />
                                <el-skeleton-item style="width: 100%;" />
                            </span>
                            <span
                                style="font-size: smaller;color: grey;display: flex;flex-direction: row;justify-content: space-between;">
                                <el-skeleton-item style="width: 20%;" />
                                <el-skeleton-item style="width: 20%;" />
                            </span>
                            <hr>
                        </li>
                    </template>

                    <template #default>
                        <li v-for="item in comment_list" :key="item" class="comment_item">

                            <div class="action" @click="toUser">
                                <div style="display: flex;justify-content: space-between;width: 100%;">
                                    <el-avatar class="headerImg" shape="square" :src="Axios.address + item.userHeader" />
                                    <div style="display: flex;flex-direction: column;flex: 1;width: 100%;">
                                        <span class="name">{{ item.userName }}</span>
                                        <span style="font-size: small;margin-top: 10px;">{{ item.userSign }}</span>
                                    </div>
                                    <!-- <div style="color: grey;">删除</div> -->
                                </div>
                            </div>

                            <span class="content">{{ item.content }}</span>

                            <div style="font-size: small;color: grey;">
                                <span>{{ item.date }}</span>
                                <span v-if="loginInfo.id == item.userid" style="margin: 0 15px;cursor: pointer;"
                                    @click="removeComment(item)">删除</span>
                            </div>
                            <hr>
                        </li>
                        <li v-if="comment_list.length > 0" style="margin-bottom: 30px;text-align: center;">
                            <el-button type="default" @click="getCommentList(2)">查看更多</el-button>
                        </li>
                    </template>

                </el-skeleton>
                <li v-if="comment_list.length == 0">
                    <el-empty :description="'该' + CommentType + '暂时没有评论'" />
                </li>
            </ul>
            <textarea class="commentEdit" v-model="commentContent" cols="30" rows="10" placeholder="善语结人心，恶语毁一生"></textarea>
            <el-button style="float: right;margin-bottom: 10px;" type="primary"
                @click="onVerfilyListener('addcomment')">立即发表</el-button>
        </div>
        <FooterView />
    </div>
</template>



<script setup>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }
import Axios from '@/Axios';
import router from '@/router';
// 登录信息
const loginInfo = ref({});

// 骨架屏控制
const ISLOADING = ref(true);

// 取得传值信息
const comment_info = ref({});
const CommentType = ref('');

// 评论列表
const comment_list = ref([]);
const LoadCount = ref([0, 100]);

// 请求评论列表
const getCommentList = (state) => {
    if (state == 1) LoadCount.value = [0, 100];
    Axios.Post(undefined,
        [
            { name: 'meta', value: 'comment_list_web' },
            { name: 'type', value: comment_info.value._type },
            { name: 'typeid', value: comment_info.value._typeid },
            { name: 'limit', value: JSON.stringify(LoadCount.value) }
        ],
        (result) => {
            ISLOADING.value = false;
            if (result.data.code == 200) {
                comment_list.value = [];
                comment_list.value = result.data.data;
                // for (const item of result.data.data) { comment_list.value.push(item); }
                LoadCount.value = [LoadCount.value[0] + 10, LoadCount.value[1] + 10]
            } else {
                notify('info', '提示', '没有更多了！');
            }
        }
    );
}


// 登录验证
const onVerfilyListener = (state) => {
    Axios.Post(undefined,
        [{ name: 'meta', value: 'login_state_require' }],
        (result) => {
            if (result.data.code == 200) {
                loginInfo.value = result.data.data;
                if (state == 'addcomment') insertComment(result.data.data);
                if (state == 'removecomment') removeComment();

            } else {
                if (state != undefined) {
                    router.push({ name: 'login', query: { back: true } });
                    notify('info', '提示', '你需要先登录！');
                }
            }
        }
    );
}



// 删除评论
const removeComment = (item) => {
    console.log(item);
    Axios.Post(undefined,
        [{ name: 'meta', value: 'comment_remove_web' }, { name: 'commentid', value: item.id },],
        (result) => {
            if (result.data.code == 200) {
                notify('success', '成功', '评论删除成功！');
                getCommentList(1);
            } else {
                notify('error', result.data.code, result.data.info);
            }
        }
    );
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
                { name: 'type', value: comment_info.value._type },
                { name: 'typeid', value: comment_info.value._typeid },
                { name: 'userid', value: resultInfo.id },
                { name: 'content', value: commentContent.value },
            ],
            (result) => {
                console.log(result.data);
                if (result.data.code == 200) {
                    commentContent.value = '';
                    notify('success', '成功', '评论发布成功!');
                    getCommentList(1);
                } else notify('error', result.data.code, result.data.info);
            }
        );
    }
}


// 挂载时操作
onMounted(() => {
    comment_info.value = JSON.parse(decodeURIComponent(useRoute().query.info));
    CommentType.value = (comment_info.value.type == 1 ? '资讯' : comment_info.value.type == 2 ? '帖子' : '商品')
    getCommentList(1);
    onVerfilyListener(undefined);
})
</script>


<style scoped>
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

/* 评论区 */


.comment {
    max-width: 1200px;
    height: 100%;
    min-height: 70vh;
    margin-top: 100px;
}

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