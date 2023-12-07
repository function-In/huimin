<template>
    <div class="user-info">
        <el-card class="user-card" shadow="hover">

            <div class="user_header_back">
                <el-button type="default" @click="RouterBack()">返回</el-button>
                用户资料信息查询
            </div>

            <el-divider></el-divider>
            <div class="user-header">
                <el-avatar :src="Axios.address + userInfo.user_header" size="large" style="margin-right: 10px;"
                    @click="handlePictureCardPreview(userInfo.user_header)"></el-avatar>
                <h2>{{ userInfo.user_name }}</h2>
            </div>
            <el-divider></el-divider>

            <el-row class="info-row">
                <el-col :span="12">
                    <div class="info-item">
                        <label>用户编号</label>
                        <span>{{ userInfo.id }}</span>
                    </div>
                    <div class="info-item">
                        <label>性别</label>
                        <span>{{ userInfo.user_sex }}</span>
                    </div>
                    <div class="info-item">
                        <label>年龄</label>
                        <span>{{ userInfo.user_age }}</span>
                    </div>
                    <div class="info-item">
                        <label>余额</label>
                        <span class="text-success">{{ userInfo.user_money }}</span>
                    </div>
                </el-col>

                <el-col :span="12">
                    <div class="info-item">
                        <label>手机</label>
                        <span>{{ userInfo.user_phone }}</span>
                    </div>
                    <div class="info-item">
                        <label>邮箱</label>
                        <span>{{ userInfo.user_email }}</span>
                    </div>
                    <div class="info-item">
                        <label>权限</label>
                        <span>{{ userInfo.user_permission }}</span>
                    </div>
                    <div class="info-item">
                        <label>注册时间</label>
                        <span>{{ userInfo.user_time }}</span>
                    </div>
                </el-col>

                <el-col>
                    <div class="info-item">
                        <label>账户状态</label>
                        <span :class="{
                            'text-success': userInfo.user_status === '正常',
                            'text-danger': userInfo.user_status === '异常'
                        }">
                            {{ userInfo.user_status }}
                        </span>
                    </div>
                    <div class="info-item">
                        <label>个人签名</label>
                        <span>{{ userInfo.user_sign }}</span>
                    </div>
                </el-col>
                <div>
                    <el-button type="warning" @click="UserEdit(userInfo.id)">编辑用户</el-button>
                    <el-button type="danger" @click="UserDelete(userInfo.id)">删除用户</el-button>
                </div>
            </el-row>
        </el-card>

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
import { useRoute } from "vue-router";
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

const userInfo = ref({
    id: '获取不到数据',
    user_header: '',
    user_name: '获取不到数据',
    user_sex: '获取不到数据',
    user_age: '获取不到数据',
    user_money: '获取不到数据',
    user_phone: '获取不到数据',
    user_email: '获取不到数据',
    user_permission: '获取不到数据',
    user_time: '获取不到数据',
    user_status: '获取不到数据',
    user_sign: '获取不到数据'
});


// 返回
const RouterBack = () => router.back();
// 跳转
const UserEdit = (uid) => router.push({ name: 'AdminUserEdit', query: { userid: uid } });
// 删除用户
const UserDelete = (uid) => {
    ElMessageBox.confirm('确定删除用户吗？该操作将不可逆！请谨慎操作！', '警告',
        { type: 'warning', cancelButtonText: '取消', confirmButtonText: '确定删除', })
        .then(() => {
            Axios.Post(undefined,
                [{ name: 'meta', value: 'user_delete_require' }, { name: 'userid', value: uid }],
                (result) => {
                    if (result.data.code == 200) {
                        notify('success', '删除成功', '用户删除成功！');
                        setTimeout(() => router.back(), 500);
                    } else notify('info', result.data.code + '', result.data.info);
                },
                (err) => { notify('error', '失败', '删除用户失败！' + err); }
            );
        }).catch(() => { });
}
// 取得用户信息
Axios.Post(undefined,
    [{ name: 'meta', value: 'user_info_require' }, { name: 'userid', value: useRoute().query.userid }],
    (result) => {
        if (result.data.code == 200) userInfo.value = result.data.data[0];
        else notify('info', result.data.code + '', result.data.info);
    },
    (err) => { notify('error', '失败', '获取用户信息失败！' + err); }
);


</script>

<style scoped>
.user-info {
    width: 100%;
}

.user-card {
    margin: 0 auto;
    background-color: #f9f9f9;
    /* 设置背景颜色 */
    border: none;
    /* 去除边框 */
}

.user-header {
    display: flex;
    align-items: center;

}

.user-header h2 {
    margin-left: 10px;
    font-size: 1.5rem;
}

.info-row {
    margin-top: 20px;
}

.info-item {
    margin-bottom: 30px;
}

.info-item label {
    font-weight: bold;
    margin-right: 8px;
}

.text-success {
    color: #28a745;
    /* 成功文本颜色 */
}

.text-danger {
    color: #dc3545;
    /* 危险文本颜色 */
}
</style>