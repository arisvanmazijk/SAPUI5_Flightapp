sap.ui.define([], function () {
	"use strict";
	return {
		airlineText: function (sAirline) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (sAirline) {
				case "AA":
					return resourceBundle.getText("airlineNameAA");
				case "AZ":
					return resourceBundle.getText("airlineNameAZ");
				case "DL":
					return resourceBundle.getText("airlineNameDL");
				case "JL":
					return resourceBundle.getText("airlineNameJL");					
				default:
					return sAirline;
			}
		}
	};
});