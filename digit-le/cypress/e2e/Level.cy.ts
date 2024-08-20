const levelUrl = "http://localhost:3000/board/easy/sami";

describe("Level spec", () => {
  context("Validate Levels Grid", () => {
    const levels = {
      easy: { attempts: 4, digits: 5 },
      normal: { attempts: 5, digits: 5 },
      hard: { attempts: 6, digits: 9 },
    };

    Object.keys(levels).forEach((level) => {
      it(`should display the correct grid layout for ${level} level`, () => {
        cy.visit(`/board/${level}/sami`);

        const { attempts, digits } = levels[level];

        for (let row = 1; row < attempts; row++) {
          for (let col = 1; col < digits; col++) {
            cy.get(
              `.board-container > :nth-child(${row}) > :nth-child(${col})`
            ).should("exist");
          }
        }
      });
    });
  });

  context("Invalid Input", () => {
    it("should keep focus and shouldn't write anything", () => {
      cy.visit(levelUrl);
      cy.get(".board-container > :nth-child(1) > :nth-child(1)").as("cell");
      cy.get("@cell").click();
      cy.get("@cell").should("have.focus");
      cy.get("@cell").type("a");
      cy.get("@cell").should("have.value", " ");
      cy.get("@cell").should("have.focus");
    });
  });

  context("Winning the game", () => {
    it("should display the winning message", () => {
      cy.visit("/board/easy/sami");

      cy.get(".game-container")
        .invoke("attr", "data-answer")
        .then((answer) => {
          answer!.split("").forEach((digit, i) => {
            cy.get(
              `.board-container > :nth-child(1) > :nth-child(${i + 1})`
            ).type(digit);
          });
          cy.get(".board-container > :nth-child(1) > :nth-child(4)").type(
            "{enter}"
          );
        });
      cy.contains("You Did It!!").should("exist");
    });
  });

  context("Losing the game", () => {
    it("should display the losing message", () => {
      cy.visit(levelUrl);
      for (let j = 0; j < 5; j++) {
        cy.get(".game-container")
          .invoke("attr", "data-answer")
          .then((answer) => {
            for (let i = 0; i < answer!.length - 1; i++) {
              cy.get(
                `.board-container > :nth-child(${j + 1}) > :nth-child(${i + 1})`
              ).type(answer![i]);
            }
            cy.get(
              `.board-container > :nth-child(${j + 1}) > :nth-child(4)`
            ).type(+answer![3] === 9 ? "1" : "9");
            cy.get(
              `.board-container > :nth-child(${j + 1}) > :nth-child(4)`
            ).type("{enter}");
          });
      }
      cy.contains("Hard Luck!!").should("exist");
    });
  });

  context("Restart the game", () => {
    it("should reset the game", () => {
      cy.visit(levelUrl);

      cy.get(".board-container > :nth-child(1) > :nth-child(1)").type("1");
      cy.get(".board-container > :nth-child(1) > :nth-child(2)").type("2");
      cy.get(".board-container > :nth-child(1) > :nth-child(3)").type("3");
      cy.get(".board-container > :nth-child(1) > :nth-child(4)").type("4");
      cy.get(".board-container > :nth-child(1) > :nth-child(4)").type(
        "{enter}"
      );
      cy.get(".result-button").click();
      cy.get(".board-container > :nth-child(1) > :nth-child(1)").should(
        "have.value",
        " "
      );
    });
  });

  context("Validate Row Color", () => {
    it("should change the row color", () => {
      cy.visit(levelUrl);
      cy.get(".board-container > :nth-child(1) > :nth-child(1)").type("1");
      cy.get(".board-container > :nth-child(1) > :nth-child(2)").type("5");
      cy.get(".board-container > :nth-child(1) > :nth-child(3)").type("4");
      cy.get(".board-container > :nth-child(1) > :nth-child(4)").type("2");
      cy.get(".board-container > :nth-child(1) > :nth-child(4)").type(
        "{enter}"
      );
      cy.get(".board-container > :nth-child(1) > :nth-child(1)").should(
        "have.class",
        "correct"
      );
      cy.get(".board-container > :nth-child(1) > :nth-child(2)").should(
        "have.class",
        "incorrect"
      );
      cy.get(".board-container > :nth-child(1) > :nth-child(3)").should(
        "have.class",
        "misplaced"
      );
      cy.get(".board-container > :nth-child(1) > :nth-child(4)").should(
        "have.class",
        "misplaced"
      );
    });
  });
});
