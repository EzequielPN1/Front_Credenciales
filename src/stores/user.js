import { defineStore } from "pinia";


export const useUserStore = defineStore("user", {
  state: () => {
    return {
      usuario: {
        nombre: "",
        email: "",
        fechaNacimiento: "",
        isAdmin:false,
        token: "",
      },
   

    };
  },
  actions: {
    
    borrarStore() {
      this.usuario.nombre = "";
      this.usuario.email = "";
      this.usuario.fechaNacimiento = "";
      this.usuario.token = "";
    }
  }
});