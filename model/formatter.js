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
		},
		distanceUnit: function (sDistid) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (sDistid) {
				case "MI":
					return resourceBundle.getText("miles");
				case "KM":
					return resourceBundle.getText("kilometers");
				default:
					return sDistid;
			}
		},
		flightType: function (sFlighttype) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (sFlighttype) {
				case "X":
					return resourceBundle.getText("charter");
				case " ":
					return resourceBundle.getText("scheduled");
				default:
					return sFlighttype;
			}
		},
		flightTime: function (sFlighttime) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			if (sFlighttime < 60) {
				return sFlighttime + " minutes";
			}
			return (Math.round(sFlighttime / 60)) + " hours";
		}
	};
});