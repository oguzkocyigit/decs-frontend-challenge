<template>
  <q-table
    :rows="dataTable"
    :columns="columns"
    row-key="id"
    :rows-per-page-options="[10, 15, 20]"
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          flat
          dense
          icon="edit"
          @click="editRow(props.row.id)"
          class="q-mr-sm"
        />
        <q-btn
          flat
          dense
          icon="delete"
          @click="openDeleteConfirmationDialog(props.row.id)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    dataTable: Array,
    columns: Array,
    editRow: Function,
    openDeleteConfirmationDialog: Function,
  },
});
</script>
