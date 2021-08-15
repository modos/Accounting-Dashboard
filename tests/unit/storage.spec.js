import { saveUser, getUserID, getUser } from '@/storage'

describe('Local Storage', () => {

    const fakeLocalStorage = (function () {
        let store = {};
      
        return {
          getItem: function (key) {
            return store[key] || null
          },
          setItem: function (key, value) {
            store[key] = value
          },
          removeItem: function (key) {
            delete store[key]
          },
          clear: function () {
            store = {}
          }
        };
      })();

    beforeAll(() => {
        window.localStorage = fakeLocalStorage;
      });

      
      const user = {
          name: 'mohammad hossein',
          email: 'modos.m98@gmail.com',
          mobile: '09134567842',
          role: 'admin',
          id: '@489453hjhewuihg4'
        }
        
        saveUser(user)

    it('should save user in local storage', () => {
        expect(JSON.parse(window.localStorage.getItem('user'))).toEqual(user)
    })

    it ('should get user from local storage', () => {
        expect(getUser()).toEqual(user)
    })

    it('should get user id from local storage', () => {
        expect(getUserID()).toBe(user.id)
    })
})