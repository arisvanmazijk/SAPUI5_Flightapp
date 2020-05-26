sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/core/UIComponent",
   "../model/formatter",
   "sap/ui/core/routing/History"
], function (Controller, UIComponent, formatter, History) {
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
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("master");
			}
		}
		
   });
});