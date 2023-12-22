export const getDenoDir = async (): Promise<string> => {
  const command = new Deno.Command(Deno.execPath(), {
    args: ["info"],
  });

  const { stdout } = await command.output();

  return new TextDecoder()
    .decode(stdout)
    .split("\n")
    .filter((line) => line.includes("DENO_DIR"))[0]
    .replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      "",
    )
    .replace(/^DENO_DIR location: /g, "");
};
