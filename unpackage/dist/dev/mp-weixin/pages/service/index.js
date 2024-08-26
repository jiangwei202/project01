"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_dtPicker2 = common_vendor.resolveComponent("dtPicker");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_dtPicker2 + _easycom_uni_popup2)();
}
const _easycom_dtPicker = () => "../../components/dtPicker/dtPicker2.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_dtPicker + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const popup = common_vendor.ref();
    const qrcodePopup = common_vendor.ref();
    common_vendor.onLoad((options) => {
      main_load(options);
    });
    const service = common_vendor.ref([]);
    const hospitals = common_vendor.ref([]);
    const hospital_index = common_vendor.ref(0);
    const order = common_vendor.reactive({
      price: "",
      starttime: "",
      address: {
        userName: "",
        cityName: "",
        countyName: "",
        detailInfo: ""
      },
      receiveAddress: "",
      tel: "",
      demand: ""
    });
    const client = common_vendor.reactive({
      name: ""
    });
    const is_xieyi = common_vendor.ref(false);
    const cfg = common_vendor.reactive({
      page_xy: "",
      page_fw: ""
    });
    const validMobile = common_vendor.reactive({
      phone: "",
      validCode: ""
    });
    const countdown = common_vendor.reactive({
      validText: "获取验证码",
      time: 60
    });
    const main_load = (options) => {
      app.globalData.utils.request({
        url: "/Service/order",
        data: {
          svid: options.svid
        },
        success: (res) => {
          service.value = res.data.service;
          console.log(service.value);
          hospitals.value = res.data.hospitals;
          const hospitalsData = common_vendor.toRaw(hospitals.value);
          if (options.hid > 0) {
            for (let i = 0; i < hospitalsData.length; i++) {
              if (hospitalsData[i].id == options.hid) {
                hospital_index.value = i;
                order.price = hospitalsData[i].service_price;
                break;
              }
            }
          }
        }
      });
    };
    const handleTap = () => {
    };
    const onHospitalChange = (e) => {
      const value = parseInt(e.detail.value);
      hospital_index.value = value;
      order.price = common_vendor.toRaw(hospitals.value)[value].service_price;
    };
    const onStartTimeChange = (e) => {
      order.starttime = e.detail.value;
    };
    const onClientChange = () => {
      common_vendor.index.navigateTo({
        url: "../clients/index?act=select"
      });
    };
    common_vendor.index.$on("clientChange", (data) => {
      client.name = data.name;
      client.id = data.id;
      client.sex = data.sex;
      client.age = data.age;
      client.mobile = data.mobile;
    });
    const onXieyiChange = () => {
      is_xieyi.value = !is_xieyi.value;
    };
    const onAddressChange = () => {
      common_vendor.index.chooseAddress({
        success: (res) => {
          order.address.userName = res.userName;
          order.address.cityName = res.cityName;
          order.address.countyName = res.countyName;
          order.address.detailInfo = res.detailInfo;
        },
        fail: (res) => {
        }
      });
    };
    let submitOrder;
    const cancal = () => {
      popup.value.close();
    };
    const ok = () => {
      if (!validMobile.phone || !validMobile.validCode) {
        return common_vendor.index.showToast({
          title: "请检查手机号或验证码是否有误",
          icon: "none",
          duration: 1e3
        });
      }
      app.globalData.utils.request({
        url: "/user/authentication",
        method: "POST",
        data: {
          tel: validMobile.phone,
          code: validMobile.validCode
        },
        success: (res) => {
          common_vendor.index.setStorageSync("token", res.data.token);
          createOrder(submitOrder);
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none",
            duration: 1e3
          });
        }
      });
    };
    let flag = false;
    const countdownChange = () => {
      if (!validMobile.phone) {
        return common_vendor.index.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 1e3
        });
      }
      if (flag)
        return;
      const time = setInterval(() => {
        if (countdown.time <= 0) {
          countdown.validText = "获取验证码";
          countdown.time = 60;
          flag = false;
          clearInterval(time);
        } else {
          countdown.time -= 1;
          countdown.validText = `剩余${countdown.time}s`;
        }
      }, 1e3);
      flag = true;
      app.globalData.utils.request({
        url: "/get/code",
        method: "POST",
        data: {
          tel: validMobile.phone
        },
        success: (res) => {
          common_vendor.index.showToast({
            title: "验证码发送成功，请尽快验证",
            icon: "none",
            duration: 1e3
          });
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none",
            duration: 1e3
          });
        }
      });
    };
    const createOrder = (orderData) => {
      app.globalData.utils.request({
        url: "/pay/createOrder",
        method: "POST",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: orderData,
        success: (res) => {
          qrcodePopup.value.open("center");
          const qr = new common_vendor.UQRCode();
          qr.data = res.wx_code;
          qr.size = 150;
          qr.make();
          var canvasContext = common_vendor.index.createCanvasContext("qrcode");
          qr.canvasContext = canvasContext;
          qr.drawCanvas();
        },
        fail: (res) => {
        }
      });
    };
    const payment = () => {
      common_vendor.index.switchTab({
        url: "../order/order"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$5,
        b: service.value.icon_image ? service.value.icon_image_url : "../../static/avatar.jpg",
        c: common_vendor.t(service.value.name),
        d: common_vendor.o(handleTap),
        e: service.value.stype == 10 || service.value.stype == 15 || service.value.stype == 20
      }, service.value.stype == 10 || service.value.stype == 15 || service.value.stype == 20 ? common_vendor.e({
        f: hospitals.value[hospital_index.value].name,
        g: common_vendor.o(onHospitalChange),
        h: hospital_index.value,
        i: hospitals.value,
        j: common_vendor.o(onStartTimeChange),
        k: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选中就诊时间"
        }),
        l: client.name,
        m: common_vendor.o(onClientChange),
        n: service.value.stype == 15
      }, service.value.stype == 15 ? {
        o: order.receiveAddress,
        p: common_vendor.o(($event) => order.receiveAddress = $event.detail.value)
      } : {}, {
        q: order.tel,
        r: common_vendor.o(($event) => order.tel = $event.detail.value),
        s: order.demand,
        t: common_vendor.o(($event) => order.demand = $event.detail.value)
      }) : {}, {
        v: service.value.stype == 30 || service.value.stype == 40
      }, service.value.stype == 30 || service.value.stype == 40 ? {
        w: hospitals.value[hospital_index.value].name,
        x: common_vendor.o(onHospitalChange),
        y: hospital_index.value,
        z: hospitals.value,
        A: common_vendor.o(onStartTimeChange),
        B: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择期望服务时间"
        }),
        C: order.address.userName ? order.address.userName + "(" + order.address.cityName + order.address.countyName + order.address.detailInfo + ")" : "",
        D: common_vendor.o(onAddressChange),
        E: order.tel,
        F: common_vendor.o(($event) => order.tel = $event.detail.value),
        G: order.demand,
        H: common_vendor.o(($event) => order.demand = $event.detail.value)
      } : {}, {
        I: service.value.stype == 110
      }, service.value.stype == 110 ? {
        J: common_vendor.o(_ctx.onStartTimeChanged),
        K: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择期望服务时间"
        }),
        L: client.name,
        M: common_vendor.o(onClientChange),
        N: order.receiveAddress,
        O: common_vendor.o(($event) => order.receiveAddress = $event.detail.value),
        P: order.tel,
        Q: common_vendor.o(($event) => order.tel = $event.detail.value),
        R: order.demand,
        S: common_vendor.o(($event) => order.demand = $event.detail.value)
      } : {}, {
        T: common_vendor.n("is_xieyi " + (is_xieyi.value ? "is_xieyi_on" : "")),
        U: common_vendor.o(onXieyiChange),
        V: cfg.page_xy,
        W: cfg.page_fw,
        X: order.price > 0
      }, order.price > 0 ? {
        Y: common_vendor.t(order.price)
      } : {}, {
        Z: common_vendor.n("btnp " + (is_xieyi.value ? "" : "btnp-disabled")),
        aa: validMobile.phone,
        ab: common_vendor.o(($event) => validMobile.phone = $event.detail.value),
        ac: validMobile.validCode,
        ad: common_vendor.o(($event) => validMobile.validCode = $event.detail.value),
        ae: common_vendor.t(countdown.validText),
        af: common_vendor.o(countdownChange),
        ag: common_vendor.o(cancal),
        ah: common_vendor.o(ok),
        ai: common_vendor.sr(popup, "8f2e9c22-3", {
          "k": "popup"
        }),
        aj: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        }),
        ak: common_vendor.o(payment),
        al: common_assets._imports_0$4,
        am: common_vendor.sr(qrcodePopup, "8f2e9c22-4", {
          "k": "qrcodePopup"
        }),
        an: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
