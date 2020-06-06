sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "../model/formatter"
], function (Controller, formatter) {
   "use strict";
   return Controller.extend("sap.ui.softwaris.flightapp.controller.Master", {
		formatter: formatter,
		
		onInit : function () {

		},
		
		onSelectFlight: function (oEvent) {
			var oItem = oEvent.getParameter("listItem");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				flightsPath: window.encodeURIComponent(oItem.getBindingContext("flights").getPath().substr(1))
			});
		}
		
   });
});