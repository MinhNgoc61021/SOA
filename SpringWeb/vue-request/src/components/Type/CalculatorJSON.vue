<template>
  <div class="ctn">
    <div class="form">
      <b-card class="m-5 form-input">
        <template v-slot:header>
          JSON
        </template>

        <b-form @submit.prevent="onSubmit">
          <b-form-group
            id="input-group-1"
            label="A"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.a"
              type="number"
              size="sm"
              placeholder="Số A"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="B" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.b"
              type="number"
              size="sm"
              placeholder="Số B"
            ></b-form-input>
          </b-form-group>
        </b-form>
        <p>Result: {{ form.result }}</p>
      </b-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'JSON',
    data() {
      return {
        form: {
          a: '',
          b: '',
          result: '',
        },
        busy: false,
      }
    },
    watch: {
      'form.a': function () {
        this.onSubmit();
      },
      'form.b': function () {
        this.onSubmit();
      }
    },
    methods: {
      onSubmit() {
        axios({
          url:`${process.env.VUE_APP_API_URL}/calculating/sum`,
          data: {
            "firstNumber": this.form.a,
            "secondNumber": this.form.b,
          },
          method: 'post',
          changeOrigin: true,
          contentType: 'application/json',
        }).then((response) => {
          this.form.result = response.data;
        }).catch((err) => {
          console.log(err);
        })
      },
    }
  }
</script>
<style scoped>
  .ctn {
    display: flex;
    justify-content: center;
    margin: 10px auto;
    position: fixed;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    padding-top: 60px;
  }

  .form {
    width: 70%;
    display: flex;
    justify-content: center;
    height: 300px;
  }

  .form-input {
    width: 50%;
    height: 100%;
  }

  @media only screen and (max-width: 700px) {
    .ctn {
      margin: 0;
    }
    .form-input {
        min-width: 300px;
          /*-moz-transform: translate(50%,-50%);*/
          /*-webkit-transform: translate(50%,-50%);*/
          /*-o-transform: translate(50%,-50%);*/
    }
  }
  @media only screen and (min-width: 1000px) {
    .ctn {
      margin: 0;
    }
    .form-input {
        max-width: 450px;
          /*-moz-transform: translate(50%,-50%);*/
          /*-webkit-transform: translate(50%,-50%);*/
          /*-o-transform: translate(50%,-50%);*/
    }
  }

</style>

