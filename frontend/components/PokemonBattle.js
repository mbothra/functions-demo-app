import React, { Component } from "react";
import TextBox from "./TextBox";
import Attacks from "./Attacks";
import EnemyBox from "./EnemyBox";
import PlayerBox from "./PlayerBox";
import PlayAgain from "./PlayAgain";


class App extends Component {
  state = {
    playerName: "Blastoise",
    playerLevel: 1,
    playerHP: 200,
    playerMaxHP: 200,
    playerAttacks: {
      attackOne: { name: "Bite", damage: 10 },
      attackTwo: { name: "Surf", damage: 30 },
      attackThree: { name: "Water Gun", damage: 35 },
      attackFour: { name: "Hydro Pump", damage: 45 }
    },
    playerFaint: "",
    enemyName: "Gengar",
    enemyLevel: 1,
    enemyHP: 200,
    enemyMaxHP: 200,
    enemyAttackNames: ["Hex", "Shadow Ball", "Dream Eater", "Nightmare"],
    enemyAttackDamage: [10, 30, 35, 45],
    enemyFaint: "",
    textMessageOne: " ",
    textMessageTwo: "",
    gameOver: false,
    selectedPlayer: null,
    selectedEnemy: null
  };

  handlePlayerSelect = (selectedPlayer) => {
    this.setState({ selectedPlayer });
    this.props.onPlayerSelected( selectedPlayer.value )
  }

  handleEnemySelect = (selectedEnemy) => {
    this.setState({ selectedEnemy });
    this.props.onEnemySelected( selectedEnemy.value )
  }

  componentDidMount() {
    this.startingSequence();
  }

  componentDidUpdate() {}

  startingSequence = () => {
    setTimeout(() => {
      this.setState(
        () => {
          return {
            textMessageOne: `A wild ${this.state.enemyName} appeared!`,
            enemyFaint: false
          };
        },
        () => {
          setTimeout(() => {
            this.setState(
              {
                textMessageOne: `Go ${this.state.playerName}!`,
                playerFaint: false
              },
              () => {
                setTimeout(() => {
                  this.setState({
                    textMessageOne: ""
                  });
                }, 3000);
              }
            );
          }, 3000);
        }
      );
    }, 1000);
  };

  enemyTurn = (enemyAttackName, enemyAttackDamage) => {
    enemyAttackDamage = enemyAttackDamage + Math.floor(Math.random() * 11);
    // first, check if enemy fainted. End Game if they did.
    if (this.state.enemyHP === 0) {
      this.setState(
        {
          textMessageOne: `${this.state.enemyName} fainted.`,
          textMessageTwo: `${this.state.playerName} wins!`,
          enemyFaint: true
        },
        () => {
          setTimeout(() => {
            this.setState({
              gameOver: true
            });
          }, 3000);
        }
      );
    } else {
      // if enemy is still alive, proceed with enemy turn

      this.setState(
        prevState => {
          if (prevState.playerHP - enemyAttackDamage <= 0) {
            return {
              playerHP: 0,
              textMessageOne: `${
                this.state.enemyName
              } used ${enemyAttackName} for ${enemyAttackDamage} damage!`
            };
          } else {
            return {
              playerHP: prevState.playerHP - enemyAttackDamage,
              textMessageOne: `${
                this.state.enemyName
              } used ${enemyAttackName} for ${enemyAttackDamage} damage!`
            };
          }
        },
        () => {
          setTimeout(() => {
            if (this.state.playerHP === 0) {
              this.setState(
                {
                  textMessageOne: `${this.state.playerName} fainted.`,
                  textMessageTwo: `${this.state.enemyName} wins!`,
                  playerFaint: true
                },
                () => {
                  setTimeout(() => {
                    this.setState({
                      gameOver: true
                    });
                  }, 3000);
                }
              );
            } else {
              this.setState({
                textMessageOne: ""
              });
            }
          }, 2000);
        }
      );
    }
  };

