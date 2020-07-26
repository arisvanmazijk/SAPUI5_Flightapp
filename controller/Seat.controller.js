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
			this._clearSeats();
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
					this._generateSeats(button, this.getView().getModel("clientData").getProperty("/SeatsEconomy"));
					break;
				case 1:
					this.byId("seatPriceField").setValue(this.getView().getBindingContext("flights").getObject("PRICE_B"));
					this.byId("availSeatsField").setValue(this.getView().getModel("clientData").getProperty("/SeatsBusiness"));
					this._generateSeats(button, this.getView().getModel("clientData").getProperty("/SeatsBusiness"));
					break;
				case 2:	
					this.byId("seatPriceField").setValue(this.getView().getBindingContext("flights").getObject("PRICE_F"));
					this.byId("availSeatsField").setValue(this.getView().getModel("clientData").getProperty("/SeatsFirst"));
					this._generateSeats(button, this.getView().getModel("clientData").getProperty("/SeatsFirst"));
					break;
			}
		},
		
		saveAndNavToBooking: function () {
			this._clearFields();
			this._clearSeats();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("booking");
		},
		
		_clearFields: function () {
			this.byId("rbGroupSeats").setSelectedIndex(-1);
			this.byId("seatPriceField").setValue("");
			this.byId("availSeatsField").setValue("");
		},
		
		_generateSeats: function (level, amount) {
			var aData = this._clearSeats();
			switch (level) {
				case 0:
					for (var i = 0; i < amount; i++) {
						var nr = this._generateSeatNumber(18, 52);
						var letter = this._generateSeatLetter(0);
						var combo = nr + letter;
						if (aData.includes({Key: combo, Text: combo}) === false) {
							aData.push({Key: combo, Text: combo});
						} else {
							break;
						}
					}
					break;
				case 1:
					for (i = 0; i < amount; i++) {
						nr = this._generateSeatNumber(10, 18);
						letter = this._generateSeatLetter(1);
						aData.push({Key: nr + letter, Text: nr + letter});
					}					
					break;
				case 2:	
					for (i = 0; i < amount; i++) {
						nr = this._generateSeatNumber(1, 7);
						letter = this._generateSeatLetter(2);
						aData.push({Key: nr + letter, Text: nr + letter});
					}					
					break;
			}
			this.getView().getModel("seats").setProperty("/Seats", aData);
		},
		
		_generateSeatNumber: function (min, max) {
    		min = Math.ceil(min);
    		max = Math.floor(max);
    		return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		
		_generateSeatLetter: function (index) {
			var result           = "";
			switch (index) {
				case 0:
					var characters = "ABCDEFGHK";
					break;
				case 1:
					characters = "ACDEFGK";
					break;
				case 2:
					characters = "ADGK";
					break;
			}
			var charactersLength = characters.length;
			for (var i = 0; i < 1; i++) {
    			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			}
			return result;
		},
		
		_clearSeats: function () {
			var aData = this.getView().getModel("seats").getProperty("/Seats");
			aData = [];	
			this.getView().getModel("seats").setProperty("/Seats", aData);
			return aData;
		}
		
   });
});