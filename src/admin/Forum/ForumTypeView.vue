<template>
    <div class="forumtype">
        <div style="padding: 10px;">
            <el-button type="primary" size="small" @click="getForumType">刷新列表</el-button>
            <el-button type="primary" size="small" @click="addForumType">添加分类</el-button>
        </div>
        <el-table :data="forumType" style="width: 80vw;height: 85vh;">
            <el-table-column prop="id" label="编号" width="300px" />
            <el-table-column prop="title" label="分类名称" />
            <el-table-column prop="count" label="文章数量" />
            <el-table-column fixed="right" label="操作" width="200px">
                <template #default="item">
                    <el-button link type="primary" size="small" @click="updateForumType(item.row)">编辑</el-button>
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
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }

const forumType = ref([]);

// 获取所有分类
const getForumType = () => {
    forumType.value = [{ id: "正在加载..." }];
    Axios.Post(undefined,
        [{ name: 'meta', value: 'forum_type_list_require' }],
        (result) => {
            forumType.value = [];
            if (result.data.code == 200) {
                for (const item of result.data.data) forumType.value.push(item);
            } else notify('info', result.data.code + '', result.data.info)
        },
        (err) => { notify('error', '失败', '获取商品分类失败！' + err); }
    );
}

// 删除分类 
const deleteForumType = (item) => {
    ElMessageBox.confirm('确定删除分类吗？该操作将不可逆！请谨慎操作！', '警告',
        { type: 'warning', cancelButtonText: '取消', confirmButtonText: '确定删除', })
        .then(() => {
            Axios.Post(undefined,
                [{ name: 'meta', value: 'forum_type_delete_require' }, { name: 'id', value: item.id }],
                (result) => {
                    if (result.data.code == 200) {
                        notify("success", "成功", "删除分类成功");
                        setTimeout(() => getForumType(), 500);
                    } else notify('info', result.data.code + '', result.data.info)
                },
                (err) => { notify('error', '失败', '删除商品分类失败！' + err); }
            );
        }).catch(() => { });
}

const addType = (value) => {
    if (value != undefined || value == '') {
        Axios.Post(undefined,
            [{ name: 'meta', value: 'forum_type_create_require' }, { name: 'title', value: value }],
            (result) => {
                if (result.data.code == 200) {
                    notify("success", "成功", "添加讨论分类成功！");
                    setTimeout(() => getForumType(), 500);
                } else notify('info', result.data.code + '', result.data.info)
            },
            (err) => { notify('error', '失败', '获取讨论分类失败！' + err); }
        );
    }
}
// 添加分类
const addForumType = () => {
    ElMessageBox.prompt('请输入分类名称（ 字数限制 8 位 ）', '添加分类', {
        confirmButtonText: '添加',
        cancelButtonText: '返回',
        inputValidator: (_) => {
            if (_.indexOf(' ') > -1) return '分类名称不能存在空格!';
            if (_.length > 8) return '分类名称字数不能超过8位';
            if (_ == '') return '分类名称不能为空!';
        }
    }).then(({ value }) => addType(value)).catch(() => { });
}

const updateType = (id, value) => {
    Axios.Post(undefined,
        [
            { name: 'meta', value: 'forum_type_update_require' },
            { name: 'id', value: id },
            { name: 'title', value: value }
        ],
        (result) => {
            if (result.data.code == 200) {
                notify("success", "成功", "分类修改成功！");
                setTimeout(() => getForumType(), 500);
            } else notify('info', result.data.code + '', result.data.info)
        },
        (err) => { notify('error', '失败', '获取商品分类失败！' + err); }
    );
}

// 修改分类
const updateForumType = (item) => {
    ElMessageBox.prompt('请输入分类名称（ 字数限制 8 位 ）', '添加分类', {
        confirmButtonText: '修改',
        cancelButtonText: '返回',
        inputValue: item.title,
        inputValidator: (_) => {
            if (_.indexOf(' ') > -1) return '分类名称不能存在空格!';
            if (_.length > 8) return '分类名称字数不能超过8位';
            if (_ == '') return '分类名称不能为空!';
        }
    }).then(({ value }) => updateType(item.id, value)).catch(() => { });
}

onMounted(() => getForumType());

</script>

<style scoped></style>