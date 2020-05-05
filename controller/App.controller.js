sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
], function (Controller, MessageToast) {
   "use strict";
   return Controller.extend("sap.ui.softwaris.flightapp.controller.App", {
   	onShowInfo : function () {
   			MessageToast.show("This is going to be the Flight App");
   		}
   });
});