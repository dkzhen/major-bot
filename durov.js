const readlineSync = require("readline-sync");
const { validateToken } = require("./func/CheckValidToken");
const { default: axios } = require("axios");

if (readlineSync.keyInYN("Do you have choices durov puzzle? ")) {
  const choice1 = readlineSync.question("Choice 1 [Number only]: ");
  const choice2 = readlineSync.question("Choice 2 [Number only]: ");
  const choice3 = readlineSync.question("Choice 3 [Number only]: ");
  const choice4 = readlineSync.question("Choice 4 [Number only]: ");

  async function submitForm(choice1, choice2, choice3, choice4) {
    try {
      const tokens = await validateToken();

      for (const token of tokens) {
        const submit = await axios.post(
          "https://major.bot/api/durov/",
          {
            choice_1: parseInt(choice1 || 1),
            choice_2: parseInt(choice2 || 1),
            choice_3: parseInt(choice3 || 1),
            choice_4: parseInt(choice4 || 1),
          },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        console.log(submit.data);
      }
    } catch (error) {
      const timestamp = error.response.data;
      const dateInUTC = new Date(timestamp.detail.blocked_until * 1000);
      const utcPlus7 = new Date(dateInUTC.getTime() + 7 * 60 * 60 * 1000);
      console.log(
        "[ Error ] Puzzle durov can play again in",
        utcPlus7.toISOString()
      );
    }
  }
  submitForm(choice1, choice2, choice3, choice4);
} else {
  // Another key was pressed.
  console.log("Okey go on, you can choose whatever you want");
  // Do something...
}
