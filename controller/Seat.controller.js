sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/core/UIComponent",
   "sap/ui/core/routing/History"
], function (Controller, UIComponent, History) {
   "use strict";
   return Controller.extend("sap.ui.softwaris.flightapp.controller.Seat", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("seat").attachPatternMatched(this._onObjectMatched, this);
		},
		
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").flight),
				model: "flights"
			});
		},
		
		onNavBack: function () {
			this._clearFields();
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("flights");
				}
		},
		
		onSelectClass: function (oEvent) {
			var button = oEvent.getParameter("selectedIndex");
			switch (button) {
				case 0:
					this.byId("seatPriceField").setValue(this.getView().getBindingContext("flights").getObject("PRICE"));
					this.byId("availSeatsField").setValue(this.getView().getModel("clientData").getProperty("/SeatsEconomy"));
					break;
				case 1:
					this.byId("seatPriceField").setValue(this.getView().getBindingContext("flights").getObject("PRICE_B"));
					this.byId("availSeatsField").setValue(this.getView().getModel("clientData").getProperty("/SeatsBusiness"));					
					break;
				case 2:	
					this.byId("seatPriceField").setValue(this.getView().getBindingContext("flights").getObject("PRICE_F"));
					this.byId("availSeatsField").setValue(this.getView().getModel("clientData").getProperty("/SeatsFirst"));					
					break;
			}
				
		},
		
		saveAndNavToBooking: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("booking");
		},
		
		_clearFields: function () {
			this.byId("rbGroupSeats").setSelectedIndex(-1);
			this.byId("seatPriceField").setValue("");
			this.byId("availSeatsField").setValue("");
		}
   });
});