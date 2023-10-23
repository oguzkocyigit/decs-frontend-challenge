<template>
  <q-page>
    <q-page-container class="q-gutter-y-md">
      <div v-if="loading" class="text-h6 q-mb-md text-center">
        <q-spinner-dots color="primary" size="40px"/>
      </div>
      <div v-else-if="dataTable.length === 0" class="text-h6 q-mb-md text-center">
        <p>No data available</p>
        <q-btn @click="insertData" color="primary" label="Create new User"/>
      </div>
      <div v-else>
        <div class="q-pa-md">
          <q-page-container>
            <q-row>
              <q-col cols="12">
                <div class="q-pa-md q-mb-md">
                  <q-btn class="float-right" @click="insertData" color="primary" label="Create new User"/>
                </div>
              </q-col>
              <q-col cols="12">
                <div class="q-pa-md q-mb-md">
                  <data-table :data-table="dataTable" :columns="columns" :edit-row="editRow" :open-delete-confirmation-dialog="openDeleteConfirmationDialog" />
                </div>
              </q-col>
            </q-row>
          </q-page-container>
        </div>
      </div>
    </q-page-container>
    <DeleteDialog :confirm="confirm" :deleteId="deleteId" @close-dialog="confirm = false" @delete="deleteRow" />
  </q-page>
</template>

<script>
import {onMounted, ref, computed} from 'vue';
import { useStore } from 'vuex';
import ApiService from '../services/ApiService';
import {useRouter} from 'vue-router';
import { Notify } from 'quasar';
import DeleteDialog from '../components/DeleteDialog.vue';
import DataTable from '../components/DataTable.vue';

export default {
  components: {
    DeleteDialog,
    DataTable
  },
  setup() {
    const loading = ref(true);

    const store = useStore();
    const dataTable = computed(() => store.getters.getUsers);
    const columns = [
      { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
      { name: 'createdAt', label: 'Created At', align: 'left', field: 'createdAt', sortable: true },
      { name: 'firstName', label: 'First Name', align: 'left', field: 'firstName', sortable: true },
      { name: 'lastName', label: 'Last Name', align: 'left', field: 'lastName', sortable: true },
      { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true },
      { name: 'phoneNumber', label: 'Phone Number', align: 'left', field: 'phoneNumber', sortable: true },
      { name: 'gender', label: 'Gender', align: 'left', field: 'gender', sortable: true },
      { name: 'actions', label: 'Actions', align: 'center' },
    ];
    const router = useRouter();

    const insertData = () => {
      router.push('/create');
    };

    const fetchData = async () => {
      loading.value = true;

      try {
        await store.dispatch('fetchData');
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        loading.value = false;
      }
    };

    const editRow = (id) => {
      router.push(`/edit/${id}`);
    };

    const confirm = ref(false);
    const deleteId = ref(null);

    const openDeleteConfirmationDialog = (id) => {
      deleteId.value = id;
      confirm.value = true;
    };

    const deleteRow = (id) => {
      loading.value = true;
      ApiService.deleteData(id)
        .then(() => {
          dataTable.value = dataTable.value.filter(user => user.id !== id);
          Notify.create({
            message: 'Data deleted successfully',
            color: 'positive',
            position: 'top-right',
          });
        })
        .catch(error => {
          console.error('Error deleting data:', error);
          Notify.create({
            message: 'Error deleting data. Please try again later.',
            color: 'negative',
            position: 'top-right',
          });
        })
        .finally(() => {
          loading.value = false;
        });
    };

    onMounted(() => {
      fetchData();
    });

    return {
      loading,
      insertData,
      dataTable,
      columns,
      editRow,
      deleteRow,
      openDeleteConfirmationDialog,
      confirm,
      deleteId
    };
  },
};
</script>

<style scoped>
.q-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
