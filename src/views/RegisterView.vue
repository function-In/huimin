<!-- 登录页 -->
<template>
    <div class="register" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="background-container">
            <img class="background-image" src="@/assets/login_background.jpg" alt="background">
        </div>
        <div class="container pt-5">
            <div class="row justify-content-end" style="display: flex;flex-direction: row;align-items: center;">

                <div class="left-content">
                    <h1>欢迎使用</h1>
                    <br>
                    <p>您正在进行注册惠民社区网账号，惠民社区网感谢您的注册和使用，如在您使用的过程中遇到问题，您可以及时反馈给我们</p>
                </div>

                <div class=" smaller-panel ">
                    <div class="card shadow-lg border-0 rounded-lg mt-2 mb-5 custom-card">
                        <div class="card-header">
                            <h3 class="text-center font-weight-light my-4">注册</h3>
                        </div>
                        <div class="card-body">
                            <el-form :model="form" label-width="120px" ref="UserEditDom">

                                <el-form-item label="头像">
                                    <el-upload class="avatar-uploader" action="#" :show-file-list="false"
                                        :auto-upload="false" :on-change='ChangeFengmian'>
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                        <el-icon v-else class="avatar-uploader-icon">
                                            <Plus />
                                        </el-icon>
                                    </el-upload>
                                </el-form-item>

                                <el-form-item label="用户名">
                                    <el-input v-model="form.user_name" style="width: 50%;" />
                                </el-form-item>


                                <el-form-item label="用户手机">
                                    <el-input v-model="form.user_phone" style="width: 50%;" />
                                </el-form-item>

                                <el-form-item label="用户邮箱">
                                    <el-input v-model="form.user_email" style="width: 50%;" />
                                </el-form-item>

                                <el-form-item label="性别">
                                    <el-radio-group v-model="form.user_sex">
                                        <el-radio label="0">不便透露</el-radio>
                                        <el-radio label="1">男</el-radio>
                                        <el-radio label="2">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="用户年龄">
                                    <el-input v-model="form.user_age" style="width: 50%;" />
                                </el-form-item>

                                <el-form-item label="用户签名">
                                    <el-input v-model="form.user_sign" type="textarea" />
                                </el-form-item>

                                <el-form-item label="用户密码">
                                    <el-input v-model="form.user_pwd" style="width: 50%;" />
                                </el-form-item>

                                <el-form-item label="确认密码">
                                    <el-input v-model="form.user_pwd2" style="width: 50%;" />
                                </el-form-item>

                                <el-form-item label="用户协议">
                                    <el-checkbox @click="form.service = !form.service" label="同意《惠民社区网用户服务协议》" />
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">立即注册</el-button>
                                </el-form-item>
                            </el-form>

                        </div>
                        <div class="card-footer">
                            <div class="small">
                                <router-link :to="{ name: 'home' }">返回首页</router-link>
                                <router-link :to="{ name: 'login' }">已有账号？去登录</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, h } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { ElNotification, ElMessageBox } from 'element-plus';
import Axios from '@/Axios';
import router from '@/router';

// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }
const fullscreenLoading = ref(false);

const form = ref({
    user_name: '',
    user_sex: '0',
    user_age: '',

    user_phone: '',
    user_email: "",

    user_pwd: "",
    user_pwd2: '',

    user_sign: "",

    service: false,
})

