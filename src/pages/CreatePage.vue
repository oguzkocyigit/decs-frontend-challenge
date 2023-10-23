<template>
  <q-page>
    <q-page-container class="q-gutter-md">
      <q-card>
        <q-card-section class="q-pa-md">
          <div class="text-h5 text-center q-mb-md">
            <span v-if="!userId">Create User</span>
            <span v-else>Edit User</span>
          </div>
          <q-form @submit="submitForm">
            <q-input
              v-model="firstName"
              label="First Name"
              :rules="[val => !!val || 'First Name is required']"
              outlined
            />
            <q-input
              v-model="lastName"
              label="Last Name"
              :rules="[val => !!val || 'Last Name is required']"
              outlined
            />
            <q-input
              v-model="email"
              label="Email"
              :rules="[
            val => !!val || 'Email is required',
            val => isValidEmail(val) || 'Invalid email format'
          ]"
              outlined
            />
            <q-select
              v-model="gender"
              :options="genderOptions"
              label="Gender"
              :rules="[val => !!val || 'Gender is required']"
              outlined
            />
            <q-input
              v-model="phoneNumber"
              label="Phone Number"
              :rules="[
            val => !!val || 'Phone Number is required',
            val => isValidPhoneNumber(val) || 'Invalid phone number format'
          ]"
              outlined
            />
            <q-btn @click="redirectToHomePage" label="Cancel" color="warning" class="q-mt-md q-mr-lg" />
            <q-btn type="submit" :label="!userId ? 'Create' : 'Edit'" color="primary" class="q-mt-md" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import ApiService from '../services/ApiService';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';

export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const router = useRouter();

    const store = useStore();
    const userId = router.currentRoute.value.params.id;

    const firstName = ref(props.user ? props.user.firstName : '');
    const lastName = ref(props.user ? props.user.lastName : '');
    const email = ref(props.user ? props.user.email : '');
    const gender = ref(props.user ? props.user.gender : '');
    const phoneNumber = ref(props.user ? props.user.phoneNumber : '');

    const genderOptions = ['Male', 'Female', 'Other'];

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phoneNumber) => {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNumber);
    };

    const submitForm = async () => {
      if (
        !firstName.value ||
        !lastName.value ||
        !email.value ||
        !gender.value ||
        !phoneNumber.value ||
        !isValidEmail(email.value) ||
        !isValidPhoneNumber(phoneNumber.value)
      ) {
        return;
      }

      try {
        const data = {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          gender: gender.value,
          phoneNumber: phoneNumber.value,
        };

        if (props.user) {
          await ApiService.updateData(props.user.id, data);
          Notify.create({
            message: 'Data updated successfully',
            color: 'positive',
            position: 'top-right',
          });
        } else {
          await ApiService.createData(data);
          Notify.create({
            message: 'Data created successfully',
            color: 'positive',
            position: 'top-right',
          });
        }

        setTimeout(() => {
          router.push('/home');
        }, 1500);

        console.log('Data saved successfully:', data);
      } catch (error) {
        Notify.create({
          message: 'Error saving data. Please try again later.',
          color: 'negative',
          position: 'top-right',
        });
        console.error('Error saving data:', error);
      }
    };

    const redirectToHomePage = () => {
      router.push('/home');
    };

    onMounted(() => {
      if (userId) {
        const user = store.state.users.find(user => user.id === userId);
        if (user) {
          firstName.value = user.firstName;
          lastName.value = user.lastName;
          email.value = user.email;
          gender.value = user.gender;
          phoneNumber.value = user.phoneNumber;
        }
      }
    });

    return {
      router,
      firstName,
      lastName,
      email,
      gender,
      phoneNumber,
      genderOptions,
      isValidEmail,
      isValidPhoneNumber,
      submitForm,
      redirectToHomePage,
      userId
    };
  },
};
</script>

<style scoped>
.q-card {
  width: 500px;
}

.q-card-section {
  width: 100%;
  max-width: 500px;
}

.q-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
