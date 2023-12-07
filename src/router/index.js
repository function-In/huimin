import { createRouter, createWebHashHistory } from 'vue-router';

// 管理页面
import AdminPage from '../admin/MyAdmin.vue';
// 资讯管理
import AdminNewsListView from '../admin/New/NewsListView.vue';
import AdminNewsCreateView from '../admin/New/NewsCreateView.vue';
import AdminNewsEditView from '../admin/New/NewsEditView.vue';
import AdminNewsInfoView from '../admin/New/NewsInfoView.vue';
// 用户管理
import AdminUserListView from '../admin/User/UserListView.vue';
import AdminUserInfoView from '../admin/User/UserInfoView.vue';
import AdminUserEditView from '../admin/User/UserEditView.vue';
import AdminUserCreateView from '../admin/User/UserCreateView.vue';
// 商品管理
import AdminShopTypeView from '../admin/Shop/ShopTypeView.vue';
import AdminShopListView from '../admin/Shop/ShopListView.vue';
import AdminShopEditView from '../admin/Shop/ShopEditView.vue';
import AdminShopInfoView from '../admin/Shop/ShopInfoView.vue';
import AdminShopCreateView from '../admin/Shop/ShopCreateView.vue';
// 论坛
import AdminForumTypeView from '../admin/Forum/ForumTypeView.vue'
import AdminForumCreateView from '../admin/Forum/ForumCreateView.vue'
import AdminForumEditView from '../admin/Forum/ForumEditView.vue';
import AdminForumInfoView from '../admin/Forum/ForumInfoView.vue';
import AdminForumListView from '../admin/Forum/ForumListView.vue';
// 评论
import AdminCommentListView from '../admin/Comment/CommentListView.vue';
import AdminCommentInfoView from '../admin/Comment/CommentInfoView.vue';
import AdminCommentEditView from '../admin/Comment/CommentEditView.vue';
import AdminCommentCreateView from '../admin/Comment/CommentCreateView.vue';

// 主页页面
import HomeView from '../views/HomeView.vue';
// 登录页面
import LoginView from '../views/LoginView.vue';
// 注册页面
import RegisterView from '../views/RegisterView.vue';

// 用户中心页面 
import UserCenterView from '../views/UserCenterView.vue'
// 商品列表页面
import ProductListView from '../views/ProductListView.vue';
// 商品详情页面
import ProductItemView from '../views/ProductItemView.vue'

// 评论页面
import CommentListView from '../views/CommentListView.vue';

// 购物车页面
import ShopCartView from '../views/ShopCartView.vue';
// 订单页面
import MyShopListView from '../views/MyShopListView.vue';
// 订单详情
import MyShopInfoView from '../views/MyShopInfoView.vue';
// 我的钱包
import MyMoneyView from '../views/MyMoneyView.vue'
// 设置页面
import SettingsView from '../views/SettingsView.vue';
// 支付结果
import PaymentResultView from '../views/PaymentResultView.vue';
// 支付结果（替换）
import PaymentInfoView from '../views/PaymentInfoView.vue'


const routes = [
  // 首页
  { path: '/', name: 'home', component: HomeView, meta: { title: "首页" } },
  // 管理页
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
    children: [
      // 新闻类
      { path: '', name: 'AdminNewsList', component: AdminNewsListView, },
      { path: 'AdminNewsInfo', name: 'AdminNewsInfo', component: AdminNewsInfoView },
      { path: 'AdminNewsEdit', name: 'AdminNewsEdit', component: AdminNewsEditView },
      { path: 'AdminNewsCreate', name: 'AdminNewsCreate', component: AdminNewsCreateView },
      // 用户类
      { path: 'AdminUserList', name: 'AdminUserList', component: AdminUserListView, },
      { path: 'AdminUserInfo', name: 'AdminUserInfo', component: AdminUserInfoView, },
      { path: 'AdminUserEdit', name: 'AdminUserEdit', component: AdminUserEditView },
      { path: 'AdminUserCreate', name: 'AdminUserCreate', component: AdminUserCreateView },
      // 商品类
      { path: 'AdminShopType', name: 'AdminShopType', component: AdminShopTypeView },
      { path: 'AdminShopList', name: 'AdminShopList', component: AdminShopListView },
      { path: 'AdminShopInfo', name: 'AdminShopInfo', component: AdminShopInfoView },
      { path: 'AdminShopEdit', name: 'AdminShopEdit', component: AdminShopEditView },
      { path: 'AdminShopCreate', name: 'AdminShopCreate', component: AdminShopCreateView },
      // 论坛
      { path: 'AdminForumType', name: 'AdminForumType', component: AdminForumTypeView },
      { path: 'AdminForumList', name: 'AdminForumList', component: AdminForumListView },
      { path: 'AdminForumInfo', name: 'AdminForumInfo', component: AdminForumInfoView },
      { path: 'AdminForumEdit', name: 'AdminForumEdit', component: AdminForumEditView, },
      { path: 'AdminForumCreate', name: 'AdminForumCreate', component: AdminForumCreateView, },
      // 评论
      { path: 'AdminCommentList', name: 'AdminCommentList', component: AdminCommentListView, },
      { path: 'AdminCommentInfo', name: 'AdminCommentInfo', component: AdminCommentInfoView, },
      { path: 'AdminCommentEdit', name: 'AdminCommentEdit', component: AdminCommentEditView },
      { path: 'AdminCommentCreate', name: 'AdminCommentCreate', component: AdminCommentCreateView },
    ],
    meta: { title: "管理页" }
  },

  // 注册页
  { path: '/register', name: 'register', component: RegisterView, meta: { title: '注册' } },
  // 登录页
  { path: '/login', name: 'login', component: LoginView, meta: { title: "登录" } },
  // 个人中心页
  { path: '/userinfo', name: 'userinfo', component: UserCenterView, meta: { title: "个人中心" } },
  // 商品列表页
  { path: '/shoplist', name: 'shoplist', component: ProductListView, meta: { title: "商品列表" } },
  // 商品详情页
  { path: '/shop', name: 'shop', component: ProductItemView, meta: { title: "商品详情页" } },
  // 商品详情页
  { path: '/cart', name: 'cart', component: ShopCartView, meta: { title: "购物车" } },
  // 订单页
  { path: '/myshop', name: 'myshop', component: MyShopListView, meta: { title: "订单列表" } },
  // 订单详情
  { path: '/myshopinfo', name: 'myshopinfo', component: MyShopInfoView, meta: { title: "订单详情" } },
  // 设置页面
  { path: '/settings', name: 'settings', component: SettingsView, meta: { title: "设置页面" } },
  // 我的钱包
  { path: '/money', name: 'money', component: MyMoneyView, meta: { title: "我的钱包" } },
  // 评论页面
  { path: '/comment', name: 'comment', component: CommentListView, meta: { title: "评论列表" } },
  // 支付结果页面
  { path: '/payment', name: 'payment', component: PaymentResultView, meta: { title: "支付结果" } },
  // 订单结果
  { path: '/payinfo', name: 'payinfo', component: PaymentInfoView, meta: { title: "订单结果" } }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
