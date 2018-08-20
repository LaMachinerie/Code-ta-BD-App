var SpriteManager = SpriteManager || {};

SpriteManager.defaultTree = {
    room: { //Room array
        entrance: {
            key: "entrance",
            id: "0",
            displayName: "Entrée",
            character: { //Character array
                maman: {
                    key: "maman",
                    id: "0",
                    displayName: "la maman",
                    actions: { //Actions array
                        calling: {
                            key: "calling",
                            id: "0",
                            displayName: "crie dans l'escalier",
                            filename: "calling.png"
                        },
                        down: {
                            key: "down",
                            id: "1",
                            displayName: "descend l'escalier",
                            filename: "down.png"
                        }
                    }
                },
                papa: {
                    key: "papa",
                    id: "1",
                    displayName: "le papa",
                    actions: { //Actions array
                        up: {
                            key: "up",
                            id: "0",
                            displayName: "monte l'escalier",
                            filename: "up.png"
                        }
                    }
                },
                kid: {
                    key: "kid",
                    id: "2",
                    displayName: "l'enfant",
                    actions: {
                        go_out: {
                            key: "go_out",
                            id: "0",
                            displayName: "sort par la porte",
                            filename: "go_out.png"
                        },
                        climb_up: {
                            key: "climb_up",
                            id: "1",
                            displayName: "monte l'escalier en courant",
                            filename: "climb_up.png"
                        }
                    }
                },
                cat: {
                    key: "cat",
                    id: "3",
                    displayName: "le chat",
                    actions: {
                        affraid_cat: {
                            key: "affraid_cat",
                            id: "0",
                            displayName: "est surpris",
                            filename: "affraid_cat.png"
                        },
                        cat_down: {
                            key: "cat_down",
                            id: "1",
                            displayName: "descend l'escalier",
                            filename: "cat_down.png"
                        },
                        drunk_cat: {
                            key: "drunk_cat",
                            id: "2",
                            displayName: "est ivre",
                            filename: "drunk_cat.png"
                        }
                    }
                }
            },
            background: {
                day: {
                    key: "day",
                    id: "0",
                    displayName: "jour",
                    filename: "day.png"
                },
                night: {
                    key: "night",
                    id: "1",
                    displayName: "nuit",
                    filename: "night.png"
                }
            }
        },
        bedRoom: {
            key: "bedRoom",
            id: "1",
            displayName: "Chambre des parents",
            character: { //Character array
            },
            background: {
                day: {
                    key: "day",
                    id: "0",
                    displayName: "jour",
                    filename: "day.png"
                }
            }
        }
    }
}


SpriteManager.Tree = SpriteManager.defaultTree;