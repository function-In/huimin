<template>
    <div class="userlist mx-auto">
        <div style="padding: 10px;">
            <el-button type="primary" size="small" @click="getUserList()">刷新列表</el-button>
            <el-button type="primary" size="small" @click="toRouter('AdminUserCreate', undefined)">添加用户</el-button>
        </div>
        <el-table :data="userList" style="width: 80vw;height:85vh">
            <el-table-column prop="id" label="编号" width="100px" />
            <el-table-column label="头像" width="80px">
                <template #default="item">
                    <img :src="Axios.address + item.row.user_header"
                        style="width: 40px;height: 40px;object-fit: cover;border-radius: 10px;">
                </template>
            </el-table-column>
            <el-table-column prop="user_name" label="姓名" width="120px" />
            <el-table-column prop="user_sex" label="性别" width="100px" />
            <el-table-column prop="user_age" label="年龄" width="100px" />
            <el-table-column prop="user_money" label="账户余额" width="120px" />
            <el-table-column prop="user_phone" label="手机" width="150px" />
            <el-table-column prop="user_email" label="邮箱" width="180px" />
            <el-table-column prop="user_permission" label="权限" />
            <el-table-column prop="user_time" label="注册时间" width="200px" />
            <el-table-column prop="user_status" label="账户状态" />
            <el-table-column prop="user_sign" label="个人签名" width="250px" />
            <el-table-column fixed="right" label="操作" width="150px">
                <template #default="item">
                    <el-button link type="warning" size="small" @click="toRouter('AdminUserInfo', item.row.id)">
                        详情
                    </el-button>
                    <el-button link type="primary" size="small" @click="toRouter('AdminUserEdit', item.row.id)">
                        编辑
                    </el-button>
                    <el-button link type="danger" size="small" @click="deleteUser(item.row.id)">删除</el-button>
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

// 存储用户列表
const userList = ref([]);


// 请求用户列表
const getUserList = () => {
    userList.value = [{ id: '正在加载...' }];
    Axios.Post(undefined,
        [{ name: 'meta', value: 'user_list_require' }],
        (result) => {
            userList.value = [];
            if (result.data.code == 200) {
                for (const item of result.data.data) userList.value.push(item);
            } else notify('info', result.data.code + '', result.data.info);
        },
        (err) => { notify('error', '失败', '获取用户列表失败！' + err); }
    );
}

// 删除用户
const deleteUser = (id) => {
    ElMessageBox.confirm('确定删除用户吗？该操作将不可逆！请谨慎操作！', '警告',
        { type: 'warning', cancelButtonText: '取消', confirmButtonText: '确定删除', })
        .then(() => {
            Axios.Post(undefined,
                [{ name: 'meta', value: 'user_delete_require' }, { name: 'userid', value: id }],
                (result) => {
                    if (result.data.code == 200) {
                        notify('success', '删除成功', '用户删除成功！');
                        setTimeout(() => getUserList(), 500);
                    } else notify('info', result.data.code + '', result.data.info);
                },
                (err) => { notify('error', '失败', '删除用户失败！' + err); }
            );
        }).catch(() => { });
}

// 路由跳转
const toRouter = (name, id) => { router.push({ name: name, query: { userid: id } }); }

// 加载
onMounted(() => getUserList());

</script>

<style scoped>
/* .userlist */
</style>