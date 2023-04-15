export const ClientList = [
  {
    clientId: 1817,
    name: "John Doe",
    address: "123 Main Street, New York, NY 10001",
    email: "john.doe@gmail.com",
    phone: "123-456-7890",
  },
  {
    clientId: 837,
    name: "Jane Doe",
    address: "456 Main Street, New York, NY 10001",
    email: "jane.doe@gmail.com",
    phone: "143-456-7890",
  },
  {
    clientId: 9287,
    name: "John Smith",
    address: "789 Main Street, New York, NY 10001",
    email: "john.smith@gmail.com",
    phone: "163-456-7890",
  },
  {
    clientId: 62,
    name: "Jane Smith",
    address: "101 Main Street, New York, NY 10001",
    email: "jane.smith@gmail.com",
    phone: "183-456-7890",
  },
  {
    clientId: 823,
    name: "Mason Doe",
    address: "102 Main Street, New York, NY 10001",
    email: "mason.doe@gmail.com",
    phone: "193-456-7890",
  },
  {
    clientId: 632,
    name: "Aleksandr Kuznetsov",
    address: "103 Main Street, New York, NY 10001",
    email: "aleks.kuznet@gmail.com",
    phone: "123-466-7890",
  },
  {
    clientId: 782,
    name: "William Shakespeare",
    address: "104 Main Street, New York, NY 10001",
    email: "will.shake@gmail.com",
    phone: "123-436-7890",
  }
]

export const MeterList = [
  // Gas suppliers : "AmbiNRG", "GasCool" or "GasHot", Electricity suppliers : "AmbiNRG" "EleCable" or "SpeedElec", Water suppliers : "WaterFlow"
  {
    meterId: 918373,
    clientId : 1817,
    energyType: "Electricity",
    supplierId: "EleCable",
    meterStatus: "Active",
    hourType: "Peak",
    meterType: "manual"
  },
  {
    meterId: 989324,
    clientId : 1817,
    energyType: "Gas",
    supplierId: "GasCool"
  },
  {
    meterId: 918273,
    clientId : 837,
    energyType: "Water",
    supplierId: "WaterFlow"
  },
  {
    meterId: 981724,
    clientId : 837,
    energyType: "Electricity",
    supplierId: "SpeedElec"
  },
  {
    meterId: 927212,
    clientId : 9287,
    energyType: "Electricity",
    supplierId: "AmbiNRG"
  },
  {
    meterId: 913621,
    clientId : 9287,
    energyType: "Gas",
    supplierId: "AmbiNRG"
  },
  {
    meterId: 916728,
    clientId : 62,
    energyType: "Electricity",
    supplierId: "EleCable"
  },
  {
    meterId: 916282,
    clientId : 62,
    energyType: "Gas",
    supplierId: "GasCool"
  },
  {
    meterId: 962511,
    clientId : 823,
    energyType: "Electricity",
    supplierId: "SpeedElec"
  },
  {
    meterId: 912727,
    clientId : 632,
    energyType: "Electricity",
    supplierId: "EleCable"
  },
  {
    meterId: 912918,
    clientId : 632,
    energyType: "Gas",
    supplierId: "GasHot"
  },
  {
    meterId: 946372,
    clientId : 782,
    energyType: "Electricity",
    supplierId: "SpeedElec"
  },
  {
    meterId: 935171,
    clientId : 782,
    energyType: "Gas",
    supplierId: "GasCool"
  }
]

export const PortfolioList = [
  {
    portfolioId: 64,
    name: "Portfolio 1",
    owner: 1817,
    meters: [
      {
        meterId: 918373
      },
      {
        meterId: 989324
      }
    ]
  },
  {
    portfolioId: 927,
    name: "Portfolio {portfolioId}",
    owner: 1817,
    meters: [
      {
          meterId: 918273
      },
      {
          meterId: 981724
      }
    ]
  },
  {
    portfolioId: 624,
    name: "Portfolio 2",
    owner: 837,
    meters: [
      {
          meterId: 927212
      },
      {
          meterId: 913621
      }
    ]
  },
  {
    portfolioId: 921,
    name: "Portfolio 3",
    owner: 9287,
    meters: [
      {
          meterId: 917626
      }
    ]
  },
  {
    portfolioId: 671,
    name: "Portfolio 4",
    owner: 62,
    meters: [
      {
          meterId: 916728
      },
      {
          meterId: 916282
      }
    ]
  },
  {
    portfolioId: 542,
    name: "Portfolio 5",
    owner: 823,
    meters: [
      {
          meterId: 962511
      }
    ]
  },
  {
    portfolioId: 6632,
    name: "Portfolio 6",
    owner: 632,
    meters: [
      {
          meterId: 912727
      },
      {
          meterId: 912918
      }
    ]
  },
  {
    portfolioId: 763,
    name: "Portfolio 7",
    owner: 782,
    meters: [
      {
          meterId: 946372
      },
      {
          meterId: 935171
      }
    ]
  }
]

