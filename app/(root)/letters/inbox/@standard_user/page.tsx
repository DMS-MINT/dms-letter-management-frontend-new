import { Subheader, Drawer, Main } from "@/components/layouts";
import { ControlPanel } from "@/widgets/inbox";
import { NavigationPanel } from "@/widgets/common";
import { Letter, columns } from "./columns";
import { DataTable } from "@/components/dataTable";
import { v4 as uuidv4 } from "uuid";

const sampleData: Letter[] = [
  {
    id: uuidv4(),
    is_read: false,
    sender: "መሰረት አሰፋ (የሰው ሀብት አስተባባሪ)",
    subject: "የፕሮጀክት ሁኔታ ሪፖርት ማቅረቢያ የመጨረሻ ቀን መቃረብ",
    type: "ከውጭ የተላከ ደብዳቤ",
    received_at: "8:00 AM",
  },
  {
    id: uuidv4(),
    is_read: true,
    sender: "አማረ ተፈሪ (የገበያ ስራ አስኪያጅ)",
    subject: "ለኮምፒዩተሮች የግዢ ትዕዛዝ ጥያቄ",
    type: "የውስጥ ደብዳቤ",
    received_at: "ትናንት",
  },
  {
    id: uuidv4(),
    is_read: true,
    sender: "Amare Tefri (Accountant)",
    subject: "Notice Regarding Company Expenses",
    type: "Internal Letter",
    received_at: "Today",
  },
];

export default async function StandardUserTable() {
  return (
    <>
      <Subheader>
        <ControlPanel />
      </Subheader>
      <section className="flex flex-1 pb-3 px-8 gap-6 mt-2">
        <Drawer>
          <NavigationPanel />
        </Drawer>
        <Main>
          <DataTable columns={columns} data={sampleData} />
        </Main>
      </section>
    </>
  );
}
