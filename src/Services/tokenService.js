import { userService } from './userService.js';

export const tokenService = {

  async validarUsuario(context, router) {
    const token = localStorage.getItem('token');
    try {
      const response = await userService.validarUsuario(token);
      if (response.data) {
        context.usuario = response.data;
        console.log(context.usuario.token + "--validacion");
        localStorage.setItem('token', context.usuario.token);
      }
    } catch (error) {
      alert(error.response.data.message);
      router.push('/');
    }
  },








}
