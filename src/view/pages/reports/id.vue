<template>
  <sdPageHeader
    title="Szczegóły zgłoszenia"
    class="ninjadash-page-header-main"
  ></sdPageHeader>

  <Main>
    <TicketBox>
      <a-row :gutter="30">
        <!-- <OverviewDataList /> -->
        <a-col :xl="12" :md="12" :xs="24">
          <OverviewCard
            :ocData="item1"
            :bottomStatus="false"
            class="ninjadash-overview-card-support"
          />
        </a-col>
        <a-col :xl="12" :md="12" :xs="24">
          <OverviewCard
            :ocData="item2"
            :bottomStatus="false"
            class="ninjadash-overview-card-support"
          />
        </a-col>

        <a-col :md="24">
          <sdCards headless>
            <div class="header">
              <sdHeading as="h4">Dane podstawowe</sdHeading>
            </div>

            <div>
              <b>Utworzono:</b>

              {{ formattedDate(data?.data?.created_at) || 'brak danych' }}
            </div>
            <div>
              <b>Imię i nazwisko:</b>
              {{ data?.data?.name_surname || '---' }}
            </div>
            <div><b>Adres email:</b> {{ data?.data?.email }}</div>
            <div><b>Profesja:</b> {{ data?.data?.proffesion }}</div>

            <!-- <div>
              <pre>
                <code>
               {{ data?.user || 'brak danych'}}
                </code>
              </pre>
            </div> -->
            <div>
              <TableWrapper class="table-data-view table-responsive">
              </TableWrapper>
            </div>
          </sdCards>
        </a-col>
        <a-col :md="24">
          <sdCards headless>
            <div class="header">
              <sdHeading as="h4">Dane z formularza:</sdHeading>
            </div>

            <div>
              <b> Typ: </b>{{ data?.user?.type === 'slab' ? 'Płyty' : 'Deski' }}
            </div>
            <div>
              <b>Łączna powierzchnia:</b> {{ data?.data?.total_area }} m2
            </div>
            <div><b>Ilość tarasów:</b> {{ data?.data?.count }}</div>
            <div><b>Najniższy punkt:</b> {{ data?.data?.lowest }} mm</div>
            <div><b>Najwyższy punkt:</b> {{ data?.data?.highest }} mm</div>
            <div><b>Szerokość płyty: </b> {{ data?.data?.slab_width }} mm</div>
            <div><b>Wysokość płyty: </b>{{ data?.data?.slab_height }} mm</div>

            <!-- <div>
              <pre>
                <code>
               {{ data?.user || 'brak danych'}}
                </code>
              </pre>
            </div> -->
            <div>
              <TableWrapper class="table-data-view table-responsive">
              </TableWrapper>
            </div>
          </sdCards>
        </a-col>
        <a-col :md="24">
          <sdCards headless>
            <div class="header">
              <sdHeading as="h4">Dodatkowe akcesoria:</sdHeading>
            </div>

            <div>
              <ul>
                <li
                  class="additional-accessories-list-item"
                  v-for="item in additionalAccesories"
                  :key="item.id"
                >
                  <div>
                    <strong>{{ item.name }}</strong>
                  </div>
                  <div><strong>kod:</strong> {{ item.code }}</div>
                  <div><strong>cena netto:</strong> {{ item.price_net }}</div>
                  <div>
                    <strong>skrócona nazwa:</strong> {{ item.short_name }}
                  </div>
                </li>
              </ul>
            </div>

            <!-- <div>
              <pre>
                <code>
               {{ data?.user || 'brak danych'}}
                </code>
              </pre>
            </div> -->
            <div>
              <TableWrapper class="table-data-view table-responsive">
              </TableWrapper>
            </div>
          </sdCards>
        </a-col>
      </a-row>
    </TicketBox>
  </Main>
</template>