  handleAttackClick = (name, damage) => {
    // implicit return single value
    // this.setState(prevState => ({
    //   enemyHP: prevState.enemyHP - damage
    // }));

    damage = damage + Math.floor(Math.random() * 11);

    // use attack to calculate enemy HP and adjust progress bar
    this.setState(
      prevState => {
        if (prevState.enemyHP - damage <= 0) {
          return {
            enemyHP: 0,
            textMessageOne: `${
              this.state.playerName
            } used ${name} for ${damage} damage!`
          };
        } else {
          return {
            enemyHP: prevState.enemyHP - damage,
            textMessageOne: `${
              this.state.playerName
            } used ${name} for ${damage} damage!`
          };
        }
      },
      () => {
        // wait X seconds before enemy attacks
        setTimeout(() => {
          // calc next enemy attack name and damage
          let enemyAttack = Math.floor(Math.random() * 4);
          let enemyAttackDamage = this.state.enemyAttackDamage[enemyAttack];
          let enemyAttackName = this.state.enemyAttackNames[enemyAttack];

          // once the state is changed, start enemy turn
          this.enemyTurn(enemyAttackName, enemyAttackDamage);
        }, 3000);
      }
    );
  };

  handlePlayAgain = () => {
    console.log("play again!!!");
    this.setState({
      playerHP: this.state.playerMaxHP,
      enemyHP: this.state.enemyMaxHP,
      gameOver: false,
      textMessageOne: "",
      textMessageTwo: "",
      enemyFaint: false,
      playerFaint: false
    });
  };

  render() {
    return (
      <div className="container h-100">
        <div className="row row h-100 justify-content-center align-items-center">
          <div className="col-sm-12">
            {/* BATTLE SCREEN CONTAINER */}
            <div id="battle-container" className="px-2 mx-auto">
              <EnemyBox
                enemyName={this.state.enemyName}
                enemyLevel={this.state.enemyLevel}
                enemyHP={this.state.enemyHP}
                enemyMaxHP={this.state.enemyMaxHP}
                enemyFaint={this.state.enemyFaint}
                selectedEnemy={this.state.selectedEnemy}
                handleEnemySelect={this.handleEnemySelect}
                onEnemySelected={this.props.onEnemySelected}
              />

              <PlayerBox
                playerName={this.state.playerName}
                playerLevel={this.state.playerLevel}
                playerHP={this.state.playerHP}
                playerMaxHP={this.state.playerMaxHP}
                playerFaint={this.state.playerFaint}
                selectedPlayer={this.state.selectedPlayer}
                handlePlayerSelect={this.handlePlayerSelect}
                onPlayerSelected={this.props.onPlayerSelected}
              />

              {/* TEXT BOX SECTION */}
              <div id="text-box">
                <div id="text-box-content">
                {!this.state.selectedPlayer || !this.state.selectedEnemy ? (
                <TextBox
                    messageOne="Please select two players to begin the battle!"
                />
                ) : null}

                  {this.state.selectedPlayer && this.state.selectedEnemy && this.state.textMessageOne !== "" &&
                    this.state.gameOver === false && (
                      <TextBox
                        messageOne={this.state.textMessageOne}
                        messageTwo={this.state.textMessageTwo}
                      />
                    )}

                  {this.state.selectedPlayer && this.state.selectedEnemy && this.state.textMessageOne === "" &&
                    this.state.gameOver === false &&
                    <div className="centered-content">
                        <button className="pokemonPixelButton" onClick={this.handleBattleOnSmartContractClick}>
                            Battle on smartcontract
                        </button>
                    </div>                    
                  }

                  {this.state.gameOver === true && (
                    <PlayAgain handlePlayAgain={this.handlePlayAgain} />
                  )}
                </div>
              </div>
              {/* END TEXT BOX SECTION */}
            </div>
            {/* END BATTLE SCREEN CONTAINER */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;