class User {
    isLoggedIn = () => this.get('isLoggedIn') === 'true';

    LoggedUser = () => this.get('account');
  
    set = (key, value) => localStorage.setItem(key, value);
  
    get = key => this.getLocalStorage(key);
  
    getLocalStorage = key => {
      const ret = localStorage.getItem(key);
      if (ret) {
        return ret;
      }
      return null;
    };
  
    login = async (account, password) => {

      this.set('account', account);
      this.set('isLoggedIn', true);
      this.set('password', password);
  
      return true;
    };
  
    logout = async () => {
      if (this.isLoggedIn()) {
        this.set('isLoggedIn', false);
  
      }
    };
  }
  
  export default new User();