<script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { Main, TableWrapper } from './styled';
  import { TicketBox } from './styled';
  import { useStore } from 'vuex';
  import OverviewCard from '@/components/cards/OverviewCard.vue';
  import {
    defineComponent,
    onMounted,
    computed,
    ref,
    defineAsyncComponent,
  } from 'vue';

  import { idGenerator } from '../../../utility/utility';
  import dayjs from 'dayjs';

  const API_URL = process.env.VUE_APP_APIURL;

  // const OverviewDataList = defineAsyncComponent(() =>
  //   import('./overview/OverviewDataList.vue')
  // );

  // Assuming you have an array of several ids
  const severalIds = [32, 4, 6];

  const filterProductsByIds = (products, ids) => {
    console.log(ids);
    console.log(typeof ids);
    console.log(products);
    console.log(typeof products);
    // return products;
    // return products.filter((product) => ids.includes(product.id));
  };

  const SupportTicket = defineComponent({
    name: 'SupportTicket',
    components: {
      Main,
      TicketBox,
      TableWrapper,
      OverviewCard,
      // OverviewDataList,
    },

    setup() {
      const route = useRouter();
      const { state, dispatch } = useStore();
      const visible = ref(false);

      const formattedDate = (date) => {
        return dayjs(date).format('DD-MM-YYYY');
      };

      const dataState = computed(() => state.tickets.data);

      const data = ref();

      const getData = async () => {
        try {
          const id = route?.currentRoute.value.params.id;
          const response = await axios.get(`${API_URL}/application/${id}`);
          data.value = response.data;
        } catch (error) {
          console.log(error);
        }
      };

      onMounted(() => {
        const id = route?.currentRoute.value.params.id;
        getData();
        // dispatch('ticketReadData');
        // dispatch('tableReadData', { endpoint: 'applications' });
        // dispatch('getReportData', {
        //   endpoint: id,
        // });

        console.log(typeof state.reports.reportData.products);
      });

      const reportData = computed(() => state.reports.reportData);
      const additionalAccesories = computed(
        () => data.value?.additional_accessories
      );

      const handleIdSearch = (e) => {
        const value = e.currentTarget.value;

        dispatch('ticketUpdateSearch', {
          value,
          key: 'id',
        });
      };

      const handleStatusSearch = (value) => {
        dispatch('ticketUpdateSearch', {
          value,
          key: 'status',
        });
      };

      const handleSubjectSearch = (e) => {
        const { value } = e.currentTarget;
        dispatch('ticketUpdateSearch', {
          value,
          key: 'subject',
        });
      };

      const onCancel = () => {
        visible.value = false;
      };

      const item1 = {
        id: 1,
        type: 'primary',
        icon: 'ticket',
        label: 'Łączna powierzchnia',
        total: '12',
        suffix: '',
        prefix: '',
      };

      const item2 = {
        id: 1,
        type: 'primary',
        icon: 'ticket',
        label: 'Ilość płytek',
        total: '30825',
        suffix: '',
        prefix: '',
      };

      const showModal = () => {
        visible.value = true;
      };

      const handleSubmit = (values) => {
        const id = idGenerator(dataState.value, 2);
        dispatch(
          'ticketUpdateData',
          dataState.value.concat({
            ...values,
            user: {
              name: 'Kellie Marquot',
              // img: 'static/img/avatar/profileImage.png',
              conversations: [],
            },
            createAt: dayjs().format('MM-DD-yyyy'),
            id,
          })
        );
        visible.value = false;
      };

      return {
        // dataSource,
        handleIdSearch,
        handleStatusSearch,
        handleSubjectSearch,
        visible,
        onCancel,
        showModal,
        handleSubmit,
        reportData,
        formattedDate,
        additionalAccesories,
        filterProductsByIds,
        severalIds,
        OverviewCard,
        item1,
        item2,
        data,
      };
    },
  });

  export default SupportTicket;
</script>

<style>
  .additional-accessories-list-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 6px;
    padding: 14px 0;
    border-bottom: 1px solid #e8e8e8;
  }
</style>
