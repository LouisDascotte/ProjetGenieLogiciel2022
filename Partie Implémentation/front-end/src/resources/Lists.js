export const ClientList = [
  {
    clientID: 1817,
    name: "John Doe",
    address: "123 Main Street, New York, NY 10001",
    email: "john.doe@gmail.com",
    phone: "123-456-7890",
  },
  {
    clientID: 837,
    name: "Jane Doe",
    address: "456 Main Street, New York, NY 10001",
    email: "jane.doe@gmail.com",
    phone: "143-456-7890",
  },
  {
    clientID: 9287,
    name: "John Smith",
    address: "789 Main Street, New York, NY 10001",
    email: "john.smith@gmail.com",
    phone: "163-456-7890",
  },
  {
    clientID: 62,
    name: "Jane Smith",
    address: "101 Main Street, New York, NY 10001",
    email: "jane.smith@gmail.com",
    phone: "183-456-7890",
  },
  {
    clientID: 823,
    name: "Mason Doe",
    address: "102 Main Street, New York, NY 10001",
    email: "mason.doe@gmail.com",
    phone: "193-456-7890",
  },
  {
    clientID: 632,
    name: "Aleksandr Kuznetsov",
    address: "103 Main Street, New York, NY 10001",
    email: "aleks.kuznet@gmail.com",
    phone: "123-466-7890",
  },
  {
    clientID: 782,
    name: "William Shakespeare",
    address: "104 Main Street, New York, NY 10001",
    email: "will.shake@gmail.com",
    phone: "123-436-7890",
  }
]

export const MeterList = [
  // Gas suppliers : "AmbiNRG", "GasCool" or "GasHot", Electricity suppliers : "AmbiNRG" "EleCable" or "SpeedElec", Water suppliers : "WaterFlow"
  {
    meterID: 918373,
    owner : 1817,
    energyType: "Electricity",
    supplier: "EleCable"
  },
  {
    meterID: 989324,
    owner : 1817,
    energyType: "Gas",
    supplier: "GasCool"
  },
  {
    meterID: 918273,
    owner : 837,
    energyType: "Water",
    supplier: "WaterFlow"
  },
  {
    meterID: 981724,
    owner : 837,
    energyType: "Electricity",
    supplier: "SpeedElec"
  },
  {
    meterID: 927212,
    owner : 9287,
    energyType: "Electricity",
    supplier: "AmbiNRG"
  },
  {
    meterID: 913621,
    owner : 9287,
    energyType: "Gas",
    supplier: "AmbiNRG"
  },
  {
    meterID: 916728,
    owner : 62,
    energyType: "Electricity",
    supplier: "EleCable"
  },
  {
    meterID: 916282,
    owner : 62,
    energyType: "Gas",
    supplier: "GasCool"
  },
  {
    meterID: 962511,
    owner : 823,
    energyType: "Electricity",
    supplier: "SpeedElec"
  },
  {
    meterID: 912727,
    owner : 632,
    energyType: "Electricity",
    supplier: "EleCable"
  },
  {
    meterID: 912918,
    owner : 632,
    energyType: "Gas",
    supplier: "GasHot"
  },
  {
    meterID: 946372,
    owner : 782,
    energyType: "Electricity",
    supplier: "SpeedElec"
  },
  {
    meterID: 935171,
    owner : 782,
    energyType: "Gas",
    supplier: "GasCool"
  }
]

export const PortfolioList = [
  {
    portfolioID: 64,
    name: "Portfolio 1",
    owner: 1817,
    meters: [
      {
        meterID: 918373
      },
      {
        meterID: 989324
      }
    ]
  },
  {
    portfolioID: 927,
    name: "Portfolio {portfolioID}",
    owner: 1817,
    meters: [
      {
          meterID: 918273
      },
      {
          meterID: 981724
      }
    ]
  },
  {
    portfolioID: 624,
    name: "Portfolio 2",
    owner: 837,
    meters: [
      {
          meterID: 927212
      },
      {
          meterID: 913621
      }
    ]
  },
  {
    portfolioID: 921,
    name: "Portfolio 3",
    owner: 9287,
    meters: [
      {
          meterID: 917626
      }
    ]
  },
  {
    portfolioID: 671,
    name: "Portfolio 4",
    owner: 62,
    meters: [
      {
          meterID: 916728
      },
      {
          meterID: 916282
      }
    ]
  },
  {
    portfolioID: 542,
    name: "Portfolio 5",
    owner: 823,
    meters: [
      {
          meterID: 962511
      }
    ]
  },
  {
    portfolioID: 6632,
    name: "Portfolio 6",
    owner: 632,
    meters: [
      {
          meterID: 912727
      },
      {
          meterID: 912918
      }
    ]
  },
  {
    portfolioID: 763,
    name: "Portfolio 7",
    owner: 782,
    meters: [
      {
          meterID: 946372
      },
      {
          meterID: 935171
      }
    ]
  }
]

