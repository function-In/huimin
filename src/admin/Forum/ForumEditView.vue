<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
    <div class="forumEdit">
        <div class="user_header_back"
            style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
            <div>
                <el-button type="default" @click="RouterBack()" style="margin-right: 10px;">返回</el-button>修改帖子
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>
        </div>
        <div class="news-add">
            <el-form :model="table" ref="newsForm" label-width="120px">
                <el-form-item label="帖子标题">
                    <el-input v-model="table.title" placeholder="请输入标题"></el-input>
                </el-form-item>


                <el-form-item label="帖子分类">
                    <el-select v-model="table.typeid" placeholder="请选择">
                        <el-option v-for="item in forumType" :key="item" :label="item.title" :value="item.id" />
                    </el-select>
                </el-form-item>

                <el-form-item label="帖子状态">
                    <el-radio-group v-model="table.status">
                        <el-radio label="0">正常</el-radio>
                        <el-radio label="1">异常</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="发布时间">
                    <el-input v-model="table.date" placeholder="请输入" disabled></el-input>
                </el-form-item>
                <div class="images">
                    <el-form-item label="图片">
                        <el-upload class="avatar-uploader" action="#" list-type="picture-card" :auto-upload="false"
                            :on-remove="FileListChange" :before-remove="beforeRemove" :on-change='FileListChange'
                            v-model:file-list="imagesList" :on-preview="handlePictureCardPreview">
                            <el-icon>
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-dialog v-model="dialogVisible">
                        <img style="width: 100%;" :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>
                </div>

                <el-form-item label="讨论内容">
                    <el-input type="textarea" :rows="8" v-model="table.content" placeholder="请输入内容"></el-input>
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
    title: '',
    typeid: 0,
    status: '0',
    content: '',
});
// 分类列表
const forumType = ref([]);
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
            [{ name: 'meta', value: 'forum_image_delete_require' }, { name: 'id', value: file.id }],
            (result) => {
                if (result.data.code == 200) notify('success', '成功', '成功删除该图片！');
                else notify('info', result.data.code + '', result.data.info);
            },
            (err) => { notify('error', '失败', '图片删除失败！' + err); }
        );
    }
    return true;
}




Axios.Post(undefined,
    [{ name: 'meta', value: 'forum_type_list_require' }],
    (result) => {
        if (result.data.code == 200) {
            for (const item of result.data.data) forumType.value.push(item);
        } else notify('info', result.data.code + '', result.data.info);
    },
    (err) => { notify('error', '失败', '获取分类失败！' + err); }
);



// 获取讨论信息
Axios.Post(undefined,
    [{ name: 'meta', value: 'forum_info_require2' }, { name: 'forumid', value: useRoute().query.forumid }],
    (result) => {
        if (result.data.code == 200) {
            table.value = result.data.data[0];
            if (result.data.data[0].images) {
                for (const item of result.data.data[0].images) {
                    imagesList.value.push({ id: item.id, url: Axios.address + item.img });
                }
            }
        } else notify('info', result.data.code + '', result.data.info);
    },
    (err) => { notify('error', '失败', '获取信息失败！' + err); }
);




// 提交
const submitForm = () => {
    if (table.value.title == '') {
        notify('error', '错误', "标题不能为空！");
    } else if (table.value.content == '') {
        notify('error', '错误', '内容不能为空！');
    } else {
        let fd = [{ name: 'meta', value: 'forum_update_require' },];
        for (const key in table.value) fd.push({ name: key, value: table.value[key] });
        Axios.Post(FileList.value, fd,
            (result) => {
                console.log(result.data);
                if (result.data.code == 200) {
                    notify('success', '更新成功', "帖子更新成功！");
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