addLayer("c", {
    name: "code", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0e33daff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "lines of code", // Name of prestige currency
    baseResource: "hours", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("c", 11)) mult = mult.times(1.5)
        if (hasUpgrade("c", 12)) mult = mult.times(2)
        if (hasUpgrade("c", 13)) mult = mult.times(3)
        if (hasUpgrade("c", 14)) mult = mult.times(4)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for lines of code", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
            upgrades: {
        11: {
            title: "Cheap keyboard",
            description: "1.5x lines of code.",
            cost: new Decimal(1),
            unlocked() { return true },
        },
        12: {
            title: "'Gaming' keyboard",
            description: "2x lines of code.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("c", 11) },
        },
        13: {
            title: "Mechanical keyboard",
            description: "3x lines of code.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("c", 12) },
        },
        14: {
            title: "PS2 keyboard",
            description: "4x lines of code.",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade("c", 13) },
        },
        21: {
            title: "Notepad++",
            description: "1.5x hours.",
            cost: new Decimal(1),
            unlocked() { return true },
        },
        22: {
            title: "Sublime Text",
            description: "2x hours.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("c", 21) },
        },
        23: {
            title: "Visual Studio Code",
            description: "3x hours.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("c", 22) },
        },
        24: {
            title: "vi",
            description: "4x hours.",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade("c", 23) },
        },
        31: {
            title: "Stack Overflow",
            description: "Gain 1% of your hours per second.",
            cost: new Decimal(3),
            unlocked() { return true },
            effect() {
                let eff = player.points.div(100)
                return eff
            },
            effectDisplay() { return format(this.effect())+" lines of code per second" },
        },
        32: {
            title: "GitHub",
            description: "Double hours per second.",
            cost: new Decimal(5),
            effect() {
                let eff = new Decimal(2)
                return eff
            },
            unlocked() { return hasUpgrade("c", 31) }
        },
    },
    passiveGeneration() { return hasUpgrade("c", 31)},
    layerShown(){return true}
})
addLayer("r", {
    name: "releases", 
    symbol: "R", 
    type: "static",
    exponent: 1.5,
    position: 1, 
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#33da57ff",
    requires: new Decimal(100),
    resource: "releases",
    baseResource: "lines of code",
    baseAmount() {return player.c.points}, 
    gainMult() { 
        return new Decimal(1)
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 1, 
    hotkeys: [
        {key: "r", description: "R: Reset for releases", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "First release",
            description: "Start generating 1% of your lines of code per second.",
            cost: new Decimal(1),
            unlocked() { return true },
            effect() {
                let eff = player.c.points.div(100)
                return eff
            },
            effectDisplay() { return format(this.effect())+" lines of code per second" },
        },
    },
})