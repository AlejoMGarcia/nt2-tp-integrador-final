<template>

  <section class="src-components-registerform">
       <vue-form :state="formstate" @submit.prevent="registerClient()">

        <validate tag="div">
          <label for="name">Nombre</label>
          <input type="text" id="name" name="name" class="form-control"
            v-model.trim="formData.name" 
            required :minlength="minLength" :maxlength="maxLength"
            autocomplete="off">

          <field-messages name="name" show="$dirty">
            <div slot="required" class="alert alert-danger mt-2">
              El nombre es requerido.
            </div>
            <div slot="minlength" class="alert alert-danger mt-2">
              El nombre debe tener al menos {{minLength}} caracteres.
            </div>
            <div v-if="hasMaxLength()" class="alert alert-danger mt-2">
              El nombre debe tener como máximo {{maxLength}} caracteres.
            </div>
            <div v-if="hasSpaceBetween()" class="alert alert-danger mt-2">
              El nombre no puede contener espacios intermedios.
            </div>
          </field-messages>
        </validate>
        <br>

        <validate tag="div">
          <label for="lastName">Apellido</label>
          <input type="text" id="lastName" name="lastName" class="form-control"
            v-model.trim="formData.lastName" 
            required :minlength="minLength" :maxlength="maxLength"
            autocomplete="off">

          <field-messages name="lastName" show="$dirty">
            <div slot="required" class="alert alert-danger mt-2">
              El apellido es requerido.
            </div>
            <div slot="minlength" class="alert alert-danger mt-2">
              El apellido debe tener al menos {{minLength}} caracteres.
            </div>
            <div v-if="hasMaxLength()" class="alert alert-danger mt-2">
              El apellido debe tener como máximo {{maxLength}} caracteres.
            </div>
            <div v-if="hasSpaceBetween()" class="alert alert-danger mt-2">
              El apellido no puede contener espacios intermedios.
            </div>
          </field-messages>
        </validate>
        <br>

        <validate tag="div">
          <label for="gender" class=" mr-4">Género</label>
          <select id="gender" name="gender" class="btn btn-secondary dropdown-toggle" v-model="formData.gender">
            <option v-bind:value="{ text: 'masculino' }">Masculino</option>
            <option v-bind:value="{ text: 'femenino' }">Femenino</option>
            <option v-bind:value="{ text: 'no-binario' }">No Binario</option>
            <option v-bind:value="{ text: 'no-responde' }">No Responde</option>
          </select>
          
          <field-messages name="gender">
            <div v-if="completeGender" class="alert alert-danger mt-2">
              El genero es requerido.
            </div>
            
          </field-messages>
        </validate>
        <br>

        <div>
          <Datepicker name="Fecha de Nacimiento" required
          id="birthdate" placeholder="Fecha de Nacimiento"
          v-model="formData.birthdate" >
          </Datepicker>
        </div>
        <br>

        <validate tag="div">
          <label for="legalAddress" >Domicilio Legal</label>
          <input type="text" id="legalAddress" name="legalAddress" class="form-control"
            v-model.trim="formData.legalAddresss" 
            required
            autocomplete="off">

            <field-messages name="legalAddress" show="$dirty">
              <div slot="required" class="alert alert-danger mt-2">
                El domicilio legal es requerido.
              </div>
            </field-messages>
        </validate>
        <br>

        <validate tag="div">
          <label for="email" class="mt-3">Email</label>
          <input 
            type="email"
            id="email"
            class="form-control"
            v-model.trim="formData.email"
          >
          <field-messages name="email" show="$dirty">
            <div slot="required" class="alert alert-danger mt-2">
              El email es requerido.
            </div>
          </field-messages>
        </validate>
        <br>

        <validate tag="div">
          <label for="nationality" class=" mr-4">Nacionalidad</label>
          <select id="nationality" name="nationality" class="btn btn-secondary dropdown-toggle" v-model="formData.nationality">
            <option v-bind:value="{ text: 'argentino' }">Argentino</option>
            <option v-bind:value="{ text: 'brasil' }">Brasil</option>
            <option v-bind:value="{ text: 'chile' }">Chile</option>
            <option v-bind:value="{ text: 'uruguay' }">Uruguay</option>
          </select>
          
          <field-messages name="nationality">
            <div v-if="completeNationality" class="alert alert-danger mt-2">
              El genero es requerido.
            </div>
            
          </field-messages>
        </validate>
        <br>
        
        <validate tag="div">
          <label for="password" >Contraseña</label>
          <input type="password" id="password" name="password" class="form-control"
            v-model.trim="formData.password" 
            required
            autocomplete="off">

            <field-messages name="password" show="$dirty">
              <div slot="required" class="alert alert-danger mt-2">
                La contraseña es requerido.
              </div>
            </field-messages>
        </validate>
        <br>

        <validate tag="div">
          <label for="repeatPassword" >Repetir contraseña</label>
          <input type="password" id="repeatPassword" name="repeatPassword" class="form-control"
            v-model.trim="formData.repeatPassword" 
            required
            autocomplete="off">

            <field-messages name="repeatPassword" show="$dirty">
              <div slot="required" class="alert alert-danger mt-2">
                Debe volver a escribir la contraseña para validarla.
              </div>
            </field-messages>
        </validate>
        <br>
        <div v-if="peticion" class="spinner-border align-center mt-3" role="status">
          <span class="sr-only">Creando cliente...</span>
        </div>

        <button class="btn btn-success my-4"  type="submit">Registrarme</button>
      </vue-form>
      
    </section>

</template>

<script>

import Datepicker from 'vuejs-datepicker';

  export default  {
    name: 'src-components-registerform',
    props: [],
    components: {
      Datepicker
    },
    mounted () {

    },
    data () {
      return {
        registerClientUrl: 'http://localhost:3000/register',
        peticion: false,
        completeGender: false,
        completeNationality: false,
        minLength : 3,
        maxLength : 15,
        minAge : 18,
        formstate : {},
        isValidAge : true,
        formData : this.getInitialData(),
        error: null,
      }
    },
    methods: {
      getInitialData(){
        return {
          name : null,
          lastName: null,
          gender: null,
          birthdate: null,
          legalAddress: null,
          email: null,
          nationality: null,
          password: null,
          repeatPassword: null
        }
      },
      async registerClient(){
        if(!this.validPassword()) return
        if(!this.validateGender()) return
        if(this.validateAge()) return
        this.peticion = true

        try {
           let { data: respuesta } = await this.axios.post(this.registerClientUrl, this.formData, {'content-type':'application/json'});
          this.token = respuesta.token
          this.peticion = false
        }
        catch(error) {
          console.error('Error en registro de cliente', error)
          this.error = 'Error al registrar el cliente.'
          this.peticion = false
        }
      },
      validPassword() {
        let validPassword = true
        if(this.password != this.repeatPassword) {
          this.error = 'Las contraseñas no son iguales'
          validPassword = false
        }
        return validPassword
      },
      validateGender() {
        let validad = true
        if(!this.formData.gender) {
          this.completeGender = true
          validad = false
        }
        console.log('validGender ' + validad) 
        return validad
      },
      hasMaxLength(){
        return this.formData.name && this.formData.name.length == this.maxLength
      },
      hasSpaceBetween(){
        return this.formData.name && this.formData.name.includes(' ')
      },
      validateAge() {
        return true
        // this.isValidAge = this.formData.birthdate && this.formData.birthdate >= this.minAge
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-registerform {

  }

  .jumbotron {
    background-color: lightsteelblue;
    color: dimgray;
  }

  #gender {
    width: 25%;
  }
</style>
