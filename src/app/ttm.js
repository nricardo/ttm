import 'angular';
import 'angular-material';

// import './reboot.scss';

import { bootstrap, Component, SetModule } from 'ng2now';

SetModule('ttm', ['ngMaterial']);

@Component({
  selector: 'ttm',
  providers: ['$injector'],
  style: require('./ttm.scss'),
  template: require('./ttm.html'),
})
class TTM {
  constructor($injector) {
    this.$http = $injector.get('$http');
    this.$timeout = $injector.get('$timeout');
    this.$window = $injector.get('$window');

    this.init();
  }

  init() {
    this.next = [];
    this.station = undefined;
  }

  searchStations(query) {
    return this.$http.post(`${TTM.API}/stations/search`, { query: query })
      .then(response => response.data)
      .then(data => {
        this.next = data.next;
        return data.matches;
      });
  }

  handleSearchChange(query) {
    if (query === '') this.init();
  }
}

TTM.API = `http://localhost:3000`;

// start things up!
bootstrap(TTM);
