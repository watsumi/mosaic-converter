import "./main.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { DropzoneButton } from "./components/drop-zone-button";

export function Main() {
  return (
    <MantineProvider>
      <DropzoneButton />
    </MantineProvider>
  );
}
