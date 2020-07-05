sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/core/UIComponent",
   "sap/ui/core/routing/History",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator",
   "sap/m/MessageToast"
], function (Controller, UIComponent, History, Filter, FilterOperator, MessageToast) {
   "use strict";
   return Controller.extend("sap.ui.softwaris.flightapp.controller.Detail", {
		onInit : function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("flights").attachPatternMatched(this._onObjectMatched, this);			
		},
		
		_onObjectMatched: function (oEvent) {
			var aFilter = [];
			var carrid = window.decodeURIComponent(oEvent.getParameter("arguments").carrid);
			var connid = window.decodeURIComponent(oEvent.getParameter("arguments").connid);
			
			if (carrid && connid) {
				aFilter.push(new Filter("CARRID", FilterOperator.Contains, carrid));
				aFilter.push(new Filter("CONNID", FilterOperator.Contains, connid));
			}
			
			var oList = this.byId("flightsList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);			
		},		
		
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("landing");
				}
			},
			
		navToBooking: function (oEvent) {
				var oItem = oEvent.getSource().getBindingContext("flights");
				if (this._validateSeats(oItem) === true) {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("seat", {
						flight: window.encodeURIComponent(oItem.getPath().substr(1))
					});
				} else {
					var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
					MessageToast.show(oResourceBundle.getText("messageToastText"));
				}
		},
		
		_validateSeats: function (oItem) {
			var economy = oItem.getObject("SEATSMAX") - oItem.getObject("SEATSOCC");
			var business = oItem.getObject("SEATSMAX_B") - oItem.getObject("SEATSOCC_B");
			var first = oItem.getObject("SEATSMAX_F") - oItem.getObject("SEATSOCC_F");
			
			var oModel = this.getView().getModel("clientData");
			oModel.setProperty("/SeatsEconomy", economy);
			oModel.setProperty("/SeatsBusiness", business);
			oModel.setProperty("/SeatsFirst", first);
			
			if (economy === 0 && business === 0 && first === 0) {
				return false;
			} else {
				return true;
			}
		}
	});
});