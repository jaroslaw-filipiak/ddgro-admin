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
                :tableData="products"
                :columns="dataTableColumn"
                :rowSelection="false"
              />
            </sdCards>
          </BorderLessHeading> </a-col
        >products
      </a-row>
    </Main>
  </div>
</template>

<script setup>
  import { Main, BorderLessHeading } from './styled';
  import { onMounted, ref } from 'vue';
  import DataTables from '@/components/table/DataTable.vue';
  // import { useStore } from 'vuex';
  import axios from 'axios';

  const products = ref([]);

  // const columns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     filters: [
  //       {
  //         text: 'Joe',
  //         value: 'Joe',
  //       },
  //       {
  //         text: 'Jim',
  //         value: 'Jim',
  //       },
  //       {
  //         text: 'Submenu',
  //         value: 'Submenu',
  //         children: [
  //           {
  //             text: 'Green',
  //             value: 'Green',
  //           },
  //           {
  //             text: 'Black',
  //             value: 'Black',
  //           },
  //         ],
  //       },
  //     ],
  //     // specify the condition of filtering result
  //     // here is that finding the name started with `value`
  //     onFilter: (value, record) => record.name.indexOf(value) === 0,
  //     sorter: (a, b) => a.name.length - b.name.length,
  //     sortDirections: ['descend'],
  //   },
  //   {
  //     title: 'Age',
  //     dataIndex: 'age',
  //     defaultSortOrder: 'descend',
  //     sorter: (a, b) => a.age - b.age,
  //   },
  //   {
  //     title: 'Address',
  //     dataIndex: 'address',
  //     filters: [
  //       {
  //         text: 'London',
  //         value: 'London',
  //       },
  //       {
  //         text: 'New York',
  //         value: 'New York',
  //       },
  //     ],
  //     filterMultiple: false,
  //     onFilter: (value, record) => record.address.indexOf(value) === 0,
  //     sorter: (a, b) => a.address.length - b.address.length,
  //     sortDirections: ['descend', 'ascend'],
  //   },
  // ];
  // const columnsPagination = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //   },
  //   {
  //     title: 'Age',
  //     dataIndex: 'age',
  //   },
  //   {
  //     title: 'Address',
  //     dataIndex: 'address',
  //   },
  // ];
  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     address: 'London No. 2 Lake Park',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     address: 'London No. 2 Lake Park',
  //   },
  //   {
  //     key: '5',
  //     name: 'Jim Red 2',
  //     age: 37,
  //     address: 'London No. 2 Lake Park',
  //   },
  //   {
  //     key: '6',
  //     name: 'Jim Red 2',
  //     age: 35,
  //     address: 'London No. 2 Lake Park',
  //   },
  //   {
  //     key: '7',
  //     name: 'Jim Red 2',
  //     age: 37,
  //     address: 'London No. 2 Lake Park',
  //   },
  // ];
  const dataTableColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'coutry',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Join Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  // const { state } = useStore();

  onMounted(() => getProducts());

  const getProducts = async () => {
    try {
      const { data } = await axios.get('https://ddgro-api.test/api/products');
      console.log(data);
      products.value = data?.data || [];
    } catch (err) {
      console.error(err);
    }
  };

  // const tableDataScource = computed(() =>
  //   state.dataTable.tableData.map((item) => {
  //     const { id, name, country, company, position, status, date } = item;
  //     return {
  //       id: `#${id}`,
  //       key: item.id,
  //       user: <span class='ninjadash-username'>{name}</span>,
  //       country: <span>{country}</span>,
  //       company: <span>{company}</span>,
  //       position,
  //       date,
  //       status: (
  //         <span class={`ninjadash-status ninjadash-status-${status}`}>
  //           {status}
  //         </span>
  //       ),
  //       action: (
  //         <div class='table-actions'>
  //           <router-link class='view' to={`#`}>
  //             <unicon name='eye'></unicon>
  //           </router-link>
  //           <router-link class='edit' to='#'>
  //             <unicon name='edit'></unicon>
  //           </router-link>
  //           <router-link class='delete' to='#'>
  //             <unicon name='trash'></unicon>
  //           </router-link>
  //         </div>
  //       ),
  //     };
  //   })
  // );
</script>
