import { defineStore } from "pinia";
import { ref } from "vue";
export const HeaderScrollerStore = defineStore('HeaderScroller', () => {
    // 定义值
    const isScrollState = ref(false);
    // 设置值
    const setScrollState = (ScrollState) => isScrollState.value = ScrollState;
    // 获取值
    const getScrollState = () => isScrollState.value
    // 定义顶部栏高度
    const HeaderViewHeight = ref(0);
    // 设置高度值
    const setHeaderViewHeight = (ViewHeight) => HeaderViewHeight.value = ViewHeight;
    // 获取高度值
    const getHeaderViewHeight = () => HeaderViewHeight.value
    // return
    return {
        isScrollState, setScrollState, getScrollState,
        HeaderViewHeight, setHeaderViewHeight, getHeaderViewHeight
    }
});