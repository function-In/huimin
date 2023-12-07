import { defineStore } from "pinia";
import { ref } from "vue";
// import axios from "axios";

export const ProductListStore = defineStore('ProductListStore', () => {

    // 定义商品列表
    const list = ref([
        {
            id: 0,
            name: '正在加载',
            products: []
        }
    ]);




    return {
        list
    }
});