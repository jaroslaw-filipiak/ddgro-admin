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
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
    {
      key: '5',
      name: 'Jim Red 2',
      age: 37,
      address: 'London No. 2 Lake Park',
    },
    {
      key: '6',
      name: 'Jim Red 2',
      age: 35,
      address: 'London No. 2 Lake Park',
    },
    {
      key: '7',
      name: 'Jim Red 2',
      age: 37,
      address: 'London No. 2 Lake Park',
    },
  ];
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
      title: 'Actions',
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

      onMounted(() => dispatch('tableReadData', { endpoint: 'products' }));

      const tableDataScource = computed(() =>
        state.dataTable.tableData.map((item) => {
          const { id, name, series } = item;
          return {
            id: `#${id}`,
            name: <span class='ninjadash-username'>{name}</span>,
            series: series,
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
        data,
        columns,
        columnsPagination,
        tableDataScource,
        dataTableColumn,
      };
    },
  });
</script>
