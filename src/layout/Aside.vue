<template>
  <a-menu
    :open-keys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :mode="mode"
    :theme="darkMode ? 'dark' : 'light'"
    class="scroll-menu"
    @openChange="onOpenChange"
    @click="onClick"
  >
    <NavTitle class="ninjadash-sidebar-nav-title">Strony</NavTitle>

    <a-sub-menu key="reports">
      <template #icon>
        <unicon name="pentagon"></unicon>
      </template>
      <template #title>Zgłoszenia</template>

      <a-menu-item @click="toggleCollapsed" key="reports-all">
        <router-link to="/zgloszenia/wszystkie"> Wszystkie </router-link>
      </a-menu-item>
    </a-sub-menu>

    <a-sub-menu key="products">
      <template #icon>
        <unicon name="triangle"></unicon>
      </template>
      <template #title>Produkty</template>

      <a-menu-item @click="toggleCollapsed" key="products-all">
        <router-link to="/produkty/wszystkie"> Wszystkie </router-link>
      </a-menu-item>
    </a-sub-menu>

    <a-sub-menu key="accesories">
      <template #icon>
        <unicon name="square"></unicon>
      </template>
      <template #title>Akcesoria</template>

      <a-menu-item @click="toggleCollapsed" key="accesories-all">
        <router-link to="/akcesoria/wszystkie"> Wszystkie </router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
  <footer>mode: {{ APP_MODE }}</footer>
</template>
<script>
  import {
    computed,
    reactive,
    ref,
    toRefs,
    watch,
    watchEffect,
    defineComponent,
  } from 'vue';
  import VueTypes from 'vue-types';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import { NavTitle } from './style';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    name: 'AsideItems',
    props: {
      toggleCollapsed: VueTypes.func,
      events: VueTypes.object,
    },
    components: {
      NavTitle,
    },
    setup(props) {
      const { t } = useI18n();
      const store = useStore();
      const darkMode = computed(() => store.state.themeLayout.data);
      const APP_MODE = computed(() => process.env.VUE_APP_MODE);
      const mode = ref('inline');
      const { events } = toRefs(props);
      const {
        onRtlChange,
        onLtrChange,
        modeChangeDark,
        modeChangeLight,
        modeChangeTopNav,
        modeChangeSideNav,
      } = events.value;

      const router = computed(() => useRoute());
      const state = reactive({
        rootSubmenuKeys: ['reports', 'products', 'accesories'],
        selectedKeys: [],
        openKeys: [],
        preOpenKeys: [],
      });

      const onOpenChange = (keys) => {
        console.log(keys);
        state.openKeys = keys;
      };

      const onClick = (item) => {
        console.log(item);
        if (item.keyPath.length === 1) state.openKeys = [];
      };

      watchEffect(() => {
        if (router.value.matched.length) {
          if (router.value.matched.length > 2) {
            state.selectedKeys = [router.value.matched[2].name];
            state.openKeys = [router.value.matched[1].name];
            state.preOpenKeys = [router.value.matched[1].name];
          } else if (router.value.matched.length > 3) {
            state.selectedKeys = [router.value.matched[3].name];
            state.openKeys = [router.value.matched[1].name];
            state.preOpenKeys = [router.value.matched[1].name];
          } else {
            state.selectedKeys = [router.value.matched[1].name];
            state.openKeys = [router.value.matched[1].name];
            state.preOpenKeys = [router.value.matched[1].name];
          }
        }
      });

      watch(
        () => state.openKeys,
        (val, oldVal) => {
          state.preOpenKeys = oldVal;
        }
      );

      return {
        mode,
        ...toRefs(state),
        darkMode,
        onRtlChange,
        onLtrChange,
        modeChangeDark,
        modeChangeLight,
        modeChangeTopNav,
        modeChangeSideNav,
        onOpenChange,
        onClick,
        t,
        APP_MODE,
      };
    },
  });
</script>
