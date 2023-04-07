export const ClientList = [
  {
    clientID: 1817,
    name: "John Doe",
  },
  {
    clientID: 837,
    name: "Jane Doe",
  },
  {
    clientID: 9287,
    name: "John Smith",
  },
  {
    clientID: 62,
    name: "Jane Smith",
  },
  {
    clientID: 823,
    name: "Mason Doe",
  },
  {
    clientID: 632,
    name: "Aleksandr Kuznetsov",
  },
  {
    clientID: 782,
    name: "William Shakespeare",
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
