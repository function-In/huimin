import Axios from "@/Axios";
import router from "@/router";
import { defineStore } from "pinia";
import { ref } from "vue";
import { ElNotification } from 'element-plus';
// 通知组件
const notify = (type, title, message) => { ElNotification({ title: title, message: message, position: 'bottom-right', type: type }); }
export const UserInfoStore = defineStore('UserInfoStore', () => {
    // 管理面板渲染
    const isShowPancel = ref(false);

    // 登录操作判断
    const isLogin = ref(false);


    // 跳转
    const getLoginState = () => {
        Axios.Post(undefined,
            [{ name: 'meta', value: 'login_require' }],
            (result) => {
                if (result.data.code == 200) {
                    notify('success', '您已完成登录', '您已登录，不可重复登录操作！');
                    setTimeout(() => router.push({ name: 'home' }), 1500);
                }
            }
        );
    }

    const getLogin = () => { return isLogin.value }

    return {
        isLogin,
        isShowPancel,
        getLoginState,
        getLogin,
    }
});