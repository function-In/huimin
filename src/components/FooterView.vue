<template>
    <footer class="bg-dark text-light pt-5 mt-5">
        <div class="container text-left mx-auto" style="max-width: 1200px;">
            <div class="row">
                <div class="col-md-5 mb-4" style="font-size: small;">
                    <h6 class="text-white text-sm">联系我们</h6>
                    <p>Email: <a href="mailto:functionin@functionin.cn" class="text-light">functionin@functionin.cn</a></p>
                    <p>电话: +1 424-502-8928</p>
                </div>
                <div class="col-md-5 mb-4" style="font-size: small;">
                    <h6 class="text-white text-sm">关于我们</h6>
                    <p class="text-sm">关于我们的信息和历史</p>
                    <p class="text-sm">团队成员：罗慧莹、韦樊亮、吴汶奇</p>
                </div>
            </div>
            <hr>
            <div class="row" style="font-size: small;">
                <p @click="router.push({ name: 'admin' });" style="cursor: pointer;">后台管理页面入口</p>
            </div>
            <div class="row">
                <p style="font-size: small;">&copy; 2023 NCVT. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
</template>
<script setup>
import router from '@/router';


</script>
<style scoped>
a {
    text-decoration: none;
}
</style>