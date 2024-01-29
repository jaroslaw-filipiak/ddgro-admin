<template>
  <sdPageHeader
    title="Szczegóły zgłoszenia"
    class="ninjadash-page-header-main"
  ></sdPageHeader>

  <Main>
    <TicketBox>
      <a-row :gutter="30">
        <OverviewDataList />
        <a-col :md="24">
          <sdCards headless>
            <div class="header">
              <sdHeading as="h4">Dane podstawowe</sdHeading>
            </div>

            <div>
              <b>Utworzono:</b>
              {{ formattedDate(reportData?.user?.created_at) || 'brak danych' }}
            </div>
            <div>
              <b>Imię i nazwisko:</b> {{ reportData?.user?.name_surname }}
            </div>
            <div><b>Adres email:</b> {{ reportData?.user?.email }}</div>
            <div><b>Profesja:</b> {{ reportData?.user?.proffesion }}</div>

            <!-- <div>
              <pre>
                <code>
               {{ reportData?.user || 'brak danych'}}
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
              <b> Typ: </b
              >{{ reportData?.user?.type === 'slab' ? 'Płyty' : 'Deski' }}
            </div>
            <div>
              <b>Łączna powierzchnia:</b> {{ reportData?.form?.total_area }} m2
            </div>
            <div><b>Ilość tarasów:</b> {{ reportData?.form?.count }}</div>
            <div><b>Najniższy punkt:</b> {{ reportData?.form?.lowest }} mm</div>
            <div>
              <b>Najwyższy punkt:</b> {{ reportData?.form?.highest }} mm
            </div>
            <div>
              <b>Szerokość płyty: </b> {{ reportData?.form?.slab_width }} mm
            </div>
            <div>
              <b>Wysokość płyty: </b>{{ reportData?.form?.slab_height }} mm
            </div>

            <!-- <div>
              <pre>
                <code>
               {{ reportData?.user || 'brak danych'}}
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

            <div>{{ additionalAccesories || 'brak danch, nie wybrano' }}</div>

            <!-- <div>
              <pre>
                <code>
               {{ reportData?.user || 'brak danych'}}
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
  import { useRouter } from 'vue-router';
  import { Main, TableWrapper } from './styled';
  import { TicketBox } from './styled';
  import { useStore } from 'vuex';
  import {
    defineComponent,
    onMounted,
    computed,
    ref,
    defineAsyncComponent,
  } from 'vue';

  import { idGenerator } from '../../../utility/utility';
  import dayjs from 'dayjs';
  const OverviewDataList = defineAsyncComponent(() =>
    import('./overview/OverviewDataList.vue')
  );

  const pageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'app',
      breadcrumbName: 'Apps',
    },
    {
      path: 'first',
      breadcrumbName: 'Tickets',
    },
  ];
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Requested By',
      dataIndex: 'requested',
      key: 'requested',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Created Date',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];
  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  const SupportTicket = defineComponent({
    name: 'SupportTicket',
    components: {
      Main,
      TicketBox,
      TableWrapper,

      OverviewDataList,
    },

    setup() {
      const route = useRouter();
      const { state, dispatch } = useStore();
      const visible = ref(false);

      const formattedDate = (date) => {
        return dayjs(date).format('DD-MM-YYYY');
      };

      const additionalAccesories = computed(() => {
        const accesories = reportData.value?.accesories;
        console.log(accesories);
        return accesories;
      });

      const dataState = computed(() => state.tickets.data);

      onMounted(() => {
        const id = route?.currentRoute.value.params.id;
        // dispatch('ticketReadData');
        // dispatch('tableReadData', { endpoint: 'applications' });
        dispatch('getReportData', {
          endpoint: id,
        });

        console.log(typeof state.reports.reportData.products);
      });

      const reportData = computed(() => state.reports.reportData);

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
        pageRoutes,
        prefix,
        columns,
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
      };
    },
  });

  export default SupportTicket;
</script>
