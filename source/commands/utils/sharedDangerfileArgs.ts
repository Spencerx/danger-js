import program from "commander"
import chalk from "chalk"

process.on("unhandledRejection", function(reason: string, _p: any) {
  console.log(chalk.red("Error: "), reason)
  process.exitCode = 1
})

export interface SharedCLI extends program.CommanderStatic {
  /** Should we be posting as much info as possible? */
  verbose: boolean
  /** Output to STDOUT instead of leaving a comment */
  textOnly: boolean
  /** Use a custom file for the CI provider instead of a built-in one */
  externalCiProvider?: string
  /** Where is the file? can be local or remote GH url  */
  dangerfile?: string
  /** The Danger run ID, so you can have many runs */
  id?: string
  /** Run in a repl? */
  repl?: string
  /** Use a custom file for the CI provider instead of a built-in one */
  process?: string
}

export default (command: any) =>
  command
    .option("-v, --verbose", "Verbose output of files", false)
    .option("-t, --text-only", "Provide an STDOUT only interface, Danger will not post to your PR", false)
    .option(
      "-d, --dangerfile [filePath | remote url]",
      "Specify a custom dangerfile path, remote urls only work with github"
    )
    .option("-i, --id [danger_id]", "Specify a unique Danger ID for the Danger run")
    .option("-p, --process [command]", "Runs a custom sub-process instead of the Danger JS runtime")
    .option("-b, --base [branch_name]", "Use a different base branch")
    .option("-c, --external-ci-provider [modulePath]", "Specify custom CI provider")
