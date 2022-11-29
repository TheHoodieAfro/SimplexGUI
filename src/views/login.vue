<template>
  <div class="center">
    <img id="profile-img" src="https://www.iconpacks.net/icons/1/free-user-login-icon-305-thumb.png"
      class="profile-img-card" sizes="50px"/>
    <Form @submit="handleLogin" :validation-schema="schema">
      <div class="form-group">
        <label for="email">Email:&nbsp;&nbsp;</label>
        <Field name="email" type="text" class="form-control" />
        <ErrorMessage name="email" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="password">Password:&nbsp;&nbsp;</label>
        <Field name="password" type="password" class="form-control" />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "LoginView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("email is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
.center {
  margin: auto;
  width: 50%;
  padding: 20px;
}

.form-control{
  border-color: black;
  border: 10px;
}
</style>