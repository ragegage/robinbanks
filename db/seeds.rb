# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


stocks = [
"XOM",
"GE",
"MSFT",
"BP",
"C",
"PG",
"WMT",
"PFE",
"HBC",
"TM",
"JNJ",
"BAC",
"AIG",
"TOT",
"NVS",
"MO",
"GSK",
"MTU",
"JPM",
"RDS/A",
"CVX",
"SNY",
"VOD",
"INTC",
"IBM",
"E",
"CSCO",
"BRK/A",
"UBS",
"WFC",
"T",
"RDS/B",
"KO",
"CHL",
"PEP",
"VZ",
"COP",
"DNA",
"AMGN",
"STD",
"HPQ",
"GOOG",
"HD",
"WB",
"SI",
"NOK",
"UNH",
"TWX",
"QCOM",
"ING"
]

stocks.each do |stock|
  Stock.create(stock)
end