export const ContractList = [
  // contractType : "Electricity", "Gas", "GasElec" (both electricity and gas) or "Water"
  {
    contractID: 9172,
    name: "Contract 1",
    owner: 1817,
    contractType: "Electricity",
    supplier: "EleCable",
    meter: {
      meterID: 918373
    }
  },
  {
    contractID: 9272,
    name: "Contract 2",
    owner: 1817,
    contractType: "Gas",
    supplier: "GasCool",
    meter: {
      meterID: 989324
    }
  },
  {
    contractID: 9372,
    name: "Contract 3",
    owner: 837,
    contractType: "Water",
    supplier: "WaterFlow",
    meter: {
      meterID: 918273
    }
  },
  {
    contractID: 9472,
    name: "Contract 4",
    owner: 837,
    contractType: "Electricity",
    supplier: "SpeedElec",
    meter: {
      meterID: 981724
    }
  },
  {
    contractID: 9572,
    name: "Contract 5",
    owner: 9287,
    contractType: "GasElec",
    supplier: "AmbiNRG",
    meter: [
      {
        meterID: 927212
      },
      {
        meterID: 913621
      }
    ]
  },
  {
    contractID: 9672,
    name: "Contract 6",
    owner: 62,
    contractType: "Electricity",
    supplier: "EleCable",
    meter: {
      meterID: 916728
    }
  },
  {
    contractID: 9772,
    name: "Contract 7",
    owner: 62,
    contractType: "Gas",
    supplier: "GasCool",
    meter: {
      meterID: 916282
    }
  },
  {
    contractID: 9872,
    name: "Contract 8",
    owner: 823,
    contractType: "Electricity",
    supplier: "SpeedElec",
    meter: {
      meterID: 962511
    }
  },
  {
    contractID: 9972,
    name: "Contract 9",
    owner: 632,
    contractType: "Electricity",
    supplier: "EleCable",
    meter: {
      meterID: 912727
    }
  },
  {
    contractID: 10072,
    name: "Contract 10",
    owner: 632,
    contractType: "Gas",
    supplier: "GasHot",
    meter: {
      meterID: 912918
    }
  },
  {
    contractID: 10172,
    name: "Contract 11",
    owner: 782,
    contractType: "Electricity",
    supplier: "SpeedElec",
    meter: {
      meterID: 946372
    }
  },
  {
    contractID: 10272,
    name: "Contract 12",
    owner: 782,
    contractType: "Gas",
    supplier: "GasCool",
    meter: {
      meterID: 935171
    }
  }
]

export const MeterReadingList = [
  {
    meterReadingID: 9172,
    meter: {
      meterID: 918373
    },
    readingDateTime: "2019-01-01",
    reading: 1000
  },
  {
    meterReadingID: 9272,
    meter: {
      meterID: 989324,
    },
    readingDateTime: "2019-01-01",
    reading: 1000
  },
  {
    meterReadingID: 9372,
    meter: {
      meterID: 918273
    },
    readingDateTime: "2019-01-01",
    reading: 1000
  },
  {
    meterReadingID: 9472,
    meter: {
      meterID: 918373,
    },
    readingDateTime: "2019-02-01",
    reading: 2000
  },
  {
    meterReadingID: 9572,
    meter: {
      meterID: 989324
    },
    readingDateTime: "2019-02-01",
    reading: 2000
  },
  {
    meterReadingID: 9672,
    meter: {
      meterID: 918273
    },
    readingDateTime: "2019-02-01",
    reading: 2000
  },
  {
    meterReadingID: 9772,
    meter: {
      meterID: 918373
    },
    readingDateTime: "2019-03-01",
    reading: 3000
  },
  {
    meterReadingID: 9872,
    meter: {
      meterID: 989324
    },
    readingDateTime: "2019-03-01",
    reading: 3000
  },
  {
    meterReadingID: 9972,
    meter: {
      meterID: 918373
    },
    readingDateTime: "2019-04-01",
    reading: 4000
  }
]