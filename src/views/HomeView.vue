<template>
  <div class="home">
    <HeaderView title="home"></HeaderView>

    <div class="fullscreen-video bg-dark">
      <!-- <video autoplay muted loop>
        <source src="../assets/home.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video> -->
      <div class="container-fluid vh-100 d-flex align-items-center justify-content-center text-white">
        <div class="text-center">
          <h1 class="display-4 mb-4">Hello！惠民社区欢迎您</h1>
          <p class="lead mb-5">为您量身定制的的惠民综合平台，为您带来不一样的惊喜，给您不一样的体验</p>
          <a href="#1">
            <button class="btn btn-light getall">查看更多</button>
          </a>
        </div>
      </div>
    </div>


    <a id="1" :style="'margin-bottom: ' + HeaderScroller.getHeaderViewHeight() + 'px;'"></a>
    <div class="container" style="max-width: 1200px;padding-top: 66px;">
      <h2 class="text-center mt-5 mb-5">服务特色</h2>
      <div class="row">
        <div class="col-lg-4 mb-5">
          <div class="card custom-card">
            <img style="max-height: 400px;min-height: 250px;" src="@/assets/1.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title mt-2 mb-3">商品多样性</h5>
              <p class="card-text">
                我们提供丰富多样乡村特色商品，涵盖了从农产品到手工艺品多个领域，为您呈现一幅丰富多彩的乡村生活画卷。
                从新鲜有机农产品到传统手工艺品，我们拥有丰富的商品种类，满足不同消费者的需求。
                每个商品都反映了当地乡村的独特文化和特色，为您带来别具一格的购物体验。</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mb-5">
          <div class="card custom-card">
            <img style="max-height: 400px;min-height: 250px;" src="@/assets/2.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title  mt-2 mb-3">商品质量保证</h5>
              <p class="card-text">
                我们将乡村振兴和惠民理念融入到每一个商品的生产和筛选过程中，以保证客户购买到的商品都是高品质、健康、安全的。
                我们与当地农民和手工艺人合作，严选原材料，确保商品的新鲜和质量。
                在生产和加工过程中，我们严格遵守相关的质量标准和规定，为客户提供放心的产品。
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mb-5">
          <div class="card custom-card">
            <img style="max-height: 400px;min-height: 250px;" src="@/assets/3.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title mt-2 mb-3">商品特色与社会价值</h5>
              <p class="card-text">
                我们的商品不仅仅是商品，更蕴含乡村文化的传承和社会价值的实现。每个商品背后都有 与之相关的故事和意义。
                我们支持农民和手工艺人，通过商品销售带动当地经济的发展，促进了乡村振兴。
                每一个商品都传承了乡村文化的一部分，在购买的同时也参与到了乡村振兴的过程中。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>





    <div class="container" style="max-width: 1200px;padding-top: 66px;">
      <h2 class="text-center mt-5 mb-5">相关产品</h2>
      <div class="row">

        <div class="col-lg-4 mb-5">
          <div class="card">
            <img style="max-height: 400px;min-height: 250px;" src="@/assets/4.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">新鲜多彩的水果</h5>
              <p class="card-text">
                我们提供各种新鲜、多彩的水果，从甘甜的苹果到多汁的橙子，每一种水果都是精心挑选的。
                我们致力于为您提供高品质、健康的水果，助您享受美味与健康同行。
              <ul class="mt-2 product-card-item">
                <li>多样性：我们提供丰富多样的水果品种，多种口味任意挑选，满足您的口味需求。</li>
                <li>新鲜：所有水果都是从有机农场精心采摘，经过严格地筛选，保证水果新鲜度。</li>
                <li>健康：水果富含维生素和营养成分，对您的健康有益。为您的健康保驾护航。</li>
              </ul>
              </p>
              <router-link :to="{ name: 'shoplist', query: { typeid: 0 } }" class="btn btn-link">查看更多</router-link>
            </div>
          </div>
        </div>

        <div class="col-lg-4 mb-5">
          <div class="card">
            <img style="max-height: 400px;min-height: 250px;" src="@/assets/5.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">新鲜的蔬菜</h5>
              <p class="card-text">
                我们提供丰富多样的新鲜蔬菜，从绿叶蔬菜到根茎类，每一种都是经过精心挑选的。
                我们致力于为您提供高品质、健康的蔬菜，助您保持健康生活方式。
              <ul class="mt-2 product-card-item">
                <li>多样性：我们拥有各类新鲜蔬菜，种类多，更保证满足您的健康饮食需求。</li>
                <li>有机种植：我们的蔬菜来自有机农场，不添加任何化学产品，保证新鲜和无农药。</li>
                <li>营养丰富：蔬菜富含各种维生素、矿物质和纤维，有助于维持健康体魄。</li>
              </ul>
              </p>
              <router-link :to="{ name: 'shoplist', query: { typeid: 1 } }" class="btn btn-link">查看更多</router-link>
            </div>
          </div>
        </div>

        <div class="col-lg-4 mb-5">
          <div class="card">
            <img style="max-height: 400px;min-height: 250px;" src="@/assets/6.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">食肉类</h5>
              <p class="card-text">
                我们提供精心挑选的优质肉类，从牛肉到家禽，每一份都是来自可靠供应商的精选品。
                我们致力于为您提供口感鲜嫩、营养丰富的肉类，助您享受美味与健康同行。
              <ul class="mt-2 product-card-item">
                <li>来源可靠：我们的肉类来自可靠的供应商，保证品质和安全。</li>
                <li>多样选择：我们提供各种肉类选项，满足您不同菜肴的需求。</li>
                <li>营养丰富：肉类富含优质蛋白质、维生素等，对于体力和健康有益。</li>
              </ul>
              </p>
              <router-link :to="{ name: 'shoplist', query: { typeid: 2 } }" class="btn btn-link">查看更多</router-link>
            </div>
          </div>
        </div>

        <div class="col-lg-4 mb-5">
          <div class="card">
            <img style="max-height: 400px;min-height: 250px;" src="@/assets/7.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">农业用具</h5>
              <p class="card-text">
                我们提供高品质农业用具，涵盖了整个农业生产过程。
                每款农具都经过精心设计和制造，满足不同阶段的耕作需求。
                我们致力于为您提供先进、耐用的农业用具，助您取得丰收的成果。
              <ul class="mt-2 product-card-item">
                <li>多样化：我们拥有各类农业用具，包括耕地、播种、灌溉等设备，满足您的整个农作业生产需求。</li>
                <li>高品质：所有农具均由优质材料制作而成，保证了产品的耐用性和性能稳定。</li>
                <li>技术先进：我们引入了先进的农业技术，设计生产出高效的农业用具，提升您的生产效率。</li>
              </ul>
              </p>
              <router-link :to="{ name: 'shoplist', query: { typeid: 3 } }" class="btn btn-link">查看更多</router-link>
            </div>
          </div>
        </div>

        <div class="col-lg-4 mb-5">
          <div class="card">
            <img style="max-height: 400px;min-height: 250px;" src="@/assets/8.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">种植类</h5>
              <p class="card-text">
                我们提供丰富的种植业产品，包括粮食、蔬菜、果树等多个品类。
                每一份产品都是经过精心种植，保证了其品质和产量。
                为您提供高效、高产的种植解决方案，助您取得丰收成果。
              <ul class="mt-2 product-card-item">
                <li>多样性：我们拥有各类种植业产品，包括粮食、果树、经济作物等，满足您不同的种植需求</li>
                <li>优质产地：我们的种植产品来自优质的农田和果园，保证了产品的品质和产量。</li>
                <li>高效生产：我们引入先进的种植技术，提升了种植产量，为您的农业生产保驾护航。</li>
              </ul>
              </p>
              <router-link :to="{ name: 'shoplist', query: { typeid: 4 } }" class="btn btn-link">查看更多</router-link>
            </div>
          </div>
        </div>

        <div class="col-lg-4 mb-5">
          <div class="card">
            <img style="max-height: 400px;min-height: 250px;" src="@/assets/9.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">畜牧家禽类</h5>
              <p class="card-text">
                我们提供健康高质量的畜牧产品，涵盖了多个品种。
                每一份产品都经过精心饲养和管理，保证了健康和品质。
                我们致力于为您提供安全、高蛋白畜牧产品，助您享受美味与营养的同行。
              <ul class="mt-2 product-card-item">
                <li>健康饲养：我们采用健康饲养方法，保证畜牧产品的优质和无添加物。</li>
                <li>多样性：我们拥有各类畜牧产品，包括禽类、牛羊等，满足您不同的餐桌需求。</li>
                <li>高蛋白：畜牧产品富含优质蛋白质，是健康饮食的重要组成部分。</li>
              </ul>
              </p>
              <router-link :to="{ name: 'shoplist', query: { typeid: 5 } }" class="btn btn-link">查看更多</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- <div class="">
      <div class="container services">
        <h2 class="text-center mt-5 mb-5">最新资讯</h2>
        <div class="row mx-auto" style="max-width: 1200px;padding-top: 66px;">
          <div class="col-lg-4 mb-4">
            <div class="service-item text-center">
              <i class="fas fa-cogs"></i>
              <h4>服务1</h4>
              <p>服务1的描述</p>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="service-item text-center">
              <i class="fas fa-chart-line"></i>
              <h4>服务2</h4>
              <p>服务2的描述</p>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="service-item text-center">
              <i class="fas fa-globe"></i>
              <h4>服务3</h4>
              <p>服务3的描述</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="">
      <div class="container services">
        <h2 class="text-center mt-5 mb-5">最新资讯</h2>
        <div class="row mx-auto" style="max-width: 1200px;padding-top: 66px;">
          <div class="col-lg-4 mb-4">
            <div class="service-item text-center">
              <i class="fas fa-cogs"></i>
              <h4>服务1</h4>
              <p>服务1的描述</p>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="service-item text-center">
              <i class="fas fa-chart-line"></i>
              <h4>服务2</h4>
              <p>服务2的描述</p>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="service-item text-center">
              <i class="fas fa-globe"></i>
              <h4>服务3</h4>
              <p>服务3的描述</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->



    <section class="about-us">
      <div class="container">
        <div class="row mx-auto" style="max-width: 1200px;">
          <div class="col-lg-6">
            <h2>关于我们</h2>
            <p>
              我们是一支充满激情和创意的团队，致力于提供优质的服务，满足客户的需求。
              通过多年的努力和实践，我们已经在行业内树立了良好的声誉。
            </p>
            <p>
              我们的使命是为客户提供创新的解决方案，帮助他们实现业务目标。
              无论您是初创企业还是大型企业，我们都将竭诚为您提供专业的服务。
            </p>
          </div>
          <div class="col-lg-6 ">
            <img src="@/assets/0.jpg" alt="关于我们" class="img-fluid">
          </div>
        </div>
      </div>
    </section>
    <div>
      <div class="hero-section">
        <div class="container">
          <h1 class="mb-4">加入我们</h1>
          <p class="lead">
            人多力量大，一起为家乡做事业，贡献力量！
            <br>
            感谢您对我们公司的职位表达了兴趣。我们非常欢迎您加入我们的团队！
          </p>
        </div>
      </div>
      <div class="container mt-5 mx-auto" style="max-width: 1200px;">
        <div class="row">
          <div class="col-md-4">
            <div class="feature-card">
              <h3>投递简历</h3>
              <p>
                请您将您的简历发送至example@example.com，
                我们将会在收到后尽快与您联系，安排面试事宜。
                或者带上简历前往我们的公司地址进行面试。
                感谢您对我们公司的关注和支持，期待能有机会与您共同创造美好的职业发展。
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card">
              <h3>安排面试</h3>
              <p>
                感谢您对我们公司浓厚兴趣，并参与了初步筛选阶段。
                我们很高兴地通知您，您已成功进入了面试环节。
                面试相关事宜如下：面试时间、面试地点以及面试形式
                面试形式有面对面、视频、电话等。
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card">
              <h3>一起合作</h3>
              <p>
                恭喜您通过面试加入我们惠民社区大家庭。我们非常欢迎您加入我们的团队！
                您的经验和技能将会为我们的公司带来重要的贡献。
                此外，我们相信您的加入将会丰富我们的团队，使我们能够更好地实现我们的使命和愿景。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterView></FooterView>
