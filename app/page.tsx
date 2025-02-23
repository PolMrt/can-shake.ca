import { MapTable } from "@/components/MapTable/MapTable";
import { useParseFile } from "@/hooks/useParseFile";

export const metadata = {
  title: "Earthquakes in Canada",
  description: "History of earthquakes in Canada - can-shake.ca",
};

export default function Home() {
  return <MapTable />;
}
