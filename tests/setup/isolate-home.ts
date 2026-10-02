import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Config and CLI auth lookups fall back to files under the home directory
// (~/.config/commandcode-bridge/credentials.json, ~/.commandcode/auth.json).
// Point HOME at an empty directory so a host running a real deployment cannot
// leak its dashboard config or upstream keys into the tests. This must run as
// globalSetup in the main process: os.homedir() reads the real process
// environment, which a worker thread's process.env copy does not change.
export default function isolateHome(): () => void {
  const isolatedHome = mkdtempSync(join(tmpdir(), "commandcode-bridge-test-home-"));
  process.env.HOME = isolatedHome;
  delete process.env.XDG_CONFIG_HOME;
  delete process.env.COMMANDCODE_CREDENTIALS_FILE;
  return () => rmSync(isolatedHome, { recursive: true, force: true });
}
