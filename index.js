#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
console.log(chalk.blue("\t *** WELCOME TO COUNTDOWN TIMER*** \t"));
const ans = await inquirer.prompt([
    {
        name: "input",
        type: "number",
        message: (chalk.green("Please enter the amount of seconds!")),
        validate: (input) => {
            if (isNaN(input)) {
                return (chalk.red("please enter a valid number!"));
            }
            else if (input > 60) {
                return (chalk.red("Please enter a number with in 60!"));
            }
            else {
                return true;
            }
        }
    }
]);
let input = ans.input;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const timeInterval = new Date(intTime);
    setInterval((() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(timeInterval, currTime);
        if (timeDiff <= 0) {
            console.log(chalk.yellow("\t Timer has expired!\t"));
            process.exit();
        }
        const minute = Math.floor((timeDiff % (3600 / 24)) / 3600);
        const seconds = Math.floor((timeDiff % 60));
        console.log(chalk.green(`${minute.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`));
    }), 1000);
}
startTime(input);
