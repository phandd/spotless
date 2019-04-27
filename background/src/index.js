import { wrapStore } from 'react-chrome-redux';
import configureStore from './store/configureStore'

const store = configureStore()

wrapStore(store, { portName: 'spotless' });
