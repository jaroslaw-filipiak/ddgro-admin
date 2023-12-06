<template>
  <div>
    <sdPageHeader title="Produkty" class="ninjadash-page-header-main">
    </sdPageHeader>

    <Main>
      <a-row :gutter="15">
        <a-col :xs="24">
          <BorderLessHeading>
            <sdCards title="Wszystkie produkty">
              <DataTables
                :filterOption="true"
                :filterOnchange="true"
                :tableData="tableDataScource"
                :columns="dataTableColumn"
                :rowSelection="false"
              />
            </sdCards>
          </BorderLessHeading>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script setup>
  import { Main, BorderLessHeading } from './styled';
  import { onMounted, computed } from 'vue';
  import DataTables from '@/components/table/DataTable.vue';
  import { useStore } from 'vuex';

  const dataTableColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nazwa',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Seria',
      dataIndex: 'series',
      key: 'series',
    },
    {
      title: 'Kod',
      dataIndex: 'distance_code',
      key: 'distance_code',
    },
    {
      title: 'Nazwa skrócona',
      dataIndex: 'short_name',
      key: 'short_name',
    },
    {
      title: 'Cena netto',
      dataIndex: 'price_net',
      key: 'price_net',
    },

    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  const store = useStore();

  onMounted(() => {
    store.dispatch('tableReadData', {
      endpoint: 'products',
    });
  });

  const tableDataScource = computed(() =>
    store.state.dataTable.tableDataFiler.map((item) => {
      const { id, name, series, distance_code, short_name, price_net } = item;
      return {
        id: `#${id}`,
        name: <span class='ninjadash-username'>{name}</span>,
        series: series,
        distance_code: <span>{distance_code}</span>,
        short_name: <span>{short_name}</span>,
        price_net: price_net,
        status: (
          <span class={`ninjadash-status ninjadash-status-${'status'}`}>
            status
          </span>
        ),
        action: (
          <div class='table-actions'>
            <router-link class='view' to={`#`}>
              <unicon name='eye'></unicon>
            </router-link>
            <router-link class='edit' to='#'>
              <unicon name='edit'></unicon>
            </router-link>
            <router-link class='delete' to='#'>
              <unicon name='trash'></unicon>
            </router-link>
          </div>
        ),
      };
    })
  );
</script>
