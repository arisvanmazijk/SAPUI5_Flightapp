sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/HashChanger"
], function (UIComponent, JSONModel, HashChanger) { 
	"use strict";
	return UIComponent.extend("sap.ui.softwaris.flightapp.Component", {
		
		metadata : {
            manifest: "json"
    	},
    	
		init : function () {
			// reset the routing hash
			HashChanger.getInstance().replaceHash("");
        	// call the init function of the parent
        	UIComponent.prototype.init.apply(this, arguments);
         
        	// create the views based on the url/hash
			this.getRouter().initialize();
      }
      
	});
});