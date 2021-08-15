import store from '@/store/index'
import * as fb from '@/firebase'


describe('Firebase', () => {

  const firebaseMock = {
    collections: {
      notesCollection : [
        {
          data: () => {
            return {
              content: 'note1',
              user_id: 'AIzaSyDdq2aqoduVWbIrKK9HDSMUmFWPduffaM0'
            }
          }
        },
        {
          data: () => {
            return {
              content: 'note2',
              user_id: 'AIzaSyDdq2aqoduVWbIrKK9HDSMUmFWPduffaM0'
            }
          }
        },
        {
          data: () => {
            return {
              content: 'note3',
              user_id: 'AIzaSyDdq2aqoduVWbIrKK9HDSMUmFWPduffaM0'
            }
          }
        },
      ]
    }
  }

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

    it ('should login user', async () => {

      jest.spyOn(fb.auth, 'signInWithEmailAndPassword').mockImplementation((email, password) => {
        return {
          user: {
            uid: 'AIzaSyDdq2aqoduVWbIrKK9HDSMUmFWPduffaM0'
          }
        }
    })

    jest.spyOn(fb.usersCollection, 'doc').mockImplementation((uid) => {
      return {
        get: () => {
          return {
            data : () => {
             return {
              id : uid,
             }
            }
          }
        }
      }
    })

      const email = 'atlas@gmail.com';
      const password = 'atlasdemo';
      await store.dispatch('login', {email, password})

      expect(fb.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(email, password)

    })

    it ('should save user data in local storage', async () => {

      jest.spyOn(fb.usersCollection, 'doc').mockImplementation((uid) => {
        return {
          get: () => {
            return {
              data : () => {
               return {
                id : uid,
               }
              }
            }
          }
        }
      })

      await store.dispatch('fetchUserProfile', {uid: 'AIzaSyDdq2aqoduVWbIrKK9HDSMUmFWPduffaM0'})

      expect(JSON.parse(window.localStorage.getItem('user'))).toEqual({id: 'AIzaSyDdq2aqoduVWbIrKK9HDSMUmFWPduffaM0'})
    })

    it ('should add to buy and pay collection', async () => {

      let res = {}

      jest.spyOn(fb.buyAndPayCollection, 'doc').mockImplementation(() => {
        return {
          set: (data) => {
            res = {
              amount: 100,
              description: 'یونیت تست',
              account_side: 'جست',
              type: 'تست',
              date: 1
            }
          }
        }
      })

      const data = {
        amount: 100,
        description: 'یونیت تست',
        account_side: 'جست',
        type: 'تست',
        date: 1
      }


      await store.dispatch('submitBuyAndPay', data)

      expect(res).toEqual(data)


    })

    it ('should get notes', async () => {

      let res = []
      
      jest.spyOn(fb.notesCollection, 'where').mockImplementation((user_id, equal, id) => {
        res = firebaseMock.collections.notesCollection
        
        return {
          get: () => {
            return firebaseMock.collections.notesCollection
          }
        }
      })

      await store.dispatch('getNotes', firebaseMock.collections.notesCollection)

      expect(res).toEqual(firebaseMock.collections.notesCollection)
    })
})

