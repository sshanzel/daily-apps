import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import icons from '@daily/components/src/icons';
import { VTooltip } from 'v-tooltip';
import DaIconToggle from '@daily/components/src/components/DaIconToggle.vue';
import DaSwitch from '@daily/components/src/components/DaSwitch.vue';
import DaSettings from '../src/components/DaSettings.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(icons);
localVue.directive('tooltip', VTooltip);
localVue.component('da-icon-toggle', DaIconToggle);
localVue.component('da-switch', DaSwitch);

let feed;
let ui;
let store;

beforeEach(() => {
  window.ga = () => {
  };

  ui = {
    namespaced: true,
    state: {
      theme: 'darcula',
      insaneMode: false,
      showTopSites: false,
      enabledCardAnimation: false,
      showOnlyNotReadPosts: false,
      openNewTab: true,
      spaciness: 'eco',
    },
    actions: {
      setTheme: jest.fn(),
      setShowTopSites: jest.fn(),
    },
    mutations: {
      setShowTopSitesModal: jest.fn(),
      setInsaneMode: jest.fn(),
      setSpaciness: jest.fn(),
      setShowOnlyNotReadPosts: jest.fn(),
      setOpenNewTab: jest.fn(),
    },
  };

  feed = {
    namespaced: true,
    state: {},
    actions: {
      refreshFeed: jest.fn(),
    },
  };

  store = new Vuex.Store({
    modules: { ui, feed },
  });
});

it('should commit "setInsaneMode" when toggle is switched', () => {
  const wrapper = mount(DaSettings, { store, localVue });
  wrapper.find('.mode-switch').vm.$emit('toggle', true);
  expect(ui.mutations.setInsaneMode).toBeCalledWith(expect.anything(), true);
});

it('should commit "setSpaciness" when radio is toggled', () => {
  const wrapper = mount(DaSettings, { store, localVue });
  wrapper.find('.radio').vm.$emit('toggle', 'roomy');
  expect(ui.mutations.setSpaciness).toBeCalledWith(expect.anything(), 'roomy');
});

it('should commit "setShowTopSitesModal" when top sites is enabled', () => {
  const wrapper = mount(DaSettings, { store, localVue });
  wrapper.find('.settings__top-sites').vm.$emit('toggle', true);
  expect(ui.mutations.setShowTopSitesModal).toBeCalledWith(expect.anything(), true);
});

it('should dispatch "setShowTopSites" when top sites is disabled', () => {
  const wrapper = mount(DaSettings, { store, localVue });
  wrapper.find('.settings__top-sites').vm.$emit('toggle', false);
  expect(ui.actions.setShowTopSites).toBeCalledWith(expect.anything(), false);
});

it('should dispatch "setTheme" when theme is changed', () => {
  const wrapper = mount(DaSettings, { store, localVue });
  wrapper.find('.settings__theme').vm.$emit('toggle', true);
  expect(ui.actions.setTheme).toBeCalledWith(expect.anything(), 'bright');
});

it('should commit "setShowOnlyNotReadPosts" when setting is changed', () => {
  const wrapper = mount(DaSettings, { store, localVue });
  wrapper.find('.settings__hide-read-posts').vm.$emit('toggle', true);
  expect(ui.mutations.setShowOnlyNotReadPosts).toBeCalledWith(expect.anything(), true);
});

it('should commit "setOpenNewTab" when setting is changed', () => {
  const wrapper = mount(DaSettings, { store, localVue });
  wrapper.find('.settings__toggle-open-tab').vm.$emit('toggle', true);
  expect(ui.mutations.setOpenNewTab).toBeCalledWith(expect.anything(), true);
});
