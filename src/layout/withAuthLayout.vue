<template>
  <AuthenticationWrap
    :style="{
      backgroundImage: `url('${require('../static/img/admin-bg-light.png')}')`,
    }"
  >
    <div class="ninjadash-authentication-wrap">
      <div class="ninjadash-authentication-brand">
        <!-- TODO: logo ddgro -->
        <img
          style="max-width: 220px; margin-bottom: 30px"
          :src="require('./../../public/logo-dd.png')"
          alt=""
        />
      </div>
      <router-view></router-view>
    </div>
  </AuthenticationWrap>
</template>
<script>
  import { Aside, Content, AuthenticationWrap } from './style';

  const AuthLayout = {
    name: 'AuthLayout',
    components: { Aside, Content, AuthenticationWrap },
  };

  export default AuthLayout;
</script>
