"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_share2 = common_vendor.resolveComponent("share");
  (_easycom_navbar2 + _easycom_share2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_share = () => "../../components/share/share.js";
if (!Math) {
  (_easycom_navbar + _easycom_share)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const navBarHeight = common_vendor.ref("");
    const app = getApp();
    const onNavBarAttached = (e) => {
      navBarHeight.value = e.detail.navBarHeight;
    };
    const showShareModal = () => {
      clone_shareModal.value = true;
    };
    const hospital = common_vendor.ref({});
    const services = common_vendor.ref([]);
    common_vendor.onLoad((params) => {
      app.globalData.utils.request({
        url: "/Hospital/index",
        data: {
          hid: params.hid
        },
        success: (res) => {
          hospital.value = res.data.hospital;
          services.value = res.data.services;
        }
      });
    });
    const clone_shareModal = common_vendor.ref(false);
    const toMap = () => {
      const point = bMapTransQQMap(hospital.value.lng, hospital.value.lat);
      const { qmap_key: key } = common_vendor.index.getStorageSync("cfg");
      const referer = app.globalData.name;
      const endPoint = JSON.stringify({
        name: hospital.value.name,
        latitude: point.lat,
        longitude: point.lng
      });
      common_vendor.index.navigateTo({
        url: "plugin://routePlan/index?key=" + key + "&referer=" + referer + "&endPoint=" + endPoint + "&navigation=1"
      });
      common_vendor.wx$1.navigateTo({
        url: "plugin://routePlan/index?key=" + key + "&referer=" + referer + "&endPoint=" + endPoint
      });
    };
    const bMapTransQQMap = (lng, lat) => {
      let x_pi = 3.141592653589793 * 3e3 / 180;
      let x = lng - 65e-4;
      let y = lat - 6e-3;
      let z = Math.sqrt(x * x + y * y) - 2e-5 * Math.sin(y * x_pi);
      let theta = Math.atan2(y, x) - 3e-6 * Math.cos(x * x_pi);
      let lngs = z * Math.cos(theta);
      let lats = z * Math.sin(theta);
      return {
        lng: lngs,
        lat: lats
      };
    };
    const toService = (e) => {
      common_vendor.index.navigateTo({
        url: "../service/index?hid=" + hospital.value.id + "&svid=" + e.currentTarget.dataset.svid
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onNavBarAttached),
        b: common_vendor.p({
          ["title-text"]: "",
          isHeight: false,
          isWhite: true,
          background: "none"
        }),
        c: hospital.value.avatar_url,
        d: hospital.value.avatar_url,
        e: common_vendor.t(hospital.value.name),
        f: common_vendor.t(hospital.value.rank),
        g: common_vendor.t(hospital.value.label),
        h: common_vendor.o(showShareModal),
        i: common_assets._imports_0$3,
        j: common_vendor.t(hospital.value.city),
        k: common_vendor.t(hospital.value.district),
        l: common_vendor.t(hospital.value.address),
        m: common_vendor.o(toMap),
        n: common_vendor.f(services.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.use_switch == 1
          }, item.use_switch == 1 ? {
            b: item.logo_image ? item.logo_image_url : "../../static/images/avatar.jpg",
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.intro),
            e: common_vendor.t(item.price)
          } : {}, {
            f: common_vendor.o(toService, index),
            g: item.id,
            h: index
          });
        }),
        o: common_vendor.s("position:absolute;top:" + navBarHeight.value + "rpx;padding-top:65rpx;overflow:hidden;width:100%;"),
        p: common_vendor.p({
          shareModal: clone_shareModal.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
