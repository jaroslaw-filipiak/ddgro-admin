<template>
  <div>
    <sdPageHeader title="Zgłoszenia" class="ninjadash-page-header-main">
    </sdPageHeader>
    <Main>
      <a-row :gutter="15">
        <a-col :xs="24">
          <BorderLessHeading>
            <sdCards title="Wszystkie zgłoszenia">
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

<script>
  import { Main, BorderLessHeading } from './styled';
  import { defineComponent, onMounted, computed } from 'vue';
  import DataTables from '@/components/table/DataTable.vue';
  import { useStore } from 'vuex';

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Age',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];
  const columnsPagination = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const dataTableColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Kod',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Skrócona nazwa',
      dataIndex: 'short_name',
      key: 'short_name',
    },
    {
      title: 'Nazwa',
      dataIndex: 'name',
      key: 'name',
      width: '390px',
    },

    {
      title: 'Cena netto',
      dataIndex: 'price_net',
      key: 'price_net',
    },
    {
      title: 'Akcje',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  export default defineComponent({
    name: 'reports-all',
    components: {
      Main,
      DataTables,
      BorderLessHeading,
    },

    setup() {
      const { state, dispatch } = useStore();

      onMounted(() => dispatch('tableReadData', { endpoint: 'accesories' }));

      const tableDataScource = computed(() =>
        state.dataTable.tableData.map((item) => {
          const { id, code, short_name, name, height_mm, price_net } = item;
          return {
            id: `#${id}`,
            code: code,
            short_name: short_name,
            name: <div>{name}</div>,
            height_mm,
            price_net,
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
      return {
        columns,
        columnsPagination,
        tableDataScource,
        dataTableColumn,
      };
    },
  });
</script>
