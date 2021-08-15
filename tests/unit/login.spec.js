import { mount } from '@vue/test-utils'
import Login from '@/views/Login'
import router from '@/router/index'
import store from '@/store/index'
import flushPromises from 'flush-promises'


describe('Login.vue', () => {

  it('should show loading spinner when click on submit button', async () => {
    const wrapper = mount(Login, {
      store,
      router,
      data() {
        return {
          email: 'atlas@gmail.com',
          password: 'atlasdemo'
        }
      },
    })

    const button = wrapper.findComponent({ name: 'v-btn' })
    
    button.trigger('click')
    await flushPromises()
    expect(wrapper.vm.loading).toBe(true)
  })

})
