import Vue from 'vue';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faHeart as fasHeart,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faGlobe,
  faClock,
  faInfoCircle,
  faDirections,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faSearch,
  fasHeart,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faGlobe,
  faClock,
  faFacebook,
  faInfoCircle,
  faDirections,
  faTrashAlt,
  farHeart,
);
dom.watch();

Vue.component('font-awesome-icon', FontAwesomeIcon);
