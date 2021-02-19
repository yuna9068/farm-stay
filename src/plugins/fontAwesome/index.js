import Vue from 'vue';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faHeart,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faGlobe,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faSearch,
  faHeart,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faGlobe,
  faClock,
  faFacebook,
);
dom.watch();

Vue.component('font-awesome-icon', FontAwesomeIcon);
