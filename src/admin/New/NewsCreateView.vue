<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
    <div class="newsCreate">
        <div class="user_header_back">
            <el-button type="default" @click="RouterBack()" style="margin-right: 10px;">返回</el-button>发布资讯
        </div>
        <div class="news-add">

            <el-form :model="table" ref="newsForm" label-width="120px">
                <el-form-item label="上传图片">
                    <div>
                        <span>（ 第一张用作封面 ）</span>
                        <el-upload class="avatar-uploader" action="#" list-type="picture-card" :auto-upload="false"
                            :on-remove="FileListChange" :on-change='FileListChange' :on-preview="handlePictureCardPreview">
                            <el-icon>
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-dialog v-model="dialogVisible"><img w-full :src="dialogImageUrl" alt="Preview Image" /></el-dialog>

                <el-form-item label="资讯标题">
                    <el-input v-model="table.news_name" placeholder="请输入标题"></el-input>
                </el-form-item>

                <el-form-item label="作者">
                    <el-input v-model="table.news_author" placeholder="请输入作者"></el-input>
                </el-form-item>

                <el-form-item label="新闻状态">
                    <el-radio-group v-model="table.news_status">
                        <el-radio label="0">正常</el-radio>
                        <el-radio label="1">异常</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="资讯内容">
                    <el-input type="textarea" :rows="8" v-model="table.news_content" placeholder="请输入内容"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <!-- <el-button @click="resetForm">重置</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { Plus } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { ElNotification } from 'element-plus';
import Axios from '@/Axios';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }

// 表单数据
const table = ref({
    news_name: '',
    news_content: '',
    news_author: '',
    news_status: '0',
});
// 预览图片
const dialogImageUrl = ref('');
// 控制预览面板
const dialogVisible = ref(false);
// 预览方法
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
}

// 上传文件列表
const FileList = ref([]);

// 文件添加删除改动
const FileListChange = (_, files) => {
    FileList.value = [];
    for (const file of files) if (file.raw != undefined) FileList.value.push(file.raw);
}
// 提交
const submitForm = () => {
    if (table.value.news_name == '') {
        notify('error', '错误', "资讯标题不能为空！");
    } else if (table.value.news_author == '') {
        notify('error', '错误', '资讯作者不能为空！');
    } else if (table.value.news_content == '') {
        notify('error', '错误', '资讯内容不能为空！');
    } else {
        let fd = [{ name: 'meta', value: 'news_create_require' },];
        for (const key in table.value) fd.push({ name: key, value: table.value[key] });
        Axios.Post(FileList.value, fd,
            (result) => {
                if (result.data.code == 200) {
                    notify('success', '发布成功', "成功发布一个资讯");
                    setTimeout(() => RouterBack(), 1000);
                } else notify('info', result.data.code + '', result.data.info);
            },
            (err) => { console.log(err); }
        );
    }
}

// 重置信息
// const resetForm = () => {

// }
// 返回
const RouterBack = () => router.back();
</script>
<style scoped>
.news-add {
    margin-top: 10px;
    max-width: 70%;
}

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