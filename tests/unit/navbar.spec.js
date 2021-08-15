import {shallowMount } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'


describe('navbar.vue', () => {

  it('should show navigation drawer', () => {
    const wrapper = shallowMount(Navbar)

    const button = wrapper.findComponent({ name: 'v-btn' })
    
    expect(button.exists()).toBe(true)

  })

  it('should logout button has correct name', () => {
    const wrapper = shallowMount(Navbar)

    const button = wrapper.findComponent({ name: 'v-btn' })
    
    expect(button.element.textContent).toBe('خروج')
    
  })
})
