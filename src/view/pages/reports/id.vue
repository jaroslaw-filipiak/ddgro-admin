<template>
  <sdPageHeader
    title="Szczegóły zgłoszenia"
    class="ninjadash-page-header-main"
  ></sdPageHeader>

  <Main>
    <div class="border">
      <ul class="tabs">
        <li :class="{ active: activeTab === 1 }" @click="activeTab = 1">
          1. Informacje o zgłoszeniu
        </li>
        <li :class="{ active: activeTab === 2 }" @click="activeTab = 2">
          2. Matryca M_STANDARD
        </li>
        <li :class="{ active: activeTab === 3 }" @click="activeTab = 3">
          3. MATRYCA M_SPIRAL
        </li>
        <li :class="{ active: activeTab === 4 }" @click="activeTab = 4">
          4. MATRYCA M_MAX
        </li>
        <li :class="{ active: activeTab === 5 }" @click="activeTab = 5">
          5. Wydruk / Podgląd zamówienia
        </li>
      </ul>
    </div>
    <!-- informace o zgłoszeniu 1 -->
    <div v-if="activeTab === 1" class="tab tab__1">
      <TicketBox>
        <a-row :gutter="30">
          <!-- <OverviewDataList /> -->
          <a-col :xl="12" :md="12" :xs="24">
            <OverviewCard
              :ocData="box1"
              :bottomStatus="false"
              class="ninjadash-overview-card-support"
            />
          </a-col>
          <a-col :xl="12" :md="12" :xs="24">
            <OverviewCard
              :ocData="box2"
              :bottomStatus="false"
              class="ninjadash-overview-card-support"
            />
          </a-col>

          <a-col :xl="12" :md="6">
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
              <div><b>&nbsp;</b> &nbsp;</div>
              <div><b>&nbsp;</b> &nbsp;</div>
              <div><b>&nbsp;</b> &nbsp;</div>
              <div><b>&nbsp;</b> &nbsp;</div>

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
          <a-col :xl="12" :md="6">
            <sdCards headless>
              <div class="header">
                <sdHeading as="h4">Dane z formularza:</sdHeading>
              </div>
              <div>
                <b>Wybrany główny system:</b>
                {{ mainSystem.charAt(0).toUpperCase() + mainSystem.slice(1) }}
              </div>

              <div>
                <b> Typ: </b
                >{{ data?.user?.type === 'slab' ? 'Płyty' : 'Deski' }}
              </div>
              <div>
                <b>Łączna powierzchnia:</b> {{ data?.data?.total_area }} m2
              </div>
              <div><b>Ilość tarasów:</b> {{ data?.data?.count }}</div>
              <div><b>Najniższy punkt:</b> {{ data?.data?.lowest }} mm</div>
              <div><b>Najwyższy punkt:</b> {{ data?.data?.highest }} mm</div>
              <div>
                <b>Szerokość płyty: </b> {{ data?.data?.slab_width }} mm
              </div>
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
    </div>
    <!-- Matryca M_STANDARD 2 -->
    <div v-if="activeTab === 2" class="tab tab__2">
      <!-- podsumowanie przed matrycą M_STANDARD  -->
      <TicketBox>
        <a-row :gutter="15">
          <a-col :xs="24" class="m_standard">
            <BorderLessHeading>
              <sdCards title="Matryca M_STANDARD Podsumowanie">
                <TableWrapper class="table-data-view table-responsive">
                  <TableWrapper
                    class="table-data-view table-responsive summary-table"
                  >
                    <table style="width: 100%; text-align: left">
                      <thead>
                        <tr>
                          <th>Przedział</th>
                          <th>Ilość</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(value, item, index) in summarizeM_STANDARD"
                          :key="index"
                        >
                          <td>{{ item }}</td>
                          <td>{{ value }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </TableWrapper>
                </TableWrapper>
              </sdCards>
            </BorderLessHeading>
          </a-col>
        </a-row>
      </TicketBox>

      <TicketBox>
        <a-row :gutter="15">
          <a-col :xs="24" class="m_standard">
            <BorderLessHeading>
              <sdCards title="Matryca M_STANDARD">
                <DataTables
                  :pageSize="100"
                  :filterOption="false"
                  :filterOnchange="false"
                  :tableData="mStandardMatrix"
                  :columns="matrixColumns"
                  :rowSelection="false"
                />
              </sdCards>
            </BorderLessHeading>
          </a-col>
        </a-row>
      </TicketBox>
    </div>
    <!-- Matryca M_SPIRAL 3 -->
    <div v-if="activeTab === 3" class="tab tab__3">
      <!-- podsumowanie przed matrycą M_SPIRAL  -->
      <TicketBox>
        <a-row :gutter="15">
          <a-col :xs="24" class="m_standard">
            <BorderLessHeading>
              <sdCards title="Matryca M_SPIRAL Podsumowanie">
                <TableWrapper class="table-data-view table-responsive">
                  <TableWrapper
                    class="table-data-view table-responsive summary-table"
                  >
                    <table style="width: 100%; text-align: left">
                      <thead>
                        <tr>
                          <th>Przedział</th>
                          <th>Ilość</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(value, item, index) in summarizeM_SPIRAL"
                          :key="index"
                        >
                          <td>{{ item }}</td>
                          <td>{{ value }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </TableWrapper>
                </TableWrapper>
              </sdCards>
            </BorderLessHeading>
          </a-col>
        </a-row>
      </TicketBox>
      <TicketBox>
        <a-row :gutter="15">
          <a-col :xs="24" class="m_spiral">
            <BorderLessHeading>
              <sdCards title="Matryca M_SPIRAL">
                <DataTables
                  :pageSize="100"
                  :filterOption="false"
                  :filterOnchange="false"
                  :tableData="mSpiralMatrix"
                  :columns="matrixColumns"
                  :rowSelection="false"
                />
              </sdCards>
            </BorderLessHeading>
          </a-col>
        </a-row>
      </TicketBox>
    </div>
    <!-- Matryca M_MAX 4 -->
    <div v-if="activeTab === 4" class="tab tab__4">
      <!-- podsumowanie dla M_MAX -->
      <TicketBox>
        <a-row :gutter="15">
          <a-col :xs="24" class="m_max">
            <BorderLessHeading>
              <sdCards title="Matryca M_MAX Podsumowanie">
                <TableWrapper class="table-data-view table-responsive">
                  <TableWrapper
                    class="table-data-view table-responsive summary-table"
                  >
                    <table style="width: 100%; text-align: left">
                      <thead>
                        <tr>
                          <th>Przedział</th>
                          <th>Ilość</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(value, item, index) in summarizeM_MAX"
                          :key="index"
                        >
                          <td>{{ item }}</td>
                          <td>{{ value }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </TableWrapper>
                </TableWrapper>
              </sdCards>
            </BorderLessHeading>
          </a-col>
        </a-row>
      </TicketBox>

      <TicketBox>
        <a-row :gutter="15">
          <a-col :xs="24" class="m_max">
            <BorderLessHeading>
              <sdCards title="Matryca M_MAX">
                <DataTables
                  :pageSize="100"
                  :filterOption="false"
                  :filterOnchange="false"
                  :tableData="mMaxMatrix"
                  :columns="matrixColumns"
                  :rowSelection="false"
                />
              </sdCards>
            </BorderLessHeading>
          </a-col>
        </a-row>
      </TicketBox>
    </div>
    <!-- WYDRUK / Zamówienie 5 -->
    <div v-if="activeTab === 5" class="tab tab__1">
      <TicketBox>
        <a-row>
          <!-- <OverviewDataList /> -->
          <a-col :xs="24">
            <OverviewCard
              :ocData="main_system_box"
              :bottomStatus="false"
              class="ninjadash-overview-card-support"
            />
          </a-col>
          <!-- <a-col :xl="12" :md="12" :xs="24">
            <OverviewCard
              :ocData="summary_box"
              :bottomStatus="false"
              class="ninjadash-overview-card-support"
            />
          </a-col> -->
        </a-row>
      </TicketBox>
      <!-- STANDARD -->
      <TicketBox v-if="mainSystem === 'standard'">
        <a-row :gutter="15">
          <a-col :xs="24" class="m_standard">
            <BorderLessHeading>
              <sdCards title="Lista produktów: Seria standard">
                <DataTables
                  :pageSize="100"
                  :filterOption="false"
                  :filterOnchange="false"
                  :tableData="OrderForM_STANDARD"
                  :columns="orderColumns"
                  :rowSelection="false"
                />
              </sdCards>
            </BorderLessHeading>
          </a-col>
        </a-row>
      </TicketBox>

      <!-- SPIRAL -->
      <TicketBox v-if="mainSystem === 'spiral'">
        <a-row :gutter="15">
          <a-col :xs="24" class="m_spiral">
            <BorderLessHeading>
              <sdCards title="Lista produktów: Seria Spiral">
                <DataTables
                  :pageSize="100"
                  :filterOption="false"
                  :filterOnchange="false"
                  :tableData="OrderForM_SPIRAL"
                  :columns="orderColumns"
                  :rowSelection="false"
                />
              </sdCards>
            </BorderLessHeading>
          </a-col>
        </a-row>
      </TicketBox>

      <!-- MAX -->
      <TicketBox v-if="mainSystem === 'max'">
        <a-row :gutter="15">
          <a-col :xs="24" class="m_max">
            <BorderLessHeading>
              <sdCards title="Lista produktów: Seria Max">
                <DataTables
                  :pageSize="100"
                  :filterOption="false"
                  :filterOnchange="false"
                  :tableData="OrderForM_MAX"
                  :columns="orderColumns"
                  :rowSelection="false"
                />
              </sdCards>
            </BorderLessHeading>
          </a-col>
        </a-row>
      </TicketBox>
    </div>
  </Main>
</template>

<script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { Main, TableWrapper, BorderLessHeading } from './styled';
  import { TicketBox } from './styled';
  import { useStore } from 'vuex';
  import OverviewCard from '@/components/cards/OverviewCard.vue';
  import { defineComponent, onMounted, computed, ref } from 'vue';
  import DataTables from '@/components/table/DataTable.vue';

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
      DataTables,
      BorderLessHeading,
      // OverviewDataList,
    },

    setup() {
      const route = useRouter();
      const { state, dispatch } = useStore();
      const visible = ref(false);
      const mStandardMatrix = ref([]);
      const mSpiralMatrix = ref([]);
      const mMaxMatrix = ref([]);
      const activeTab = ref(1);

      const OrderForM_STANDARD = ref([]);
      const summarizeM_STANDARD = ref([]);

      const OrderForM_SPIRAL = ref([]);
      const summarizeM_SPIRAL = ref([]);

      const OrderForM_MAX = ref([]);
      const summarizeM_MAX = ref([]);

      const formattedDate = (date) => {
        return dayjs(date).format('DD-MM-YYYY');
      };

      const dataState = computed(() => state.tickets.data);
      const mainSystem = ref('');

      const data = ref();
      const box1 = ref({
        id: 1,
        type: 'primary',
        icon: 'border-alt',
        label: 'Łączna powierzchnia',
        total: '',
        suffix: 'm2',
        prefix: '',
      });
      const box2 = ref({
        id: 1,
        type: 'primary',
        icon: 'screw',
        label: 'Liczba wsporników',
        total: '',
        suffix: '',
        prefix: '',
      });

      const main_system_box = ref({
        id: 1,
        type: 'primary',
        icon: 'heart',
        label: 'Wybrany główny system wsporników',
        total: '',
        suffix: '',
        prefix: '',
      });

      const summary_box = ref({
        id: 1,
        type: 'primary',
        icon: 'invoice',
        label: 'Łączna kwota zamówienia',
        total: '0',
        suffix: '',
        prefix: '',
      });

      const getData = async () => {
        try {
          const id = route?.currentRoute.value.params.id;
          const response = await axios.get(`${API_URL}/application/${id}`);
          data.value = response.data;
          box1.value.total = data.value?.data?.total_area;
          box2.value.total = data.value?.data?.supports_count;
          // main_system_box.total = data.value?.data?.main_system;
          mainSystem.value = data.value?.data?.main_system;
          main_system_box.value.prefix = data.value?.data?.main_system;
          mStandardMatrix.value = data.value?.m_standard;
          mSpiralMatrix.value = data.value?.m_spiral;
          mMaxMatrix.value = data.value?.m_max;
          OrderForM_STANDARD.value = data.value?.order_m_standard;
          OrderForM_SPIRAL.value = data.value?.order_m_spiral;
          OrderForM_MAX.value = data.value?.order_m_max;
          summarizeM_STANDARD.value = data.value?.summarize_m_standard;
          summarizeM_SPIRAL.value = data.value?.summarize_m_spiral;
          summarizeM_MAX.value = data.value?.summarize_m_max;

          // console.log(data.value?.m_max);
          console.log(data.value?.summarize_m_standard);
        } catch (error) {
          console.log(error);
        }
      };

      onMounted(() => {
        // const id = route?.currentRoute.value.params.id;
        getData();

        // dispatch('ticketReadData');
        // dispatch('tableReadData', { endpoint: 'applications' });
        // dispatch('getReportData', {
        //   endpoint: id,
        // });

        // console.log(typeof state.reports.reportData.products);
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

      const matrixColumns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Przedział',
          dataIndex: 'range',
          key: 'range',
        },
        {
          title: 'Wysokość mm',
          dataIndex: 'wys_mm',
          key: 'wys_mm',
        },
        {
          title: 'Warunek',
          dataIndex: 'condition',
          key: 'condition',
        },
        {
          title: 'Ilość w przedziale',
          dataIndex: 'count_in_range',
          key: 'count_in_range',
        },
      ];
      const orderColumns = [
        {
          title: 'Dystans*-Kod',
          dataIndex: 'distance_code',
          key: 'distance_code',
        },
        {
          title: 'Nazwa',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Nazwa Skrócona',
          dataIndex: 'short_name',
          key: 'short_name',
        },
        {
          title: 'Wysokość mm',
          dataIndex: 'height_mm',
          key: 'height_mm',
        },
        {
          title: 'Opakowanie',
          dataIndex: 'packaging',
          key: 'packaging',
        },
        {
          title: 'Paleta',
          dataIndex: 'euro_palet',
          key: 'euro_palet',
        },
        {
          title: 'Cena netto',
          dataIndex: 'price_net',
          key: 'price_net',
        },
        {
          title: 'Ilość',
          dataIndex: 'count',
          key: 'count',
        },
        {
          title: 'Łącznie',
          dataIndex: 'total',
          key: 'total',
        },
      ];

      const summarizeM_STANDARDColumns = [
        {
          title: '30-45',
          dataIndex: '30-45',
          key: '30-45',
        },
        {
          title: '45-70',
          dataIndex: '45-70',
          key: '45-70',
        },
        {
          title: '70-120',
          dataIndex: '70-120',
          key: '70-120',
        },
        {
          title: '120-220',
          dataIndex: '120-220',
          key: '120-220',
        },
        {
          title: '220-320',
          dataIndex: '220-320',
          key: '220-320',
        },
        {
          title: '320-420',
          dataIndex: '320-420',
          key: '320-420',
        },
      ];

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
        data,
        box1,
        box2,
        main_system_box,
        summary_box,
        mStandardMatrix,
        mSpiralMatrix,
        mMaxMatrix,
        matrixColumns,
        activeTab,
        orderColumns,
        OrderForM_STANDARD,
        OrderForM_SPIRAL,
        OrderForM_MAX,
        mainSystem,
        summarizeM_STANDARD,
        summarizeM_SPIRAL,
        summarizeM_MAX,
        summarizeM_STANDARDColumns,
      };
    },
  });

  export default SupportTicket;
</script>

<style lang="scss">
  .summary-table {
    tbody,
    thead {
      td {
        // padding: 2px !important;
      }

      tr {
        &:nth-child(even) {
          background-color: #f8f9fb;
          color: #404040;
        }
      }
    }
  }
  .tabs {
    display: flex;
    align-items: center;
    gap: 35px;
    margin-bottom: 30px;
    background-color: #fff;
    border-radius: 15px;
    padding: 15px 30px;

    li {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
        text-underline-offset: 6px;
      }
    }
    .active {
      color: #f39325;
      text-decoration: underline;
      text-underline-offset: 6px;
    }
  }
  .additional-accessories-list-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 6px;
    padding: 14px 0;
    border-bottom: 1px solid #e8e8e8;
  }

  .m_standard,
  .m_spiral,
  .m_max,
  .summary {
    .euSnSZ table thead tr th:last-child {
      text-align: left;
    }
  }
</style>
