"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_counter2 = common_vendor.resolveComponent("counter");
  const _easycom_formater2 = common_vendor.resolveComponent("formater");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_counter2 + _easycom_formater2 + _easycom_uni_popup2)();
}
const _easycom_counter = () => "../../components/counter/counter.js";
const _easycom_formater = () => "../../components/formater/formater.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_counter + _easycom_formater + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "particulars",
  setup(__props) {
    common_vendor.onLoad((params) => {
      getOrderDetail(params);
    });
    const app = getApp();
    const order = common_vendor.ref({});
    const orderStatus = common_vendor.computed(() => {
      const map = {
        "待支付": "10",
        "待服务": "20",
        "已完成": "30",
        "已取消": "40"
      };
      return map[order.value.trade_state];
    });
    const onCounterOver = () => {
      getOrderDetail();
    };
    const qrcodePopup = common_vendor.ref();
    const dopay = () => {
      qrcodePopup.value.open("center");
      const qr = new common_vendor.UQRCode();
      qr.data = order.value.code_url;
      qr.size = 150;
      qr.make();
      var canvasContext = common_vendor.index.createCanvasContext("qrcode");
      qr.canvasContext = canvasContext;
      qr.drawCanvas();
    };
    const payment = () => {
      common_vendor.index.switchTab({
        url: "../order/order"
      });
    };
    const getOrderDetail = (params) => {
      app.globalData.utils.request({
        url: "/order/detail",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: {
          oid: params.oid
        },
        success(res) {
          order.value = res.data;
        },
        fail() {
        }
      });
    };
    const makePhoneCall = (e) => {
      common_vendor.index.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.tel
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$5,
        b: common_vendor.n("od-jd od-jd-" + orderStatus.value),
        c: orderStatus.value == 10
      }, orderStatus.value == 10 ? {
        d: common_vendor.o(onCounterOver),
        e: common_vendor.p({
          second: order.value._exp_time
        }),
        f: common_vendor.t(order.value.price),
        g: common_vendor.o(dopay),
        h: common_vendor.o(payment)
      } : {}, {
        i: orderStatus.value == 20
      }, orderStatus.value == 20 ? common_vendor.e({
        j: order.value.service_state == 0
      }, order.value.service_state == 0 ? {} : {}, {
        k: order.value.service_state == 1
      }, order.value.service_state == 1 ? {} : {}) : {}, {
        l: orderStatus.value == 30
      }, orderStatus.value == 30 ? {} : {}, {
        m: orderStatus.value == 40
      }, orderStatus.value == 40 ? {} : {}, {
        n: orderStatus.value == 20
      }, orderStatus.value == 20 ? {
        o: order.value._staff.avatar_url,
        p: common_vendor.t(order.value._staff.nickname),
        q: common_vendor.o(makePhoneCall),
        r: order.value._staff.mobile
      } : {}, {
        s: common_vendor.t(order.value.service_name),
        t: order.value.service_stype <= 20
      }, order.value.service_stype <= 20 ? common_vendor.e({
        v: common_vendor.t(order.value.hospital_name),
        w: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        x: common_vendor.t(order.value.client_name),
        y: common_vendor.t(order.value.client_sex == 1 ? "男" : "女"),
        z: common_vendor.t(order.value.client_age),
        A: common_vendor.t(order.value.tel),
        B: order.value.service_stype == 15
      }, order.value.service_stype == 15 ? {
        C: common_vendor.t(order.value.receiveAddress)
      } : {}) : {}, {
        D: order.value.service_stype > 20 && order.value.service_stype < 100
      }, order.value.service_stype > 20 && order.value.service_stype < 100 ? {
        E: common_vendor.t(order.value.hospital_name),
        F: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        G: common_vendor.t(order.value.address.userName),
        H: common_vendor.t(order.value.address.telNumber),
        I: common_vendor.t(order.value.address.cityName),
        J: common_vendor.t(order.value.address.countyName),
        K: common_vendor.t(order.value.address.detailInfo)
      } : {}, {
        L: order.value.service_stype > 100
      }, order.value.service_stype > 100 ? {
        M: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        N: common_vendor.t(order.value.client_name),
        O: common_vendor.t(order.value.client_sex == 1 ? "男" : "女"),
        P: common_vendor.t(order.value.client_age),
        Q: common_vendor.t(order.value.client_mobile),
        R: common_vendor.t(order.value.address.address)
      } : {}, {
        S: common_vendor.t(order.value.demand),
        T: common_vendor.t(order.value.tel),
        U: common_vendor.p({
          timestamp: order.value.order_start_time,
          format: "YYYY-MM-dd hh:mm"
        }),
        V: common_vendor.t(order.value.price),
        W: orderStatus.value == 20
      }, orderStatus.value == 20 ? {
        X: common_vendor.t(order.value.price),
        Y: common_vendor.p({
          timestamp: order.value.pay_time,
          format: "YYYY-MM-dd hh:mm"
        })
      } : {}, {
        Z: common_vendor.t(order.value.out_trade_no),
        aa: common_vendor.o(payment),
        ab: common_assets._imports_0$4,
        ac: common_vendor.sr(qrcodePopup, "1a0d4418-6", {
          "k": "qrcodePopup"
        }),
        ad: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