// 头像部分
const imageUrl = ref('');
const Header = ref('');
const ChangeFengmian = (file) => {
    imageUrl.value = URL.createObjectURL(file.raw);
    Header.value = file.raw;
}
const UserEditDom = ref(null);
const onSubmit = () => {
    fullscreenLoading.value = true;
    UserEditDom.value.validate(valid => {
        if (valid) {
            let fd = [{ name: 'meta', value: 'user_register_require' },];
            for (const key in form.value) fd.push({ name: key, value: form.value[key] });
            // // 密码处理
            if (form.value.user_name == '') {
                notify('error', '错误', '请输入昵称');
                setTimeout(() => fullscreenLoading.value = false, 2000);
            } else if (form.value.user_phone == '') {
                notify('error', '错误', '手机号不符合规范');
                setTimeout(() => fullscreenLoading.value = false, 2000);
            } else if (form.value.user_email == '') {
                notify('error', '错误', '邮箱不符合规范');
                setTimeout(() => fullscreenLoading.value = false, 2000);
            } else if (form.value.user_age == '') {
                notify('error', '错误', '请输入年龄');
                setTimeout(() => fullscreenLoading.value = false, 2000);
            } else if (Header.value == '' || Header.value == undefined) {
                notify('error', '错误', '请选择一个头像');
                setTimeout(() => fullscreenLoading.value = false, 2000);
            } else if (form.value.user_pwd == '' || form.value.user_pwd.length < 8) {
                notify('error', '错误', '请检查您的密码！密码不能为空，字符至少需要 8 位')
                setTimeout(() => fullscreenLoading.value = false, 2000);
            } else if (form.value.user_pwd2 == '' || form.value.user_pwd2 != form.value.user_pwd) {
                notify('error', '错误', '请确认您的密码！确认密码输入不正确！');
                setTimeout(() => fullscreenLoading.value = false, 2000);
            } else if (form.value.service != true) {
                notify('error', '错误', '您需要同意用户协议！');
                setTimeout(() => fullscreenLoading.value = false, 2000);
            } else {
                fd.push({ name: '_pwd', value: form.value.user_pwd });
                Axios.Post([Header.value], fd,
                    (result) => {
                        setTimeout(() => {
                            if (result.data.code == 200) {
                                notify('success', '成功', '注册完成！');
                                setTimeout(() => {
                                    ElMessageBox({
                                        title: 'Message',
                                        message: h('p', null, [
                                            h('span', null, '您的登录ID：' + result.data.data[0].id),
                                            h('br', null, ''),
                                            h('span', null, '请保管好您的登录ID!'),
                                            h('br', null, ''),
                                            h('span', null, '点击确认按钮以前往登录'),
                                        ]),
                                        callback: () => { router.back(); },
                                    })



                                }, 1000);
                                fullscreenLoading.value = false;
                            } else notify('info', result.data.code + '', result.data.info);
                        }, 2000);
                    },
                    (err) => {
                        notify('error', '失败', '注册失败！' + err);
                        setTimeout(() => fullscreenLoading.value = false, 2000);
                    }
                );
            }
        } else {
            this.$message.error('表单验证失败');
            setTimeout(() => fullscreenLoading.value = false, 2000);
            return false;
        }
    });
}

</script>


<style scoped>
a {
    text-decoration: none;
}

.background-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    padding: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.786);
}

.background-image {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    object-fit: cover;
    animation: animateBackground 4s infinite linear;
}


@keyframes animateBackground {
    0% {
        filter: blur(0px);
    }

    50% {
        filter: blur(5px);
    }

    100% {
        filter: blur(0px);
    }
}



.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: cover;
}

.register {
    width: 100%;
    height: 100vh;
    background-size: cover;
}

.left-content {
    text-align: center;
    margin-bottom: 20px;
}

.vertical-center {
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.smaller-panel {
    /* max-width: 800px; */
    margin: auto;
}

.custom-card {
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
}

.custom-input {
    background-color: transparent;
    font-size: small;
}

.custom-div {
    font-size: small;
    display: flex;
    align-items: center;
    /* margin-left: 5px; */
}

.card-footer .small {
    display: flex;
    justify-content: space-between;
}

@media (min-width: 1200px) {
    .smaller-panel {
        max-width: 900px;
        /* margin-right: 10%; */
        /* 调整宽度为 400 像素或你需要的尺寸 */
        /* margin: auto; */
    }
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
    border: 1px dashed grey;
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
    /* color: #8c939d; */
    color: grey;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>