<template>
  <q-page className="flex flex-center">
    <q-card style="max-width: 600px;" className="q-pa-md q-gutter-md" color="primary" text-color="white">
      <q-card-section>
        <div class="text-h5 q-mb-md text-center">Login</div>
        <q-input v-model="email" label="Email" outlined dense ref="emailInput" :rules="emailRules"/>
        <q-input v-model="password" label="Password" outlined dense type="password" ref="passwordInput"
                 :rules="passwordRules"/>
        <q-btn label="Login" @click="login" class="q-mt-md full-width"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {ref} from 'vue';
import {useQuasar} from 'quasar';
import {useRouter} from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const $q = useQuasar();
    const router = useRouter();

    const emailRules = [
      (v) => !!v || 'Email is required',
      (v) => /.+@.+/.test(v) || 'Email must be valid',
    ];

    const passwordRules = [
      (v) => !!v || 'Password is required',
      (v) => v && v.length >= 6 || 'Password must be at least 6 characters',
    ];

    const emailInput = ref(null);
    const passwordInput = ref(null);

    const login = () => {
      if (emailInput.value.validate() && passwordInput.value.validate()) {
        if (email.value === 'example@example.com' && password.value === 'password') {
          router.push('/home');
        } else {
          $q.notify({
            type: 'negative',
            message: 'Invalid email or password',
          });
        }
      }
    };

    return {
      email,
      password,
      emailRules,
      passwordRules,
      emailInput,
      passwordInput,
      login,
    };
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
  max-width: 200px; /* Adjust the maximum width as needed */
  margin: 0 auto; /* Center the button */
}
</style>
