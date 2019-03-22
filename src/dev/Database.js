//THIS FILE IS FOR REFERENCE

export const exerciseList = {
  FF01: {
    active: true,
    id: "FF01",
    name: {
      NO: "Push ups",
      EN: "Push ups"
    },
    location: ["FreeWeight", "FirstFloor"],
    weightArray: false
  },
  FF02: {
    active: true,
    id: "FF02",
    name: {
      NO: "Sit ups",
      EN: "Sit ups"
    },
    location: ["FreeWeight", "FirstFloor"]
  },
  M01: {
    active: true,
    id: "M01",
    name: {
      NO: "Sykkel",
      EN: "Bike"
    },
    location: ["Machines"]
  },
  L01: {
    active: true,
    id: "L01",
    name: {
      NO: "Benpress",
      EN: "Leg pressure"
    },
    location: ["Machines", "Legs"]
  }
};

export const categories = {
  FreeWeight: {
    id: "FreeWeight",
    active: true,
    name: {
      NO: "Frivekt",
      EN: "Free Weight"
    },
    categories: {
      FirstFloor: {
        id: "FirstFloor",
        active: true,
        name: {
          NO: "Første etasje",
          EN: "First floor"
        },
        exercises: {
          FF01: true,
          FF02: true
        }
      }
    }
  },
  Machines: {
    id: "Machines",
    active: true,
    name: {
      NO: "Maskiner",
      EN: "Machines"
    },
    exercises: {
      M01: true
    },
    categories: {
      Legs: {
        id: "Legs",
        active: true,
        name: {
          NO: "Ben",
          EN: "Legs"
        },
        exercises: {
          L01: true
        }
      }
    }
  }
};

export const exerciseCollection = {
  categories: {
    FreeWeight: {
      id: "FreeWeight",
      active: true,
      name: {
        NO: "Frivekt",
        EN: "Free Weight"
      },
      location: [],
      categories: [
        { id: "FirstFloor", active: true },
        { id: "SecondFloor", active: true }
      ],
      exercises: {}
    },
    FirstFloor: {
      id: "FirstFloor",
      active: true,
      name: {
        NO: "Første etasje",
        EN: "First floor"
      },
      location: ["FreeWeight"],
      categories: [],
      exercises: { FF01: true, FF02: true }
    },
    SecondFloor: {
      id: "SecondFloor",
      active: true,
      name: {
        NO: "Andre etasje",
        EN: "Second floor"
      },
      location: ["FreeWeight"],
      categories: [],
      exercises: { SF01: true, SF02: true}
    },
    Machines: {
      id: "Machines",
      active: true,
      name: {
        NO: "Maskiner",
        EN: "Machines"
      },
      location: [],
      categories: [
        { id: "Legs", active: true},
      ],
      exercises: {}
    },
    Legs: {
      id: "Legs",
      active: true,
      name: {
        NO: "Ben",
        EN: "Legs"
      },
      location: ["Machines"],
      categories: [],
      exercises: { L01: true }
    }
  },
  exercises: {
    FF01: {
      active: true,
      id: "FF01",
      name: {
        NO: "Push ups",
        EN: "Push ups"
      },
      location: ["FreeWeight", "FirstFloor"],
      weightArray: false
    },
    FF02: {
      active: true,
      id: "FF02",
      name: {
        NO: "Sit ups",
        EN: "Sit ups"
      },
      location: ["FreeWeight", "FirstFloor"]
    },
    SF01: {
      active: true,
      id: "SF01",
      name: {
        NO: "Sykkel",
        EN: "Bike"
      },
      location: ["FreeWeight", "SecondFloor"]
    },
    SF02: {
      active: true,
      id: "SF02",
      name: {
        NO: "Benpress",
        EN: "Leg pressure"
      },
      location: ["FreeWeight", "SecondFloor"]
    },
    L01: {
      active: true,
      id: "L01",
      name: {
        NO: "Bentrykk",
        EN: "Leg pressure"
      },
      location: ["Machines"]
    }
  }
};
