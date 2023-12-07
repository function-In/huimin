<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
    <div class="newsUpdate">
        <div class="user_header_back"
            style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
            <div>
                <el-button type="default" @click="RouterBack()" style="margin-right: 10px;">返回</el-button>修改资讯
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm">修改</el-button>
            </el-form-item>
        </div>
        <div class="news-add">
            <el-form :model="table" ref="newsForm" label-width="120px">
                <el-form-item label="封面">
                    <el-upload class="avatar-uploader" action="#" :show-file-list="false" :auto-upload="false"
                        :on-change='ChangeFengmian'>
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                    <div style="margin-left: 20px;display: flex;flex-direction: row;align-items: normal;">
                        原封面
                        <img :src="Axios.address + table.news_image" alt="" class="yuanfengmian"
                            style="width:178px;height: 178px;object-fit: cover;margin-left: 10px;">
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

                <div class="images">
                    <div class="text-center" style="margin: 10px 0;">【存在于服务器上的图片删除后需要重新上传】</div>
                    <el-form-item label="图片">
                        <el-upload class="avatar-uploader" action="#" list-type="picture-card" :auto-upload="false"
                            v-model:file-list="imagesList" :on-remove="FileListChange" :before-remove="beforeRemove"
                            :on-change='FileListChange' :on-preview="handlePictureCardPreview">
                            <el-icon>
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-dialog v-model="dialogVisible">
                        <img style="width: 100%;" :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>
                </div>
                <el-form-item label="资讯内容">
                    <el-input type="textarea" :rows="8" v-model="table.news_content" placeholder="请输入内容"></el-input>
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
import { useRoute } from 'vue-router';

// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }

// 表单数据
const table = ref({
    news_name: '',
    news_content: '',
    news_author: '',
    news_status: '0',
});
// 封面文件
const Header = ref('');
// 上传文件列表
const FileList = ref([]);



// 预览图片
const dialogImageUrl = ref('');
// 控制预览面板
const dialogVisible = ref(false);
// 预览方法
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
}
// 封面部分
const imageUrl = ref('');
const ChangeFengmian = (file) => {
    imageUrl.value = URL.createObjectURL(file.raw);
    Header.value = file.raw;
}
// 图片列表信息
const imagesList = ref([]);
// 文件添加删除改动
const FileListChange = (_, files) => {
    FileList.value = [];
    for (const file of files) if (file.raw != undefined) FileList.value.push(file.raw);
}



// 删除文件前
const beforeRemove = (file) => {
    if (!file.raw) {
        Axios.Post(undefined,
            [{ name: 'meta', value: 'news_image_delete_require' }, { name: 'id', value: file.id }],
            (result) => {
                if (result.data.code == 200) notify('success', '成功', '成功删除该图片！');
                else notify('info', result.data.code + '', result.data.info);
            },
            (err) => { notify('error', '失败', '图片删除失败！' + err); }
        );
    }
    return true;
}

// 获取资讯信息
Axios.Post(undefined,
    [{ name: 'meta', value: 'news_info_require2' }, { name: 'newsid', value: useRoute().query.newsid }],
    (result) => {
        if (result.data.code == 200) {
            table.value = result.data.data[0];
            if (result.data.data[0].images) {
                for (const item of result.data.data[0].images) {
                    imagesList.value.push({ id: item._id, url: Axios.address + item._img });
                }
            }
        } else notify('info', result.data.code + '', result.data.info);
    },
    (err) => { notify('error', '失败', '获取资讯信息失败！' + err); }
);



// 提交
const submitForm = () => {
    if (table.value.news_name == '') {
        notify('error', '错误', "资讯标题不能为空！");
    } else if (table.value.news_author == '') {
        notify('error', '错误', '资讯作者不能为空！');
    } else if (table.value.news_content == '') {
        notify('error', '错误', '资讯内容不能为空！');
    } else {
        let fd = [
            { name: 'meta', value: 'news_update_require' },
            { name: 'news_image', value: Header.value ? Header.value : undefined },
        ];
        for (const key in table.value) fd.push({ name: key, value: table.value[key] });
        // let 
        Axios.Post(FileList.value, fd,
            (result) => {
                if (result.data.code == 200) {
                    notify('success', '更新成功', "资讯信息更新成功！");
                    setTimeout(() => RouterBack(), 1000);
                } else notify('info', result.data.code + '', result.data.info);
            },
            (err) => { console.log(err); }
        );
    }
}

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