export const ContractList = [
  // contractType : "Electricity", "Gas", "GasElec" (both electricity and gas) or "Water"
  {
    contractId: 9172,
    name: "Contract 1",
    clientId: 1817,
    consumptionAddress: "123 Main Street, New York, NY 10001",
    contractType: "Electricity",
    supplierId: "EleCable",
    meter: {
      meterId: 918373
    },
    beginDate: "2019-01-01",
    endDate: "2020-02-01",
    offer: 28,
  },
  {
    contractId: 9272,
    name: "Contract 2",
    clientId: 1817,
    consumptionAddress: "123 Main Street, New York, NY 10001",
    contractType: "Gas",
    supplierId: "GasCool",
    meter: {
      meterId: 989324
    },
    beginDate: "2019-01-01",
    endDate: "2020-01-01",
    offer: 12,
  },
  {
    contractId: 9372,
    name: "Contract 3",
    clientId: 837,
    contractType: "Water",
    supplierId: "WaterFlow",
    meter: {
      meterId: 918273
    }
  },
  {
    contractId: 9472,
    name: "Contract 4",
    clientId: 837,
    contractType: "Electricity",
    supplierId: "SpeedElec",
    meter: {
      meterId: 981724
    }
  },
  {
    contractId: 9572,
    name: "Contract 5",
    clientId: 9287,
    contractType: "GasElec",
    supplierId: "AmbiNRG",
    meter: [
      {
        meterId: 927212
      },
      {
        meterId: 913621
      }
    ]
  },
  {
    contractId: 9672,
    name: "Contract 6",
    clientId: 62,
    contractType: "Electricity",
    supplierId: "EleCable",
    meter: {
      meterId: 916728
    }
  },
  {
    contractId: 9772,
    name: "Contract 7",
    clientId: 62,
    contractType: "Gas",
    supplierId: "GasCool",
    meter: {
      meterId: 916282
    }
  },
  {
    contractId: 9872,
    name: "Contract 8",
    clientId: 823,
    contractType: "Electricity",
    supplierId: "SpeedElec",
    meter: {
      meterId: 962511
    }
  },
  {
    contractId: 9972,
    name: "Contract 9",
    clientId: 632,
    contractType: "Electricity",
    supplierId: "EleCable",
    meter: {
      meterId: 912727
    }
  },
  {
    contractId: 10072,
    name: "Contract 10",
    clientId: 632,
    contractType: "Gas",
    supplierId: "GasHot",
    meter: {
      meterId: 912918
    }
  },
  {
    contractId: 10172,
    name: "Contract 11",
    clientId: 782,
    contractType: "Electricity",
    supplierId: "SpeedElec",
    meter: {
      meterId: 946372
    }
  },
  {
    contractId: 10272,
    name: "Contract 12",
    clientId: 782,
    contractType: "Gas",
    supplierId: "GasCool",
    meter: {
      meterId: 935171
    }
  }
]

export const MeterReadingList = [
  {
    meterId: 918373,
    date: "2019-01-01",
    value: 1000
  },
  {
    meterId: 989324,
    date: "2019-01-01",
    value: 1000
  },
  {
    meterId: 918273,
    date: "2019-01-01",
    value: 1000
  },
  {
    meterId: 918373,
    date: "2019-02-01",
    value: 2000
  },
  {
    meterId: 989324,
    date: "2019-02-01",
    value: 2000
  },
  {
    meterId: 918273,
    date: "2019-02-01",
    value: 2000
  },
  {
    meterId: 918373,
    date: "2019-03-01",
    value: 3000
  },
  {
    meterId: 989324,
    date: "2019-03-01",
    value: 3000
  },
  {
    meterId: 918373,
    date: "2019-04-01",
    value: 4000
  },
  {
    meterId: 989324,
    date: "2019-01-02",
    value: 1000
  },
]

export const ContractRequestList = [
  {
    contractRequestId: 6172,
    data : {
      clientId: 1817,
      address: "123 Main Street",
      city: "New York",
      zipCode: "10001",
      country: "USA",
      contractType: "Electricity",
      meterIdGas: null,
      meterIdElec: "123456789",
      meterType: "manual",
      offer: "Offer Y"
    }
  },
  {
    contractRequestId: 6272,
    data : {
      clientId: 1817,
      address: "123 Main Street",
      city: "New York",
      zipCode: "10001",
      country: "USA",
      contractType: "Gas",
      meterIdGas: "987654321",
      meterIdElec: null,
      meterType: "manual",
      offer: "Offer Y",
    }
  }
]

export const SupplierList = [
  {
    supplierId: 1,
    name: "EleCable",
    operatingRegion: "Walloonia"
  },
  {
    supplierId: 2,
    name: "GasCool",
    operatingRegion: "Walloonia"
  },
  {
    supplierId: 3,
    name: "GasHot",
    operatingRegion: "Walloonia"
  },
  {
    supplierId: 4,
    name: "SpeedElec",
    operatingRegion: "Walloonia"
  },
  {
    supplierId: 5,
    name: "WaterFlow",
    operatingRegion: "Walloonia"
  },
  {
    supplierId: 6,
    name: "AmbiNRG",
    operatingRegion: "Walloonia"
  }
]
