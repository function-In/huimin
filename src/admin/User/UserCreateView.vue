<template>
    <div class="useredit">
        <div class="user_header_back">
            <el-button type="default" @click="RouterBack()">返回</el-button>
            添加用户
        </div>
        <el-container style="max-width: 900px;">
            <el-main>
                <el-form :model="table" ref="UserEditDom" label-width="100px">

                    <el-form-item label="头像">
                        <el-upload class="avatar-uploader" action="#" :show-file-list="false" :auto-upload="false"
                            :on-change='ChangeFengmian'>
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="名称">
                        <el-input v-model="table.user_name"></el-input>
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-radio-group v-model="table.user_sex">
                            <el-radio label="0">不透露</el-radio>
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input v-model="table.user_phone" type="number"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱">
                        <el-input v-model="table.user_email" type="email"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="table.user_age" type="number"></el-input>
                    </el-form-item>

                    <el-form-item label="余额">
                        <el-input v-model="table.user_money" type="number"></el-input>
                    </el-form-item>

                    <el-form-item label="权限">
                        <el-select v-model="table.user_permission" placeholder="请选择">
                            <el-option label="普通用户" value="0"></el-option>
                            <el-option label="管理员" value="1"></el-option>
                            <el-option label="其他成员" value="2"></el-option>

                        </el-select>
                    </el-form-item>

                    <el-form-item label="签名">
                        <el-input v-model="table.user_sign" :rows="4" type="textarea" placeholder="Please input" />
                    </el-form-item>

                    <el-form-item label="账户状态">
                        <el-select v-model="table.user_status" placeholder="请选择">
                            <el-option label="正常" value="0"></el-option>
                            <el-option label="异常" value="1"></el-option>
                            <el-option label="其他" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="异常信息" v-if="table.user_status != 0">
                        <el-input v-model="table.status_info" :rows="4" type="textarea" placeholder="Please input" />
                    </el-form-item>

                    <el-form-item label="修改密码">
                        <el-input v-model="pwd1"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码">
                        <el-input v-model="pwd2"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm">保存</el-button>
                        <el-button @click="RouterBack">放弃</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>

    </div>
</template>
<script setup>
import Axios from '@/Axios';
import { Plus } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import router from "@/router";

// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }

// 头像部分
const imageUrl = ref('');
const Header = ref('');
// 信息部分
const table = ref({
    // 名称
    user_name: '',
    // 性别
    user_sex: '0',
    // 年龄
    user_age: '',
    // 手机
    user_phone: '',
    // 邮箱
    user_email: '',
    // 权限
    user_permission: '0',
    // 签名
    user_sign: '',
    // 状态
    user_status: '0',
    // 状态信息
    status_info: '',
    // 余额
    user_money: '0'
});
const pwd1 = ref('');
const pwd2 = ref('');
// 表单 DOM
const UserEditDom = ref(null);

// 更改头像
const ChangeFengmian = (file) => {
    imageUrl.value = URL.createObjectURL(file.raw);
    Header.value = file.raw;
}
// 提交信息
const submitForm = () => {
    UserEditDom.value.validate(valid => {
        if (valid) {
            let fd = [{ name: 'meta', value: 'user_create_require' },];
            for (const key in table.value) fd.push({ name: key, value: table.value[key] });
            // // 密码处理
            if (table.value.user_name == '') {
                notify('error', '错误', '请输入昵称');
            } else if (table.value.user_phone == '') {
                notify('error', '错误', '手机号不符合规范');
            } else if (table.value.user_email == '') {
                notify('error', '错误', '邮箱不符合规范');
            } else if (table.value.user_age == '') {
                notify('error', '错误', '请输入年龄');
            } else if (table.value.user_money == '') {
                notify('error', '错误', '余额不能设置为空，至少0');
            } else if (Header.value == '' || Header.value == undefined) {
                notify('error', '错误', '请选择一个头像');
            } else if (pwd1.value == '' || pwd1.value.length < 8) {
                notify('error', '错误', '请检查您的密码！密码不能为空，字符至少需要 8 位')
            } else if (pwd2.value == '' || pwd2.value != pwd1.value) {
                notify('error', '错误', '请确认您的密码！确认密码输入不正确！');
            } else {
                fd.push({ name: 'pwd', value: pwd1.value });
                Axios.Post([Header.value], fd,
                    (result) => {
                        if (result.data.code == 200) {
                            notify('success', '成功', '添加用户完成！');
                            setTimeout(() => { router.back(); }, 1000);
                        } else notify('info', result.data.code + '', result.data.info);
                    },
                    (err) => { notify('error', '失败', '添加用户失败！' + err); }
                );
            }
        } else {
            this.$message.error('表单验证失败');
            return false;
        }
    });
}

// 返回
const RouterBack = () => router.back();
</script>

<style scoped>
.user_header_back {
    padding: 20px;
    background-color: rgba(128, 128, 128, 0.271);
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: cover;
}
</style>

<style>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: cover;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>