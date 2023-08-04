import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();


export const userService = {

  validarUsuario(token) {
    return apiClient.post('/usuarios/validarUsuario', { token: token });
  },

  register(user) {
    return apiClient.post('/usuarios/register', user);
  },

  login(user) {
    return apiClient.post('/usuarios/login', user);
  },

  editarUsuario(user) {
    return apiClient.post('/usuarios/editarUsuario', user);
  },

  enviarCorreoNuevaPass(email) {
    return apiClient.post('/usuarios/enviarCorreoNuevaPass', { email: email });
  },

  cambiarContrasenia(token, newPassword) {
    return apiClient.post('/usuarios/cambiarContrasenia', {token: token,newPassword:newPassword});
  },

  eliminarUsuario(token, pass) {
    return apiClient.delete('/usuarios/eliminarUsuario', {  data: {  token: token,pass: pass}});
  },
  
  obtenerUsuarios() {
    return apiClient.get('/usuarios/obtenerUsuarios');
  },

}