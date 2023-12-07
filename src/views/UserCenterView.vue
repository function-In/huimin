<template>
    <div class="user">

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#">用户中心</a>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#">用户名</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">退出登录</a>
                </li>
            </ul>
        </nav>

        <div class="container mt-5">
            <div class="user-profile">
                <div class="row">
                    <div class="col-md-4">
                        <div class="text-center">
                            <img class="profile-picture" src="profile.jpg" alt="Profile Picture">
                        </div>
                        <div class="profile-details">
                            <h2>用户名</h2>
                            <p>用户邮箱</p>
                            <p>其他用户信息</p>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <ul class="nav nav-tabs user-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                                    aria-controls="profile" aria-selected="true">个人资料</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="orders-tab" data-toggle="tab" href="#orders" role="tab"
                                    aria-controls="orders" aria-selected="false">订单历史</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="articles-tab" data-toggle="tab" href="#articles" role="tab"
                                    aria-controls="articles" aria-selected="false">文章管理</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="settings-tab" data-toggle="tab" href="#settings" role="tab"
                                    aria-controls="settings" aria-selected="false">设置</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="profile" role="tabpanel"
                                aria-labelledby="profile-tab">
                                <!-- 个人资料内容 -->
                            </div>
                            <div class="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                                <h4>订单历史</h4>
                                <table class="table order-history-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">订单号</th>
                                            <th scope="col">产品名称</th>
                                            <th scope="col">价格</th>
                                            <th scope="col">状态</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- 填充订单历史数据 -->
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="articles" role="tabpanel" aria-labelledby="articles-tab">
                                <h4>文章管理</h4>
                                <ul class="article-list">
                                    <li>
                                        <h5>文章标题 1</h5>
                                        <p>文章内容...</p>
                                    </li>
                                    <li>
                                        <h5>文章标题 2</h5>
                                        <p>文章内容...</p>
                                    </li>
                                    <!-- 可以根据实际情况填充更多文章 -->
                                </ul>
                            </div>
                            <div class="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                                <h4>设置</h4>
                                <form class="settings-form">
                                    <div class="form-group">
                                        <label for="username">用户名</label>
                                        <input type="text" class="form-control" id="username" value="用户名">
                                    </div>
                                    <div class="form-group">
                                        <label for="email">邮箱地址</label>
                                        <input type="email" class="form-control" id="email" value="user@example.com">
                                    </div>
                                    <button type="submit" class="btn btn-primary">保存设置</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>

<style scoped>
.user-profile {
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-picture {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 20px;
}

.profile-details {
    text-align: center;
}

.profile-details h2 {
    margin-bottom: 10px;
}

.profile-details p {
    color: #777;
}

.user-tabs .nav-link {
    color: #333;
    border: none;
    border-bottom: 2px solid transparent;
}

.user-tabs .nav-link.active {
    border-color: #007bff;
}

.tab-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.logout-button {
    margin-top: 20px;
}

.order-history-table th,
.order-history-table td {
    vertical-align: middle;
}

.article-list {
    list-style: none;
    padding: 0;
}

.article-list li {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

.settings-form {
    max-width: 400px;
    margin: 0 auto;
}
</style>