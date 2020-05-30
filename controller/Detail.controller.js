sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/core/UIComponent",
   "../model/formatter"
], function (Controller, UIComponent, formatter) {
   "use strict";
   return Controller.extend("sap.ui.softwaris.flightapp.controller.Detail", {
		formatter: formatter,
		onInit : function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").flightsPath),
				model: "flights"
			});
		},
		
		onNavBack: function () {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("landing");
		},
		
		navToFlights: function () {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("flights");
		}
   });
});