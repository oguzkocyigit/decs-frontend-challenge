<template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete_forever" color="primary" text-color="white" />
        <span class="q-ml-sm">Are you sure you want to delete this data?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn @click="closeDialog()" label="Cancel" color="warning" v-close-popup />
        <q-btn @click="deleteConfirmed()" label="Yes" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    confirm: Boolean,
    deleteId: Number,
  },
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('close-dialog');
    };

    const deleteConfirmed = () => {
      emit('delete', props.deleteId);
      closeDialog();
    };

    return {
      closeDialog,
      deleteConfirmed,
    };
  },
});
</script>