</template>

<script setup>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
import { HeaderScrollerStore } from '@/stores/HeaderScrollerStore';
const HeaderScroller = HeaderScrollerStore();
</script>


<style scoped>
.card:hover {
  /* background-color: red; */
  box-shadow: 0 0 5px grey;
  transform: scale(1.04);
}

.hero-section {
  background-image: url('@/assets/joinme.webp');
  background-size: cover;
  background-position: center;
  color: #fff;
  text-align: center;
  padding: 100px 0;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature-card {
  border: none;
  text-align: center;
  padding: 40px;
}

.feature-card img {
  max-width: 100px;
  margin-bottom: 20px;
}

a {
  padding: 0;
  text-decoration: none;
}

.product-card-item {
  padding-left: 10px;
  font-size: small;
}

.services {
  width: 100%;
  /* background-color: #f8f9fa; */
  /* background-color: red; */
  /* 设置背景色 */
  padding: 60px 0;
  /* 设置上下内边距 */
}

.service-item {
  margin-bottom: 30px;
  /* 设置服务项之间的间距 */
}

.service-item i {
  font-size: 48px;
  /* 设置图标大小 */
  color: #007bff;
  /* 设置图标颜色 */
}

.fullscreen-video {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.fullscreen-video video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;

}

.about-us {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.about-us h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

.about-us p {
  font-size: 16px;
  margin-bottom: 20px;
}

.about-us img {
  max-width: 100%;
}

.fullscreen-video .container-fluid {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}

.getall {
  padding: 15px 50px;
  color: white;
  text-decoration: none;
  background-color: transparent;
}


.getall:hover {
  color: #1989FA;
  background-color: rgba(255, 255, 255, 0.273);
}
</style>
